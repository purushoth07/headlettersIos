import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Slides } from 'ionic-angular';
import {LoadingController,ToastController,Content} from 'ionic-angular';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { Country } from '../../models/country';
import { MyCalendar } from '../../utils/calendar';
import { ApiProvider } from '../../providers/api/api';
import { CountryResponse } from '../../api/response/country_response';
import { CountryResponseData } from '../../api/response/country_response_data';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import { DISABLED } from '@angular/forms/src/model';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from '../../components/popover/popover';
import { Platform, ActionSheetController } from 'ionic-angular';
import { database } from 'firebase';
import { MyTime } from '../../utils/mytime';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginResponseData } from '../../api/response/login_response_data';
import { Storage } from '@ionic/storage';
import { AddHoroscopeResponse } from '../../api/response/add_horoscope_response';
import { Keyboard } from '@ionic-native/keyboard';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AddHoroscopeNewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-horoscope-new',
  templateUrl: 'add-horoscope-new.html',
})

export class AddHoroscopeNewPage {

  /**
   * content to refresh view if any changes made like hide/show header,footer
   */
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  @ViewChild('name') name ;

  loader :any;
  childOrder:number = 1;
  userData:any = new LoginResponseData();
  horoscopeData:HoroscopeResponseData=new HoroscopeResponseData();
  horoscopeOrginalData:any = new HoroscopeResponseData();
  horoscopeListCallback:any;

  type:string  = Constants.ADD_HOROSCOPE;
  isEditable:boolean = true;
  title:string = strings.add_horoscope;
  imageURI:any = Constants.COMMON_PROFILE_IMAGE;

  
  ownerDOBCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_OWNER_DOB);
  marriageCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_MARRIAGE);
  travelCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_TRAVEL);
  lastCallCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_CALL);
  demiseCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_DEMISE);
  childCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_DEMISE);
  
  ownerDobTime = new MyTime();
  marriageTime = new MyTime();
  travelTime = new MyTime();
  callTime = new MyTime();
  demiseTime = new MyTime();
  childTime = new MyTime();


/**
 * owner basic data valid errors
 */
isValidName:boolean = true;
isValidNativePhoto:boolean = true;
isValidGender:boolean =true;
isValidDOBPlace:boolean = true;
isValidLandmark:boolean = true;
isValidDOBDate:boolean =true;
isValidDOBMonth:boolean =true;
isValidDOBYear:boolean =true;
isValidDOBHours:boolean =true;
isValidDOBMin:boolean =true;
isValidDOBSec:boolean =true;
isValidDOBAmpm:boolean =true;
notFocused = false;

errorNativeImage = strings.please_add_horoscope_image;
errorName = strings.please_enter_name;
errorGender = strings.please_select_gender;
errorOwnerDOBDate = strings.please_select_owner_dob_date;
errorOwnerDOBMonth = strings.please_select_owner_dob_month;
errorOwnerDOBYear = strings.please_select_owner_dob_year;
errorOwnerDOBHour = strings.please_select_owner_dob_hour;
errorOwnerDOBMin = strings.please_select_owner_dob_min;
errorOwnerDOBSec = strings.please_select_owner_dob_sec;
errorOwnerDOBAmPm = strings.please_select_owner_dob_am_pm;
errorOwnerDOBPlace = strings.please_select_palce_of_birth;
errorOwnerDOBLandmark = strings.please_select_nearest_landmark_for_palce_of_birth;

/**
 * owner marriage data valid errors
 */

isValidMarriageDate:boolean =true;
isValidMarriageMonth:boolean =true;
isValidMarriageYear:boolean =true;
isValidMarriageHours:boolean =true;
isValidMarriageMin:boolean =true;
isValidMarriageSec:boolean =true;
isValidMarriageAmpm:boolean =true;

errorMarriageDate = strings.please_select_marriage_date;
errorMarriageMonth = strings.please_select_marriage_month;
errorMarriageYear = strings.please_select_marriage_year;
errorMarriageHour = strings.please_select_marriage_hour;
errorMarriageMin = strings.please_select_marriage_min;
errorMarriageSec = strings.please_select_marriage_sec;
errorMarriageAmPm = strings.please_select_marriage_am_pm;

/**
 * owner child data valid errors
 */

isValidChildBirthDate:boolean =true;
isValidChildBirthMonth:boolean =true;
isValidChildBirthYear:boolean =true;
isValidChildBirthHours:boolean =true;
isValidChildBirthMin:boolean =true;
isValidChildBirthSec:boolean =true;
isValidChildBirthAmpm:boolean =true;

errorChildBirthDate = strings.please_select_child_birth_date;
errorChildBirthMonth = strings.please_select_child_birth_month;
errorChildBirthYear = strings.please_select_child_birth_year;
errorChildBirthHour = strings.please_select_child_birth_hour;
errorChildBirthMin = strings.please_select_child_birth_min;
errorChildBirthSec = strings.please_select_child_birth_sec;
errorChildBirthAmPm = strings.please_select_child_birth_am_pm;

/**
 * owner travel data valid errors
 */

isValidTravelDate:boolean =true;
isValidTravelMonth:boolean =true;
isValidTravelYear:boolean =true;
isValidTravelHours:boolean =true;
isValidTravelMin:boolean =true;
isValidTravelSec:boolean =true;
isValidTravelAmpm:boolean =true;

errorTravelDate = strings.please_select_travel_date;
errorTravelMonth = strings.please_select_travel_month;
errorTravelYear = strings.please_select_travel_year;
errorTravelHour = strings.please_select_travel_hour;
errorTravelMin = strings.please_select_travel_min;
errorTravelSec = strings.please_select_travel_sec;
errorTravelAmPm = strings.please_select_travel_am_pm;

/**
 * owner last call/message data valid errors
 */

isValidCallDate:boolean =true;
isValidCallMonth:boolean =true;
isValidCallYear:boolean =true;
isValidCallHours:boolean =true;
isValidCallMin:boolean =true;
isValidCallSec:boolean =true;
isValidCallAmpm:boolean =true;

errorCallDate = strings.please_select_call_date;
errorCallMonth = strings.please_select_call_month;
errorCallYear = strings.please_select_call_year;
errorCallHour = strings.please_select_call_hour;
errorCallMin = strings.please_select_call_min;
errorCallSec = strings.please_select_call_sec;
errorCallAmPm = strings.please_select_call_am_pm;

/**
 * owner demise data valid errors
 */

isValidDemiseDate:boolean =true;
isValidDemiseMonth:boolean =true;
isValidDemiseYear:boolean =true;
isValidDemiseHours:boolean =true;
isValidDemiseMin:boolean =true;
isValidDemiseSec:boolean =true;
isValidDemiseAmpm:boolean =true;

errorDemiseDate = strings.please_select_demise_date;
errorDemiseMonth = strings.please_select_demise_month;
errorDemiseYear = strings.please_select_demise_year;
errorDemiseHour = strings.please_select_demise_hour;
errorDemiseMin = strings.please_select_demise_min;
errorDemiseSec = strings.please_select_demise_sec;
errorDemiseAmPm = strings.please_select_demise_am_pm;

isKeyboardOpen=false;

serverToken:string;

