import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './components/shared-components.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  providers: [
    NgxSpinnerModule
  ],
  imports: [
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class SharedModule {}
