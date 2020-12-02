import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FingerAuthPage } from './fingerauth';

@NgModule({
  declarations: [
    //FingerAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(FingerAuthPage),
  ],
  exports: [
    //FingerAuthPage
  ]
})
export class FingerAuthPageModule {}
