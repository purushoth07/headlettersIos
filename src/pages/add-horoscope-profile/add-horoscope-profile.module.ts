import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddHoroscopeProfilePage } from './add-horoscope-profile';

@NgModule({
  declarations: [
    //AddHoroscopeProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(AddHoroscopeProfilePage),
  ],
  exports: [
    //AddHoroscopeProfilePage
  ]
})
export class AddHoroscopeProfilePageModule {}
