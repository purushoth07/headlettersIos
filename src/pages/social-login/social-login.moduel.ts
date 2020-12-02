import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialLoginPage } from './social-login';

@NgModule({
  declarations: [
    //SocialLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialLoginPage),
  ],
  exports: [
    //SocialLoginPage
  ]
})
export class SocialLoginPageModule {}
