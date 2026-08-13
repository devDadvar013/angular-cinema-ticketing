import { Component, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { of, switchMap } from 'rxjs';
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

  private readonly movie$ = toObservable(this.id).pipe(
    switchMap((id) => (id ? this.cinema.getMovie(id) : of(undefined))),
  );
  protected readonly movie = toSignal(this.movie$, { initialValue: undefined });

  private readonly showtimes$ = toObservable(this.id).pipe(
    switchMap((id) => (id ? this.cinema.getShowtimesForMovie(id) : of([]))),
  );
  protected readonly showtimes = toSignal(this.showtimes$, { initialValue: [] });

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
