import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { formatDuration, toFa } from '../../utils/format';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  readonly movie = input.required<Movie>();

  protected readonly posterGradient = computed(
    () => `linear-gradient(160deg, ${this.movie().accentFrom}, ${this.movie().accentTo})`,
  );

  protected readonly rating = computed(() => toFa(this.movie().rating.toFixed(1)));
  protected readonly duration = computed(() => formatDuration(this.movie().durationMin));
}
