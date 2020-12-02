import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageHistoryPage } from './message-history';

@NgModule({
  declarations: [
    //MessageHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageHistoryPage),
  ],
  exports: [
    //MessageHistoryPage
  ]
})
export class MessageHistoryPageModule {}
