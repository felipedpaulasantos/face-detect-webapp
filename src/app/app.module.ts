import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeModule,
    PhotosModule,
    FaceDetectServicesModule,
    SharedComponentsModule,
    MenuModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomSnackBarComponent
  ]
})
export class AppModule { }
