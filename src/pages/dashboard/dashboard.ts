import { Component } from '@angular/core';
import { BasicPage } from '../basic/basic';
import { ActionSheetController } from 'ionic-angular';
import { LoginRequest } from '../../api/request/login_request';
import{SimpleProvider} from '../../providers/simple/simple';
import { AppVersion } from '@ionic-native/app-version';
import { Storage } from '@ionic/storage';
import { ViewController, IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import {LoadingController} from 'ionic-angular';
import { HoroscopeListResponse } from '../../api/response/horoscope_list_response';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from '../../components/popover/popover';
import { StatementResponse } from '../../api/response/statement_response';
import { StatementData } from '../../api/response/statement_data';
import { LoginResponseData } from '../../api/response/login_response_data';
import { UserProfilePage } from '../user-profile/user-profile';
import { HoroscopeServicesPage } from '../horoscope-services/horoscope-services';
import { FindPlacePage } from '../find-place/find-place';
import { PaymentPage } from '../payment/payment';
import { PredictionListPage } from '../prediction-list/prediction-list';
import { SocialLoginPage } from '../social-login/social-login';
import { MessagesPage } from '../messages/messages';
import { PredictionRequestListPage } from '../prediction-request-list/prediction-request-list';
import { TermsConditionPage } from '../terms-condition/terms-condition';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase/app';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { UtilityProvider } from '../../providers/utility/utility';
import { NetworkProvider } from '../../providers/network/network';
import { TermsConditionUpdatePage } from '../terms-condition-update/terms-condition-update';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { UpdateLocation } from '../../api/request/update_location';
import { MythsPage } from '../myths/myths';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class DashboardPage {
  loader:any;
  userData:LoginResponseData = new LoginResponseData();
  loginWith:string;
  mainAlert:any;
  alertForSettingsVisible:boolean=false;
  private lat:any;
  private lon:any;
  alertforpleasewait:boolean=false;
  updateLocation:UpdateLocation=new UpdateLocation();
  currentPlatform:string;
  versionNumber: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private api:ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private datePipe: DatePipe,
    private popOverController:PopoverController,
    public platform:Platform,
    public session:Storage,
    public googlePlus:GooglePlus,
    public viewCtrl:ViewController,
    public facebook:Facebook,
    public alertProvider:AlertProvider,
    public translate:TranslateService,
    public utility:UtilityProvider,
    public networkProvider:NetworkProvider,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    public appVersion: AppVersion
    
   ) {
      // this.translate.use('hi');
      this.platform.ready().then(() => {
        if(this.platform.is('cordova')){
            this.currentPlatform = "cordova";
            this.appVersion.getVersionNumber().then(version => {
              this.versionNumber = version;
            })
        }else{
          this.currentPlatform = "mobileweb";
        }
      });

      this.session.get(Constants.SELECTED_LANGUAGE).then(val=>{
        if(val){
          utility.setDefaultLanguage(val);
        }
      });


      this.session.get(Constants.LOGIN_WITH).then(val=>{
        if(val){
          this.loginWith = val;
        }
      });


      // this.session.get("GPLUS").then(val=>{
      //     this.googlePlus = val;
      // });

      // this.session.get("FACEBOOK").then(val=>{
      //     this.facebook = val;
      // });

      this.alertProvider.setCurrentPage(DashboardPage);
      
      api.reloadUserSessionToken();

      // this.getNavParamData();
      this.initiateLoder();

      this.getLoginWith();

      const lang = localStorage.getItem('Language');
        setTimeout(() => {
          if(lang == 'hindi'){
            this.utility.setHindiLanguage();
          }else if(lang == 'tamil'){
            this.utility.setTamilLanguage();
          }else{
            this.utility.setEnglishLanguage();
          }
        },100)
    
  }

  initiateLoder(){
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
  }


  chooseLanguage(language){
    if(language == 'tamil'){
      console.log('tamil selected');
      this.utility.setTamilLanguage();
    }else if(language == 'hindi'){
      console.log('hindi selected');
      this.utility.setHindiLanguage();
    }else{
      console.log('english selected');
      this.utility.setEnglishLanguage();
    }
  }

  getNavParamData(){
      if(this.navParams.get('data')){
        this.userData = this.navParams.get('data');
        //alert("USER1:" + JSON.stringify(this.userData));
        //alert("IMAGE:" + this.userData.getUserPhoto);
        this.api.updateTokenForAPI(this.userData);
       // this.callGetUserStatusApi();

      }else{
        this.session.get(Constants.USER_DATA).then(val=>{
            this.userData  = new LoginResponseData(JSON.stringify(val));
            //alert("USER2:" + JSON.stringify(this.userData));
            this.api.updateTokenForAPI(this.userData);
            //this.callGetUserStatusApi();
        });
      }
  }

  reloadUserData(){
    this.session.get(Constants.USER_DATA).then(val=>{
        this.userData  = new LoginResponseData(JSON.stringify(val));
        //alert("USER2:" + JSON.stringify(this.userData));
        this.api.updateTokenForAPI(this.userData);
        this.callGetUserStatusApi();
    });
  }

  findplace(){
    this.navCtrl.push(FindPlacePage);
  }

  go_to_another_page(){
  // console.log('on page clicked')
   this.navCtrl.push(BasicPage, {
    platform:Platform,
  	actionsheetCtrl:ActionSheetController
    });
  }

  goToProfile(){
    //alert("DATA:"+JSON.stringify(this.userData));
    this.navCtrl.push(UserProfilePage, {
        data:this.userData,
        callback: this.updateProfileCallback.bind(this)
    });
  }

  /**
   * callback function to get updated data of profile if user updated profile
   */
  updateProfileCallback = function(isChange,data) {
    return new Promise((resolve, reject) => {
      if(isChange){
        this.userData = data;
        resolve();
      }else{
        resolve();
      }
      //alert(this.test);
       
    });
  }


  goToHoroscopeServices(){
    this.navCtrl.push(HoroscopeServicesPage, {
      data:this.userData
    });
  }

  goToPayment(){
    this.navCtrl.push(PaymentPage, {
        data:this.userData
    });
  }

  goToPredictions(){
    this.navCtrl.push(PredictionRequestListPage, {
      
    });
  }

  goToMessages(){
    this.navCtrl.push(MessagesPage, {
      data:this.userData
    });
  }

  Myths(){
    console.log('myths and facts clicked');
    this.navCtrl.push(MythsPage);
  }

  goToTerms(){
    this.navCtrl.push(TermsConditionPage, {
      userId:this.userData.getUserId
    });
  }

  getLoginWith(){
    this.session.get(Constants.LOGIN_WITH).then(val=>{
      if(val){
        if(val === Constants.medium_gmail){
            this.loginWith = val;
        }
      }
    });
  }

  async logout2(){
    if(this.platform.is('cordova')){
      try{
        //await this.platform.ready();
        const val = await this.session.get(Constants.LOGIN_WITH)
       // console.log("LOGIN_WITH:"+val);
        alert("LOGIN_WITH:"+val);
        if(val === Constants.medium_gmail){
            //const g =  await this.session.get(Constants.SESSION_GOOGLE);
           // alert("GOOGLE:"+g);
            //this.googlePlus = JSON.parse(g);
            this.googlePlus.logout().then(res=>{
              alert("LOGOUT");
              this.logoutSession();
            });
            //alert("LOGOUT_RESULT:"+ result + "\n DATA:" + JSON.stringify(result));
        }
        // if(available === 'OK' || available === 'finger'){
        //     const result = await this.faio.show(this.fingerprintOptions);
        //     console.log("RESULT:" + result);
        //     alert("RESULT"+JSON.stringify(result));
        // }
      }catch(e){
        //console.error("ERROR:"+ e);
        alert("ERROR:"+ e);
      }
    }
  }

  async logout(){
    if(this.platform.is('cordova')){
       this.session.get(Constants.LOGIN_WITH).then(val=>{
      //   if(val){
      //    //let val = this.loginWith;
      //     if(val === Constants.medium_gmail){
      //       //google logout
      //       // this.googlePlus.logout().then(res=>{
      //       //   this.logoutSession();
      //       // });
      //       firebase.auth().signOut().then(function() {
      //         // Sign-out successful.
      //         alert("LOGOUT2");
      //         this.logoutSession();
      //       }).catch(function(error) {
      //         // An error happened.
      //         alert(error);
      //       });
      //     }else if(val === Constants.medium_yahoo){
      //      //yahoo logout
      //     }else if(val === Constants.medium_faebook){
      //       //facebook logout
      //       this.facebook.logout().then(res=>{
      //         this.logoutSession();
      //       });
      //     }
      //   }
       });
      this.logoutSession();
      // try{
      //   let log = await firebase.auth().signOut();
      //   alert("LOG:" + log);
      //   //this.logoutSession();
      // }catch(e){
      //   console.error(e);
      // }
    }
  }


  logoutSession = function() {
    return new Promise((resolve, reject) => {
      this.session.clear().then(() => {
        this.navCtrl.push(SocialLoginPage, {
        }).then(() => {
          let index = this.viewCtrl.index;
          this.navCtrl.remove(index);
          resolve();
        });
      });
       
    });
  }

  payment(){
    // let data = this.storage.getEmail();
    // alert(data);
    this.session.get(Constants.USER_DATA).then(val=>{
       // console.log("VALUE",JSON.stringify(val));
    });
  }

  async logoutFromGoogle(){
    //alert("LOGOUT");
    //this.logoutGoogleSession();
    const options = {
      webClientId: Constants.WEB_CLIENT_ID,
      offline: false
    };
    //this.googlePlus = await this.session.get("GPLUS");
    // this.session.get("GPLUS").then(val=>{
    //     this.googlePlus = val;
    // });
    this.googlePlus.trySilentLogin(options).then(res=>{
        //alert("1");
    }).catch(function(error) {
        // An error happened.
        //alert("ERROR:"+error.toString());
    });
    this.googlePlus.logout().then(res=>{
      //alert("2");
      // Sign-out successful.
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
    
      //this.logoutSessions();
    }).catch(function(error) {
      // An error happened.
      //alert("ERROR:"+error.toString());
    });
  }


  //not in use
  async logoutFromFacebook(){
    if(this.facebook){
      alert("YES");
    }else{
      alert("NO");
    }
    this.facebook.getLoginStatus().then(res => {
      alert("11");
      alert("STATUS: "+JSON.stringify(res));
      if(res.status === "connect") {
        alert("CONNECTED");
      } else {
        alert("DISCONNECTED");
      }
    }).catch(e => {
      alert("22");
      alert("ERROR"+e.toString());
    });

    this.facebook.logout().then(res=>{
      alert("FB_LOGOUT:" + JSON.stringify(res));
    }).catch(function(error) {
        // An error happened.
        alert("ERROR:"+error.toString());
    });
  }

  callLogoutApi(){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(DashboardPage,null,strings.no_internet_connection,null);
      return;
    }
    
    if(!this.userData || !this.userData.getUserId){
      return;
    }

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

      this.api.logout(this.userData.getUserId.toString().trim()).subscribe(response => {
       
        //alert(JSON.stringify(response));

        //let data = new LoginResponse(JSON.stringify(response));

        if(response && response.getErrorMessage && response.getErrorMessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(DashboardPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
       
        if(response && response.Status === 'Success'){
          //this.alertProvider.basicAlertOnPage(DashboardPage,null,JSON.stringify(response),null);
          localLoader.dismiss();
          if(this.loginWith && this.loginWith === Constants.medium_gmail && this.currentPlatform === "cordova"){
              this.logoutFromGoogle();
          }else{
            //this.logout();
            firebase.auth().signOut();
            this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
            this.utility.setDefaultLanguage(Constants.LANG_CODE_ENGLISH);
         }
          
        }else{
          localLoader.dismiss();
          if(response && response.Message){
            //this.presentToast(JSON.stringify(data.getMessage));
            this.alertProvider.basicAlertOnPage(DashboardPage,null,response.Message,null);
          }
        }
        
      },error => {
       localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(DashboardPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(DashboardPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(DashboardPage,null,error.toString(), null);
        }
      },() => {
       //localLoader.dismiss();
        // No errors, route to new page
      });
    }

    changeLang(){
      console.log('language change');
      return new Promise((resolve, reject) => {
        let popover = this.popOverController.create(LanguagePopover, {'greetingMessage': 'testing'}, {"cssClass": "language-popover" });
        popover.present({
        });
        popover.onDidDismiss(() => {
          resolve();
        })
      });
      // if(this.utility.getCurrentLanguage() === Constants.LANG_CODE_ENGLISH){
      //   this.utility.setTamilLanguage();
      // }else{
      //   this.utility.setEnglishLanguage();
      // }
      // this.session.set(Constants.SELECTED_LANGUAGE,'en');
      
    }


    //api to check user session is expire or not
    //also check user status for latest terms and conditions
    callGetUserStatusApi() {
      if(!this.networkProvider.isInternetConnected()){
        return;
      }

      if(!this.userData || !this.userData.getUserId){
        return;
      }

      this.api.getTermsConditionStatus(this.userData.getUserId.toString().trim()).subscribe(response => {
        // localLoader.dismiss();
  
        //alert("STATUS:"+JSON.stringify(this.userData));
       // alert(JSON.stringify(response));
       //console.log(JSON.stringify(response));
        if(response && response.ErrorMessage && response.ErrorMessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(DashboardPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }

        if(response && response.Status === 'Success'){
          if(response.UserCharge 
            && (response.UserCharge.toString().trim() === Constants.YES 
            || response.UserCharge.toString().trim() === Constants.NO)){
            this.userData.setUcharge = response.UserCharge.toString().trim();
            this.session.set(Constants.USER_DATA,this.userData);
          }


          // if (response.Data && response.Data.toString().trim() === Constants.NO) {
          //     this.userData.setTCFlag = Constants.NO;
          //     this.session.set(Constants.USER_DATA,this.userData);
          //      this.navCtrl.push(TermsConditionUpdatePage,{
          //       data:"false",
          //       updateTerms:"updateTerms",
          //       user:this.userData
          //     }).then(() => {
          //       let index = this.viewCtrl.index;
          //       this.navCtrl.remove(index);
          //     });
          // }else if (response.Data && response.Data.toString().trim() === Constants.YES) {
          //   this.userData.setTCFlag = Constants.YES;
          //   this.session.set(Constants.USER_DATA,this.userData);
          // } 
          
          if(response && response.TCCODE && response.TCCODE != null && response.TCCODE != ""){
              if(!this.userData.getTCCODE || (this.userData.getTCCODE.toString().trim() != response.TCCODE.toString().trim())){
             this.session.set(Constants.USER_DATA,this.userData);
             this.navCtrl.push(TermsConditionUpdatePage,{
              TCCODE:response.TCCODE,
              data:"false",
              updateTerms:"updateTerms",
              user:this.userData
            }).then(() => {
              let index = this.viewCtrl.index;
              this.navCtrl.remove(index);
            });  
              }
          }
        }
      }, error => {
      
        // if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        //   || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        //   this.alertProvider.basicAlertOnPage(DashboardPage,null, strings.please_check_internet_access, null);
        // }else{
        //   this.alertProvider.basicAlertOnPage(DashboardPage,null,error.toString(), null);
        // }
      }, () => {
        // localLoader.dismiss();
        // No errors, route to new page
      });
    }

    ionViewWillEnter(){
      this.alertProvider.setCurrentPage(DashboardPage);
    }

    checkLatLonAvailable(){
     // alert("in check gps");
      this.checkGPSEnabled();

      // this.session.get(Constants.LAT).then(val=>{
      //   if(val){
      //     this.lat=val;
      //   }
      // });
      // this.session.get(Constants.LON).then(val=>{
      //   if(val){
      //     this.lon=val;
      //   }
      // });
      // if(this.lat||this.lon||this.lat==null||this.lon==null){
      //   this.checkGPSEnabled();
      // }else{
      //   this.callUpdateLocationApi();
      // }
    }

    ionViewDidLoad(){
      this.getNavParamData();
     // this.getCoordinates();
      this.checkLatLonAvailable();
    }

    ionViewDidEnter(){
      //console.log('ionViewDidEnter DashboardPage');
      //this.getNavParamData();
      this.reloadUserData();
    }

    ionViewWillLeave(){
      //console.log('ionViewWillLeave DashboardPage');

    }

    ionViewDidLeave(){
      //console.log('ionViewDidLeave DashboardPage');
      // this.alertProvider.dismiss();
    }

    ionViewWillUnload(){
      //console.log('ionViewWillUnload DashboardPage');

    }

    checkGPSEnabled(){
    
      this.platform.ready().then(() => {
        if(!this.platform.is('cordova')){
            //this.isKeyboardOpen=true;
            return;
        }
        //this.getCoordinates();
        this.diagnostic.isLocationEnabled().then((isAvailable) => {
          //console.log('Is available? ' + isAvailable);
          //alert('Is available? ' + isAvailable);
          if(!isAvailable ){
              // alert("diagnostic is location enabled");
              // alert("SETTING");
              /**
               * alert for settings will be shown only once
               */
              //alert("1");
              if(!this.alertForSettingsVisible){
               // alert("in go to settings enabled")
                this.alertGoToSettings();
              }//else{
               // this.getCoordinates();
              //}          
          }else {
              //alert("LOC");
              this.getCoordinates();
              //alert("Please wait we are trying to fetching your location");
          }
          }).catch((e) => {
          //console.log(e);
          //alert("Error "+JSON.stringify(e));
          });
        });
     }

     getCoordinates(){
     // this.platform.ready().then(() => {
       this.geolocation.watchPosition({enableHighAccuracy:true});
        this.geolocation.getCurrentPosition({enableHighAccuracy:true}).then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude
          // alert("DATA");
          // console.log("DATA : " + resp.coords.accuracy + " " 
          // + resp.coords.altitude + " "
          // + resp.coords.altitudeAccuracy + " "
          // + resp.coords.heading + " "
          // + resp.coords.latitude + " "
          // + resp.coords.longitude + " "
          // + resp.coords.speed + " "
          // + resp.timestamp);
         
        //alert("Latitude is "+resp.coords.latitude+"   Longitude is "+resp.coords.longitude); 
         // alert(this.getDDtoDMS(resp.coords.latitude,resp.coords.longitude));
          if(resp.coords.latitude && resp.coords.longitude){
              this.lat = resp.coords.latitude.toString();
              this.lon = resp.coords.longitude.toString();
              // this.session.set(Constants.LAT,this.lat);
              // this.session.set(Constants.LON,this.lon);
              this.callUpdateLocationApi();
            //  alert("3");
              //alert("lat long is 1"+this.lat +"  "+this.lon);
          }else if (this.lat == null|| this.lon == null ){
            this.alertProvider.basicAlertOnPage(DashboardPage,null,strings.unable_to_fetch_location,null);         
            }
          
          //this.getCity(resp.coords.latitude,resp.coords.longitude);
          //this.getDDtoDMS(resp.coords.latitude,resp.coords.longitude);
          //this.callTimeZoneApi(resp.coords.latitude,resp.coords.longitude);
        }).catch((error) => {
        //  console.log('Error getting location', JSON.stringify(error));
          //alert("ERROR: ");
        });
      //}); 
    }
    async alertGoToSettings() {
      this.alertForSettingsVisible = true;
      let myTitle = strings.settings_title;
      let myMsg = strings.settings_message;
      let cancel = strings.cancel;
      let ok = strings.ok;
      //alert("go to settings ");
      this.translate.get(strings.settings_title).subscribe(
        value => {
          // value is our translated string
          myTitle = value;
        }
      )
  
      this.translate.get(strings.settings_message).subscribe(
        value => {
          // value is our translated string
          myMsg = value;
        }
      )
  
      this.translate.get(strings.cancel).subscribe(
        value => {
          // value is our translated string
          cancel = value;
        }
      )
  
      this.translate.get(strings.ok).subscribe(
        value => {
          // value is our translated string
          ok = value;
        }
      )
  
      this.mainAlert = this.alertCtrl.create({
        title: myTitle,
        message: myMsg,
        enableBackdropDismiss:false,
        buttons: [
          {
            text: cancel,
            //role: 'cancel',
            // handler: () => {
            //   console.log('Cancel clicked');
            // }
          },
          {
            text: ok,
            handler: () => {
              //console.log('Ok clicked');
              this.diagnostic.switchToSettings();
            }
          }
        ]
      });
      this.mainAlert.present();
    }
    callUpdateLocationApi(){
   //   alert("api cal");
      if(!this.networkProvider.isInternetConnected()){       
        return;
      }
      if(!this.userData || !this.userData.getUserId){
        //alert("userid null");
        return;
      }
      if(this.lat==null||this.lon==null){
      //  alert("lat lon null "+this.lat+" "+this.lon);
        return;
      }
      this.updateLocation.setUSERID=this.userData.getUserId;
      this.updateLocation.setLATITUDE=this.lat;
      this.updateLocation.setLONGITUDE=this.lon; 
      this.api.updateLocation(this.updateLocation).subscribe(response => {
        // localLoader.dismiss();
        // alert("STATUS:"+JSON.stringify(this.userData));
        // alert(JSON.stringify(response));
        if(response && response.ErrorMessage && response.ErrorMessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(DashboardPage,null, strings.session_expired, null);
          //this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }

        if(response && response.Status === 'Success'){
          //alert(response.Message);
        
        }
      }, error => {
      
        // if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        //   || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        //   this.alertProvider.basicAlertOnPage(DashboardPage,null, strings.please_check_internet_access, null);
        // }else{
        //   this.alertProvider.basicAlertOnPage(DashboardPage,null,error.toString(), null);
        // }
      }, () => {
        // localLoader.dismiss();
        // No errors, route to new page
      });

     
      // this.api.getTermsConditionStatus(this.userData.getUserId.toString().trim()).subscribe(response => {
      //   // localLoader.dismiss();
      //   // alert("STATUS:"+JSON.stringify(this.userData));
      //   // alert(JSON.stringify(response));
      //   if(response && response.ErrorMessage && response.ErrorMessage === Constants.UNAUTHORIZED){
      //     this.alertProvider.basicAlertOnPage(DashboardPage,null, strings.session_expired, null);
      //     this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
      //     return;
      //   }

    }
}





@Component({
  template: `
    <ion-list style="margin-bottom:7px !important;">
      <ion-list-header style="background:linear-gradient(to right, #f2b509, #f49b00, #f58000, #f46100, #f13b0c) !important;color:#ffffff;text-align:center;">
        <h3 style="font-size: 1.6rem;font-weight: 600;">{{'Choose Language' | translate}}</h3>       
      </ion-list-header>
      <button style="font-weight: 600;font-size: 16px;color: #F26F0B;" ion-item (click)="chooseLanguage('tamil')">தமிழ் <span style="color: gray;font-size: 1.2rem;">(Tamil)</span></button>   
      <button style="font-weight: 600;font-size: 15px;color: #F26F0B;" ion-item (click)="chooseLanguage('hindi')">हिन्दी <span style="color: gray;font-size: 1.2rem;">(Hindi)</span></button> 
      <button style="font-weight: 600;font-size: 15px;color: #F26F0B;" ion-item (click)="chooseLanguage('english')">English <span style="color: gray;font-size: 1.2rem;">(English)</span></button>    
    </ion-list>
  `
})
export class LanguagePopover {
  userInfo: any;
  username: any;
  constructor(public viewCtrl: ViewController, public utility:UtilityProvider,) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  chooseLanguage(language){
    if(language == 'tamil'){
      console.log('tamil selected');
      this.utility.setTamilLanguage();
      localStorage.setItem("Language", "tamil");
      this.viewCtrl.dismiss();
    }else if(language == 'hindi'){
      console.log('hindi selected');
      this.utility.setHindiLanguage();
      localStorage.setItem("Language", "hindi");
      this.viewCtrl.dismiss();
    }else{
      console.log('english selected');
      this.utility.setEnglishLanguage();
      localStorage.setItem("Language", "english");
      this.viewCtrl.dismiss();
    }
  }
  goto(page) {
    if (page === "orders") {
      this.viewCtrl.dismiss("orders");
    } else if (page === "logout") {
      this.viewCtrl.dismiss("logout");
    }
  }
}