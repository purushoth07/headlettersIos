import { Component,OnInit, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController, AlertController, PopoverController, Platform, PopoverOptions, ModalController, ViewController } from 'ionic-angular';
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
import { TimeZone } from '../../api/response/time_zone_data';
import { PopoverComponent } from '../../components/popover/popover';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { CalendarModalOptions, CalendarModal, CalendarComponentOptions, CalendarResult } from 'ion2-calendar';
import { ChargesPage } from '../charges/charges';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TimeInterval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operator/timeInterval';
//import { LocationAccuracy } from '@ionic-native/location-accuracy';


//import 'jquery-ui-multidatespicker/jquery-ui.multidatespicker.js';
//import  'jquery-ui-multidatespicker';

/**
 * Generated class for the DailyRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-request',
  templateUrl: 'daily-request.html',
})

export class DailyRequestPage implements OnInit {

  loader:any;
  horoscopeData:HoroscopeResponseData = new HoroscopeResponseData();
  myLocation:MyLocation = new MyLocation();

  myCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_OWNER_DOB);
  myTime:MyTime = new MyTime();
  currentDate:string;
  selectedDate:string;
  addDailyRequest:AddDailyRequest = new AddDailyRequest();
  city:string;
  displayStartDate:string;
  timeStamp:string;
  displayTime:string;
  isRepeatChecked:boolean = false;
  showCalendar:boolean = false;
  horoscopeListCallback: any;
  horoscopeListCallbackForUpdate: any;
  mainPopOver:any;
  uCharge:string = Constants.YES;
  uCurrency:string = Constants.INR;
  diagnosticInterval:any;
  alertforpleasewait:boolean=false;
  alertForSettingsVisible:boolean=false;
  mainAlert:any;
  private onResumeSubscription: Subscription;



  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
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
    private nativeGeocoder:NativeGeocoder,private el: ElementRef,
    public alertProvider:AlertProvider,
    public translate:TranslateService,
    public modalCtrl: ModalController,
    public utility:UtilityProvider,
    public networkProvider:NetworkProvider,
    private diagnostic: Diagnostic) {
      
      this.setUpDatePipeForLanguage();
      this.alertProvider.setCurrentPage(DailyRequestPage);
      this.initiateLoder();
      this.setCalendarYears();
      
      this.currentDate = this.getCurrentDate(this.myCalendar) + this.getCurrentTime(this.myTime);
     // this.addDailyRequest.setRQENDDATE = this.currentDate;
     // this.addDailyRequest.setRQSDATE = this.currentDate;
     
    //  this.platform.resume.subscribe(e => {
    //    alert("in resume");
    //   this.checkGPSEnabled();
    //   });

      this.timeStamp = new Date().getTime().toString();

      //set timestamp value in request
      this.addDailyRequest.setTIMESTAMP = this.timeStamp;

      this.setDisplayTime();

      //popoverOptions.cssClass = "custom-calander";

      /**
       * android hardware onback pressed handled
       */
      //this.setHardwareBackButton();

     
    }


    ngOnInit() {
        
    }

    setHardwareBackButton(){
      this.platform.ready().then(() => {
  
        if (!this.platform.is('cordova')) {
          //this.isKeyboardOpen=true;
          return;
        }
  
        this.platform.registerBackButtonAction(() => {
          this.alertProvider.dismiss();
          if(this.showCalendar){
            this.showCalendar = false;
            return;
          }

          if(this.mainAlert){
              this.mainAlert.dismiss();
          }
          this.onBackPressed();
        });
  
      });
    }

    // checkGps(){
     
    //  this.diagnostic.isGpsLocationEnabled().then().catch(err=>{

    //  })
    // }

    /**
     * checking if gps is enabled or not
     */
    checkGPSEnabled(){
      this.platform.ready().then(() => {
        if(!this.platform.is('cordova')){
            //this.isKeyboardOpen=true;
            return;
        }

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
        //   }else{

        //   }

        // }).catch(error=>{

        // })


        this.getCoordinates();

        // this.diagnostic.isLocationAuthorized().then((isAuthorized) => {
        //   alert("AUTHORIZED:" + isAuthorized);

        // });

        // this.diagnostic.isLocationAvailable().then((isAvailable) => {
        //   alert("AVAILABLE:" + isAvailable);

        // });

        // this.diagnostic.requestLocationAuthorization().then((isAvailable) => {
        //   alert("REQ:" + isAvailable);

        // });


        this.diagnostic.isLocationEnabled().then((isAvailable) => {
          //console.log('Is available? ' + isAvailable);
          //alert('Is available? ' + isAvailable);
          if(!isAvailable ){
              //alert("diagnostic is location enabled");
            //  alert("SETTING");
              /**
               * alert for settings will be shown only once
               */
              if(!this.alertForSettingsVisible){
               // alert("in go to settings enabled")
                this.alertGoToSettings();
              }//else{
                this.getCoordinates();
              //}
              
          }else if(!this.addDailyRequest.getLATITUDE || !this.addDailyRequest.getLONGITUDE
            ||this.addDailyRequest.getLATITUDE === null || this.addDailyRequest.getLONGITUDE === null){
              //alert("LOC");
              this.getCoordinates();
              if(this.alertforpleasewait){
                this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.unable_to_fetch_location,null);
              }//alert("Please wait we are trying to fetching your location");
          }
          }).catch((e) => {
          //console.log(e);
          //alert("Error "+JSON.stringify(e));
          });
        });

     }

    stopTimer(){
      clearInterval(this.diagnosticInterval);
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
    //alert("ionViewLoad");
    //console.log('ionViewDidLoad DailyRequestPage');
    this.getNavParams();
    
    this.getCoordinates();
    // this.diagnosticInterval = setInterval(data=>{
    //   //the code
      this.checkGPSEnabled();
    // },2000);
  }

  ionViewDidEnter(){
    //alert("ionViewDidiEnter");
    //console.log('ionViewDidEnter MessagesPage');
    //this.diagnosticInterval = setInterval(data=>{
      //the code
      //this.checkGPSEnabled();
    //},2000);
    // this.getNavParamData();
    this.setHardwareBackButton();
  }

  // myclick(){

  //   // this.diagnosticInterval = setInterval(data=>{
  //   //   //the code
  //     this.checkGPSEnabled();
  //   // },2000);    
  // }

  getNavParams(){
    if(this.navParams.get('data')){
      this.horoscopeData = this.navParams.get('data');
      if(this.horoscopeData && this.horoscopeData.getHUserId && this.horoscopeData.getHId){
        this.addDailyRequest.setUSERID = this.horoscopeData.getHUserId.toString().trim();
        this.addDailyRequest.setHID = this.horoscopeData.getHId.toString().trim();
      }
    }

    if (this.navParams.get("callback")) {
      this.horoscopeListCallback = this.navParams.get("callback");
      this.horoscopeListCallbackForUpdate = this.navParams.get("callback");
    }

    if(this.navParams.get('charge')){
      this.uCharge = this.navParams.get('charge');
    }

    if(this.navParams.get('currency')){
        this.uCurrency = this.navParams.get('currency');
    }
    
  }

  setWebDisplayDateTime(dateTime:string){
    console.log("DATEEEEE:",dateTime);
      this.addDailyRequest.setCOMPLETEDATETIME = dateTime;
      // this.timer.unsubscribe();
  }

  // timer:any;
  setDisplayTime(){
    // this.timer = setInterval( () => { 
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
  // }, 1000);
   
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
    if(this.showCalendar){
      this.showCalendar = false;
      return;
    }

    if(this.horoscopeListCallbackForUpdate){
      this.horoscopeListCallbackForUpdate(false).then(() => {
        this.navCtrl.pop();
      });
    }else{
      this.navCtrl.pop();
    }
    
  }

  updateHoroscopeListData() {
    if (this.horoscopeListCallbackForUpdate) {
      this.horoscopeListCallbackForUpdate(true).then(() => {
        // let index = this.viewCtrl.index;
        // this.navCtrl.popTo(this.navCtrl.getByIndex(index-2));
        this.navCtrl.pop();
      });
    } else {
       this.navCtrl.pop();
      // let index = this.viewCtrl.index;
      // this.navCtrl.popTo(this.navCtrl.getByIndex(index-2));
    }

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
    //alert("Current");
   // this.platform.ready().then(() => {
     this.geolocation.watchPosition({enableHighAccuracy:true});
      this.geolocation.getCurrentPosition({enableHighAccuracy:true}).then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        //alert("DATA");
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
            this.addDailyRequest.setLATITUDE = resp.coords.latitude.toString();
            this.addDailyRequest.setLONGITUDE = resp.coords.longitude.toString();
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
        
      }).catch((error: any) => 
        //alert(error)
        this.alertProvider.basicAlertOnPage(DailyRequestPage,null,error,null)
      );
    
    }

    callDSTApi(){
      this.initiateLoder();
      this.loader.present();
      this.api.getDST(this.myLocation.getCountryCode.toString().trim()).subscribe(response => {
        this.loader.dismiss();

        //alert("REQ:" + this.myLocation.getCountryCode + " RES:" + JSON.stringify(response));
        if(response && response.Data){
            //alert("DST " + response.getDST);
            this.addDailyRequest.setDST = response.getDST;
            //this.callCheckDuplicateRequestApi();
        }else{
            //alert(response.getMessage);
            this.alertProvider.basicAlertOnPage(DailyRequestPage,null,response.getMessage,null);
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }


    callCheckDuplicateRequestApi(){
      this.alertforpleasewait=true;
      //console.log("REQ:"+JSON.stringify(this.addDailyRequest));
      if(!this.isValidate()){
        return;
      }

      if(!this.networkProvider.isInternetConnected()){
        //alert(strings.no_internet_connection);
        this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.no_internet_connection,null);
        return;
      }

      this.initiateLoder();
      this.loader.present();

      // alert("UID:" + this.addDailyRequest.getUSERID.toString().trim() 
      // + " HID:" +this.addDailyRequest.getHID.toString().trim()
      //  + " SDATE:" +this.addDailyRequest.getRQSDATE.toString().trim()
      //  + " EDATE:" + this.addDailyRequest.getRQENDDATE
      //  + " TYPE:" + Constants.REQ_CAT_DAILY)

      this.api.checkDuplicateRequest(this.addDailyRequest.getUSERID.toString().trim(),
      this.addDailyRequest.getHID.toString().trim(),
      this.addDailyRequest.getRQSDATE.toString().trim(),
      this.addDailyRequest.getRQENDDATE, 
      Constants.REQ_CAT_DAILY).subscribe(response => {
       
        this.loader.dismiss();

       //alert(response);
        //let d = JSON.stringify(response);
        let fObj: CheckDuplicateResponse = new CheckDuplicateResponse(JSON.stringify(response));
        if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null, strings.session_expired, null);
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
                  this.callAddDailyRequestApi();
                }
            }else{
              //show alert for request already exist
              //alert(fObj.getMessage);
              this.alertProvider.basicAlertOnPage(DailyRequestPage,null,fObj.getMessage,null);
            }
        }else{
        
          if(fObj && fObj.getMessage){
            //alert(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(DailyRequestPage,null,JSON.stringify(fObj.getMessage),null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.server_error,null);
        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }

    callChargesApi(){

      if(!this.networkProvider.isInternetConnected()){
        //alert(strings.no_internet_connection);
        this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.no_internet_connection,null);
        return;
      }
      this.initiateLoder();
      this.loader.present();

      this.api.getCharges(Constants.REQ_CAT_DAILY,this.uCurrency).subscribe(response => {
        this.loader.dismiss();

        if(response && response.getErrorMessage && response.getErrorMessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }

        if(response && response.Status === 'Success'){
          if(response.Data && response.Data != null && response.Data != "null" && response.Data != ""){
            if(!this.addDailyRequest.getREPEAT 
              || this.addDailyRequest.getREPEAT === null
              || this.addDailyRequest.getREPEAT === ''){
                this.addDailyRequest.setREPEAT = Constants.NO;
            }
            this.navCtrl.push(ChargesPage, {
              type: Constants.REQ_CAT_DAILY,
              url:response.Data.toString().trim(),
              request: this.addDailyRequest,
              callback: this.horoscopeListCallback
            });
          }else if(response.Message){
            this.alertProvider.basicAlertOnPage(DailyRequestPage,null,response.Message,null);
          }else if(response.ErrorMessage){
            this.alertProvider.basicAlertOnPage(DailyRequestPage,null,response.ErrorMessage,null);
          }else{
            this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.no_message_found,null);
          }
        }else if(response.Message){
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null,response.Message,null);
        }else{
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.no_message_found,null);
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }

    callAddDailyRequestApi(){

      if(!this.networkProvider.isInternetConnected()){
        //alert(strings.no_internet_connection);
        this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.no_internet_connection,null);
        return;
      }

      if(!this.addDailyRequest.getREPEAT 
        || this.addDailyRequest.getREPEAT === null
        || this.addDailyRequest.getREPEAT === ''){
          this.addDailyRequest.setREPEAT = Constants.NO;
      }
      
      this.initiateLoder();
      this.loader.present();

      this.api.addDailyRequest(this.addDailyRequest).subscribe(response => {
        // this.loader.dismiss();
       //alert(response);
        //let d = JSON.stringify(response);
        
        let fObj: AddRequestResponse = new AddRequestResponse(JSON.stringify(response));
        if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
          this.loader.dismiss();
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }

        //alert("REQ:" + JSON.stringify(this.addDailyRequest));
        //alert("RES:" + JSON.stringify(fObj));

        
        if(fObj && fObj.getStatus === 'Success'){

            if(fObj.getData ){
              this.loader.dismiss();  
              //call daily request api
              //alert(fObj.getMessage);  
              if(fObj.getMessage){
                this.alertProvider.basicAlertOnPage(DailyRequestPage,null,fObj.getMessage,null);
              }
              // this.onBackPressed();
              this.updateHoroscopeListData();
            }else{
              this.loader.dismiss();
              //show alert for request already exist
              //alert(fObj.getMessage);
              this.alertProvider.basicAlertOnPage(DailyRequestPage,null,fObj.getMessage,null);
            }
        }else{
          this.loader.dismiss();
        
          if(fObj && fObj.getMessage){
            //alert(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(DailyRequestPage,null,JSON.stringify(fObj.getMessage),null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }

    isValidate():boolean{
      // this.diagnostic.isLocationAvailable().then
      
      // if(
      // {
      //   this.checkGPSEnabled();
      //   return false;
      // }
      // if(!this.diagnostic.isLocationAvailable){
      //   this.getCoordinates();
      //   this.loader.present();
      //   setTimeout(() => {
      //     this.loader.dismiss();
      //   }, 2000);
      //   return false;
      // }

      if(!this.addDailyRequest.getLATITUDE ||
          !this.addDailyRequest.getLONGITUDE){
          
            //this.getCoordinates();
               
    //        alert(strings.please_check_location);
            //this.checkGPSEnabled();
            
    
              //the code
              this.checkGPSEnabled();

    //        this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.please_enable_location_services_in_phone_for_this_request,null);
            return false;
          // }else if(!this.addDailyRequest.getDST){
          //   alert('DST not found');
          //   return false;
        }else if(!this.addDailyRequest.getRQSDATE){
          //alert(strings.please_select_date);
          this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.please_select_date,null);
          return false;
        }
      
        return true;
      }

    getFormattedDate(d:string):string{
      let date = new Date(d);
      return this.datePipe.transform(date, 'ddMMyyhhmmss');
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


    getDDtoDMS(latitude,longitude)
    {
      var lat = latitude;
      var lng = longitude;
      var latResult, lngResult, dmsResult;
   
      lat = parseFloat(lat);  
      lng = parseFloat(lng);
   
      latResult = (lat >= 0)? 'N' : 'S';
      // The result is stored in latResult variable.
      latResult += this.getDms(lat);
      //latResult += this.getDms(40.601203);
      lngResult = (lng >= 0)? 'E' : 'W';

      // Call to getDms(lng) function for the coordinates of Longitude in DMS.
      // The result is stored in lngResult variable.
      lngResult += this.getDms(lng);

      // Joining both variables and separate them with a space.
      dmsResult = latResult + ' ' + lngResult;

      // Return the resultant string
      return dmsResult;
    }

     getDms(val) {

      var valDeg, valMin, valSec, result;
    
      val = Math.abs(val);
    
      valDeg = Math.floor(val);
      result = valDeg + "º";
    
      valMin = Math.floor((val - valDeg) * 60);
      result += valMin + "'";
    
      valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 100) / 100;
      result += valSec + "\"";
    
      return result;
    }

    callTimeZoneApi(lat,lon){
      // const BaseUrl="https://maps.googleapis.com/maps/api/timezone/json";
      // const APIKEY="AIzaSyCv0_DNUXA4WD-QqcZHR6vqW_nfP8TLlwM";
      // //const APIKEY="AIzaSyDBmkUZNs66bjn-ZtmH-29rQMdKC_x5F0A";
      // const timestamp = new Date().getTime();
      // this.api.getTimeZone(BaseUrl,lat,lon,timestamp,APIKEY).subscribe(response=>{
      //   //alert("TIME STAMP:"+JSON.stringify(response));
      //   let timezone = new TimeZone(JSON.stringify(response));
      //   if(timezone.getStatus === "OK"){

      //   }else{
      //     //alert("TIME STAMP:"+JSON.stringify(response));
      //   }
      // },error => {
      //     alert("error occured");
      // });
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
      this.addDailyRequest.setRQENDDATE = selectedDate;
      this.displayStartDate = this.datePipe.transform(date, 'MMMM dd, yyyy').toString();
      //console.log("DATE:"+this.displayStartDate);
      
      let endDate = new Date(date.getTime() + 24*60*60*1000*6);
      let endSelectedDate = this.datePipe.transform(endDate, 'ddMMyyhhmmss').toString();
      //console.log("SELECTED DATE:"+selectedDate + " " + this.displayStartDate );
      
      this.showCalendar = false;
      //console.log("SHOW_CAL:" + this.showCalendar);
    }

    selectDate(event){
  
        this.showCalendar = true;
        //console.log("SHOW_CAL:" + this.showCalendar);
      // let items=[
      //   {item:strings.gender_male},
      //   {item:strings.gender_female}
      //   //{item:strings.gender_transsexual}
      // ]

      
     // let options= new Popo

      // let popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_CALENDAR},{cssClass: 'page-daily-request'});
      
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
      //   this.addDailyRequest.setRQENDDATE = selectedDate;
      //   this.displayStartDate = this.datePipe.transform(date, 'MMMM dd, yyyy').toString();
      //   let endDate = new Date(date.getTime() + 24*60*60*1000*6);
      //   let endSelectedDate = this.datePipe.transform(endDate, 'ddMMyyhhmmss').toString();
      //   //this.horoscopeData.setHGender = popOverData.item;
      //   console.log("SELECTED DATE:"+selectedDate + " " + this.displayStartDate );
      //   console.log("END DATE:"+endSelectedDate);
      // });
    
    }

    onClickRepeat(){
        if(this.isRepeatChecked){
          this.isRepeatChecked = false;
          this.addDailyRequest.setREPEAT = Constants.NO;
        }else{
          this.isRepeatChecked = true;
          this.addDailyRequest.setREPEAT = Constants.YES;
        }

    }

    ionViewWillEnter(){
      //alert("ionViewWillEnter");
      this.alertProvider.setCurrentPage(DailyRequestPage);
     
    }

    ionViewWillLeave(){
      //alert("ionViewWillLeave");
      //console.log('ionViewWillLeave DashboardPage');
      this.stopTimer();
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

}
