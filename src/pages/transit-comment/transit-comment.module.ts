import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransitCommentPage } from './transit-comment';

@NgModule({
  declarations: [
    //TransitCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(TransitCommentPage),
  ],
  exports: [
    //TransitCommentPage
  ]
})
export class TransitCommentPageModule {}
