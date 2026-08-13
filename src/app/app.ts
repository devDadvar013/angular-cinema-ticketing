import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { filter, map, startWith } from 'rxjs';
import { Breadcrumbs } from './components/breadcrumbs/breadcrumbs';

interface RouteState {
  path: string;
  fragment: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatToolbarModule, Breadcrumbs],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);

  constructor() {
    this.viewportScroller.setOffset([0, 80]);
  }

  private readonly routeState = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.readRouteState()),
      startWith(this.readRouteState()),
    ),
    { initialValue: this.readRouteState() },
  );

  /** «اکران»: صفحه اصلی و مسیر خرید (انتخاب صندلی و پرداخت) */
  protected readonly nowShowingActive = computed(() => {
    const { path, fragment } = this.routeState() ?? this.readRouteState();
    if (path === '/') {
      return fragment !== 'movies';
    }
    return path.startsWith('/booking') || path.startsWith('/checkout');
  });

  /** «فیلم‌ها»: صفحات فیلم و بخش فهرست فیلم‌ها */
  protected readonly moviesActive = computed(() => {
    const { path, fragment } = this.routeState() ?? this.readRouteState();
    return path.startsWith('/movies') || fragment === 'movies';
  });

  private readRouteState(): RouteState {
    const url = this.router.url ?? '';
    const path = url.split('?')[0].split('#')[0];
    const fragment = this.router.routerState.snapshot.root.fragment ?? '';
    return { path, fragment };
  }
}
