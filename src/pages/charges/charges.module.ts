import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChargesPage } from './charges';

@NgModule({
  declarations: [
    //ChargesPage,
  ],
  imports: [
    IonicPageModule.forChild(ChargesPage),
  ],
  exports: [
    //ChargesPage
  ]
})
export class ChargesPageModule {}
