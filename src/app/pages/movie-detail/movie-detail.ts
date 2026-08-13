import { Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { Showtime } from '../../models/movie';
import { formatDuration, formatFaDate, formatPrice, formatTime, toFa } from '../../utils/format';

@Component({
  selector: 'app-movie-detail',
  imports: [
    RouterLink,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  private readonly cinema = inject(CinemaService);

  readonly id = input<string>('');

  protected readonly movie = computed(() => this.cinema.getMovie(this.id()));
  protected readonly showtimes = computed(() => this.cinema.getShowtimesForMovie(this.id()));

  protected readonly dates = computed(() => {
    const seen = new Set<string>();
    return this.showtimes()
      .filter((s) => {
        if (seen.has(s.date)) return false;
        seen.add(s.date);
        return true;
      })
      .map((s) => s.date);
  });

  protected readonly activeDate = signal<string>('');

  protected readonly selectedDate = computed(() => this.activeDate() || this.dates()[0] || '');

  protected readonly selectedShowtimes = computed(() =>
    this.showtimes().filter((s) => s.date === this.selectedDate()),
  );

  protected readonly rating = computed(() => toFa((this.movie()?.rating ?? 0).toFixed(1)));
  protected readonly duration = computed(() => formatDuration(this.movie()?.durationMin ?? 0));

  protected selectDate(date: string): void {
    this.activeDate.set(date);
  }

  protected faDate(iso: string): string {
    return formatFaDate(iso);
  }

  protected faTime(time: string): string {
    return formatTime(time);
  }

  protected priceFrom(showtime: Showtime): string {
    return formatPrice(showtime.basePrice);
  }
}
