import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController, AlertController, PopoverController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { MyLocation } from '../../models/location';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
import { MyCalendar } from '../../utils/calendar';
import { MyTime } from '../../utils/mytime';
import { CheckDuplicateResponse } from '../../api/response/check_duplicate_response';
import { AddDailyRequest } from '../../api/request/add_daily_request';
import { AddRequestResponse } from '../../api/response/add_request_response';
import { DashboardPage } from '../dashboard/dashboard';
import { PopoverComponent } from '../../components/popover/popover';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { ChargesPage } from '../charges/charges';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
import { Diagnostic } from '@ionic-native/diagnostic';

/**
 * Generated class for the WeeklyRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-weekly-request',
  templateUrl: 'weekly-request.html',
})
export class WeeklyRequestPage {

  loader:any;
  horoscopeData:HoroscopeResponseData = new HoroscopeResponseData();
  myLocation:MyLocation = new MyLocation();
  alertForSettingsVisible:boolean=false;
  myCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_OWNER_DOB);
  myTime:MyTime = new MyTime();
  currentDate:string;
  selectedDate:string;
  addDailyRequest:AddDailyRequest = new AddDailyRequest();
  city:string;
  displayStartDate:string;
  displayEndDate:string;
  timeStamp:string;
  displayTime:string;
  showCalendar:boolean=false;
  alertforpleasewait:boolean=false;
  uCharge:string = Constants.YES;
  uCurrency:string = Constants.INR;
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
    private nativeGeocoder:NativeGeocoder,
    public alertProvider:AlertProvider,
    public translate:TranslateService,
    public utility:UtilityProvider,
    public networkProvider:NetworkProvider,
    private diagnostic: Diagnostic) {
      this.setUpDatePipeForLanguage();

      this.alertProvider.setCurrentPage(WeeklyRequestPage);
      this.initiateLoder();
      this.setCalendarYears();
      this.currentDate = this.getCurrentDate(this.myCalendar) + this.getCurrentTime(this.myTime);
     // this.addDailyRequest.setRQENDDATE = this.currentDate;
      //this.addDailyRequest.setRQSDATE = this.currentDate;

      //set current timestamp value in request
      this.timeStamp = new Date().getTime().toString();
      this.addDailyRequest.setTIMESTAMP = this.timeStamp;
      this.setDisplayTime();

       /**
       * android hardware onback pressed handled
       */
      this.platform.ready().then(() => {
        if(!platform.is('cordova')){
            //this.isKeyboardOpen=true;
            return;
        }
       
        platform.registerBackButtonAction(() => {
          this.alertProvider.dismiss();
          if(this.showCalendar){
            this.showCalendar = false;
            return;
          }

          this.onBackPressed();
        });

      });
    }

    /**
   * update datepipe according to current selected language
   */
  setUpDatePipeForLanguage(){
    this.datePipe = new DatePipe(this.translate.currentLang);
  }

  initiateLoder(){
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad WeeklyRequestPage');
    // this.getNavParams();
    // this.getCoordinates();

    
    //console.log('ionViewDidLoad DailyRequestPage');
    this.getNavParams();
    
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

        //alert("in check gps enabled");
        // this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        //   if(canRequest) {
        //     // the accuracy option will be ignored by iOS
        //     this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        //       () => console.log('Request successful'),
        //       error => console.log('Error requesting location permissions', error)
        //     );
        //   }
        
        // });

      
        // this.diagnostic.isLocationEnabled().then((isAvailable) => {
        //   console.log('Is available? ' + isAvailable);
        //   alert('Is available? ' + isAvailable);
        //   if(!isAvailable && (!this.addDailyRequest.getLATITUDE || !this.addDailyRequest.getLONGITUDE
        //     ||!this.addDailyRequest.getLATITUDE === null || !this.addDailyRequest.getLONGITUDE === null)){
      
        //       //alert("diagnostic is location enabled");
        //       alert("SETTING");
        //       /**
        //        * alert for settings will be shown only once
        //        */
        //       if(!this.alertForSettingsVisible){
        //         alert("in go to settings enabled")
        //         this.alertGoToSettings();
        //       }
            
        //   }else if(!this.addDailyRequest.getLATITUDE || !this.addDailyRequest.getLONGITUDE
        //     ||!this.addDailyRequest.getLATITUDE === null || !this.addDailyRequest.getLONGITUDE === null){
        //       //alert("LOC");
        //       alert("in else of location enabled");
        //       this.getCoordinates();
        //   }
        //   }).catch((e) => {
        //   console.log(e);
        //   alert(JSON.stringify(e));
        //   });
          
        // });
       
        // this.diagnostic.isLocationAuthorized().then(authorised=>{
        //   if(!authorised){
        //     this.diagnostic.requestLocationAuthorization().then(status=>{
              
        //       switch(status){
        //       case this.diagnostic.permissionStatus.NOT_REQUESTED:
        //           console.log("Permission not requested");
        //           break;
        //       case this.diagnostic.permissionStatus.GRANTED:
        //           console.log("Permission granted");
        //           break;
        //       case this.diagnostic.permissionStatus.DENIED:
        //           console.log("Permission denied");
        //           break;
        //       case this.diagnostic.permissionStatus.DENIED_ALWAYS:
        //           console.log("Permission permanently denied");
        //           break;
        //   }}).catch(error=>{

        //     })
        //   }else if( ){

        //   }

        // }).catch(error=>{

        // })



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
          }else if(!this.addDailyRequest.getLATITUDE || !this.addDailyRequest.getLONGITUDE
            ||!this.addDailyRequest.getLATITUDE === null || !this.addDailyRequest.getLONGITUDE === null){
              //alert("LOC");
              this.getCoordinates();
              if(this.alertforpleasewait){
              this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.unable_to_fetch_location,null);
              }//alert("Please wait we are trying to fetching your location");
          }
          }).catch((e) => {
          //console.log(e);
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
              //console.log('Ok clicked');
              this.diagnostic.switchToSettings();
            }
          }
        ]
      });
      this.mainAlert.present();
    }





  getNavParams(){
    if(this.navParams.get('data')){
      this.horoscopeData = this.navParams.get('data');
      if(this.horoscopeData && this.horoscopeData.getHUserId && this.horoscopeData.getHId){
        this.addDailyRequest.setUSERID = this.horoscopeData.getHUserId.toString().trim();
        this.addDailyRequest.setHID = this.horoscopeData.getHId.toString().trim();
      }
    }

    if(this.navParams.get('charge')){
        this.uCharge = this.navParams.get('charge');
    }

    if(this.navParams.get('currency')){
        this.uCurrency = this.navParams.get('currency');
    }
    
  }

  setWebDisplayDateTime(dateTime:string){
      this.addDailyRequest.setCOMPLETEDATETIME = dateTime;
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
            //console.log("AMPM:"+ampm);
            this.displayTime = time + ' ' + ampm ;
            //console.log("TIME:"+this.displayTime);
          }
        )
  } 

  setCalendarYears(){
    const year = new Date().getFullYear().toString();
    const month = new Date().getMonth().toString();
    const date = new Date().getDate().toString();

    this.myCalendar.previousYears = Number(year);
    this.myCalendar.setCurrentMonth = Number(month);
    this.myCalendar.setCurrentDate = Number(date);
  }

  onBackPressed(){
    this.navCtrl.pop();
  }

  onHomePressed(){
    if(this.showCalendar){
      this.showCalendar = false;
      return;
    }
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  getCoordinates(){
  
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        //alert("Latitude is "+resp.coords.latitude+"   Longitude is "+resp.coords.longitude); 
        if(resp.coords.latitude && resp.coords.longitude){
            this.addDailyRequest.setLATITUDE = resp.coords.latitude.toString();
            this.addDailyRequest.setLONGITUDE = resp.coords.longitude.toString();
            
        }
        //this.getCity(resp.coords.latitude,resp.coords.longitude);
      }).catch((error) => {
        //console.log('Error getting location', error);
      });
    }); 
  }

    getCity(latitude,longitude){
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5};
  
     this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
    .then(
      (result: NativeGeocoderReverseResult[]) =>{
        this.myLocation = new MyLocation(JSON.stringify(result[0]));
        if(this.myLocation && this.myLocation.getCountryCode){
          this.city = this.myLocation.getSubAdministrativeArea;
          //alert("City " + this.myLocation.getSubAdministrativeArea);
          this.callDSTApi();
        }
        
      }).catch((error: any) => alert(error));
    
    }

    callDSTApi(){
      this.initiateLoder();
      this.loader.present();
      this.api.getDST(this.myLocation.getCountryCode.toString().trim()).subscribe(response => {
        this.loader.dismiss();

        if(response && response.Data){
            //alert("DST " + response.getDST);
            this.addDailyRequest.setDST = response.getDST.toString().trim();
            //this.callCheckDuplicateRequestApi();
        }else{
            alert(response.getMessage);
        }
        
      },error => {
        this.loader.dismiss();
        alert(strings.server_error);
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });

    }

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

    callCheckDuplicateRequestApi(){
      this.alertforpleasewait=true;
      if(!this.isValidate()){
        return;
      }

      if(!this.networkProvider.isInternetConnected()){
        //alert(strings.no_internet_connection);
        this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.no_internet_connection,null);
        return;
      }

      this.initiateLoder();
      this.loader.present();

      // alert("REQ:"+JSON.stringify(this.addDailyRequest));
      this.api.checkDuplicateRequest(this.addDailyRequest.getUSERID.toString().trim(),
      this.addDailyRequest.getHID.toString().trim(),
      this.addDailyRequest.getRQSDATE.toString().trim(),
      this.addDailyRequest.getRQENDDATE.toString().trim(), 
      Constants.REQ_CAT_WEEKLY).subscribe(response => {
        this.loader.dismiss();

        // alert("RES:"+JSON.stringify(response));
       //alert(response);
        //let d = JSON.stringify(response);
        let fObj: CheckDuplicateResponse = new CheckDuplicateResponse(JSON.stringify(response));
        if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
        
        if(fObj && fObj.getStatus === 'Success'){

          //check if request already exist or not
            if(fObj.getData && fObj.getData === Constants.NO){    
              //call daily request api
                //this.callAddWeeklyRequestApi();
                if(this.uCharge === Constants.YES){
                  this.callChargesApi();
                }else{
                  this.callAddWeeklyRequestApi();
                }
            }else{
              //show alert for request already exist
              //alert(fObj.getMessage);
              this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,fObj.getMessage,null);
            }
        }else{
        
          if(fObj && fObj.getMessage){
           // alert(JSON.stringify(fObj.getMessage));
           this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,JSON.stringify(fObj.getMessage),null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }

    callChargesApi(){
      if(!this.networkProvider.isInternetConnected()){
        //alert(strings.no_internet_connection);
        this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.no_internet_connection,null);
        return;
      }
      this.initiateLoder();
      this.loader.present();

      this.api.getCharges(Constants.REQ_CAT_WEEKLY,this.uCurrency).subscribe(response => {
        this.loader.dismiss();

        if(response && response.getErrorMessage && response.getErrorMessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }

        if(response && response.Status === 'Success'){
          if(response.Data && response.Data != null && response.Data != "null" && response.Data != ""){
            this.navCtrl.push(ChargesPage, {
              type: Constants.REQ_CAT_WEEKLY,
              url:response.Data.toString().trim(),
              request: this.addDailyRequest
            });
          }else if(response.Message){
            this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,response.Message,null);
          }else if(response.ErrorMessage){
            this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,response.ErrorMessage,null);
          }else{
            this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.no_message_found,null);
          }
        }else if(response.Message){
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,response.Message,null);
        }else{
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.no_message_found,null);
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }

    callAddWeeklyRequestApi(){

      if(!this.networkProvider.isInternetConnected()){
        //alert(strings.no_internet_connection);
        this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.no_internet_connection,null);
        return;
      }
      this.initiateLoder();
      this.loader.present();

      // alert("REQ:"+JSON.stringify(this.addDailyRequest));
      this.api.addWeeklyRequest(this.addDailyRequest).subscribe(response => {
        this.loader.dismiss();

      //  alert("RES:"+JSON.stringify(response));
        //let d = JSON.stringify(response);
        let fObj: AddRequestResponse = new AddRequestResponse(JSON.stringify(response));
        if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
        
        if(fObj && fObj.getStatus === 'Success'){

            if(fObj.getData ){  
              //call daily request api
              //alert(fObj.getMessage);  
              if(fObj.getMessage){
                this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,fObj.getMessage,null);
              }
              
              this.onBackPressed();
            }else{
              //show alert for request already exist
              //alert(fObj.getMessage);
              this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,fObj.getMessage,null);
            }
        }else{
        
          if(fObj && fObj.getMessage){
            //alert(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,JSON.stringify(fObj.getMessage),null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }


    isValidate():boolean{
      if(!this.addDailyRequest.getLATITUDE ||
        !this.addDailyRequest.getLONGITUDE){
         this.checkGPSEnabled();
         // this.getCoordinates();
          //alert(strings.please_check_location);
          //this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.please_enable_location_services_in_phone_for_this_request,null);
          return false;
        // }else if(!this.addDailyRequest.getDST){
        //   alert('DST not found');
        //   return false;
        }else if(!this.addDailyRequest.getRQSDATE){
          //alert(strings.please_select_date);
          this.alertProvider.basicAlertOnPage(WeeklyRequestPage,null,strings.please_select_date,null);
          return false;
        } 
      
        return true;
      }

      /**
     * to get selected date from calendar
     * @param $event 
     */
    onChange($event) {
      //this.showCalendar = false;
      //let date = new Date($event).getTime();
      let date = new Date($event);
      let selectedDate = this.datePipe.transform(date, 'ddMMyyhhmmss').toString();
      this.addDailyRequest.setRQSDATE = selectedDate;
      this.displayStartDate = this.datePipe.transform(date, 'MMMM dd, yyyy').toString();

      let endDate = new Date(date.getTime() + 24*60*60*1000*6);
      let endSelectedDate = this.datePipe.transform(endDate, 'ddMMyyhhmmss').toString();
      this.addDailyRequest.setRQENDDATE = endSelectedDate;
      this.displayEndDate = this.datePipe.transform(endDate, 'MMMM dd, yyyy').toString();
      //console.log("SELECTED DATE:"+selectedDate + " " + this.displayStartDate );
      
      this.showCalendar = false;
      //console.log("SHOW_CAL:" + this.showCalendar);

      //console.log("START:" + selectedDate + " END:" + endSelectedDate);
    }

      selectDate(){

        // let items=[
        //   {item:strings.gender_male},
        //   {item:strings.gender_female}
        //   //{item:strings.gender_transsexual}
        // ]
    

        this.showCalendar = true;

        // let popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_CALENDAR});
        // popover.present({
        //   //ev:myEvent
        // });
    
        // popover.onDidDismiss(popOverData=>{
        //   if(!popOverData){
        //     return;
        //   }
        //   let date = new Date(popOverData);
        //   let selectedDate = this.datePipe.transform(date, 'ddMMyyhhmmss').toString();
        //   this.addDailyRequest.setRQSDATE = selectedDate;
        //   this.displayStartDate = this.datePipe.transform(date, 'MMMM dd, yyyy').toString();

        //   let endDate = new Date(date.getTime() + 24*60*60*1000*6);
        //   let endSelectedDate = this.datePipe.transform(endDate, 'ddMMyyhhmmss').toString();
        //   this.addDailyRequest.setRQENDDATE = endSelectedDate;
        //   this.displayEndDate = this.datePipe.transform(endDate, 'MMMM dd, yyyy').toString();
         
        //   console.log("SELECTED DATE:"+selectedDate + " " + this.displayStartDate );
        //   console.log("END DATE:"+endSelectedDate);
        // });
      
      }

      ionViewWillEnter(){
        this.alertProvider.setCurrentPage(WeeklyRequestPage);
      }
}
