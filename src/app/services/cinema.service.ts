import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { Movie, SeatRow, Showtime } from '../models/movie';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class CinemaService {
  private readonly http = inject(HttpClient);

  /** Replays successful responses so several components (page + breadcrumbs) share one HTTP call. */
  private readonly cache = new Map<string, Observable<unknown>>();

  getMovies(nowShowing = true): Observable<Movie[]> {
    return this.getOrCache(`movies:${nowShowing}`, () =>
      this.http.get<Movie[]>(`${API_BASE_URL}/movies`, {
        params: nowShowing ? { nowShowing: 'true' } : {},
      }),
      [],
    );
  }

  getMovie(id: string): Observable<Movie | undefined> {
    return this.getOrCache(`movie:${id}`, () =>
      this.http.get<Movie>(`${API_BASE_URL}/movies/${id}`),
    );
  }

  getShowtime(id: string): Observable<Showtime | undefined> {
    return this.getOrCache(`showtime:${id}`, () =>
      this.http.get<Showtime>(`${API_BASE_URL}/showtimes/${id}`),
    );
  }

  getShowtimesForMovie(movieId: string): Observable<Showtime[]> {
    return this.getOrCache(
      `showtimes:${movieId}`,
      () => this.http.get<Showtime[]>(`${API_BASE_URL}/showtimes`, { params: { movieId } }),
      [],
    );
  }

  /** Seat map for a showtime; seats held by active bookings arrive as `reserved`.
   *  Not cached on purpose so a fresh visit always reflects current bookings. */
  getSeats(showtimeId: string): Observable<SeatRow[]> {
    return this.http.get<SeatRow[]>(`${API_BASE_URL}/showtimes/${showtimeId}/seats`);
  }

  private getOrCache<T>(key: string, make: () => Observable<T>, fallback?: T): Observable<T> {
    const existing = this.cache.get(key) as Observable<T> | undefined;
    if (existing) {
      return existing;
    }
    const shared = make().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    this.cache.set(key, shared);
    // Evict on error (so a later visit can retry) and shield callers with a safe fallback.
    return shared.pipe(
      tap({ error: () => this.cache.delete(key) }),
      catchError(() => of(fallback as T)),
    );
  }
}
