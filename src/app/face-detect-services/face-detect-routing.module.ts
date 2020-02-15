import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetectComponent } from './detect/detect.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'detectar',
    pathMatch: 'full'
  },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceDetectRoutingModule { }
