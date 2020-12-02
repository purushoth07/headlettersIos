import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromisesPage } from './promises';

@NgModule({
  declarations: [
    //PromisesPage,
  ],
  imports: [
    IonicPageModule.forChild(PromisesPage),
  ],
  exports: [
    //PromisesPage
  ]
})
export class PromisesPageModule {}
