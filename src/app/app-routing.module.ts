import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetectComponent } from './face-detect-services/detect/detect.component';
import { CompareComponent } from './face-detect-services/compare/compare.component';


const routes: Routes = [
  {
    path: 'detectar',
    component: DetectComponent,
    data: {
      title: 'Detectar'
    }
  },
  {
    path: 'comparar',
    component: CompareComponent,
    data: {
      title: 'Comparar'
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
