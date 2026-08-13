import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { CinemaService } from '../../services/cinema.service';
import { formatFaDate, formatPrice, formatTime, toFa } from '../../utils/format';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatDividerModule, MatRadioModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly bookingService = inject(BookingService);
  private readonly cinema = inject(CinemaService);

  protected readonly booking = this.bookingService.booking;

  private readonly showtime$ = toObservable(this.booking).pipe(
    switchMap((booking) => (booking ? this.cinema.getShowtime(booking.showtimeId) : of(undefined))),
  );
  protected readonly showtime = toSignal(this.showtime$, { initialValue: undefined });

  private readonly movie$ = toObservable(this.showtime).pipe(
    switchMap((showtime) =>
      showtime ? this.cinema.getMovie(showtime.movieId) : of(undefined),
    ),
  );
  protected readonly movie = toSignal(this.movie$, { initialValue: undefined });

  protected faTime(time: string): string {
    return formatTime(time);
  }

  protected faDate(date: string): string {
    return formatFaDate(date);
  }

  protected price(amount: number): string {
    return formatPrice(amount);
  }

  protected faId(id: string): string {
    return toFa(id);
  }

  protected pay(): void {
    const booking = this.booking();
    if (!booking || booking.confirmed) {
      return;
    }
    this.bookingService.confirm(booking.id).subscribe({
      error: (err) => console.error('Confirm failed:', err),
    });
  }
}
