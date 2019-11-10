import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { NgxSpinnerDefaultComponent } from './ngx-spinner-default/ngx-spinner-default.component';

@NgModule({
  declarations: [
    NgxSpinnerDefaultComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [
    NgxSpinnerDefaultComponent
  ]
})
export class SharedComponentsModule { }
