import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPlacePage } from './find-place';

@NgModule({
  declarations: [
    FindPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(FindPlacePage),
  ],
  exports: [
    FindPlacePage
  ]
})
export class FindPlacePageModule {}
