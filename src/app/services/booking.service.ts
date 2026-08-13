import { Injectable, signal } from '@angular/core';
import { Booking } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private current = signal<Booking | null>(null);

  readonly booking = this.current.asReadonly();

  start(showtimeId: string, seatIds: string[], totalPrice: number): Booking {
    const booking: Booking = {
      id: `b-${Date.now()}`,
      showtimeId,
      seatIds: [...seatIds].sort((a, b) => a.localeCompare(b)),
      totalPrice,
      referenceCode: this.generateReference(),
      confirmed: false,
    };
    this.current.set(booking);
    return booking;
  }

  confirm(): void {
    this.current.update((b) => (b ? { ...b, confirmed: true } : b));
  }

  clear(): void {
    this.current.set(null);
  }

  private generateReference(): string {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return `CT-${code}`;
  }
}
