import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMessagePage } from './add-message';

@NgModule({
  declarations: [
    //AddMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddMessagePage),
  ],
  exports: [
    //AddMessagePage
  ]
})
export class AddmessagePageModule {}
