import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { NgxFilesizeModule } from 'ngx-filesize';

import { PhotoComponent } from './photo/photo.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';

@NgModule({
  declarations: [
    PhotoComponent,
    PhotoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxFilesizeModule
  ],
  exports: [
    PhotoComponent,
    PhotoFormComponent
  ]
})
export class PhotosModule {}
