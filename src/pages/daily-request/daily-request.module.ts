import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyRequestPage } from './daily-request';

@NgModule({
  declarations: [
    //DailyRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyRequestPage),
  ],
  exports: [
    //DailyRequestPage
  ]
})
export class DailyRequestPageModule {}
