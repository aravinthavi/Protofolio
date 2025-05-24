import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'investment',
    loadChildren: () => import('./investment-form/investment-form.module').then(m => m.InvestmentFormModule)
  },
  {
    path: 'protofolio',
    loadChildren: () => import('./protofolio/protofolio.module').then(m => m.ProtofolioModule)
  },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'investment', loadChildren: () => import('./investment-form/investment-form.module').then(m => m.InvestmentFormModule) },
  { path: 'audio', loadChildren: () => import('./audio/audio.module').then(m => m.AudioModule) },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
