import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatePopoverComponent } from './date-popover';

@NgModule({
  declarations: [
    //DatePopoverComponent,
  ],
  imports: [
    IonicPageModule.forChild(DatePopoverComponent),
  ],
  exports: [
    //DatePopoverComponent
  ]
})
export class DatePopoverComponentModule {}
