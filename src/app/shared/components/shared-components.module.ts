import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { NgxSpinnerDefaultComponent } from './ngx-spinner-default/ngx-spinner-default.component';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MaterialTreeComponent } from './material-tree/material-tree.component';

@NgModule({
  declarations: [
    NgxSpinnerDefaultComponent,
    CustomSnackBarComponent,
    MaterialTreeComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule
  ],
  exports: [
    NgxSpinnerDefaultComponent,
    MaterialTreeComponent
  ]
})
export class SharedComponentsModule { }
