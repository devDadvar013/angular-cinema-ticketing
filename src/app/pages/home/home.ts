import { Component, inject, signal } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CinemaService } from '../../services/cinema.service';
import { Movie } from '../../models/movie';
import { formatFaDate, toFa } from '../../utils/format';

const TODAY_ISO = '2026-08-13';

@Component({
  selector: 'app-home',
  imports: [MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly cinema = inject(CinemaService);

  protected readonly movies = signal<Movie[]>(this.cinema.getMovies());
  protected readonly todayLabel = signal(formatFaDate(TODAY_ISO));
  protected readonly movieCount = signal(toFa(this.cinema.getMovies().length));
}
