import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealtaAumentataPage } from './realta-aumentata.page';

const routes: Routes = [
  {
    path: '',
    component: RealtaAumentataPage
  },
  {
    path: 'experience',
    loadChildren: () => import('./experience/experience.module').then( m => m.ExperiencePageModule)
  },
  {
    path: 'experience/:ar',
    loadChildren: () => import('./experience/experience.module').then( m => m.ExperiencePageModule)
  },
  {
    path: 'raccolta',
    loadChildren: () => import('./raccolta/raccolta.module').then( m => m.RaccoltaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealtaAumentataPageRoutingModule {}
