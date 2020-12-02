import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddHoroscopeNewPage } from './add-horoscope-new';

@NgModule({
  declarations: [
    //AddHoroscopeNewPage,
  ],
  imports: [
    IonicPageModule.forChild(AddHoroscopeNewPage),
  ],
  exports: [
    //AddHoroscopeNewPage
  ]
})
export class AddHoroscopeNewPageModule {}
