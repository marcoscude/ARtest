import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaccoltaPage } from './raccolta.page';

const routes: Routes = [
  {
    path: '',
    component: RaccoltaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaccoltaPageRoutingModule {}
