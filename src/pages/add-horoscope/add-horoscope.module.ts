import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddHoroscopePage } from './add-horoscope';

@NgModule({
  declarations: [
    //AddHoroscopePage,
  ],
  imports: [
    IonicPageModule.forChild(AddHoroscopePage),
  ],
  exports: [
    //AddHoroscopePage
  ]
})
export class AddHoroscopePageModule {}
