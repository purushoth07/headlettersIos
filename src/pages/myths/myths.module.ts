import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MythsPage } from './myths';

@NgModule({
  declarations: [
    MythsPage,
  ],
  imports: [
    IonicPageModule.forChild(MythsPage),
  ],
  exports: [
    MythsPage
  ]
})
export class MythsPageModule {}
