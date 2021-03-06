import { NgModule } from '@angular/core';
import { DetectComponent } from './detect/detect.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { PhotosModule } from '../photos/photos.module';
import { MaterialModule } from '../shared/material/material.module';
import { DetectionAttributesComponent } from './detect/detection-attributes/detection-attributes.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { NgxSpinnerModule } from 'ngx-spinner'
import { CompareComponent } from './compare/compare.component';
import { CompareResultComponent } from './compare/compare-result/compare-result.component';
import { FaceDetectRoutingModule } from './face-detect-routing.module';

@NgModule({
  declarations: [
    DetectComponent,
    DetectionAttributesComponent,
    CompareComponent,
    CompareResultComponent
  ],
  imports: [
    CommonModule,
    PhotosModule,
    FaceDetectRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MaterialFileInputModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedComponentsModule
  ]
})
export class FaceDetectServicesModule {}
