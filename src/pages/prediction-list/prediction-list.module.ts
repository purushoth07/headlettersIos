import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PredictionListPage } from './prediction-list';

@NgModule({
  declarations: [
    //PredictionListPage,
  ],
  imports: [
    IonicPageModule.forChild(PredictionListPage),
  ],
  exports: [
    //PredictionListPage
  ]
})
export class PredictionListPageModule {}
