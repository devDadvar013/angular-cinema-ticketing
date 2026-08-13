import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { CinemaService } from '../../services/cinema.service';

interface Crumb {
  label: string;
  link?: string[];
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs {
  private readonly router = inject(Router);
  private readonly cinema = inject(CinemaService);
  private readonly bookingService = inject(BookingService);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly trail = computed<Crumb[]>(() => {
    const path = (this.currentUrl() ?? '').split('?')[0].split('#')[0];
    const segments = path.split('/').filter(Boolean);

    const home: Crumb = { label: 'خانه', link: ['/'] };

    if (segments.length === 0) {
      return [home];
    }

    const [first, second] = segments;

    if (first === 'movies' && second) {
      const movie = this.cinema.getMovie(second);
      return [home, { label: movie?.title ?? 'فیلم' }];
    }

    if (first === 'booking' && second) {
      const showtime = this.cinema.getShowtime(second);
      const movie = showtime ? this.cinema.getMovie(showtime.movieId) : undefined;
      const crumbs: Crumb[] = [home];
      if (movie) {
        crumbs.push({ label: movie.title, link: ['/movies', movie.id] });
      }
      crumbs.push({ label: 'انتخاب صندلی' });
      return crumbs;
    }

    if (first === 'checkout') {
      const booking = this.bookingService.booking();
      const showtime = booking ? this.cinema.getShowtime(booking.showtimeId) : undefined;
      const movie = showtime ? this.cinema.getMovie(showtime.movieId) : undefined;
      const crumbs: Crumb[] = [home];
      if (movie) {
        crumbs.push({ label: movie.title, link: ['/movies', movie.id] });
      }
      if (showtime) {
        crumbs.push({ label: 'انتخاب صندلی', link: ['/booking', showtime.id] });
      }
      crumbs.push({ label: 'پرداخت' });
      return crumbs;
    }

    return [home];
  });
}
