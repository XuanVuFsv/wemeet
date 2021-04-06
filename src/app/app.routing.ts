import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'antd',
    loadChildren: () => import('@modules/antd/antd.module').then(m => m.AntdModule)
  },
  {
    path: 'system-overview',
    loadChildren: () =>
      import('@modules/system-overview/system-overview.module').then(m => m.SystemOverviewModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('@modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'film',
    loadChildren: () => import('@modules/film/film.module').then(m => m.FilmModule)
  },
  {
    path: 'episode',
    loadChildren: () => import('@modules/episode/episode.module').then(m => m.EpisodeModule)
  },
  {
    path: 'actor',
    loadChildren: () => import('@modules/actor/actor.module').then(m => m.ActorModule)
  },
  {
    path: 'edit-film',
    loadChildren: () => import('@modules/edit-film/edit-film.module').then(m => m.EditFilmModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
