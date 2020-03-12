import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { PhotosModule } from './photos/photos.module';
import { FaceDetectServicesModule } from './face-detect-services/face-detect-services.module';
import { MaterialModule } from './shared/material/material.module';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './shared/interceptors/loader-interceptor';
import { CustomSnackBarComponent } from './shared/components/custom-snack-bar/custom-snack-bar.component';
import { MenuModule } from './menu/menu.module';
import { HomeModule } from './home/home.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NavService } from './menu/sidenav/menu-list-item/nav.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    MaterialModule,
    PerfectScrollbarModule,
    HomeModule,
    PhotosModule,
    FaceDetectServicesModule,
    SharedComponentsModule,
    MenuModule
  ],
  exports: [],
  providers: [
    NavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomSnackBarComponent
  ]
})
export class AppModule { }
