import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { NgxSpinnerDefaultComponent } from './ngx-spinner-default/ngx-spinner-default.component';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MaterialTreeComponent } from './material-tree/material-tree.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NgxSpinnerDefaultComponent,
    CustomSnackBarComponent,
    MaterialTreeComponent,
    NavigationItemComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NgxSpinnerDefaultComponent,
    MaterialTreeComponent,
    NavigationItemComponent
  ]
})
export class SharedComponentsModule { }
