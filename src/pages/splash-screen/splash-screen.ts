import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as Constants from '../../utils/constants';
import { LoginResponseData } from '../../api/response/login_response_data';
import { DashboardPage } from '../dashboard/dashboard';
import { SocialLoginPage } from '../social-login/social-login';
import { FingerprintAIO,FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { FingerAuthPage } from '../fingerauth/fingerauth';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { UtilityProvider } from '../../providers/utility/utility';
import { TermsConditionUpdatePage } from '../terms-condition-update/terms-condition-update';
/**
 * Generated class for the SplashScreenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-splash-screen',
  templateUrl: 'splash-screen.html',
})
export class SplashScreenPage {
  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public session:Storage,
            private viewCtrl:ViewController,
            private platform: Platform,
            private faio: FingerprintAIO,
            public translate:TranslateService,
            public utility:UtilityProvider) {
            this.session.get(Constants.SELECTED_LANGUAGE).then(val=>{
              if(val){
                utility.setDefaultLanguage(val);
                
                //this.applyLanguage(val);
              }
            });
            this.checkFingerAIO();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SplashScreenPage');
      //this.checkFingerAIO();
      //this.checkFlow();
  }

  applyLanguage(code:string) {
    this.translate.use(code);
    this.session.set(Constants.SELECTED_LANGUAGE,code);
	}

  /**
   * cehck finger auth
   * 
   */
  async checkFingerAIO(){
   
      await this.platform.ready();
      const val =  await this.session.get(Constants.IS_LOGIN);
      //alert("VALUE:" +JSON.stringify(val));
      if(val){
          const user = await this.session.get(Constants.USER_DATA);
        //this.session.get(Constants.USER_DATA).then(user=>{
          const userData  = new LoginResponseData(JSON.stringify(user));
          if(userData && userData.getTOUCHID && userData.getTOUCHID.toString().trim() === Constants.TRUE){
            try{
              //const ready = await this.platform.ready();
             // alert("PLATFORM:"+ready);
                const available = await this.faio.isAvailable();
                //console.log("CHECK:"+available);
                //alert("CHECK:"+available);

                if(available === 'OK' || available === 'finger'){
                  // if(!userData.getTCFlag || userData.getTCFlag.toString().trim() === Constants.NO){
                  //   this.gotToUpdateTerms(userData,true);
                  // }else{
                    this.goToFingerAuth();
                  // }
                  
                }else{
                  // if(!userData.getTCFlag || userData.getTCFlag.toString().trim() === Constants.NO){
                  //   this.gotToUpdateTerms(userData,false);
                  // }else{
                        this.goToDashboard();
                  //}
                  
                }
              }catch(e){
                //console.error("ERROR:"+ e);
                //alert("ERROR:"+ e);
                //this.navCtrl.pop();
                // if(userData && (!userData.getTCFlag || userData.getTCFlag.toString().trim() === Constants.NO)){
                //   this.gotToUpdateTerms(userData,false);
                // }else{
                  this.goToDashboard();
                // }
              }
          }else{
            // if(userData && (!userData.getTCFlag || userData.getTCFlag.toString().trim() === Constants.NO)){
            //   this.gotToUpdateTerms(userData,false);
            // }else{
              this.goToDashboard();
            // }
          }
      //  });
      }else{
          this.goToSocialLogin();
      }
      
  }

  checkFlow(){
    this.session.get(Constants.IS_LOGIN).then(val=>{
     //alert("VALUE" +JSON.stringify(val));
        if(val){
          this.goToDashboard();
          //this.checkFingerAIO();
        }else{
            this.goToSocialLogin();
        }
      });
  }

  goToDashboard(){
    this.session.get(Constants.USER_DATA).then(val=>{
      let userData  = new LoginResponseData(JSON.stringify(val));
      //this.navCtrl.setRoot(DashboardPage)
      this.navCtrl.push(DashboardPage, {data:userData});
    }).then(() => {
      let index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }

  goToSocialLogin(){
    //this.navCtrl.setRoot(SocialLoginPage)
    this.navCtrl.push(SocialLoginPage, {

    }).then(() => {
      let index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }

  goToFingerAuth(){
    this.navCtrl.push(FingerAuthPage, {

    }).then(() => {
      let index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }

  gotToUpdateTerms(userData:LoginResponseData,goForFingerTouch:boolean){
    this.navCtrl.push(TermsConditionUpdatePage,{
      data:"false",
      updateTerms:"updateTerms",
      user:userData,
      fingerTouch:goForFingerTouch
    }).then(() => {
      let index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }

}
