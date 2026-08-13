import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CinemaService } from '../../services/cinema.service';
import { formatFaDate, formatPrice, formatTime, toFa } from '../../utils/format';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly bookingService = inject(BookingService);
  private readonly cinema = inject(CinemaService);

  protected readonly booking = this.bookingService.booking;

  protected readonly showtime = computed(() => {
    const booking = this.booking();
    return booking ? this.cinema.getShowtime(booking.showtimeId) : undefined;
  });

  protected readonly movie = computed(() => {
    const showtime = this.showtime();
    return showtime ? this.cinema.getMovie(showtime.movieId) : undefined;
  });

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
    this.bookingService.confirm();
  }
}
