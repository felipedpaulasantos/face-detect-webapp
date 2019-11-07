import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoComponent } from './photos/photo/photo.component';
import { DetectComponent } from './face-detect-services/detect/detect.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent,
    DetectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
