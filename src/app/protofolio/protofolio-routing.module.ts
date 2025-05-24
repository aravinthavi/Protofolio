import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtfolioComponent } from './protfolio/protfolio.component';

const routes: Routes = [{ path: '', component: ProtfolioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtofolioRoutingModule { }
