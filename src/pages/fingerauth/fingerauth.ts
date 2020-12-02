import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,ViewController, Toggle, LoadingController } from 'ionic-angular';
import { FingerprintAIO,FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { Storage } from '@ionic/storage';
import * as Constants from '../../utils/constants';
import { LoginResponseData } from '../../api/response/login_response_data';
import { DashboardPage } from '../dashboard/dashboard';
import * as strings from '../../utils/strings'
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the FingerAuthPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-fingerauth',
  templateUrl: 'fingerauth.html',
})
export class FingerAuthPage {

  fingerprintOptions:FingerprintOptions;
  fingerprintOptionsForRegister:FingerprintOptions;
  registerCallback:any;
  registerForTouch:boolean = false;
  registerToggleEvent:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private platform: Platform,
     private faio: FingerprintAIO,
     public session:Storage,
     private viewCtrl:ViewController,
     public alertProvider:AlertProvider,
     public loadingCtrl: LoadingController,
      public translate:TranslateService) {

        this.alertProvider.setCurrentPage(FingerAuthPage);

        // this.translate.get(myTitle).subscribe(
        //   value => {
        //     // value is our translated string
        //     myTitle = value;
        //   }
        // )
    
      this.fingerprintOptions = {
        clientId: 'HeadLetters',
        clientSecret: 'password', //Only necessary for Android
        disableBackup:false,  //Only for Android(optional)
        localizedFallbackTitle: 'Use Pin', //Only for iOS
        localizedReason: 'Please Authenticate' //Only for iOS

      }

      this.fingerprintOptionsForRegister = {
        clientId: 'HeadLetters',
        clientSecret: 'password', //Only necessary for Android
        disableBackup:true,  //Only for Android(optional)
        localizedFallbackTitle: 'Use Pin', //Only for iOS
        localizedReason: 'Please Authenticate' //Only for iOS

      }
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FingerauthPage');
    this.getNavParamData();
  }
  ionViewWillEnter(){
    //console.log('ionViewWillEnter FingerAuthPage');
    this.alertProvider.setCurrentPage(FingerAuthPage);
  }

  ionViewDidEnter(){
    //console.log('ionViewDidEnter FingerAuthPage');

  }

  ionViewWillLeave(){
    //console.log('ionViewWillLeave FingerAuthPage');

  }

  ionViewDidLeave(){
    //console.log('ionViewDidLeave FingerAuthPage');

  }

  ionViewWillUnload(){
    //console.log('ionViewWillUnload FingerAuthPage');

  }


  getNavParamData(){

    if(this.navParams.get("callback")){
      this.registerCallback = this.navParams.get("callback");
    }

    if(this.navParams.get("togglEvent")){
      this.registerToggleEvent = this.navParams.get("togglEvent");
    }

    if(this.navParams.get(Constants.REGISTER_FOR_TOUCH)){
      this.registerForTouch = true;
      this.checkFingerAioForRegister();
    }else{
      this.registerForTouch = false;
      this.checkFingerAIO();
    }

    
   
  }

  async checkFingerAIO(){
    let localLoader:any;
    try{
      // localLoader = this.loadingCtrl.create({
      //   content: strings.loader.loader_text,
      //   dismissOnPageChange:true
      //   //spinner:'ios'
      // });
      // localLoader.present();
  
      // setTimeout(() => {
      //   localLoader.dismiss();
      // }, 5000);

      await this.platform.ready();
      const available = await this.faio.isAvailable();
      //console.log("CHECK:"+available);
     // alert("CHECK:"+available);
      if(available === 'OK' || available === 'finger'){
          const result = await this.faio.show(this.fingerprintOptions);
          //localLoader.dismiss();
          //console.log("RESULT:" + result);
          //alert("RESULT"+JSON.stringify(result));
          if(result.withFingerprint || result === 'Success'){
            //alert("WITH_FINGER"+result.withFingerprint);
            this.goToDashboard();
          }else if(result.withPassword){
            //alert("WITH_PIN"+result.withPassword);
            this.goToDashboard();
          }else{
           // alert("AAA");
          }   
      }else{
        //localLoader.dismiss();
        this.goToDashboard();
      }
    }catch(e){
      if(localLoader){
        //localLoader.dismiss();
      }
      //console.error("ERROR:"+ e);
      //alert("ERROR:"+ e);
     // if(e === 'Cancelled'){
       if(this.platform.is('ios')){
        this.checkFingerAIO();
       }else{
        this.platform.exitApp();
       }
      //}
    }
  }

  async checkFingerAioForRegister(){
    try{
      await this.platform.ready();
      const available = await this.faio.isAvailable();
      //console.log("CHECK:"+available);
      if(available === 'OK' || available === 'finger'){
          const result = await this.faio.show(this.fingerprintOptionsForRegister);
          //console.log("RESULT:" + result);
         // alert("RESULT"+JSON.stringify(result));
          if(result.withFingerprint || result === 'Success'){
            //alert("WITH_FINGER"+result.withFingerprint);
            this.updateRegisterData(true);
          }else{
            //alert(strings.please_register_touch);
            this.alertProvider.basicAlertOnPage(FingerAuthPage,null,strings.please_register_touch,null);
            this.updateRegisterData(false);
          }   
      }else{
        //alert(strings.please_register_touch);
        this.alertProvider.basicAlertOnPage(FingerAuthPage,null,strings.please_register_touch,null);
        this.updateRegisterData(false);
      }
    }catch(e){
     // console.error("ERROR:"+ e);
      
      if(e === 'Cancelled'){
        this.updateRegisterData(false);
      }else{
        //alert("NOT3");
       // alert(strings.please_register_touch);
        this.alertProvider.basicAlertOnPage(FingerAuthPage,null,strings.please_register_touch,null);
        this.updateRegisterData(false);
      }
    }
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

  updateRegisterData(isChecked:boolean){
    if(this.registerCallback){
      
      this.registerCallback(true,isChecked,this.registerToggleEvent).then(()=>{
        this.navCtrl.pop();
      });
    }
  }
}
