import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotosModule } from './photos/photos.module';
import { FaceDetectServicesModule } from './face-detect-services/face-detect-services.module';
import { MaterialModule } from './material/material.module';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './shared/interceptors/loader-interceptor';
import { CustomSnackBarComponent } from './shared/components/custom-snack-bar/custom-snack-bar.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PhotosModule,
    FaceDetectServicesModule,
    SharedComponentsModule
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
