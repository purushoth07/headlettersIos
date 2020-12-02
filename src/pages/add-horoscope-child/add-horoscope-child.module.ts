import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddHoroscopeChildPage } from './add-horoscope-child';

@NgModule({
  declarations: [
    //AddHoroscopeChildPage,
  ],
  imports: [
    IonicPageModule.forChild(AddHoroscopeChildPage),
  ],
  exports: [
    //AddHoroscopeChildPage
  ]
})
export class AddHoroscopeChildPageModule {}
