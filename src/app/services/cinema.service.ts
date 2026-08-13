import { Injectable } from '@angular/core';
import { MOVIES, SHOWTIMES } from '../data/cinema.data';
import { Movie, SeatRow, Showtime } from '../models/movie';

const ROW_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 12;
const VIP_ROWS = new Set(['G', 'H']);

@Injectable({ providedIn: 'root' })
export class CinemaService {
  getMovies(): Movie[] {
    return MOVIES;
  }

  getMovie(id: string): Movie | undefined {
    return MOVIES.find((m) => m.id === id);
  }

  getShowtime(id: string): Showtime | undefined {
    return SHOWTIMES.find((s) => s.id === id);
  }

  getShowtimesForMovie(movieId: string): Showtime[] {
    return SHOWTIMES.filter((s) => s.movieId === movieId).sort(
      (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
    );
  }

  /** تولید قطعی (بدون تصادف) صندلی‌های سالن تا SSR و کلاینت یکسان بمانند */
  getSeats(showtimeId: string): SeatRow[] {
    let salt = 0;
    for (const ch of showtimeId) {
      salt += ch.charCodeAt(0);
    }

    return ROW_LABELS.map((row, rowIndex) => ({
      row,
      seats: Array.from({ length: SEATS_PER_ROW }, (_, i) => {
        const number = i + 1;
        const vip = VIP_ROWS.has(row);
        const reserved = (rowIndex * 7 + number * 13 + salt) % 11 < 2;
        return {
          id: `${row}${number}`,
          row,
          number,
          status: reserved ? ('reserved' as const) : ('available' as const),
          vip,
        };
      }),
    }));
  }
}
