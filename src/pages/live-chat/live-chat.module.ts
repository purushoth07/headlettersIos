import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveChatPage } from './live-chat';

@NgModule({
  declarations: [
    LiveChatPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveChatPage),
  ],
  exports: [
    LiveChatPage
  ]
})
export class LiveChatPageModule {}
