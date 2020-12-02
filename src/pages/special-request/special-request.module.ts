import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialRequestPage } from './special-request';

@NgModule({
  declarations: [
    //SpecialRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecialRequestPage),
  ],
  exports: [
    //SpecialRequestPage
  ]
})
export class SpecialRequestPageModule {}
