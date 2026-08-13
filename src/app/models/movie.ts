export interface Movie {
  id: string;
  /** عنوان فارسی فیلم */
  title: string;
  /** عنوان اصلی (انگلیسی) */
  originalTitle: string;
  genres: string[];
  durationMin: number;
  ageRating: string;
  rating: number;
  synopsis: string;
  director: string;
  cast: string[];
  releaseYear: string;
  /** رنگ‌های گرادیان پوستر */
  accentFrom: string;
  accentTo: string;
  nowShowing: boolean;
}

export type ShowtimeFormat = '2D' | '3D' | 'IMAX' | '4DX';

export interface Showtime {
  id: string;
  movieId: string;
  /** تاریخ میلادی به‌صورت ISO (yyyy-mm-dd) برای مرتب‌سازی و تبدیل به شمسی */
  date: string;
  /** ساعت نمایش HH:mm */
  time: string;
  hall: string;
  format: ShowtimeFormat;
  basePrice: number;
  vipPrice: number;
}

export type SeatStatus = 'available' | 'reserved' | 'selected';

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  vip: boolean;
}

export interface SeatRow {
  row: string;
  seats: Seat[];
}

export interface Booking {
  id: string;
  showtimeId: string;
  seatIds: string[];
  totalPrice: number;
  referenceCode: string;
  confirmed: boolean;
}
