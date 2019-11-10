import { NgModule } from '@angular/core';
import { DetectComponent } from './detect/detect.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { PhotosModule } from '../photos/photos.module';
import { MaterialModule } from '../material/material.module';
import { DetectionAttributesComponent } from './detection-attributes/detection-attributes.component';

@NgModule({
  declarations: [
    DetectComponent,
    DetectionAttributesComponent
  ],
  imports: [
    CommonModule,
    PhotosModule,
    ReactiveFormsModule,
    MaterialModule,
    MaterialFileInputModule
  ]
})
export class FaceDetectServicesModule {}
