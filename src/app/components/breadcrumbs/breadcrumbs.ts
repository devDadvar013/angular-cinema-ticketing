import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { filter, map, of, startWith, switchMap } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { CinemaService } from '../../services/cinema.service';

interface Crumb {
  label: string;
  link?: string[];
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs {
  private readonly router = inject(Router);
  private readonly cinema = inject(CinemaService);
  private readonly bookingService = inject(BookingService);

  private readonly currentUrl$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => event.urlAfterRedirects),
    startWith(this.router.url),
  );

  protected readonly trail = toSignal(this.buildTrail(), { initialValue: [] });

  private buildTrail() {
    return this.currentUrl$.pipe(
      switchMap((url) => {
        const path = url.split('?')[0].split('#')[0];
        const segments = path.split('/').filter(Boolean);

        const home: Crumb = { label: 'خانه', link: ['/'] };

        if (segments.length === 0) {
          return of<Crumb[]>([home]);
        }

        const [first, second] = segments;

        if (first === 'movies' && second) {
          return this.cinema.getMovie(second).pipe(
            map((movie) => [home, { label: movie?.title ?? 'فیلم' }] as Crumb[]),
          );
        }

        if (first === 'booking' && second) {
          return this.cinema.getShowtime(second).pipe(
            switchMap((showtime) => {
              if (!showtime) {
                return of<Crumb[]>([home, { label: 'انتخاب صندلی' }]);
              }
              return this.cinema.getMovie(showtime.movieId).pipe(
                map((movie) => {
                  const crumbs: Crumb[] = [home];
                  if (movie) {
                    crumbs.push({ label: movie.title, link: ['/movies', movie.id] });
                  }
                  crumbs.push({ label: 'انتخاب صندلی' });
                  return crumbs;
                }),
              );
            }),
          );
        }

        if (first === 'checkout') {
          const booking = this.bookingService.booking();
          if (!booking) {
            return of<Crumb[]>([home, { label: 'پرداخت' }]);
          }
          return this.cinema.getShowtime(booking.showtimeId).pipe(
            switchMap((showtime) => {
              if (!showtime) {
                return of<Crumb[]>([home, { label: 'پرداخت' }]);
              }
              return this.cinema.getMovie(showtime.movieId).pipe(
                map((movie) => {
                  const crumbs: Crumb[] = [home];
                  if (movie) {
                    crumbs.push({ label: movie.title, link: ['/movies', movie.id] });
                  }
                  crumbs.push({ label: 'انتخاب صندلی', link: ['/booking', showtime.id] });
                  crumbs.push({ label: 'پرداخت' });
                  return crumbs;
                }),
              );
            }),
          );
        }

        return of<Crumb[]>([home]);
      }),
    );
  }
}