isBeginning:boolean = true;
isEnd:boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public api:ApiProvider,
    private transfer: FileTransfer,
    private datePipe: DatePipe,
    private popOverController:PopoverController,
    public platform:Platform,
    public session:Storage,
    public keyboard:Keyboard,
    public alertProvider:AlertProvider,
    public translate:TranslateService) {

      alertProvider.setCurrentPage(AddHoroscopeNewPage);
      this.initiateLoder(); 
      this.setCalendarYears();
      this.getNavParamData();
      
      //this.horoscopeData = this.sampleHoroscopeData();
      //this.horoscopeOrginalData = this.sampleHoroscopeData();

      //this.checkDateTime();

      this.platform.ready().then(() => {

        if(!platform.is('cordova')){
            //this.isKeyboardOpen=true;
            return;
        }
        this.keyboard.onKeyboardShow().subscribe(() => {
              this.isKeyboardOpen = true;
              //document.body.classList.add('keyboard-is-open');
              this.footerUpdated();
          });
      
          this.keyboard.onKeyboardHide().subscribe(() => {
              this.isKeyboardOpen = false;
              //document.body.classList.remove('keyboard-is-open');
              this.footerUpdated();
          });
      
      
      });
      
  }

  

   /**
   * refresh view if any changes made like hide/show header,footer
   */
  footerUpdated() {
    this.content.resize();
  }


  onBackPressed(){
    // if(this.type === Constants.ADD_HOROSCOPE){
    //   this.navCtrl.pop();
    // }else{
      //if(this.horoscopeListCallback){
        this.horoscopeListCallback(false).then(()=>{
          this.navCtrl.pop();
        });
      // }else{
      //   this.navCtrl.pop();
      // }
    //}
  }

  updateHoroscopeListData(){
    if(this.horoscopeListCallback){
      this.horoscopeListCallback(true).then(()=>{
        this.navCtrl.pop();
      });
    }else{
      this.navCtrl.pop();
    }
    
  }

  onHomePressed(){
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  checkDateTime(){
   let d = new  Date("2014-04-12T20:31:58+05:30").getTime();

    let date=new Date('2018-07-29T10:04:48.9116911Z');
    let latest_date =this.datePipe.transform(date, 'yyyy-MM-dd hh:mm:ss z');
    let latest_date2 =this.datePipe.transform(d, 'dd/MM/yy hh:mm:ss');
    alert("DATE " +this.getDateFromComplete('2018-07-29T10:04:48.9116911Z',Constants.CALENDAR_DATE));
    alert("MONTH " +this.getDateFromComplete('2018-07-29T10:04:48.9116911Z',Constants.CALENDAR_MONTH));
    alert("YEAR " +this.getDateFromComplete('2018-07-29T10:04:48.9116911Z',Constants.CALENDAR_YEAR));
    alert("HOUR " +this.getTimeFromComplete('2018-07-29T05:30:00Z',Constants.TIME_HOUR));
    alert("MIN " +this.getTimeFromComplete('2018-07-29T05:30:00Z',Constants.TIME_MIN));
    alert("SEC " +this.getTimeFromComplete('2018-07-29T10:04:48.9116911Z',Constants.TIME_SEC));
    alert("AMPM " +this.getTimeFromComplete('2018-07-29T10:04:48.9116911Z',Constants.TIME_AM_PM));

  
    alert(latest_date2.toString());

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddHoroscopeNewPage');
    //this.slides.slidesPerColumnFill();// = 1;
  }

  initiateLoder(){
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
  }

  getNavParamData(){

    this.session.get(Constants.USER_DATA).then(val=>{
      this.userData  = new LoginResponseData(JSON.stringify(val));
      if(this.userData && this.userData.getTOKEN){
          this.serverToken = this.userData.getTOKEN.toString().trim();
      }

    });

    if(this.navParams.get(Constants.TYPE)){
      this.type = this.navParams.get(Constants.TYPE);
      if(this.type === Constants.UPDATE_HOROSCOPE){
          this.horoscopeData = new HoroscopeResponseData(JSON.stringify(this.navParams.get('data')));
          this.horoscopeOrginalData = new HoroscopeResponseData(JSON.stringify(this.navParams.get('data')));
      }else{
        this.userData = this.navParams.get('data');
        this.horoscopeData.setHUserId = this.userData.getUserId;
       // alert(this.horoscopeData.getHUserId);
      }
    }

    if(this.navParams.get("callback")){
      this.horoscopeListCallback = this.navParams.get("callback");
    }

    if(this.type == Constants.ADD_HOROSCOPE){
        this.isEditable = true;
        this.title = strings.add_horoscope;
        this.horoscopeData.setHNativePhoto = this.imageURI;

        this.session.get(Constants.USER_DATA).then(val=>{
          this.userData  = new LoginResponseData(JSON.stringify(val));
          this.horoscopeData.setHUserId = this.userData.getUserId;
        });
    }else{
        this.isEditable = false;
        this.title = strings.update_horoscope;
        if(!this.horoscopeData.getHNativePhoto){
          this.horoscopeData.setHNativePhoto = this.imageURI;
        }
        this.setHoroscopeDataForUpdate();
    }

  }

  sampleHoroscopeData():any{
    let data = new HoroscopeResponseData();
    data.setHUserId = 'meme@gmail.com';
    //data.setHId = 'meme@gmail.com';
    data.setHName = 'MEME Test';
    data.setHGender = 'M';
    data.setHDobNative = '120490121212';
    data.setHHours = 9;
    data.setHMin = 10;
    data.setHSs = 10;
    data.setHAmpm = 'AM';
    data.setHPlace = 'Place';
    data.setHLandmark = "Hospital";
    data.setHMarriageDate = ''
    data.setHMarriagePlace = ''; 
    data.setHNativePhoto = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg';
    data.setHMarriageTime = '120418233434';
    data.setHMarriageAmpm = 'PM';
    data.setHFirstChildDate = '120418233434';
    data.setHFirstChildPlace = 'Delhi';
    data.setHFirstChildTime = '120418233434';
    data.setHFirstChildTimeAmpm = 'AM';
    data.setHAtDate = '120418233434';
    data.setHAtPlace = '';
    data.setHAtTime = '';
    data.setHAmpm = '';
    data.setHAFlightNo = '';
    data.setHCrDate = '';
    data.setHCrTime = '';
    data.setHCrTAmpm = '';
    data.setHCrPlace = '';
    data.setHDrr = '';
    data.setHDrrD = '';
    data.setHDrrT ='';
    data.setHDrrP = '';
    data.setHDrrTAmpm = '';
    data.setRectifieDdst = 87;
    data.setRectifiedDate = '';
    data.setRectifiedTime = '';
    data.setRectifiedPlace = '';
    data.setRectifiedLatitude = '';
    data.setRectifiedLatitudeNs = '';
    data.setRectifiedLongtitude = '';
    data.setRectifiedLongtitudeEw = '';
    data.setHPdf = '';
    data.setLastRequestId = 45;
    data.setLastmessageId = 3;
    data.setLastWpDate = '120418233434';
    data.setLastDpDate = '120418233434';
    data.setHLocked = '';
    data.setHRecDeleted = '';
    data.setHCreationDate = '';
    data.setHRecDeletedD = '';
    data.setHTotalTrue = 50;
    data.setHTotalFalse = 34;
    data.setHTotalPartial = 32;
    data.setHUnique = 3;
    data.setHStatus = '';

    return data;
  }

  setHoroscopeDataForUpdate(){

    //alert("BEFOR CHECK DATE");

    if(this.horoscopeData 
      && this.horoscopeData.getHBIRTHORDER 
      && this.horoscopeData.getHBIRTHORDER != null 
      && this.horoscopeData.getHBIRTHORDER.toString().trim() != ''){
        this.childOrder = Number(this.horoscopeData.getHBIRTHORDER.toString().trim());
      }

    if(this.horoscopeData && this.horoscopeData.getHDobNative){
        this.ownerDOBCalendar.setSelectedDate = this.getDateFromComplete(this.horoscopeData.getHDobNative,Constants.CALENDAR_DATE);
        this.ownerDOBCalendar.setSelectedMonth = this.getDateFromComplete(this.horoscopeData.getHDobNative,Constants.CALENDAR_MONTH);
        this.ownerDOBCalendar.setSelectedYear = this.getDateFromComplete(this.horoscopeData.getHDobNative,Constants.CALENDAR_YEAR);
      }

      if(this.horoscopeData && this.horoscopeData.getHGender){
        this.horoscopeData.setHGender = this.getGenderFromCode(this.horoscopeData.getHGender.toString().trim());
      }

      if(this.horoscopeData && this.horoscopeData.getHMarriageDate){
        this.marriageCalendar.setSelectedDate = this.getDateFromComplete(this.horoscopeData.getHMarriageDate,Constants.CALENDAR_DATE);
        this.marriageCalendar.setSelectedMonth = this.getDateFromComplete(this.horoscopeData.getHMarriageDate,Constants.CALENDAR_MONTH);
        this.marriageCalendar.setSelectedYear = this.getDateFromComplete(this.horoscopeData.getHMarriageDate,Constants.CALENDAR_YEAR);
      }

      if(this.horoscopeData && this.horoscopeData.getHFirstChildDate){
        this.childCalendar.setSelectedDate = this.getDateFromComplete(this.horoscopeData.getHFirstChildDate,Constants.CALENDAR_DATE);
        this.childCalendar.setSelectedMonth = this.getDateFromComplete(this.horoscopeData.getHFirstChildDate,Constants.CALENDAR_MONTH);
        this.childCalendar.setSelectedYear = this.getDateFromComplete(this.horoscopeData.getHFirstChildDate,Constants.CALENDAR_YEAR);
      }

      if(this.horoscopeData && this.horoscopeData.getHAtDate){
        this.travelCalendar.setSelectedDate = this.getDateFromComplete(this.horoscopeData.getHAtDate,Constants.CALENDAR_DATE);
        this.travelCalendar.setSelectedMonth = this.getDateFromComplete(this.horoscopeData.getHAtDate,Constants.CALENDAR_MONTH);
        this.travelCalendar.setSelectedYear = this.getDateFromComplete(this.horoscopeData.getHAtDate,Constants.CALENDAR_YEAR);
      }

      if(this.horoscopeData && this.horoscopeData.getHCrDate){
        this.lastCallCalendar.setSelectedDate = this.getDateFromComplete(this.horoscopeData.getHCrDate,Constants.CALENDAR_DATE);
        this.lastCallCalendar.setSelectedMonth = this.getDateFromComplete(this.horoscopeData.getHCrDate,Constants.CALENDAR_MONTH);
        this.lastCallCalendar.setSelectedYear = this.getDateFromComplete(this.horoscopeData.getHCrDate,Constants.CALENDAR_YEAR);
      }

      if(this.horoscopeData && this.horoscopeData.getHDrrD){
        this.demiseCalendar.setSelectedDate = this.getDateFromComplete(this.horoscopeData.getHDrrD,Constants.CALENDAR_DATE);
        this.demiseCalendar.setSelectedMonth = this.getDateFromComplete(this.horoscopeData.getHDrrD,Constants.CALENDAR_MONTH);
        this.demiseCalendar.setSelectedYear = this.getDateFromComplete(this.horoscopeData.getHDrrD,Constants.CALENDAR_YEAR);
      }

      if(this.horoscopeData && this.horoscopeData.getHHours){
        if(this.horoscopeData.getHHours === 0){
          this.ownerDobTime.setSelectedHour = "00";
        }else{
          this.ownerDobTime.setSelectedHour = this.horoscopeData.getHHours.toString();
        }
      }

      if(this.horoscopeData && this.horoscopeData.getHMin){
        if(this.horoscopeData.getHMin === 0){
          this.ownerDobTime.setSelectedMin = "00";
        }else{
          this.ownerDobTime.setSelectedMin = this.horoscopeData.getHMin.toString();
        }
      }else{
        this.ownerDobTime.setSelectedMin = "00";
      }

      if(this.horoscopeData && this.horoscopeData.getHSs){
        if(this.horoscopeData.getHSs === 0){
          this.ownerDobTime.setSelectedSec = "00";
        }else{
          this.ownerDobTime.setSelectedSec = this.horoscopeData.getHSs.toString();
        }
      }else{
        this.ownerDobTime.setSelectedSec = "00";
      }

      if(this.horoscopeData && this.horoscopeData.getHAmpm){
        this.ownerDobTime.setSelectedAmPm = this.horoscopeData.getHAmpm.toString();
      }
      

    if(this.horoscopeData && this.horoscopeData.getHMarriageTime){
        this.marriageTime.setSelectedHour = this.getTimeFromComplete(this.horoscopeData.getHMarriageTime.toString(),Constants.TIME_HOUR);
        this.marriageTime.setSelectedMin = this.getTimeFromComplete(this.horoscopeData.getHMarriageTime.toString(),Constants.TIME_MIN);
        this.marriageTime.setSelectedSec = this.getTimeFromComplete(this.horoscopeData.getHMarriageTime.toString(),Constants.TIME_SEC);
    }

    if(this.horoscopeData && this.horoscopeData.getHMarriageAmpm){
      if(this.horoscopeData.getHMarriageAmpm != null && this.horoscopeData.getHMarriageAmpm.toString().trim() != "null"){
        this.marriageTime.setSelectedAmPm = this.horoscopeData.getHMarriageAmpm;
      }
      
    }

    if(this.horoscopeData && this.horoscopeData.getHFirstChildTime){
      this.childTime.setSelectedHour = this.getTimeFromComplete(this.horoscopeData.getHFirstChildTime.toString(),Constants.TIME_HOUR);
      this.childTime.setSelectedMin = this.getTimeFromComplete(this.horoscopeData.getHFirstChildTime.toString(),Constants.TIME_MIN);
      this.childTime.setSelectedSec = this.getTimeFromComplete(this.horoscopeData.getHFirstChildTime.toString(),Constants.TIME_SEC);
    }

    if(this.horoscopeData && this.horoscopeData.getHFirstChildTimeAmpm){
      if(this.horoscopeData.getHFirstChildTimeAmpm != null && this.horoscopeData.getHFirstChildTimeAmpm.toString().trim() != "null"){
        this.childTime.setSelectedAmPm = this.horoscopeData.getHFirstChildTimeAmpm;
      }
      
    }

    if(this.horoscopeData && this.horoscopeData.getHAtTime){
      this.travelTime.setSelectedHour = this.getTimeFromComplete(this.horoscopeData.getHAtTime.toString(),Constants.TIME_HOUR);
      this.travelTime.setSelectedMin = this.getTimeFromComplete(this.horoscopeData.getHAtTime.toString(),Constants.TIME_MIN);
      this.travelTime.setSelectedSec = this.getTimeFromComplete(this.horoscopeData.getHAtTime.toString(),Constants.TIME_SEC);
    }

    if(this.horoscopeData && this.horoscopeData.getHAtTAmpm){
      if(this.horoscopeData.getHAtTAmpm != null && this.horoscopeData.getHAtTAmpm.toString().trim() != "null"){
        this.travelTime.setSelectedAmPm = this.horoscopeData.getHAtTAmpm;
      }
    }

    if(this.horoscopeData && this.horoscopeData.getHCrTime){
      this.callTime.setSelectedHour = this.getTimeFromComplete(this.horoscopeData.getHCrTime.toString(),Constants.TIME_HOUR);
      this.callTime.setSelectedMin = this.getTimeFromComplete(this.horoscopeData.getHCrTime.toString(),Constants.TIME_MIN);
      this.callTime.setSelectedSec = this.getTimeFromComplete(this.horoscopeData.getHCrTime.toString(),Constants.TIME_SEC);
    }

    if(this.horoscopeData && this.horoscopeData.getHCrTAmpm){
      if(this.horoscopeData.getHCrTAmpm != null && this.horoscopeData.getHCrTAmpm.toString().trim() != "null"){
        this.callTime.setSelectedAmPm = this.horoscopeData.getHCrTAmpm;
      }
    }

    if(this.horoscopeData && this.horoscopeData.getHDrrT){
      this.demiseTime.setSelectedHour = this.getTimeFromComplete(this.horoscopeData.getHDrrT.toString(),Constants.TIME_HOUR);
      this.demiseTime.setSelectedMin = this.getTimeFromComplete(this.horoscopeData.getHDrrT.toString(),Constants.TIME_MIN);
      this.demiseTime.setSelectedSec = this.getTimeFromComplete(this.horoscopeData.getHDrrT.toString(),Constants.TIME_SEC);
    }

    if(this.horoscopeData && this.horoscopeData.getHDrrTAmpm){
      if(this.horoscopeData.getHDrrTAmpm != null && this.horoscopeData.getHDrrTAmpm.toString().trim() != "null"){
        this.demiseTime.setSelectedAmPm = this.horoscopeData.getHDrrTAmpm;
      }
    }
      
  }

  setCalendarYears(){
    const year = new Date().getFullYear().toString();
    const month = new Date().getMonth().toString();
    const date = new Date().getDate().toString();
   // alert(year + '-' + month + '-' + date);
    //const formatedDate = new Date().toISOString().substring(0, 4);
    this.ownerDOBCalendar.previousYears = Number(year);
    this.marriageCalendar.previousYears = Number(year);
    this.travelCalendar.previousYears = Number(year);
    this.lastCallCalendar.previousYears = Number(year);
    this.demiseCalendar.previousYears = Number(year);
    this.childCalendar.previousYears = Number(year);
    
    this.ownerDOBCalendar.setCurrentMonth = Number(month);
    this.marriageCalendar.setCurrentMonth = Number(month);
    this.travelCalendar.setCurrentMonth = Number(month);
    this.lastCallCalendar.setCurrentMonth = Number(month);
    this.demiseCalendar.setCurrentMonth = Number(month);
    this.childCalendar.setCurrentMonth = Number(month);
    
    this.ownerDOBCalendar.setCurrentDate = Number(date);
    this.marriageCalendar.setCurrentDate = Number(date);
    this.travelCalendar.setCurrentDate = Number(date);
    this.lastCallCalendar.setCurrentDate = Number(date);
    this.demiseCalendar.setCurrentDate = Number(date);
    this.childCalendar.setCurrentDate = Number(date);
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection : 1,
        correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.horoscopeData.setHNativePhoto = imageData;
    }, (err) => {
      //console.log(err);
      //alert(err);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,err,null);
      //this.presentToast(err);
    });
  }

  selectGender(){
    let items=[
      {item:strings.gender_male},
      {item:strings.gender_female},
      {item:strings.gender_transgender}
    ]

    let popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_GENDER,data:items});
    popover.present({
      //ev:myEvent
    });

    popover.onDidDismiss(popOverData=>{
      if(!popOverData){
        return;
      }

      this.horoscopeData.setHGender = popOverData.item;
    });
  
  }

  selectCalendar(event:number,type:number){
    
    switch(event){
      case Constants.CALENDAR_FOR_OWNER_DOB:
        this.selectOwnerDOBCalendar(type);
      break;
      case Constants.CALENDAR_FOR_MARRIAGE:
        this.selectMarriageCalendar(type);
      break;
      case Constants.CALENDAR_FOR_TRAVEL:
        this.selectTravelCalendar(type);
      break;
      case Constants.CALENDAR_FOR_CALL:
        this.selectCallCalendar(type);
      break;
      case Constants.CALENDAR_FOR_DEMISE:
        this.selectDemiseCalendar(type);
      break;
      case Constants.CALENDAR_FOR_CHILD:
        this.selectChildCalendar(type);
      break;
    
    }
  }

  selectOwnerDOBCalendar(type:number){
    let popover:any;
    if(type == Constants.CALENDAR_DATE){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_DATE,data:this.ownerDOBCalendar.dates});
      popover.present({
        //ev:myEvent
      });

      
    }else if(type == Constants.CALENDAR_MONTH){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MONTH,data:this.ownerDOBCalendar.monthNames});
      popover.present({
       // ev:myEvent
      });
    }else if(type == Constants.CALENDAR_YEAR){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_YEAR,data:this.ownerDOBCalendar.year});
      popover.present({
        //ev:myEvent
      });
    }


    popover.onDidDismiss(popOverData=>{
      if(!popOverData){
        return;
      }

      if(type == Constants.CALENDAR_DATE){
        this.ownerDOBCalendar.setSelectedDate = popOverData.item;
      }else if(type == Constants.CALENDAR_MONTH){        
        //get month nummber from name
        this.ownerDOBCalendar.setSelectedMonth = this.ownerDOBCalendar.getMonthNumberFromName(popOverData.item);
        //this.ownerDOBCalendar.setSelectedMonth=popOverData.item;
        if(this.ownerDOBCalendar.selectedYear
          && this.ownerDOBCalendar.selectedDate
          && Number(this.ownerDOBCalendar.selectedYear) == this.ownerDOBCalendar.currentYear
          && Number(this.ownerDOBCalendar.selectedMonth) == this.ownerDOBCalendar.currentMonth
          && Number(this.ownerDOBCalendar.selectedDate) >= this.ownerDOBCalendar.currentDate){
              this.ownerDOBCalendar.selectedDate = null;
         }else if(this.ownerDOBCalendar.getSelectedMonth == "2"){
          if(this.ownerDOBCalendar.getSelectedYear
            && this.ownerDOBCalendar.isLeapYear(Number(this.ownerDOBCalendar.getSelectedYear))){
            if(Number(this.ownerDOBCalendar.getSelectedDate) > 29){
              this.ownerDOBCalendar.setSelectedDate = null//"29";
            }
          }
          else if(this.ownerDOBCalendar.getSelectedDate && Number(this.ownerDOBCalendar.getSelectedDate) > 28){
              this.ownerDOBCalendar.setSelectedDate = null//"28";
          }
        }else if(this.ownerDOBCalendar.getSelectedMonth == "4"
          || this.ownerDOBCalendar.getSelectedMonth == "6"
          || this.ownerDOBCalendar.getSelectedMonth == "9"
          || this.ownerDOBCalendar.getSelectedMonth == "11"){
            if(this.ownerDOBCalendar.getSelectedDate && Number(this.ownerDOBCalendar.getSelectedDate) > 30){
                this.ownerDOBCalendar.setSelectedDate = null//"30";
            }
        }
      }else if(type == Constants.CALENDAR_YEAR){
        this.ownerDOBCalendar.setSelectedYear=popOverData.item;
             
              if(this.ownerDOBCalendar.getSelectedMonth){

              if(Number(this.ownerDOBCalendar.getSelectedYear) == this.ownerDOBCalendar.currentYear){
                if(Number(this.ownerDOBCalendar.getSelectedMonth) > this.ownerDOBCalendar.currentMonth){
                  this.ownerDOBCalendar.setSelectedMonth = null
                }else if(Number(this.ownerDOBCalendar.getSelectedMonth) == this.ownerDOBCalendar.currentMonth){
                  if(this.ownerDOBCalendar.getSelectedDate 
                    && (Number(this.ownerDOBCalendar.getSelectedDate) >= this.ownerDOBCalendar.currentDate)){
                    this.ownerDOBCalendar.setSelectedDate = null
                  }
                }
              }
              else if(this.ownerDOBCalendar.getSelectedMonth == "2"){
                if(this.ownerDOBCalendar.getSelectedDate){
                  if(this.ownerDOBCalendar.getSelectedYear
                    && this.ownerDOBCalendar.isLeapYear(Number(this.ownerDOBCalendar.getSelectedYear))){
                    if(Number(this.ownerDOBCalendar.getSelectedDate) > 29){
                      this.ownerDOBCalendar.setSelectedDate = null//"29";
                    }
                  }
                  else if(Number(this.ownerDOBCalendar.getSelectedDate) > 28){
                    this.ownerDOBCalendar.setSelectedDate = null//"28";
                  }
                }
              }else if(this.ownerDOBCalendar.getSelectedMonth == "4"
                || this.ownerDOBCalendar.getSelectedMonth == "6"
                || this.ownerDOBCalendar.getSelectedMonth == "9"
                || this.ownerDOBCalendar.getSelectedMonth == "11"){
                  if(this.ownerDOBCalendar.getSelectedDate && Number(this.ownerDOBCalendar.getSelectedDate) > 30){
                      this.ownerDOBCalendar.setSelectedDate = null//"30";
                  }
              }
            }
      }
    });
  }

  selectMarriageCalendar(type:number){
    let popover:any;
    if(type == Constants.CALENDAR_DATE){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_DATE,data:this.marriageCalendar.dates});
      popover.present({
        //ev:myEvent
      });

      
    }else if(type == Constants.CALENDAR_MONTH){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MONTH,data:this.marriageCalendar.monthNames});
      popover.present({
        //ev:myEvent
      });
    }else if(type == Constants.CALENDAR_YEAR){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_YEAR,data:this.marriageCalendar.year});
      popover.present({
        //ev:myEvent
      });
    }

    popover.onDidDismiss(popOverData=>{
      if(!popOverData){
        return;
      }

      if(type == Constants.CALENDAR_DATE){
        this.marriageCalendar.setSelectedDate = popOverData.item;
      }else if(type == Constants.CALENDAR_MONTH){
        //get month nummber from name
        this.marriageCalendar.setSelectedMonth = this.marriageCalendar.getMonthNumberFromName(popOverData.item);
        //this.marriageCalendar.setSelectedMonth=popOverData.item;
        if(this.marriageCalendar.selectedYear
          && this.marriageCalendar.selectedDate
          && Number(this.marriageCalendar.selectedYear) == this.marriageCalendar.currentYear
          && Number(this.marriageCalendar.selectedMonth) == this.marriageCalendar.currentMonth
          && Number(this.marriageCalendar.selectedDate) >= this.marriageCalendar.currentDate){
              this.marriageCalendar.selectedDate = null;
         }else if(this.marriageCalendar.getSelectedMonth == "2"){
          if(this.marriageCalendar.getSelectedYear
            && this.marriageCalendar.isLeapYear(Number(this.marriageCalendar.getSelectedYear))){
            if(Number(this.marriageCalendar.getSelectedDate) > 29){
              this.marriageCalendar.setSelectedDate = null//"29";
            }
          }
          else if(this.marriageCalendar.getSelectedDate && Number(this.marriageCalendar.getSelectedDate) > 28){
              this.marriageCalendar.setSelectedDate = null//"28";
          }
        }else if(this.marriageCalendar.getSelectedMonth == "4"
          || this.marriageCalendar.getSelectedMonth == "6"
          || this.marriageCalendar.getSelectedMonth == "9"
          || this.marriageCalendar.getSelectedMonth == "11"){
            if(this.marriageCalendar.getSelectedDate && Number(this.marriageCalendar.getSelectedDate) > 30){
                this.marriageCalendar.setSelectedDate = null//"30";
            }
        }
      }else if(type == Constants.CALENDAR_YEAR){
        this.marriageCalendar.setSelectedYear=popOverData.item;
             
          if(this.marriageCalendar.getSelectedMonth){

          if(Number(this.marriageCalendar.getSelectedYear) == this.marriageCalendar.currentYear){
            if(Number(this.marriageCalendar.getSelectedMonth) > this.marriageCalendar.currentMonth){
              this.marriageCalendar.setSelectedMonth = null
            }else if(Number(this.marriageCalendar.getSelectedMonth) == this.marriageCalendar.currentMonth){
              if(this.marriageCalendar.getSelectedDate 
                && (Number(this.marriageCalendar.getSelectedDate) >= this.marriageCalendar.currentDate)){
                this.marriageCalendar.setSelectedDate = null
              }
            }
          }
          else if(this.marriageCalendar.getSelectedMonth == "2"){
            if(this.marriageCalendar.getSelectedDate){
              if(this.marriageCalendar.getSelectedYear
                && this.marriageCalendar.isLeapYear(Number(this.marriageCalendar.getSelectedYear))){
                if(Number(this.marriageCalendar.getSelectedDate) > 29){
                  this.marriageCalendar.setSelectedDate = null//"29";
                }
              }
              else if(Number(this.marriageCalendar.getSelectedDate) > 28){
                this.marriageCalendar.setSelectedDate = null//"28";
              }
            }
          }else if(this.marriageCalendar.getSelectedMonth == "4"
            || this.marriageCalendar.getSelectedMonth == "6"
            || this.marriageCalendar.getSelectedMonth == "9"
            || this.marriageCalendar.getSelectedMonth == "11"){
              if(this.marriageCalendar.getSelectedDate && Number(this.marriageCalendar.getSelectedDate) > 30){
                  this.marriageCalendar.setSelectedDate = null//"30";
              }
          }
        }
      }
    });
  }

  selectTravelCalendar(type:number){
    let popover:any;
    if(type == Constants.CALENDAR_DATE){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_DATE,data:this.travelCalendar.dates});
      popover.present({
        //ev:myEvent
      });

      
    }else if(type == Constants.CALENDAR_MONTH){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MONTH,data:this.travelCalendar.monthNames});
      popover.present({
        //ev:myEvent
      });
    }else if(type == Constants.CALENDAR_YEAR){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_YEAR,data:this.travelCalendar.year});
      popover.present({
        //ev:myEvent
      });
    }

    popover.onDidDismiss(popOverData=>{
      if(!popOverData){
        return;
      }

      if(type == Constants.CALENDAR_DATE){
        this.travelCalendar.setSelectedDate = popOverData.item;
      }else if(type == Constants.CALENDAR_MONTH){
        //get month nummber from name
        this.travelCalendar.setSelectedMonth = this.travelCalendar.getMonthNumberFromName(popOverData.item);
        //this.travelCalendar.setSelectedMonth=popOverData.item;
        if(this.travelCalendar.selectedYear
          && this.travelCalendar.selectedDate
          && Number(this.travelCalendar.selectedYear) == this.travelCalendar.currentYear
          && Number(this.travelCalendar.selectedMonth) == this.travelCalendar.currentMonth
          && Number(this.travelCalendar.selectedDate) > this.travelCalendar.currentDate){
              this.travelCalendar.selectedDate = null;
         }else if(this.travelCalendar.getSelectedMonth == "2"){
          if(this.travelCalendar.getSelectedYear
            && this.travelCalendar.isLeapYear(Number(this.travelCalendar.getSelectedYear))){
            if(Number(this.travelCalendar.getSelectedDate) > 29){
              this.travelCalendar.setSelectedDate = null//"29";
            }
          }
          else if(this.travelCalendar.getSelectedDate && Number(this.travelCalendar.getSelectedDate) > 28){
              this.travelCalendar.setSelectedDate = null//"28";
          }
        }else if(this.travelCalendar.getSelectedMonth == "4"
          || this.travelCalendar.getSelectedMonth == "6"
          || this.travelCalendar.getSelectedMonth == "9"
          || this.travelCalendar.getSelectedMonth == "11"){
            if(this.travelCalendar.getSelectedDate && Number(this.travelCalendar.getSelectedDate) > 30){
                this.travelCalendar.setSelectedDate = null//"30";
            }
        }
      }else if(type == Constants.CALENDAR_YEAR){
        this.travelCalendar.setSelectedYear=popOverData.item;
             
          if(this.travelCalendar.getSelectedMonth){

          if(Number(this.travelCalendar.getSelectedYear) == this.travelCalendar.currentYear){
            if(Number(this.travelCalendar.getSelectedMonth) > this.travelCalendar.currentMonth){
              this.travelCalendar.setSelectedMonth = null
            }else if(Number(this.travelCalendar.getSelectedMonth) == this.travelCalendar.currentMonth){
              if(this.travelCalendar.getSelectedDate 
                && (Number(this.travelCalendar.getSelectedDate) > this.travelCalendar.currentDate)){
                this.travelCalendar.setSelectedDate = null
              }
            }
          }
          else if(this.travelCalendar.getSelectedMonth == "2"){
            if(this.travelCalendar.getSelectedDate){
              if(this.travelCalendar.getSelectedYear
                && this.travelCalendar.isLeapYear(Number(this.travelCalendar.getSelectedYear))){
                if(Number(this.travelCalendar.getSelectedDate) > 29){
                  this.travelCalendar.setSelectedDate = null//"29";
                }
              }
              else if(Number(this.travelCalendar.getSelectedDate) > 28){
                this.travelCalendar.setSelectedDate = null//"28";
              }
            }
          }else if(this.travelCalendar.getSelectedMonth == "4"
            || this.travelCalendar.getSelectedMonth == "6"
            || this.travelCalendar.getSelectedMonth == "9"
            || this.travelCalendar.getSelectedMonth == "11"){
              if(this.travelCalendar.getSelectedDate && Number(this.travelCalendar.getSelectedDate) > 30){
                  this.travelCalendar.setSelectedDate = null//"30";
              }
          }
        }
      }
    });
  }

  selectCallCalendar(type:number){
    let popover:any;
    if(type == Constants.CALENDAR_DATE){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_DATE,data:this.lastCallCalendar.dates});
      popover.present({
        //ev:myEvent
      });

      
    }else if(type == Constants.CALENDAR_MONTH){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MONTH,data:this.lastCallCalendar.monthNames});
      popover.present({
        //ev:myEvent
      });
    }else if(type == Constants.CALENDAR_YEAR){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_YEAR,data:this.lastCallCalendar.year});
      popover.present({
        //ev:myEvent
      });
    }

    popover.onDidDismiss(popOverData=>{
      if(!popOverData){
        return;
      }

      if(type == Constants.CALENDAR_DATE){
        this.lastCallCalendar.setSelectedDate = popOverData.item;
      }else if(type == Constants.CALENDAR_MONTH){
        //get month nummber from name
        this.lastCallCalendar.setSelectedMonth = this.lastCallCalendar.getMonthNumberFromName(popOverData.item);
        //this.lastCallCalendar.setSelectedMonth=popOverData.item;
        if(this.lastCallCalendar.selectedYear
          && this.lastCallCalendar.selectedDate
          && Number(this.lastCallCalendar.selectedYear) == this.lastCallCalendar.currentYear
          && Number(this.lastCallCalendar.selectedMonth) == this.lastCallCalendar.currentMonth
          && Number(this.lastCallCalendar.selectedDate) > this.lastCallCalendar.currentDate){
              this.lastCallCalendar.selectedDate = null;
         }else if(this.lastCallCalendar.getSelectedMonth == "2"){
          if(this.lastCallCalendar.getSelectedYear
            && this.lastCallCalendar.isLeapYear(Number(this.lastCallCalendar.getSelectedYear))){
            if(Number(this.lastCallCalendar.getSelectedDate) > 29){
              this.lastCallCalendar.setSelectedDate = null//"29";
            }
          }
          else if(this.lastCallCalendar.getSelectedDate && Number(this.lastCallCalendar.getSelectedDate) > 28){
              this.lastCallCalendar.setSelectedDate = null//"28";
          }
        }else if(this.lastCallCalendar.getSelectedMonth == "4"
          || this.lastCallCalendar.getSelectedMonth == "6"
          || this.lastCallCalendar.getSelectedMonth == "9"
          || this.lastCallCalendar.getSelectedMonth == "11"){
            if(this.lastCallCalendar.getSelectedDate && Number(this.lastCallCalendar.getSelectedDate) > 30){
                this.lastCallCalendar.setSelectedDate = null//"30";
            }
        }
      }else if(type == Constants.CALENDAR_YEAR){
        this.lastCallCalendar.setSelectedYear=popOverData.item;
             
          if(this.lastCallCalendar.getSelectedMonth){

          if(Number(this.lastCallCalendar.getSelectedYear) == this.lastCallCalendar.currentYear){
            if(Number(this.lastCallCalendar.getSelectedMonth) > this.lastCallCalendar.currentMonth){
              this.lastCallCalendar.setSelectedMonth = null
            }else if(Number(this.lastCallCalendar.getSelectedMonth) == this.lastCallCalendar.currentMonth){
              if(this.lastCallCalendar.getSelectedDate 
                && (Number(this.lastCallCalendar.getSelectedDate) > this.lastCallCalendar.currentDate)){
                this.lastCallCalendar.setSelectedDate = null
              }
            }
          }
          else if(this.lastCallCalendar.getSelectedMonth == "2"){
            if(this.lastCallCalendar.getSelectedDate){
              if(this.lastCallCalendar.getSelectedYear
                && this.lastCallCalendar.isLeapYear(Number(this.lastCallCalendar.getSelectedYear))){
                if(Number(this.lastCallCalendar.getSelectedDate) > 29){
                  this.lastCallCalendar.setSelectedDate = null//"29";
                }
              }
              else if(Number(this.lastCallCalendar.getSelectedDate) > 28){
                this.lastCallCalendar.setSelectedDate = null//"28";
              }
            }
          }else if(this.lastCallCalendar.getSelectedMonth == "4"
            || this.lastCallCalendar.getSelectedMonth == "6"
            || this.lastCallCalendar.getSelectedMonth == "9"
            || this.lastCallCalendar.getSelectedMonth == "11"){
              if(this.lastCallCalendar.getSelectedDate && Number(this.lastCallCalendar.getSelectedDate) > 30){
                  this.lastCallCalendar.setSelectedDate = null//"30";
              }
          }
        }
      }
    });
  }

  selectDemiseCalendar(type:number){
    let popover:any;
    if(type == Constants.CALENDAR_DATE){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_DATE,data:this.demiseCalendar.dates});
      popover.present({
        //ev:myEvent
      });

      
    }else if(type == Constants.CALENDAR_MONTH){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MONTH,data:this.demiseCalendar.monthNames});
      popover.present({
        //ev:myEvent
      });
    }else if(type == Constants.CALENDAR_YEAR){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_YEAR,data:this.demiseCalendar.year});
      popover.present({
        //ev:myEvent
      });
    }

    popover.onDidDismiss(popOverData=>{
      if(!popOverData){
        return;
      }

      if(type == Constants.CALENDAR_DATE){
        this.demiseCalendar.setSelectedDate = popOverData.item;
      }else if(type == Constants.CALENDAR_MONTH){
        //get month nummber from name
        this.demiseCalendar.setSelectedMonth = this.demiseCalendar.getMonthNumberFromName(popOverData.item);
        //this.demiseCalendar.setSelectedMonth=popOverData.item;
        if(this.demiseCalendar.selectedYear
          && this.demiseCalendar.selectedDate
          && Number(this.demiseCalendar.selectedYear) == this.demiseCalendar.currentYear
          && Number(this.demiseCalendar.selectedMonth) == this.demiseCalendar.currentMonth
          && Number(this.demiseCalendar.selectedDate) >= this.demiseCalendar.currentDate){
              this.demiseCalendar.selectedDate = null;
         }else if(this.demiseCalendar.getSelectedMonth == "2"){
          if(this.demiseCalendar.getSelectedYear
            && this.demiseCalendar.isLeapYear(Number(this.demiseCalendar.getSelectedYear))){
            if(Number(this.demiseCalendar.getSelectedDate) > 29){
              this.demiseCalendar.setSelectedDate = null//"29";
            }
          }
          else if(this.demiseCalendar.getSelectedDate && Number(this.demiseCalendar.getSelectedDate) > 28){
              this.demiseCalendar.setSelectedDate = null//"28";
          }
        }else if(this.demiseCalendar.getSelectedMonth == "4"
          || this.demiseCalendar.getSelectedMonth == "6"
          || this.demiseCalendar.getSelectedMonth == "9"
          || this.demiseCalendar.getSelectedMonth == "11"){
            if(this.demiseCalendar.getSelectedDate && Number(this.demiseCalendar.getSelectedDate) > 30){
                this.demiseCalendar.setSelectedDate = null//"30";
            }
        }
      }else if(type == Constants.CALENDAR_YEAR){
        this.demiseCalendar.setSelectedYear=popOverData.item;
             
          if(this.demiseCalendar.getSelectedMonth){

          if(Number(this.demiseCalendar.getSelectedYear) == this.demiseCalendar.currentYear){
            if(Number(this.demiseCalendar.getSelectedMonth) > this.demiseCalendar.currentMonth){
              this.demiseCalendar.setSelectedMonth = null
            }else if(Number(this.demiseCalendar.getSelectedMonth) == this.demiseCalendar.currentMonth){
              if(this.demiseCalendar.getSelectedDate 
                && (Number(this.demiseCalendar.getSelectedDate) >= this.demiseCalendar.currentDate)){
                this.demiseCalendar.setSelectedDate = null
              }
            }
          }
          else if(this.demiseCalendar.getSelectedMonth == "2"){
            if(this.demiseCalendar.getSelectedDate){
              if(this.demiseCalendar.getSelectedYear
                && this.demiseCalendar.isLeapYear(Number(this.demiseCalendar.getSelectedYear))){
                if(Number(this.demiseCalendar.getSelectedDate) > 29){
                  this.demiseCalendar.setSelectedDate = null//"29";
                }
              }
              else if(Number(this.demiseCalendar.getSelectedDate) > 28){
                this.demiseCalendar.setSelectedDate = null//"28";
              }
            }
          }else if(this.demiseCalendar.getSelectedMonth == "4"
            || this.demiseCalendar.getSelectedMonth == "6"
            || this.demiseCalendar.getSelectedMonth == "9"
            || this.demiseCalendar.getSelectedMonth == "11"){
              if(this.demiseCalendar.getSelectedDate && Number(this.demiseCalendar.getSelectedDate) > 30){
                  this.demiseCalendar.setSelectedDate = null//"30";
              }
          }
        }
      }
    });
  }

  selectChildCalendar(type:number){
    let popover:any;
    if(type == Constants.CALENDAR_DATE){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_DATE,data:this.childCalendar.dates});
      popover.present({
        //ev:myEvent
      });

      
    }else if(type == Constants.CALENDAR_MONTH){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MONTH,data:this.childCalendar.monthNames});
      popover.present({
        //ev:myEvent
      });
    }else if(type == Constants.CALENDAR_YEAR){
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_YEAR,data:this.childCalendar.year});
      popover.present({
        //ev:myEvent
      });
    }

    popover.onDidDismiss(popOverData=>{
      if(!popOverData){
        return;
      }

      if(type == Constants.CALENDAR_DATE){
        this.childCalendar.setSelectedDate = popOverData.item;
      }else if(type == Constants.CALENDAR_MONTH){
        //get month nummber from name
        this.childCalendar.setSelectedMonth = this.childCalendar.getMonthNumberFromName(popOverData.item);
        //this.childCalendar.setSelectedMonth=popOverData.item;
        if(this.childCalendar.selectedYear
          && this.childCalendar.selectedDate
          && Number(this.childCalendar.selectedYear) == this.childCalendar.currentYear
          && Number(this.childCalendar.selectedMonth) == this.childCalendar.currentMonth
          && Number(this.childCalendar.selectedDate) >= this.childCalendar.currentDate){
              this.childCalendar.selectedDate = null;
         }else if(this.childCalendar.getSelectedMonth == "2"){
          if(this.childCalendar.getSelectedYear
            && this.childCalendar.isLeapYear(Number(this.childCalendar.getSelectedYear))){
            if(Number(this.childCalendar.getSelectedDate) > 29){
              this.childCalendar.setSelectedDate = null//"29";
            }
          }
          else if(this.childCalendar.getSelectedDate && Number(this.childCalendar.getSelectedDate) > 28){
              this.childCalendar.setSelectedDate = null//"28";
          }
        }else if(this.childCalendar.getSelectedMonth == "4"
          || this.childCalendar.getSelectedMonth == "6"
          || this.childCalendar.getSelectedMonth == "9"
          || this.childCalendar.getSelectedMonth == "11"){
            if(this.childCalendar.getSelectedDate && Number(this.childCalendar.getSelectedDate) > 30){
                this.childCalendar.setSelectedDate = null//"30";
            }
        }
      }else if(type == Constants.CALENDAR_YEAR){
        this.childCalendar.setSelectedYear=popOverData.item;
             
          if(this.childCalendar.getSelectedMonth){

          if(Number(this.childCalendar.getSelectedYear) == this.childCalendar.currentYear){
            if(Number(this.childCalendar.getSelectedMonth) > this.childCalendar.currentMonth){
              this.childCalendar.setSelectedMonth = null
            }else if(Number(this.childCalendar.getSelectedMonth) == this.childCalendar.currentMonth){
              if(this.childCalendar.getSelectedDate 
                && (Number(this.childCalendar.getSelectedDate) >= this.childCalendar.currentDate)){
                this.childCalendar.setSelectedDate = null
              }
            }
          }
          else if(this.childCalendar.getSelectedMonth == "2"){
            if(this.childCalendar.getSelectedDate){
              if(this.childCalendar.getSelectedYear
                && this.childCalendar.isLeapYear(Number(this.childCalendar.getSelectedYear))){
                if(Number(this.childCalendar.getSelectedDate) > 29){
                  this.childCalendar.setSelectedDate = null//"29";
                }
              }
              else if(Number(this.childCalendar.getSelectedDate) > 28){
                this.childCalendar.setSelectedDate = null//"28";
              }
            }
          }else if(this.childCalendar.getSelectedMonth == "4"
            || this.childCalendar.getSelectedMonth == "6"
            || this.childCalendar.getSelectedMonth == "9"
            || this.childCalendar.getSelectedMonth == "11"){
              if(this.childCalendar.getSelectedDate && Number(this.childCalendar.getSelectedDate) > 30){
                  this.childCalendar.setSelectedDate = null//"30";
              }
          }
        }
      }
    });
  }

  selectTime(typeFor:number,timeType:number){
    
    switch(typeFor){
      case Constants.TIME_FOR_OWNER_DOB:
        this.selectOwnerDobTime(timeType);
      break;
      case Constants.TIME_FOR_MARRIAGE:
        this.selectMarriageTime(timeType);
      break;
      case Constants.TIME_FOR_TRAVEL:
        this.selectTravelTime(timeType);
      break;
      case Constants.TIME_FOR_CALL:
        this.selectCallTime(timeType);
      break;
      case Constants.TIME_FOR_DEMISE:
        this.selectDemiseTime(timeType);
      break;
      case Constants.TIME_FOR_CHILD:
        this.selectChildTime(timeType);
      break;
    
    }
  }

  selectOwnerDobTime(timeType:number){
 
    let popover:any;
    if(timeType == Constants.TIME_HOUR){
     popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_HOUR,data:this.ownerDobTime.getHours});
        popover.present({
          //ev:myEvent
        });
     
    }else if(timeType == Constants.TIME_MIN){
     
        popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MIN,data:this.ownerDobTime.getMin});
          popover.present({
            //ev:myEvent
          });
       
    }else if(timeType == Constants.TIME_SEC){
    
      
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_SEC,data:this.ownerDobTime.getSec});
          popover.present({
            //ev:myEvent
          });
       
    }else if(timeType == Constants.TIME_AM_PM){
      
       popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_AM_PM,data:this.ownerDobTime.getAmPm});
        popover.present({
          //ev:myEvent
        });
     
  }

      popover.onDidDismiss(popOverData=>{
        if(!popOverData){
          return;
        }

        if(timeType == Constants.TIME_HOUR){
          
            this.ownerDobTime.setSelectedHour = popOverData.item;
        
    
        }else if(timeType == Constants.TIME_MIN){
          
            this.ownerDobTime.setSelectedMin = popOverData.item;
      
        }else if(timeType == Constants.TIME_SEC){
          
            this.ownerDobTime.setSelectedSec = popOverData.item;
      
        }else if(timeType == Constants.TIME_AM_PM){
          
          this.ownerDobTime.setSelectedAmPm = popOverData.item;
    
      }

      });
    
  
  }

  selectMarriageTime(timeType:number){
    let popover:any;
    if(timeType == Constants.TIME_HOUR){
    
         popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_HOUR,data:this.marriageTime.getHours});
          popover.present({
            //ev:myEvent
          });
     
      
    }else if(timeType == Constants.TIME_MIN){
     
           popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MIN,data:this.marriageTime.getMin});
            popover.present({
              //ev:myEvent
            });
       
    }else if(timeType == Constants.TIME_SEC){
    
     
           popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_SEC,data:this.marriageTime.getSec});
            popover.present({
              //ev:myEvent
            });
       
    }else if(timeType == Constants.TIME_AM_PM){
        
         popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_AM_PM,data:this.marriageTime.getAmPm});
          popover.present({
            //ev:myEvent
          });
       
    }

      popover.onDidDismiss(popOverData=>{
        if(!popOverData){
          return;
        }

        if(timeType == Constants.TIME_HOUR){
            this.marriageTime.setSelectedHour = popOverData.item;
        }else if(timeType == Constants.TIME_MIN){
        
            this.marriageTime.setSelectedMin = popOverData.item;
         
      
        }else if(timeType == Constants.TIME_SEC){
         
            this.marriageTime.setSelectedSec = popOverData.item;
         
        }else if(timeType == Constants.TIME_AM_PM){
          
          this.marriageTime.setSelectedAmPm = popOverData.item;
    
      }

      });
    
  }

  selectTravelTime(timeType:number){
    let popover:any;
    if(timeType == Constants.TIME_HOUR){
      
         popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_HOUR,data:this.travelTime.getHours});
          popover.present({
            //ev:myEvent
          });
     
    }else if(timeType == Constants.TIME_MIN){
     
           popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MIN,data:this.travelTime.getMin});
            popover.present({
              //ev:myEvent
            });
      
    }else if(timeType == Constants.TIME_SEC){
    
   
          popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_SEC,data:this.travelTime.getSec});
            popover.present({
              //ev:myEvent
            });
       
    }else if(timeType == Constants.TIME_AM_PM){
        
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_AM_PM,data:this.travelTime.getAmPm});
         popover.present({
         //ev:myEvent
       });
    
    }


      popover.onDidDismiss(popOverData=>{
        if(!popOverData){
          return;
        }

        if(timeType == Constants.TIME_HOUR){
          
            this.travelTime.setSelectedHour = popOverData.item;
         
        }else if(timeType == Constants.TIME_MIN){
        
            this.travelTime.setSelectedMin = popOverData.item;
         
        }else if(timeType == Constants.TIME_SEC){
         
            this.travelTime.setSelectedSec = popOverData.item;
        
        }else if(timeType == Constants.TIME_AM_PM){
            this.travelTime.setSelectedAmPm = popOverData.item;
        }

      });
    
  }

  selectCallTime(timeType:number){
    let popover:any;
    if(timeType == Constants.TIME_HOUR){
     
        popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_HOUR,data:this.callTime.getHours});
          popover.present({
            //ev:myEvent
          });
     
    }else if(timeType == Constants.TIME_MIN){
     
          popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MIN,data:this.callTime.getMin});
            popover.present({
              //ev:myEvent
            });
      
    }else if(timeType == Constants.TIME_SEC){
    
     
          popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_SEC,data:this.callTime.getSec});
            popover.present({
              //ev:myEvent
            });
       
    }else if(timeType == Constants.TIME_AM_PM){
        
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_AM_PM,data:this.callTime.getAmPm});
         popover.present({
         //ev:myEvent
       });
    
    }


      popover.onDidDismiss(popOverData=>{
          if(!popOverData){
            return;
          }

          if(timeType == Constants.TIME_HOUR){
              this.callTime.setSelectedHour = popOverData.item;
                
          }else if(timeType == Constants.TIME_MIN){
          
              this.callTime.setSelectedMin = popOverData.item;
          
        
          }else if(timeType == Constants.TIME_SEC){
          
              this.callTime.setSelectedSec = popOverData.item;
          
          }else if(timeType == Constants.TIME_AM_PM){
            this.callTime.setSelectedAmPm = popOverData.item;
        }

      });
    
  }

  selectDemiseTime(timeType:number){
    let popover:any;
    if(timeType == Constants.TIME_HOUR){
     
        popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_HOUR,data:this.demiseTime.getHours});
          popover.present({
            //ev:myEvent
          });
      
    }else if(timeType == Constants.TIME_MIN){
     
          popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MIN,data:this.demiseTime.getMin});
            popover.present({
              //ev:myEvent
            });
        
    }else if(timeType == Constants.TIME_SEC){
    
     
          popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_SEC,data:this.demiseTime.getSec});
            popover.present({
              //ev:myEvent
            });
        
    }else if(timeType == Constants.TIME_AM_PM){
        
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_AM_PM,data:this.demiseTime.getAmPm});
         popover.present({
         //ev:myEvent
       });
    
    }


      popover.onDidDismiss(popOverData=>{
        if(!popOverData){
          return;
        }

        if(timeType == Constants.TIME_HOUR){
         
            this.demiseTime.setSelectedHour = popOverData.item;
          
    
        }else if(timeType == Constants.TIME_MIN){
         
            this.demiseTime.setSelectedMin = popOverData.item;
        
      
        }else if(timeType == Constants.TIME_SEC){
         
            this.demiseTime.setSelectedSec = popOverData.item;
          
      
        }else if(timeType == Constants.TIME_AM_PM){
          this.demiseTime.setSelectedAmPm = popOverData.item;
      }

      });
    
  }

  selectChildTime(timeType:number){
    let popover:any;
    if(timeType == Constants.TIME_HOUR){
     
        popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_HOUR,data:this.childTime.getHours});
          popover.present({
            //ev:myEvent
          });
      
    }else if(timeType == Constants.TIME_MIN){
     
          popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_MIN,data:this.childTime.getMin});
            popover.present({
              //ev:myEvent
            });
        
    }else if(timeType == Constants.TIME_SEC){
    
     
          popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_SEC,data:this.childTime.getSec});
            popover.present({
              //ev:myEvent
            });
        
    }else if(timeType == Constants.TIME_AM_PM){
        
      popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_AM_PM,data:this.childTime.getAmPm});
         popover.present({
         //ev:myEvent
       });
    
    }


      popover.onDidDismiss(popOverData=>{
        if(!popOverData){
          return;
        }

        if(timeType == Constants.TIME_HOUR){
         
            this.childTime.setSelectedHour = popOverData.item;
          
    
        }else if(timeType == Constants.TIME_MIN){
         
            this.childTime.setSelectedMin = popOverData.item;
        
      
        }else if(timeType == Constants.TIME_SEC){
         
            this.childTime.setSelectedSec = popOverData.item;
          
        }else if(timeType == Constants.TIME_AM_PM){
          this.childTime.setSelectedAmPm = popOverData.item;
      }

      });
    
  }

  getOwnderDobNative():string{
    if(this.ownerDOBCalendar){
      let defaultAdd:string = '0';
      let date:string = "00";
      let month:string = "00";
      let year : string = "00";
        if(this.ownerDOBCalendar.getSelectedDate){
          if(this.ownerDOBCalendar.getSelectedDate.toString().length == 1){
              date = "0" + this.ownerDOBCalendar.getSelectedDate;
            }else{
              date = this.ownerDOBCalendar.getSelectedDate.toString();
            }
        }else{
            date = "00";
        }

        if(this.ownerDOBCalendar.getSelectedMonth){
          if(this.ownerDOBCalendar.getSelectedMonth.toString().length ==1){
            month = "0".toString() + this.ownerDOBCalendar.getSelectedMonth.toString();
          }else{
            month = this.ownerDOBCalendar.getSelectedMonth.toString();
          }
        }else{
          month = "00".toString();
        }
        if(this.ownerDOBCalendar.getSelectedYearShort){
          year = this.ownerDOBCalendar.getSelectedYearShort.toString();
        }else{
          year = "00";
        }

        return date + month + year + "000000";
    }else{
      return "000000000000";
    }
  }

  getEventDate(calendar:MyCalendar):string{
    if(calendar){
      let date,month,year;
        if(calendar.getSelectedDate){
            if(calendar.getSelectedDate.toString().length == 1){
              date = "0" + calendar.getSelectedDate;
            }else{
              date = calendar.getSelectedDate;
            }
            
        }else{
          date = "00";
        }

        if(calendar.getSelectedMonth){
          if(calendar.getSelectedMonth.toString().length == 1){
            month = "0" + calendar.getSelectedMonth;
          }else{
            month = calendar.getSelectedMonth;
          }
        }else{
          month = "00";
        }

        if(calendar.getSelectedYearShort){
          year = calendar.getSelectedYearShort;
        }else{
          year = "00";
        }
        return date + month + year + "000000";
    }else{
      return "000000000000";
    }
  }

  getEventTime(myTime:MyTime):string{
    if(myTime){
        let hour,min,sec;
        if(myTime.getSelectedHour){
          if(myTime.getSelectedHour.toString().length == 1){
            hour = "0" + myTime.getSelectedHour;
          }else{
            hour = myTime.getSelectedHour;
          }
        }else{
          hour = "00";
        }

        if(myTime.getSelectedMin){
          if(myTime.getSelectedMin.toString().length == 1){
            min = "0" + myTime.getSelectedMin;
          }else{
            min = myTime.getSelectedMin;
          }
        }else{
          min =  "00";
        }

        if(myTime.getSelectedSec){
          if(myTime.getSelectedSec.toString().length == 1){
            sec = "0" + myTime.getSelectedSec;
          }else{
            sec = myTime.getSelectedSec;
          }
        }else{
          sec =  "00";
        }
      return "000000"+ hour + min + sec ;
    }else{
      return "000000000000";
    }
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

  // saveProfile(status:string){
  //   if(!this.validate()){
  //     return;
  //   }
  // }

  saveProfile(status:string){
      if(!this.validate()){
          return;
      }

      this.initiateLoder();
      this.loader.present();
      const req = new HoroscopeResponseData();
      if(this.type === Constants.UPDATE_HOROSCOPE){
        req.setHUserId = this.horoscopeData.getHUserId.toString().trim();
        req.setHId = this.horoscopeData.getHId.toString().trim();
        req.setHNativePhoto = this.horoscopeData.getHNativePhoto.toString().trim();
        req.setRectifieDdst = this.horoscopeData.getRectifiedDst;
        req.setRectifiedDate = this.horoscopeData.getRectifiedDate;
        req.setRectifiedTime = this.horoscopeData.getRectifiedTime;
        req.setRectifiedPlace = this.horoscopeData.getRectifiedPlace;
        req.setRectifiedLatitude = this.horoscopeData.getRectifiedLatitude;
        req.setRectifiedLatitudeNs = this.horoscopeData.getRectifiedLatitudeNs;
        req.setRectifiedLongtitude = this.horoscopeData.getRectifiedLongtitude;
        req.setRectifiedLongtitudeEw = this.horoscopeData.getRectifiedLongtitudeEw;
        req.setHPdf = this.horoscopeData.getHPdf;
        req.setLastRequestId = this.horoscopeData.getLastRequestId;
        req.setLastmessageId = this.horoscopeData.getLastMessageId;
        req.setLastWpDate = this.horoscopeData.getLastWpDate;
        req.setLastDpDate = this.horoscopeData.getLastDpDate;
        req.setHLocked = this.horoscopeData.getHLocked;
        req.setHRecDeleted = this.horoscopeData.getHRecDeleted;
        req.setHCreationDate = this.horoscopeData.getHCreationDate;
        req.setHRecDeletedD = this.horoscopeData.getHRecDeletedD;
        req.setHTotalTrue = this.horoscopeData.getHTotalTrue;
        req.setHTotalFalse = this.horoscopeData.getHTotalFalse;
        req.setHTotalPartial = this.horoscopeData.getHTotalPartial;
        req.setHUnique = this.horoscopeData.getHUnique;
        
      }else{
        req.setHUserId = this.horoscopeData.getHUserId;
        // req.setHCreationDate = (this.ownerDOBCalendar.currentDate).toString() 
        // + (this.ownerDOBCalendar.currentMonth).toString() 
        // + (this.ownerDOBCalendar.currentYear).toString();
        req.setHCreationDate = this.getCurrentDate(this.ownerDOBCalendar) + this.getCurrentTime(this.ownerDobTime);
      }
      req.setHStatus = "1";
      req.setHName = this.horoscopeData.getHName;
      req.setHGender = this.getGenderCode(this.horoscopeData.getHGender);
      req.setHDobNative = this.getOwnderDobNative();
      req.setHHours = (this.ownerDobTime && this.ownerDobTime.getSelectedHour)?Number(this.ownerDobTime.getSelectedHour):Number('00');
      req.setHMin = (this.ownerDobTime && this.ownerDobTime.getSelectedMin)?Number(this.ownerDobTime.getSelectedMin):Number('00');
      req.setHSs = (this.ownerDobTime && this.ownerDobTime.getSelectedSec)?Number(this.ownerDobTime.getSelectedSec):Number('00');
      req.setHAmpm = (this.ownerDobTime && this.ownerDobTime.getSelectedAmPm)?this.ownerDobTime.getSelectedAmPm:null;
      req.setHPlace = this.horoscopeData.getHPlace;
      req.setHLandmark = this.horoscopeData.getHLandmark;
      
      req.setHMarriageDate = this.getEventDate(this.marriageCalendar);
      req.setHMarriageTime = this.getEventTime(this.marriageTime);
      req.setHMarriageAmpm = (this.marriageTime && this.marriageTime.getSelectedAmPm)?this.marriageTime.getSelectedAmPm:null;
      req.setHMarriagePlace = (this.horoscopeData.getHMarriagePlace && this.horoscopeData.getHMarriagePlace != null && this.horoscopeData.getHMarriagePlace != 'null')?this.horoscopeData.getHMarriagePlace:"";
      req.setHFirstChildDate = this.getEventDate(this.childCalendar);
      req.setHFirstChildPlace = (this.horoscopeData.getHFirstChildPlace && this.horoscopeData.getHFirstChildPlace !=null && this.horoscopeData.getHFirstChildPlace != 'null')?this.horoscopeData.getHFirstChildPlace:"";
      req.setHFirstChildTime = this.getEventTime(this.childTime);
      req.setHFirstChildTimeAmpm = (this.childTime && this.childTime.getSelectedAmPm)?this.childTime.getSelectedAmPm:null;
      req.setHAtDate = this.getEventDate(this.travelCalendar);
      req.setHAtPlace = (this.horoscopeData.getHAtPlace && this.horoscopeData.getHAtPlace != null && this.horoscopeData.getHAtPlace != 'null')?this.horoscopeData.getHAtPlace:"";
      req.setHAtTime = this.getEventTime(this.travelTime);
      req.setHAtTAmpm = (this.travelTime && this.travelTime.getSelectedAmPm)?this.travelTime.getSelectedAmPm:null;
      req.setHAFlightNo = this.horoscopeData.getHAFlightNo;
      req.setHCrDate = this.getEventDate(this.lastCallCalendar);
      req.setHCrTime = this.getEventTime(this.callTime);
      req.setHCrPlace = (this.horoscopeData.getHCrPlace && this.horoscopeData.getHCrPlace != null && this.horoscopeData.getHCrPlace != 'null')?this.horoscopeData.getHCrPlace:"";
      req.setHCrTAmpm = (this.callTime && this.callTime.getSelectedAmPm)?this.callTime.getSelectedAmPm:null;
      req.setHDrr = (this.horoscopeData.getHDrr && this.horoscopeData.getHDrr!= null && this.horoscopeData.getHDrr != 'null')?this.horoscopeData.getHDrr:"";
      req.setHDrrP = (this.horoscopeData.getHDrrP && this.horoscopeData.getHDrrP != null && this.horoscopeData.getHDrrP != 'null')?this.horoscopeData.getHDrrP:"";
      req.setHDrrD = this.getEventDate(this.demiseCalendar);
      req.setHDrrT = this.getEventTime(this.demiseTime);
      req.setHDrrTAmpm = (this.demiseTime && this.demiseTime.getSelectedAmPm)?this.demiseTime.getSelectedAmPm:null;
      req.setLastWpDate = this.getCurrentDate(this.ownerDOBCalendar) + this.getCurrentTime(this.ownerDobTime);
      req.setLastDpDate = this.getCurrentDate(this.ownerDOBCalendar) + this.getCurrentTime(this.ownerDobTime);
      req.setHBIRTHORDER = this.childOrder.toString();

      //alert(JSON.stringify(req));

      
      console.log('the value of added file is', req);

      if(this.type === Constants.ADD_HOROSCOPE){
       // alert("DATA1: \n" + JSON.stringify(req));
        this.uploadFile(req);
      }else{
          if(this.horoscopeData.getHNativePhoto.toString() === this.horoscopeOrginalData.getHNativePhoto ){
            //alert("DATA2: \n" + JSON.stringify(req));
            this.updateHoroscopeOnlyData(req);
          }else{
            //alert("DATA3: \n" + JSON.stringify(req));
            this.uploadFile(req);
          }
      }
    
}


validate():boolean{
 
  let valid = true;
    if(this.horoscopeData.getHNativePhoto === this.imageURI){
      valid = false;
      if(this.slides){
        this.slides.slideTo(0,400);
      }

      //alert(strings.please_add_horoscope_image);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_add_horoscope_image,null);
      //this.isValidNativePhoto = false;
    }
    else if(!this.horoscopeData.getHName || this.horoscopeData.getHName.toString().length == 0){
      //alert(strings.please_enter_name);
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_enter_name,null);
      //this.isValidName = false;
      valid = false;
    }
    else if(!this.horoscopeData.getHGender || this.horoscopeData.getHGender.toString().length == 0){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      //alert(strings.please_select_gender);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_gender,null);
      //this.isValidGender = false;
      valid = false;
    }

    else if(!this.ownerDOBCalendar.getSelectedDate){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      //alert(strings.please_select_owner_dob_date);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_owner_dob_date,null);
      //this.isValidDOBDate = false;
      valid = false;
    } 

    else if(!this.ownerDOBCalendar.getSelectedMonth){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      //alert(strings.please_select_owner_dob_month);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_owner_dob_month,null);
      //this.isValidDOBMonth = false;
      valid = false;
    } 

    else if(!this.ownerDOBCalendar.getSelectedYear){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      //alert(strings.please_select_owner_dob_year);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_owner_dob_year,null);
      //this.isValidDOBYear = false;
      valid = false;
    } 

    else if(!this.ownerDobTime.getSelectedHour){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
     // alert(strings.please_select_owner_dob_hour);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_owner_dob_hour,null);
      //this.isValidDOBHours = false;
      valid = false;
    }

    else if(!this.ownerDobTime.getSelectedMin){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      //alert(strings.please_select_owner_dob_min);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_owner_dob_min,null);
      //this.isValidDOBMin = false;
      valid = false;
    }

    else if(!this.ownerDobTime.getSelectedSec){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      //alert(strings.please_select_owner_dob_sec);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_owner_dob_sec,null);
      //this.isValidDOBSec = false;
      valid = false;
    }

    else if(!this.ownerDobTime.getSelectedAmPm){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      //alert(strings.please_select_owner_dob_am_pm);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_owner_dob_am_pm,null);
      //this.isValidDOBAmpm = false;
      valid = false;
    }

    else if(!this.horoscopeData.getHPlace || this.horoscopeData.getHPlace.toString().length == 0){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      //alert(strings.please_select_palce_of_birth);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_palce_of_birth,null);
      //this.isValidDOBPlace = false;
      valid = false;
    }

    else if(!this.horoscopeData.getHLandmark || this.horoscopeData.getHLandmark.toString().length == 0){
      if(this.slides){
        this.slides.slideTo(0,400);
      }
      //alert(strings.please_select_nearest_landmark_for_palce_of_birth);
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.please_select_nearest_landmark_for_palce_of_birth,null);
      //this.isValidLandmark = false;
      valid = false;
    }


    // if(!this.ownerDobTime.getSelectedHour ||  !this.ownerDobTime.getSelectedMin || !this.ownerDobTime.getSelectedSec){
    //   alert(strings.please_select_time_of_birth);
    //   valid = false;
    // }else if(!this.horoscopeData.getHPlace || this.horoscopeData.getHPlace.toString().length == 0){
    //   alert(strings.please_select_palce_of_birth);
    //   valid = false;
    // }else if(!this.horoscopeData.getHLandmark || this.horoscopeData.getHLandmark.toString().length == 0){
    //   alert(strings.please_select_nearest_landmark_for_palce_of_birth);
    //   valid = false;
    // }

  //   if(this.marriageCalendar && (this.marriageCalendar.getSelectedDate || this.marriageCalendar.getSelectedMonth || this.marriageCalendar.getSelectedYear)){
  //       if(!this.marriageCalendar.getSelectedDate){
  //         //alert(strings.please_select_marriage_date);
  //         this.isValidMarriageDate = false;
  //         valid = false;
  //       }if(!this.marriageCalendar.getSelectedMonth){
  //         //alert(strings.please_select_marriage_month);
  //         this.isValidMarriageMonth = false;
  //         valid = false;
  //       }if(!this.marriageCalendar.getSelectedYear){
  //         //alert(strings.please_select_marriage_year);
  //         this.isValidMarriageYear = false;
  //         valid = false;
  //       }
  //   }

  //   if(this.marriageTime && (this.marriageTime.getSelectedHour 
  //     || this.marriageTime.getSelectedMin 
  //     || this.marriageTime.getSelectedSec 
  //     || this.marriageTime.getSelectedAmPm)){
  //     if(!this.marriageTime.getSelectedHour){
  //       //alert(strings.please_select_marriage_date);
  //       this.isValidMarriageHours = false;
  //       valid = false;
  //     }
  //     if(!this.marriageTime.getSelectedMin){
  //       //alert(strings.please_select_marriage_month);
  //       this.isValidMarriageMin = false;
  //       valid = false;
  //     }
  //     if(!this.marriageTime.getSelectedSec){
  //       //alert(strings.please_select_marriage_year);
  //       this.isValidMarriageSec = false;
  //       valid = false;
  //     }
  //     if(!this.marriageTime.getSelectedAmPm){
  //       //alert(strings.please_select_marriage_year);
  //       this.isValidMarriageAmpm = false;
  //       valid = false;
  //     }
  // }

  //   if(this.childCalendar && (this.childCalendar.getSelectedDate || this.childCalendar.getSelectedMonth || this.childCalendar.getSelectedYear)){
  //       if(!this.childCalendar.getSelectedDate){
  //       // alert(strings.please_select_child_birth_date);
  //       this.isValidChildBirthDate = false;
  //         valid = false;
  //       }if(!this.childCalendar.getSelectedMonth){
  //         //alert(strings.please_select_child_birth_month);
  //         this.isValidChildBirthMonth = false;
  //         valid = false;
  //       }if(!this.childCalendar.getSelectedYear){
  //         //alert(strings.please_select_child_birth_year);
  //         this.isValidChildBirthYear = false;
  //         valid = false;
  //       }
  //   }

  //   if(this.childTime && (this.childTime.getSelectedHour 
  //     || this.childTime.getSelectedMin 
  //     || this.childTime.getSelectedSec 
  //     || this.childTime.getSelectedAmPm)){
  //       if(!this.childTime.getSelectedHour){
  //         this.isValidChildBirthHours = false;
  //         valid = false;
  //       }
  //       if(!this.childTime.getSelectedMin){
  //         this.isValidChildBirthMin = false;
  //         valid = false;
  //       }
  //       if(!this.childTime.getSelectedSec){
  //         this.isValidChildBirthSec = false;
  //         valid = false;
  //       }
  //       if(!this.childTime.getSelectedAmPm){
  //         this.isValidChildBirthAmpm = false;
  //         valid = false;
  //       }
  //   }

  //   if(this.travelCalendar && (this.travelCalendar.getSelectedDate || this.travelCalendar.getSelectedMonth || this.travelCalendar.getSelectedYear)){
  //       if(!this.travelCalendar.getSelectedDate){
  //         //alert(strings.please_select_travel_date);
  //         this.isValidTravelDate = false;
  //         valid = false;
  //       }if(!this.travelCalendar.getSelectedMonth){
  //         //alert(strings.please_select_travel_month);
  //         this.isValidTravelMonth = false;
  //         valid = false;
  //       }if(!this.travelCalendar.getSelectedYear){
  //         //alert(strings.please_select_travel_year);
  //         this.isValidTravelYear = false;
  //         valid = false;
  //       }
  //   }

  //   if(this.travelTime && (this.travelTime.getSelectedHour 
  //     || this.travelTime.getSelectedMin 
  //     || this.travelTime.getSelectedSec 
  //     || this.travelTime.getSelectedAmPm)){
  //       if(!this.travelTime.getSelectedHour){
  //         this.isValidTravelHours = false;
  //         valid = false;
  //       }
  //       if(!this.travelTime.getSelectedMin){
  //         this.isValidTravelMin = false;
  //         valid = false;
  //       }
  //       if(!this.travelTime.getSelectedSec){
  //         this.isValidTravelSec = false;
  //         valid = false;
  //       }
  //       if(!this.travelTime.getSelectedAmPm){
  //         this.isValidTravelAmpm = false;
  //         valid = false;
  //       }
  //   }

  //   if(this.lastCallCalendar && (this.lastCallCalendar.getSelectedDate || this.lastCallCalendar.getSelectedMonth || this.lastCallCalendar.getSelectedYear)){
  //       if(!this.lastCallCalendar.getSelectedDate){
  //         // alert(strings.please_select_call_date);
  //         this.isValidCallDate = false;
  //         valid = false;
  //       }if(!this.lastCallCalendar.getSelectedMonth){
  //         //alert(strings.please_select_call_month);
  //         this.isValidCallMonth = false;
  //         valid = false;
  //       }if(!this.lastCallCalendar.getSelectedYear){
  //         //alert(strings.please_select_call_year);
  //         this.isValidCallYear = false;
  //         valid = false;
  //       }
  //   }

  //   if(this.callTime && (this.callTime.getSelectedHour 
  //     || this.callTime.getSelectedMin 
  //     || this.callTime.getSelectedSec 
  //     || this.callTime.getSelectedAmPm)){
  //       if(!this.callTime.getSelectedHour){
  //         this.isValidCallHours = false;
  //         valid = false;
  //       }
  //       if(!this.callTime.getSelectedMin){
  //         this.isValidCallMin = false;
  //         valid = false;
  //       }
  //       if(!this.callTime.getSelectedSec){
  //         this.isValidCallSec = false;
  //         valid = false;
  //       }
  //       if(!this.callTime.getSelectedAmPm){
  //         this.isValidCallAmpm = false;
  //         valid = false;
  //       }
  //   }

  //   if(this.demiseCalendar && (this.demiseCalendar.getSelectedDate || this.demiseCalendar.getSelectedMonth || this.demiseCalendar.getSelectedYear)){
  //       if(!this.demiseCalendar.getSelectedDate){
  //         // alert(strings.please_select_demise_date);
  //         this.isValidDemiseDate = false;
  //         valid = false;
  //       }if(!this.demiseCalendar.getSelectedMonth){
  //         // alert(strings.please_select_demise_month);
  //         this.isValidDemiseMonth = false;
  //         valid = false;
  //       }if(!this.demiseCalendar.getSelectedYear){
  //         // alert(strings.please_select_demise_year);
  //         this.isValidDemiseYear = false;
  //         valid = false;
  //       }
  //   }

  //   if(this.demiseTime && (this.demiseTime.getSelectedHour 
  //     || this.demiseTime.getSelectedMin 
  //     || this.demiseTime.getSelectedSec 
  //     || this.demiseTime.getSelectedAmPm)){
  //       if(!this.demiseTime.getSelectedHour){
  //         this.isValidDemiseHours = false;
  //         valid = false;
  //       }
  //       if(!this.demiseTime.getSelectedMin){
  //         this.isValidDemiseMin = false;
  //         valid = false;
  //       }
  //       if(!this.demiseTime.getSelectedSec){
  //         this.isValidDemiseSec = false;
  //         valid = false;
  //       }
  //       if(!this.demiseTime.getSelectedAmPm){
  //         this.isValidDemiseAmpm = false;
  //         valid = false;
  //       }
  //   }
      
    return valid;
}

