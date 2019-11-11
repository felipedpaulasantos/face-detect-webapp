import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { NgxSpinnerDefaultComponent } from './ngx-spinner-default/ngx-spinner-default.component';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    NgxSpinnerDefaultComponent,
    CustomSnackBarComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule
  ],
  exports: [
    NgxSpinnerDefaultComponent
  ]
})
export class SharedComponentsModule { }
