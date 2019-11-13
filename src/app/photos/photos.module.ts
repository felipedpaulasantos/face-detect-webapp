import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    PhotoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PhotoComponent
  ]
})
export class PhotosModule {}
