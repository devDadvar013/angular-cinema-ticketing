import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'movies/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'booking/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
