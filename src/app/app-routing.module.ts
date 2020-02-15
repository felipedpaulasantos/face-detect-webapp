import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
      animation: 'Home'
    }
  },
  {
    path: 'servicos',
    loadChildren: './face-detect-services/face-detect-services.module#FaceDetectServicesModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: false,
      initialNavigation: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
