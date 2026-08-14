import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Booking, TrackedTicket } from '../models/movie';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);

  private current = signal<Booking | null>(null);

  readonly booking = this.current.asReadonly();

  /** Creates a pending booking server-side (price is recomputed by the API). */
  start(showtimeId: string, seatIds: string[]): Observable<Booking> {
    return this.http
      .post<Booking>(`${API_BASE_URL}/bookings`, { showtimeId, seatIds })
      .pipe(tap((booking) => this.current.set(booking)));
  }

  /** Confirms payment for the given booking. */
  confirm(id: string): Observable<Booking> {
    return this.http
      .post<Booking>(`${API_BASE_URL}/bookings/${id}/confirm`, null)
      .pipe(tap((booking) => this.current.update(() => booking)));
  }

  /** Looks up a ticket by its public tracking code (e.g. CT-ABC123). */
  track(code: string): Observable<TrackedTicket> {
    return this.http.get<TrackedTicket>(
      `${API_BASE_URL}/bookings/track/${encodeURIComponent(code)}`,
    );
  }

  clear(): void {
    this.current.set(null);
  }
}