uploadFile(req:HoroscopeResponseData) {

    let filename = req.getHUserId.toString().trim() + new Date().getTime().toString() + '.jpg';
    const fileTransfer:FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'hNativePhoto',
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
       headers: {'TOKEN':this.serverToken},
      //           'Content-Type':'multipart/form-data'},
      params : {
        "HUSERID": req.getHUserId,
        "HID": (req.getHId)?req.getHId:"", 
        "HNAME": req.getHName,
        "HGENDER": req.getHGender,
        "HDOBNATIVE": req.getHDobNative,
        "HHOURS": req.getHHours,
        "HMIN": req.getHMin,
        "HSS": req.getHSs,
        "HAMPM": req.getHAmpm,
        "HPLACE": req.getHPlace,
        "HLANDMARK": req.getHLandmark,
        "HMARRIAGEDATE": this.checkDateTimeNotBlank(req.getHMarriageDate),
        "HMARRIAGEPLACE": req.getHMarriagePlace,
        "HMARRIAGETIME": this.checkDateTimeNotBlank(req.getHMarriageTime),
        "HMARRIAGEAMPM": req.getHMarriageAmpm,
        "HFIRSTCHILDDATE": this.checkDateTimeNotBlank(req.getHFirstChildDate),
        "HFIRSTCHILDPLACE": req.getHFirstChildPlace,
        "HFIRSTCHILDTIME": this.checkDateTimeNotBlank(req.getHFirstChildTime),
        "HFIRSTCHILDTIMEAMPM": req.getHFirstChildTimeAmpm,
        "HATDATE": this.checkDateTimeNotBlank(req.getHAtDate),
        "HATPLACE": req.getHAtPlace,
        "HATTIME": this.checkDateTimeNotBlank(req.getHAtTime),
        "HATTAMPM": req.getHAtTAmpm,
        "HAFLIGHTNO": req.getHAFlightNo,
        "HCRDATE": this.checkDateTimeNotBlank(req.getHCrDate),
        "HCRTIME": this.checkDateTimeNotBlank(req.getHCrTime),
        "HCRPLACE": req.getHCrPlace,
        "HCRTAMPM": req.getHCrTAmpm,
        "HDRR": req.getHDrr,
        "HDRRD": this.checkDateTimeNotBlank(req.getHDrrD),
        "HDRRT": this.checkDateTimeNotBlank(req.getHDrrT),
        "HDRRP": req.getHDrrP,
        "HDRRTAMPM": req.getHDrrTAmpm,
        "RECTIFIEDDST": req.getRectifiedDst,
        "RECTIFIEDDATE": this.checkDateTimeNotBlank(req.getRectifiedDate),
        "RECTIFIEDTIME": this.checkDateTimeNotBlank(req.getRectifiedTime),
        "RECTIFIEDPLACE": req.getRectifiedPlace,
        "RECTIFIEDLONGTITUDE": req.getRectifiedLongtitude,
        "RECTIFIEDLONGTITUDEEW": req.getRectifiedLongtitudeEw,
        "RECTIFIEDLATITUDE": req.getRectifiedLatitude,
        "RECTIFIEDLATITUDENS": req.getRectifiedLatitudeNs,
        "HPDF": req.getHPdf,
        "LASTREQUESTID": req.getLastRequestId,
        "LASTMESSAGEID": req.getLastMessageId,
        "LASTWPDATE": this.checkDateTimeNotBlank(req.getLastWpDate),
        "LASTDPDATE": this.checkDateTimeNotBlank(req.getLastDpDate),
        "HLOCKED": req.getHLocked,
        "HRECDELETED": req.getHRecDeleted,
        "HCREATIONDATE": this.checkDateTimeNotBlank(req.getHCreationDate),
        "HRECDELETEDD": req.getHRecDeletedD,
        "HTOTALTRUE": req.getHTotalTrue,
        "HTOTALFALSE": req.getHTotalFalse,
        "HTOTALPARTIAL": req.getHTotalPartial,
        "HUNIQUE": req.getHUnique,
        "HSTATUS": req.getHStatus,
        "HBIRTHORDER":req.getHBIRTHORDER
      }

    }


    if(this.type === Constants.ADD_HOROSCOPE){
      this.addHoroscopeApi(this.horoscopeData.getHNativePhoto,fileTransfer,options);
    }else{
      this.updateHoroscopeApi(this.horoscopeData.getHNativePhoto,fileTransfer,options);
    }

 }

  checkDateTimeNotBlank(dateTime:string):string{
    return (dateTime && dateTime != Constants.BLANK_DATE_TIME)?dateTime:"";
  }

  checkAmPmNotBlank(ampm:string){
    return (ampm && ampm != null)?ampm:"";
  }



  addHoroscopeApi(image:string,fileTransfer:FileTransferObject,options:FileUploadOptions){
    //alert("ADD");
    fileTransfer.upload(image, 'http://49.50.103.132/LetterHead/api/horoscope/addNew', options)
    .then((response) => {
        //alert(JSON.stringify(response));
      this.loader.dismiss();
      let data : AddHoroscopeResponse;
        if(response.response){
          data = new AddHoroscopeResponse(JSON.stringify(JSON.parse(response.response)));
        }else{
          data = new AddHoroscopeResponse(JSON.stringify(response));
        }
      //let data : AddHoroscopeResponse = new AddHoroscopeResponse(JSON.stringify(JSON.parse(response.response)));
     // alert('RES ' +JSON.stringify(JSON.parse(response.response)));
      //alert('DATA ' + data.getMessage);

        if(data && data.getStatus === 'Success'){

            if(data.getData){
              //save data in storage
              //this.userData = response

              //alert(data.getMessage);
              this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,data.getMessage,null);
              //update horoscope list in last page
              this.updateHoroscopeListData();
            }else{
              this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,data.getMessage,null);
              //alert(data.getMessage);
            }
        }else{
          if(data && data.getMessage){
            this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,data.getMessage,null);
            //alert(data.getMessage);
          }
        }
    }, (err) => {
      //console.log(err);
      this.loader.dismiss();
      //this.presentToast(JSON.stringify(err));
      //alert('ERROR '+JSON.stringify(err));
      this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,JSON.stringify(err),null);
    });
  }

  updateHoroscopeApi(image:string,fileTransfer:FileTransferObject,options:FileUploadOptions){
    //alert("UPDATE API");
      fileTransfer.upload(image, 'http://49.50.103.132/LetterHead/api/horoscope/updateHoroscope', options)

      //fileTransfer.upload(this.userData.user_image, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((response) => {
        //alert(JSON.stringify(JSON.parse(response.response)));
        this.loader.dismiss();
        let data : AddHoroscopeResponse;
        if(response.response){
          data = new AddHoroscopeResponse(JSON.stringify(JSON.parse(response.response)));
        }else{
          data = new AddHoroscopeResponse(JSON.stringify(response));
        }
        //let data : AddHoroscopeResponse = new AddHoroscopeResponse(JSON.stringify(JSON.parse(response.response)));
        if(data && data.getStatus === 'Success'){
            if(data.getData && data.getData){
              //save data in storage
              //this.userData = response
             // alert(data.getMessage);
              this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,data.getMessage,null);
              //update horoscope list in last page
              this.updateHoroscopeListData();
            }else{
              //alert(data.getMessage);
              this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,data.getMessage,null);
            }
        }else{
          if(data && data.getMessage){
            //alert(data.getMessage);
            this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,data.getMessage,null);
          }
        }
        // if(data && data.response){
        //   let res = <LoginResponse>JSON.parse(data.response);
        //   if(res.getStatus == 'Success'){
            
        //   }
        //   alert('SUCCESS DATA'+JSON.stringify(res));
        // }

      //alert('UPDATE SUCCESS '+JSON.stringify(data));
      }, (err) => {
        //console.log(err);
        this.loader.dismiss();
        //this.presentToast(JSON.stringify(err));
        //alert('ERROR '+JSON.stringify(err));
        this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,JSON.stringify(err),null);
      });
  }

 updateHoroscopeOnlyData(req:any){
  let postData = new FormData();
      postData.append("HUSERID", req.getHUserId);
      postData.append("HID", req.getHId);
      postData.append("HNAME", req.getHName);
      postData.append("HGENDER", req.getHGender);
      postData.append("HDOBNATIVE", req.getHDobNative);
      postData.append("HHOURS", req.getHHours);
      postData.append("HMIN", req.getHMin);
      postData.append("HSS", req.getHSs);
      postData.append("HAMPM", req.getHAmpm);
      postData.append("HPLACE", req.getHPlace);
      postData.append("HLANDMARK", req.getHLandmark);
      postData.append("HMARRIAGEDATE", this.checkDateTimeNotBlank(req.getHMarriageDate));
      postData.append("HMARRIAGEPLACE", req.getHMarriagePlace);
      postData.append("HMARRIAGETIME", this.checkDateTimeNotBlank(req.getHMarriageTime));
      postData.append("HMARRIAGEAMPM", req.getHMarriageAmpm);
      postData.append("HFIRSTCHILDDATE", this.checkDateTimeNotBlank(req.getHFirstChildDate));
      postData.append("HFIRSTCHILDPLACE", req.getHFirstChildPlace);
      postData.append("HFIRSTCHILDTIME", this.checkDateTimeNotBlank(req.getHFirstChildTime));
      postData.append("HFIRSTCHILDTIMEAMPM", req.getHFirstChildTimeAmpm);
      postData.append("HATDATE", this.checkDateTimeNotBlank(req.getHAtDate));
      postData.append("HATPLACE", req.getHAtPlace);
      postData.append("HATTIME", this.checkDateTimeNotBlank(req.getHAtTime));
      postData.append("HATTAMPM", req.getHAtTAmpm);
      postData.append("HAFLIGHTNO", req.getHAFlightNo);
      postData.append("HCRDATE", this.checkDateTimeNotBlank(req.getHCrDate));
      postData.append("HCRTIME", this.checkDateTimeNotBlank(req.getHCrTime));
      postData.append("HCRPLACE", req.getHCrPlace);
      postData.append("HCRTAMPM", req.getHCrTAmpm);
      postData.append("HDRR", req.getHDrr);
      postData.append("HDRRD", this.checkDateTimeNotBlank(req.getHDrrD));
      postData.append("HDRRT", this.checkDateTimeNotBlank(req.getHDrrT));
      postData.append("HDRRP", req.getHDrrP);
      postData.append("HDRRTAMPM", req.getHDrrTAmpm);
      postData.append("RECTIFIEDDST", req.getRectifiedDst);
      postData.append("RECTIFIEDDATE", this.checkDateTimeNotBlank(req.getRectifiedDate));
      postData.append("RECTIFIEDTIME", this.checkDateTimeNotBlank(req.getRectifiedTime));
      postData.append("RECTIFIEDPLACE", req.getRectifiedPlace);
      postData.append("RECTIFIEDLONGTITUDE", req.getRectifiedLongtitude);
      postData.append("RECTIFIEDLONGTITUDEEW", req.getRectifiedLongtitudeEw);
      postData.append("RECTIFIEDLATITUDE", req.getRectifiedLatitude);
      postData.append("RECTIFIEDLATITUDENS", req.getRectifiedLatitudeNs);
      postData.append("HPDF", req.getHPdf);
      postData.append("LASTREQUESTID", req.getLastRequestId);
      postData.append("LASTMESSAGEID", req.getLastMessageId);
      postData.append("LASTWPDATE", this.checkDateTimeNotBlank(req.getLastWpDate));
      postData.append("LASTDPDATE", this.checkDateTimeNotBlank(req.getLastDpDate));
      postData.append("HLOCKED", req.getHLocked);
      postData.append("HRECDELETED", req.getHRecDeleted);
      postData.append("HCREATIONDATE", this.checkDateTimeNotBlank(req.getHCreationDate));
      postData.append("HRECDELETEDD", req.getHRecDeletedD);
      postData.append("HTOTALTRUE", req.getHTotalTrue);
      postData.append("HTOTALFALSE", req.getHTotalFalse);
      postData.append("HTOTALPARTIAL", req.getHTotalPartial);
      postData.append("HUNIQUE", req.getHUnique);
      postData.append("HSTATUS", req.getHStatus);
      postData.append("HBIRTHORDER",req.getHBIRTHORDER);
      postData.append("hNativePhoto",req.getHNativePhoto.toString().trim());

     // alert("DATA1:"+req.getHMarriagePlace);
      //alert("DATA2:" + JSON.stringify(req));
    
      this.api.updateHoroscope(postData).subscribe(response => {
        
        this.loader.dismiss();
        //alert(JSON.stringify(response));
        //let data : AddHoroscopeResponse = new AddHoroscopeResponse(JSON.stringify(response));

        let data : AddHoroscopeResponse;
        if(response.response){
          data = new AddHoroscopeResponse(JSON.stringify(JSON.parse(response.response)));
        }else{
          data = new AddHoroscopeResponse(JSON.stringify(response));
        }
        if(data && data.getStatus === 'Success'){
            if(data.getData && data.getData){
              //save data in storage
              //this.userData = response

              //alert(data.getMessage);
              this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,data.getMessage,null);
              //update horoscope list in last page
              this.updateHoroscopeListData();
            }else{
              this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,data.getMessage,null);
              //alert(data.getMessage);
            }
        }else{
          if(data && data.getMessage){
            //alert(data.getMessage);
            this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,data.getMessage,null);
          }
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(AddHoroscopeNewPage,null,error.toString(), null);
        }
      },() => {
        this.loader.dismiss();
        // No errors, route to new page
      });
    }


    getDateFromComplete(d:string,type:number){
        let date = new Date(d);
        switch(type){
          case Constants.CALENDAR_DATE:
          let fullDate = this.datePipe.transform(date, 'dd');
           return fullDate;
          
          case Constants.CALENDAR_MONTH:
            let fullMonth = this.datePipe.transform(date, 'MM');
            return fullMonth;
          
          case Constants.CALENDAR_YEAR:
            return this.datePipe.transform(date, 'yy');
        }
    }

    getFormattedDate(d:string):string{
      //console.log('DATE' + d);
      let date = new Date(d);
      return this.datePipe.transform(date, 'ddMMyyyy');
    }

    getTimeFromComplete(d:string,type:number){
        let date = new Date(d);
        switch(type){
          case Constants.TIME_HOUR:
            return this.datePipe.transform(date, 'hh');
          case Constants.TIME_MIN:
            return this.datePipe.transform(date, 'mm');
          case Constants.TIME_SEC:
            return this.datePipe.transform(date, 'ss');
          case Constants.TIME_AM_PM:
            let h =  this.datePipe.transform(date, 'HH');
            if(Number(h)>12){
              return 'PM';
            }else{
              return 'AM';
            }
        }
    }

    getChildOrder(myEvent){
      let items=[
        {item:1},
        {item:2},
        {item:3},
        {item:4},
        {item:5},
        {item:6},
        {item:7},
        {item:8},
        {item:9},
        {item:10}
      ];

      let popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_HOROSCOPE_MENU,data:items});
      popover.present({
        ev:myEvent
      });
  
      popover.onDidDismiss(popOverData=>{
        if(!popOverData){
          return;
        }
  
       this.childOrder = popOverData.item;

        
        //this.horoscopeData.setHGender = popOverData.item;
      
  
      });
    } 

    getGenderCode(gender:string):string{
        switch(gender){
            case strings.gender_male:
              return strings.gender_m;
             case strings.gender_female:
              return strings.gender_f;
             case strings.gender_transgender:
              return strings.gender_t;
             default:
              return gender;
        }
    }

    getGenderFromCode(genderCode:string):string{
        switch(genderCode){
            case strings.gender_m:
              return strings.gender_male;
            case strings.gender_f:
              return strings.gender_female;
            case strings.gender_t:
              return strings.gender_transgender;
            default:
              return genderCode;
        }
    }

    slideChanged() {
      if(this.slides){
        let size = this.slides.length();
        let activeIndex = this.slides.getActiveIndex();
        if(this.slides.isBeginning()){
            this.isBeginning = true;
        }else{
          this.isBeginning = false;
        }
        if(activeIndex === size || activeIndex === size - 1 ){
            this.isEnd = true;
        }else{
          this.isEnd = false;
        }
        //console.log("SIZE:" + size  + " ACTIVE:" +  activeIndex)
      }
      
    }

    nextSlide(){
      if(this.slides && !this.slides.isEnd()){
        this.slides.slideNext(400);
      }
    }

    prevSlide(){
      if(this.slides && !this.slides.isBeginning()){
        let size = this.slides.length();
        let activeIndex = this.slides.getActiveIndex();
        let prevSlideIndex = activeIndex - 1;
        if(size === activeIndex){
          prevSlideIndex = prevSlideIndex - 1;
        }
        
        this.slides.slideTo(prevSlideIndex, 400);
        //this.slides.slidePrev(400);
      }
    }

    ionViewWillEnter(){
      this.alertProvider.setCurrentPage(AddHoroscopeNewPage);
    }

}
