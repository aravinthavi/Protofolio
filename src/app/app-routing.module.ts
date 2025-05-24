import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'protofolio',
    pathMatch: 'full'
  },
  {
    path: 'protofolio',
    loadChildren: () => import('./protofolio/protofolio.module').then(m => m.ProtofolioModule)
  },
  { path: 'audio', loadChildren: () => import('./audio/audio.module').then(m => m.AudioModule) },
  {
    path: '**',
    redirectTo: 'protofolio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
