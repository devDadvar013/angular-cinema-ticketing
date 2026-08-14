import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookingService } from '../../services/booking.service';
import { TrackedTicket } from '../../models/movie';
import { formatFaDate, formatPrice, formatTime, toFa } from '../../utils/format';

@Component({
  selector: 'app-track',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './track.html',
  styleUrl: './track.scss',
})
export class Track {
  private readonly bookingService = inject(BookingService);

  protected readonly code = signal('');
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly ticket = signal<TrackedTicket | null>(null);

  protected track(): void {
    const raw = this.code().trim();
    if (!raw) {
      this.error.set('لطفاً کد پیگیری را وارد کنید.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.ticket.set(null);

    this.bookingService.track(raw).subscribe({
      next: (ticket) => {
        this.ticket.set(ticket);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('تیکتی با این کد پیگیری پیدا نشد. کد را بررسی کنید.');
        this.loading.set(false);
      },
    });
  }

  protected onCodeChange(value: string): void {
    this.code.set(value.toUpperCase());
  }

  protected faTime(time: string): string {
    return formatTime(time);
  }

  protected faDate(date: string): string {
    return formatFaDate(date);
  }

  protected faId(id: string): string {
    return toFa(id);
  }

  protected price(amount: number): string {
    return formatPrice(amount);
  }

  protected statusLabel(ticket: TrackedTicket): string {
    const booking = ticket.booking;
    if (booking.cancelledAt) {
      return 'لغو شده';
    }
    return booking.confirmed ? 'تأیید شده' : 'در انتظار پرداخت';
  }
}
