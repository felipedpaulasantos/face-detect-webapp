import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetectComponent } from './face-detect-services/detect/detect.component';


const routes: Routes = [
  {
    path: 'detectar',
    component: DetectComponent,
    data: {
      title: 'Detectar'
    }
  },
  {
    path: '',
    redirectTo: '/detectar',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
