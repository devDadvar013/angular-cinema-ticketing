import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CinemaService } from '../../services/cinema.service';
import { formatFaDate, toFa } from '../../utils/format';

const TODAY_ISO = '2026-08-13';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly cinema = inject(CinemaService);

  protected readonly movies = toSignal(this.cinema.getMovies(), { initialValue: [] });
  protected readonly todayLabel = signal(formatFaDate(TODAY_ISO));
  protected readonly movieCount = computed(() => toFa(this.movies().length));
}
