import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeeklyRequestPage } from './weekly-request';

@NgModule({
  declarations: [
    //WeeklyRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(WeeklyRequestPage),
  ],
  exports: [
    //WeeklyRequestPage
  ]
})
export class WeeklyRequestPageModule {}
