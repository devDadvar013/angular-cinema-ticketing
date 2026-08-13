import { Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CinemaService } from '../../services/cinema.service';
import { Seat } from '../../models/movie';
import { formatFaDate, formatPrice, formatTime, toFa } from '../../utils/format';

@Component({
  selector: 'app-seat-selection',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatDividerModule],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.scss',
})
export class SeatSelection {
  private readonly cinema = inject(CinemaService);
  private readonly booking = inject(BookingService);
  private readonly router = inject(Router);

  readonly id = input<string>('');

  protected readonly showtime = computed(() => this.cinema.getShowtime(this.id()));
  protected readonly movie = computed(() => this.cinema.getMovie(this.showtime()?.movieId ?? ''));
  protected readonly rows = computed(() => this.cinema.getSeats(this.id()));

  protected readonly selectedIds = signal<string[]>([]);
  protected readonly selectedSet = computed(() => new Set(this.selectedIds()));

  protected readonly selection = computed(() => {
    const showtime = this.showtime();
    const ids = this.selectedIds();
    if (!showtime) {
      return { count: 0, total: 0 };
    }
    const set = new Set(ids);
    let total = 0;
    for (const row of this.rows()) {
      for (const seat of row.seats) {
        if (set.has(seat.id)) {
          total += seat.vip ? showtime.vipPrice : showtime.basePrice;
        }
      }
    }
    return { count: ids.length, total };
  });

  protected toggleSeat(seat: Seat): void {
    if (seat.status === 'reserved') {
      return;
    }
    this.selectedIds.update((ids) =>
      ids.includes(seat.id) ? ids.filter((id) => id !== seat.id) : [...ids, seat.id],
    );
  }

  protected seatNumber(seat: Seat): string {
    return toFa(seat.number);
  }

  protected faId(id: string): string {
    return toFa(id);
  }

  protected faTime(time: string): string {
    return formatTime(time);
  }

  protected faDate(date: string): string {
    return formatFaDate(date);
  }

  protected price(amount: number): string {
    return formatPrice(amount);
  }

  protected continue(): void {
    const showtime = this.showtime();
    if (!showtime || this.selection().count === 0) {
      return;
    }
    this.booking.start(showtime.id, this.selectedIds(), this.selection().total);
    this.router.navigate(['/checkout']);
  }
}
