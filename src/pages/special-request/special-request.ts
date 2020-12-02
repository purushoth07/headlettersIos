import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController, AlertController, PopoverController, Platform } from 'ionic-angular';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
import { AddRequestResponse } from '../../api/response/add_request_response';
import { AddSpecialRequest } from '../../api/request/add_special_request';
import { DashboardPage } from '../dashboard/dashboard';
import { Geolocation } from '@ionic-native/geolocation';
import { MyCalendar } from '../../utils/calendar';
import { MyTime } from '../../utils/mytime';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { ChargesPage } from '../charges/charges';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
import { CheckDuplicateResponse } from '../../api/response/check_duplicate_response';
import { Diagnostic } from '@ionic-native/diagnostic';
/**
 * Generated class for the SpecialRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-special-request',
  templateUrl: 'special-request.html',
})
export class SpecialRequestPage {

  loader:any;
  horoscopeData:HoroscopeResponseData = new HoroscopeResponseData();

  addSpecialRequest:AddSpecialRequest = new AddSpecialRequest();
  myCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_OWNER_DOB);
  myTime:MyTime = new MyTime();
  currentDate:string;
  timeStamp:string;
  displayTime:string;
  uCharge:string = Constants.YES;
  uCurrency:string = Constants.INR;
  alertForSettingsVisible:boolean=false;
  alertforpleasewait:boolean=false;
  mainAlert:any;

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
    private geolocation: Geolocation,
    public alertProvider:AlertProvider,
    public translate:TranslateService,
    public utility:UtilityProvider,
    public networkProvider:NetworkProvider,
    private diagnostic: Diagnostic) {

      this.alertProvider.setCurrentPage(SpecialRequestPage);

      this.initiateLoder();
      this.getNavParams();
      this.setCalendarYears();
      this.currentDate = this.getCurrentDate(this.myCalendar) + this.getCurrentTime(this.myTime);
      this.addSpecialRequest.setReqDate = this.currentDate;
      // this.addSpecialRequest.setRQEDDATE = this.currentDate;

      this.timeStamp = new Date().getTime().toString();
      this.addSpecialRequest.setTIMESTAMP = this.timeStamp;
      this.setDisplayTime();
      //this.displayTime = this.datePipe.transform(new Date(), 'hh:mm:ss a').toString();
      this.getCoordinates();
    }

  initiateLoder(){
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad DailyRequestPage');
     
     //console.log('ionViewDidLoad DailyRequestPage');
    //  this.getNavParams();
     
     this.getCoordinates();
     // this.diagnosticInterval = setInterval(data=>{
     //   //the code
       this.checkGPSEnabled();
    
  }
  /**
     * checking if gps is enabled or not
     */
    checkGPSEnabled(){
      this.platform.ready().then(() => {
        if(!this.platform.is('cordova')){
            //this.isKeyboardOpen=true;
            return;
        }
        this.getCoordinates();

    //     //alert("in check gps enabled");
    //     // this.locationAccuracy.canRequest().then((canRequest: boolean) => {
    //     //   if(canRequest) {
    //     //     // the accuracy option will be ignored by iOS
    //     //     this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    //     //       () => console.log('Request successful'),
    //     //       error => console.log('Error requesting location permissions', error)
    //     //     );
    //     //   }
        
    //     // });

      
    //     // this.diagnostic.isLocationEnabled().then((isAvailable) => {
    //     //   console.log('Is available? ' + isAvailable);
    //     //   alert('Is available? ' + isAvailable);
    //     //   if(!isAvailable && (!this.addDailyRequest.getLATITUDE || !this.addDailyRequest.getLONGITUDE
    //     //     ||!this.addDailyRequest.getLATITUDE === null || !this.addDailyRequest.getLONGITUDE === null)){
      
    //     //       //alert("diagnostic is location enabled");
    //     //       alert("SETTING");
    //     //       /**
    //     //        * alert for settings will be shown only once
    //     //        */
    //     //       if(!this.alertForSettingsVisible){
    //     //         alert("in go to settings enabled")
    //     //         this.alertGoToSettings();
    //     //       }
            
    //     //   }else if(!this.addDailyRequest.getLATITUDE || !this.addDailyRequest.getLONGITUDE
    //     //     ||!this.addDailyRequest.getLATITUDE === null || !this.addDailyRequest.getLONGITUDE === null){
    //     //       //alert("LOC");
    //     //       alert("in else of location enabled");
    //     //       this.getCoordinates();
    //     //   }
    //     //   }).catch((e) => {
    //     //   console.log(e);
    //     //   alert(JSON.stringify(e));
    //     //   });
          
    //     // });
       
    //     // this.diagnostic.isLocationAuthorized().then(authorised=>{
    //     //   if(!authorised){
    //     //     this.diagnostic.requestLocationAuthorization().then(status=>{
              
    //     //       switch(status){
    //     //       case this.diagnostic.permissionStatus.NOT_REQUESTED:
    //     //           console.log("Permission not requested");
    //     //           break;
    //     //       case this.diagnostic.permissionStatus.GRANTED:
    //     //           console.log("Permission granted");
    //     //           break;
    //     //       case this.diagnostic.permissionStatus.DENIED:
    //     //           console.log("Permission denied");
    //     //           break;
    //     //       case this.diagnostic.permissionStatus.DENIED_ALWAYS:
    //     //           console.log("Permission permanently denied");
    //     //           break;
    //     //   }}).catch(error=>{

    //     //     })
    //     //   }else if( ){

    //     //   }

    //     // }).catch(error=>{

    //     // })



        this.diagnostic.isLocationEnabled().then((isAvailable) => {
          //console.log('Is available? ' + isAvailable);
         // alert('Is available? ' + isAvailable);
          if(!isAvailable ){
              //alert("diagnostic is location enabled");
            //  alert("SETTING");
              /**
               * alert for settings will be shown only once
               */
              if(!this.alertForSettingsVisible){
               // alert("in go to settings enabled")
                this.alertGoToSettings();
              }
              this.getCoordinates();
          }else if(!this.addSpecialRequest.getLATITUDE || !this.addSpecialRequest.getLONGITUDE
            ||!this.addSpecialRequest.getLATITUDE === null || !this.addSpecialRequest.getLONGITUDE === null){
              //alert("LOC");
              this.getCoordinates();
              if(this.alertforpleasewait){
              this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.unable_to_fetch_location,null);
              }//alert("Please wait we are trying to fetching your location");
          }
          }).catch((e) => {
         // console.log(e);
          alert("Error "+JSON.stringify(e));
          });
        });

     }

     async alertGoToSettings() {
      //this.alertForSettingsVisible = true;
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
         //     console.log('Ok clicked');
              this.diagnostic.switchToSettings();
            }
          }
        ]
      });
      this.mainAlert.present();
    }

  setCalendarYears(){
    const year = new Date().getFullYear().toString();
    const month = new Date().getMonth().toString();
    const date = new Date().getDate().toString();

    this.myCalendar.previousYears = Number(year);
    this.myCalendar.setCurrentMonth = Number(month);
    this.myCalendar.setCurrentDate = Number(date);
  }

  setWebDisplayDateTime(dateTime:string){
      this.addSpecialRequest.setCOMPLETEDATETIME = dateTime;
  }

  setDisplayTime(){
    let currentDate = new Date();
      let date = this.datePipe.transform(currentDate, 'dd/MM/yyyy').toString();
      let millis = currentDate.getMilliseconds().toString();
      let time = this.datePipe.transform(currentDate, 'hh:mm:ss').toString();
      let h =  this.datePipe.transform(currentDate, 'HH');
      let ampm:string;
        if(Number(h)>12){
          ampm = 'PM';
        }else{
          ampm = 'AM';
        }
  
         this.setWebDisplayDateTime(date + " " + time + ":"+millis + " " + ampm);

      this.translate.get(ampm).subscribe(
          value => {
            // value is our translated string
            ampm = value;
           // console.log("AMPM:"+ampm);
            this.displayTime = time + ' ' + ampm ;
           // console.log("TIME:"+this.displayTime);
          }
      )
  }

  getNavParams(){
    if(this.navParams.get('data')){
      this.horoscopeData = this.navParams.get('data');
      if(this.horoscopeData && this.horoscopeData.getHUserId && this.horoscopeData.getHId){
        this.addSpecialRequest.setHUSERID = this.horoscopeData.getHUserId.toString().trim();
        this.addSpecialRequest.setHID = this.horoscopeData.getHId.toString().trim();
      }
    }

    if(this.navParams.get('charge')){
      this.uCharge = this.navParams.get('charge');
    }

    if(this.navParams.get('currency')){
        this.uCurrency = this.navParams.get('currency');
    }
    
  }

  onBackPressed(){
    this.navCtrl.pop();
  }

  onHomePressed(){
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  onClickSave(){
    //this.callAddSpecialRequestApi();
    this.alertforpleasewait=true;
    if(!this.isValidate()){
      return;
    }  
    if(this.uCharge === Constants.YES){
      this.callChargesApi();
    }else{
      this.callAddSpecialRequestApi();
    }
  }

  //not useable for special
  callCheckDuplicateRequestApi(){
   // console.log("REQ:"+JSON.stringify(this.addSpecialRequest));
    if(!this.isValidate()){
      return;
    }

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.no_internet_connection,null);
      return;
    }

    this.initiateLoder();
    this.loader.present();

    this.api.checkDuplicateRequest(this.addSpecialRequest.getHUSERID.toString().trim(),
    this.addSpecialRequest.getHID.toString().trim(),
    this.addSpecialRequest.getReqDate.toString().trim(),
    this.addSpecialRequest.getReqDate, 
    Constants.REQ_CAT_SPECIAL).subscribe(response => {
     
      this.loader.dismiss();

     //alert(response);
      //let d = JSON.stringify(response);
      let fObj: CheckDuplicateResponse = new CheckDuplicateResponse(JSON.stringify(response));
      if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(SpecialRequestPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }
      
      if(fObj && fObj.getStatus === 'Success'){

        //check if request already exist or not
          if(fObj.getData && fObj.getData === Constants.NO){    
            //call daily request api
              //this.callAddDailyRequestApi();
              if(this.uCharge === Constants.YES){
                this.callChargesApi();
              }else{
                this.callAddSpecialRequestApi();
              }
          }else{
            //show alert for request already exist
            //alert(fObj.getMessage);
            this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,fObj.getMessage,null);
          }
      }else{
      
        if(fObj && fObj.getMessage){
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,JSON.stringify(fObj.getMessage),null);
          //this.presentToast(JSON.stringify(fObj.getMessage));
        }
      }
      
    },error => {
      this.loader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.server_error,null);
      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(SpecialRequestPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,error.toString(), null);
      }
    },() => {
      this.loader.dismiss();
      // No errors, route to new page
    });
  }

  callChargesApi(){
    // if(!this.isValidate()){
    //     return;
    // }

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.no_internet_connection,null);
      return;
    }

    this.initiateLoder();
    this.loader.present();

    this.api.getCharges(Constants.REQ_CAT_SPECIAL,this.uCurrency).subscribe(response => {
      this.loader.dismiss();

      if(response && response.getErrorMessage && response.getErrorMessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(SpecialRequestPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if(response && response.Status === 'Success'){
        if(response.Data && response.Data != null && response.Data != "null" && response.Data != ""){
          this.navCtrl.push(ChargesPage, {
            type: Constants.REQ_CAT_SPECIAL,
            url:response.Data.toString().trim(),
            request: this.addSpecialRequest
          });
        }else if(response.Message){
          this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,response.Message,null);
        }else if(response.ErrorMessage){
          this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,response.ErrorMessage,null);
        }else{
          this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.no_message_found,null);
        }
      }else if(response.Message){
        this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,response.Message,null);
      }else{
        this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.no_message_found,null);
      }
      
    },error => {
      this.loader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(SpecialRequestPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,error.toString(), null);
        }
    },() => {
      //this.loader.dismiss();
      // No errors, route to new page
    });
  }

  callAddSpecialRequestApi(){

    if(!this.isValidate()){
        return;
    }

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.no_internet_connection,null);
      return;
    }

    //alert(JSON.stringify(this.addSpecialRequest));
    this.initiateLoder();
    this.loader.present();

    this.api.addSpecialRequest(this.addSpecialRequest).subscribe(response => {
      this.loader.dismiss();

     //alert(JSON.stringify(response));
      //let d = JSON.stringify(response);
      let fObj: AddRequestResponse = new AddRequestResponse(JSON.stringify(response));
      if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(SpecialRequestPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      //alert("RES:" + JSON.stringify(fObj));
      
      if(fObj && fObj.getStatus === 'Success'){

          if(fObj.getData ){  
            //call daily request api
            //alert(fObj.getMessage);  
            if(fObj && fObj.getMessage){
              //alert(JSON.stringify(fObj.getMessage));
              this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,fObj.getMessage,null);
              //this.presentToast(JSON.stringify(fObj.getMessage));
            }
            this.onBackPressed();
          }else{
            //show alert for request already exist
            //alert(fObj.getMessage);
            if(fObj && fObj.getMessage){
              //alert(JSON.stringify(fObj.getMessage));
              this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,fObj.getMessage,null);
              //this.presentToast(JSON.stringify(fObj.getMessage));
            }
          }
      }else{
      
        if(fObj && fObj.getMessage){
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,fObj.getMessage,null);
          //this.presentToast(JSON.stringify(fObj.getMessage));
        }
      }
      
    },error => {
      this.loader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(SpecialRequestPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,error.toString(), null);
        }
    },() => {
      //this.loader.dismiss();
      // No errors, route to new page
    });
  }


  isValidate():boolean{
    if(!this.addSpecialRequest.getLATITUDE ||
      !this.addSpecialRequest.getLONGITUDE){
       this.checkGPSEnabled();
       // this.getCoordinates();
        //alert(strings.please_check_location);
        //this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.please_enable_location_services_in_phone_for_this_request,null);
        return false;
      // }else if(!this.addDailyRequest.getDST){
      //   alert('DST not found');
      //   return false;
      }
      return true;
    }
  // isValidate():boolean{
  //   let valid = true;
  //   if(!this.addSpecialRequest 
  //     || !this.addSpecialRequest.getHUSERID 
  //     || !this.addSpecialRequest.getHID){
  //       //alert('Please Check Data');
  //       this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.please_check_data,null);
  //       valid = false;
  //     }else if(!this.addSpecialRequest.getLATITUDE ||
  //       !this.addSpecialRequest.getLONGITUDE){
  //         this.getLocation();
  //       this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.please_enable_location_services_in_phone_for_this_request,null);
  //       valid = false;
  //     }else if(!this.addSpecialRequest.getRQSPECIALDETAILS || this.addSpecialRequest.getRQSPECIALDETAILS.toString().trim().length === 0){
  //       this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.please_add_request,null);
  //       valid = false;
  //     }else if(this.addSpecialRequest.getRQSPECIALDETAILS 
  //       && (this.addSpecialRequest.getRQSPECIALDETAILS.includes("^") || this.addSpecialRequest.getRQSPECIALDETAILS.includes("!"))){
  //         this.alertProvider.basicAlertOnPage(SpecialRequestPage,null,strings.please_do_not_enter_special_characters,null);
  //         valid = false;
  //     }
    
  //     return valid;
  //   }

    getCoordinates(){
  
      this.platform.ready().then(() => {
          this.getLocation();
      }); 

      // this.platform.resume.subscribe ((e) => {
      //   console.trace("resume called"); 
      //   this.checkLocation();
      // });
    }

    getLocation(){
      this.geolocation.getCurrentPosition({enableHighAccuracy:true}).then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
      
       /* console.log("DATA : " + resp.coords.accuracy + " " 
        + resp.coords.altitude + " "
        + resp.coords.altitudeAccuracy + " "
        + resp.coords.heading + " "
        + resp.coords.latitude + " "
        + resp.coords.longitude + " "
        + resp.coords.speed + " "
        + resp.timestamp);*/
       
        //alert("Latitude is "+resp.coords.latitude+"   Longitude is "+resp.coords.longitude); 
       // alert(this.getDDtoDMS(resp.coords.latitude,resp.coords.longitude));
        if(resp.coords.latitude && resp.coords.longitude){
            this.addSpecialRequest.setLATITUDE = resp.coords.latitude.toString();
            this.addSpecialRequest.setLONGITUDE = resp.coords.longitude.toString();
        }
       
      }).catch((error) => {
       // console.log('Error getting location', error);
      });
    }

    // async checkLocation(){
    //   try{
    //     this.getLocation();
    //   }catch(e){
    //     console.error("ERROR:"+ e);
    //   }
    // }

    getCurrentDate(calendar:MyCalendar):string{
      if(calendar){
        let date,month,year;
          if(calendar.getCurrentDate){
              if(calendar.getCurrentDate.toString().length == 1){
                date = "0" + calendar.getCurrentDate;
              }else{
                date = calendar.getCurrentDate;
              }
              
          }else{
            date =  "00";
          }
  
          if(calendar.getCurrentMonth){
            if(calendar.getCurrentMonth.toString().length == 1){
              month =  "0" + calendar.getCurrentMonth;
            }else{
              month = calendar.getCurrentMonth;
            }
          }else{
            month =  "00";
          }
  
          if(calendar.getCurrentYearShort){
            year = calendar.getCurrentYearShort;
          }else{
            year =  "00";
          }
          return date + month + year;
      }else{
        return "000000";
      }
    }
  
    getCurrentTime(myTime:MyTime):string{
      if(myTime){
          let hour,min,sec;
          if(myTime.getCurrentHour){
            if(myTime.getCurrentHour.toString().length == 1){
              hour = "0" + myTime.getCurrentHour;
            }else{
              hour = myTime.getCurrentHour;
            }
          }else{
            hour = "00";
          }
  
          if(myTime.getCurrentMin){
            if(myTime.getCurrentMin.toString().length == 1){
              min = "0" + myTime.getCurrentMin;
            }else{
              min = myTime.getCurrentMin;
            }
          }else{
            min = "00";
          }
  
          if(myTime.getCurrentSec){
            if(myTime.getCurrentSec.toString().length == 1){
              sec = "0" + myTime.getCurrentSec;
            }else{
              sec = myTime.getCurrentSec;
            }
          }else{
            sec = "00";
          }
        return hour + min + sec;
      }else{
        return "000000";
      }
    }

    ionViewWillEnter(){
      this.alertProvider.setCurrentPage(SpecialRequestPage);
    }

}
