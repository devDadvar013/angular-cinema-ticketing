import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'سینماتیکت | خرید بلیط سینما',
  },
  {
    path: 'movies/:id',
    loadComponent: () => import('./pages/movie-detail/movie-detail').then((m) => m.MovieDetail),
    title: 'جزئیات فیلم | سینماتیکت',
  },
  {
    path: 'booking/:id',
    loadComponent: () => import('./pages/seat-selection/seat-selection').then((m) => m.SeatSelection),
    title: 'انتخاب صندلی | سینماتیکت',
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
    title: 'پرداخت | سینماتیکت',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
