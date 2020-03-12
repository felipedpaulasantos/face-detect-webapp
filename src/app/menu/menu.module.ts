import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MenuListItemComponent } from './sidenav/menu-list-item/menu-list-item.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'

@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    BreadcrumbComponent,
    MenuListItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    PerfectScrollbarModule
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    BreadcrumbComponent,
    MenuListItemComponent
  ]
})
export class MenuModule { }
