import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PredictionRequestListPage } from './prediction-request-list';

@NgModule({
  declarations: [
    //PredictionRequestListPage,
  ],
  imports: [
    IonicPageModule.forChild(PredictionRequestListPage),
  ],
  exports: [
    //PredictionRequestListPage
  ]
})
export class PredictionRequestListPageModule {}
