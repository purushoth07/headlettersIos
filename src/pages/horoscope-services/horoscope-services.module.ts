import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoroscopeServicesPage } from './horoscope-services';

@NgModule({
  declarations: [
    //HoroscopeServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(HoroscopeServicesPage),
  ],
  exports: [
    //HoroscopeServicesPage
  ]
})
export class HoroscopeServicesPageModule {}
