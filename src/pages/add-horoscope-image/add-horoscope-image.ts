import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { LoadingController, ToastController, Content } from 'ionic-angular';
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
import { AddHoroscopeMariagePage } from '../add-horoscope-mariage/add-horoscope-mariage';
import { AddHoroscopeProfilePage } from '../add-horoscope-profile/add-horoscope-profile';


/**
 * Generated class for the AddHoroscopeImagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-horoscope-image',
  templateUrl: 'add-horoscope-image.html',
})
export class AddHoroscopeImagePage {
/**
  * content to refresh view if any changes made like hide/show header,footer
  */
 @ViewChild(Content) content: Content;

 loader: any;
 childOrder: number = 1;
 userData: any = new LoginResponseData();
 horoscopeData: HoroscopeResponseData = new HoroscopeResponseData();
 horoscopeOriginalData: any = new HoroscopeResponseData();
 horoscopeListCallback: any;

 type: string = Constants.ADD_HOROSCOPE;
 isEditable: boolean = true;
 title: string = strings.add_horoscope;
//  imageURI: any = Constants.COMMON_PROFILE_IMAGE;
//** */
 imageURI: any=Constants.COMMON_PROFILE_IMAGE;

 ownerDOBCalendar: MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_OWNER_DOB);
 marriageCalendar: MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_MARRIAGE);
 travelCalendar: MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_TRAVEL);
 lastCallCalendar: MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_CALL);
 demiseCalendar: MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_DEMISE);
 childCalendar: MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_DEMISE);

 ownerDobTime = new MyTime();
 marriageTime = new MyTime();
 travelTime = new MyTime();
 callTime = new MyTime();
 demiseTime = new MyTime();
 childTime = new MyTime();


 /**
  * owner basic data valid errors
  */
 isValidName: boolean = true;
 isValidNativePhoto: boolean = true;
 isValidGender: boolean = true;
 isValidDOBPlace: boolean = true;
 isValidLandmark: boolean = true;
 isValidDOBDate: boolean = true;
 isValidDOBMonth: boolean = true;
 isValidDOBYear: boolean = true;
 isValidDOBHours: boolean = true;
 isValidDOBMin: boolean = true;
 isValidDOBSec: boolean = true;
 isValidDOBAmpm: boolean = true;
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

 isValidMarriageDate: boolean = true;
 isValidMarriageMonth: boolean = true;
 isValidMarriageYear: boolean = true;
 isValidMarriageHours: boolean = true;
 isValidMarriageMin: boolean = true;
 isValidMarriageSec: boolean = true;
 isValidMarriageAmpm: boolean = true;

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

 isValidChildBirthDate: boolean = true;
 isValidChildBirthMonth: boolean = true;
 isValidChildBirthYear: boolean = true;
 isValidChildBirthHours: boolean = true;
 isValidChildBirthMin: boolean = true;
 isValidChildBirthSec: boolean = true;
 isValidChildBirthAmpm: boolean = true;

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

 isValidTravelDate: boolean = true;
 isValidTravelMonth: boolean = true;
 isValidTravelYear: boolean = true;
 isValidTravelHours: boolean = true;
 isValidTravelMin: boolean = true;
 isValidTravelSec: boolean = true;
 isValidTravelAmpm: boolean = true;

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

 isValidCallDate: boolean = true;
 isValidCallMonth: boolean = true;
 isValidCallYear: boolean = true;
 isValidCallHours: boolean = true;
 isValidCallMin: boolean = true;
 isValidCallSec: boolean = true;
 isValidCallAmpm: boolean = true;

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

 isValidDemiseDate: boolean = true;
 isValidDemiseMonth: boolean = true;
 isValidDemiseYear: boolean = true;
 isValidDemiseHours: boolean = true;
 isValidDemiseMin: boolean = true;
 isValidDemiseSec: boolean = true;
 isValidDemiseAmpm: boolean = true;

 errorDemiseDate = strings.please_select_demise_date;
 errorDemiseMonth = strings.please_select_demise_month;
 errorDemiseYear = strings.please_select_demise_year;
 errorDemiseHour = strings.please_select_demise_hour;
 errorDemiseMin = strings.please_select_demise_min;
 errorDemiseSec = strings.please_select_demise_sec;
 errorDemiseAmPm = strings.please_select_demise_am_pm;

 isKeyboardOpen = false;

 serverToken: string;
 mainPopOver:any;
 currentPlatform:any;

 constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public loadingCtrl: LoadingController,
   private camera: Camera,
   public toastCtrl: ToastController,
   public alertCtrl: AlertController,
   public api: ApiProvider,
   private transfer: FileTransfer,
   private datePipe: DatePipe,
   private popOverController: PopoverController,
   public platform: Platform,
   public session: Storage,
   public keyboard: Keyboard,
   public alertProvider: AlertProvider,
   public translate: TranslateService) {

  this.alertProvider.setCurrentPage(AddHoroscopeImagePage);

  this.platform.ready().then(() => {

    if(!platform.is('cordova')){
      //this.isKeyboardOpen=true;
      this.currentPlatform = "web";
      return;
    }else{
      this.currentPlatform = "cordova";
    }
    
     platform.registerBackButtonAction(() => {
      this.alertProvider.dismiss();
       if(this.mainPopOver){
           this.mainPopOver.dismiss();
           this.mainPopOver = null;
           return;
       }
       this.onBackPressed();
     });
   });
   this.initiateLoder();
   this.getNavParamData();

 }



 /**
 * refresh view if any changes made like hide/show header,footer
 */
 footerUpdated() {
   this.content.resize();
 }


 onBackPressed() {
   // if(this.type === Constants.ADD_HOROSCOPE){
   //   this.navCtrl.pop();
   // }else{
   //if(this.horoscopeListCallback){
   this.horoscopeListCallback(false).then(() => {
     this.navCtrl.pop();
   });
   // }else{
   //   this.navCtrl.pop();
   // }
   //}
 }

 updateHoroscopeListData() {
   if (this.horoscopeListCallback) {
     this.horoscopeListCallback(true).then(() => {
       this.navCtrl.pop();
     });
   } else {
     this.navCtrl.pop();
   }

 }

 onHomePressed() {
   this.navCtrl.setRoot(DashboardPage)
   this.navCtrl.popToRoot;
 }

 ionViewDidLoad() {
  // console.log('ionViewDidLoad AddHoroscopeProfilePage');
 }

 initiateLoder() {
   this.loader = this.loadingCtrl.create({
     content: strings.loader.loader_text,
     dismissOnPageChange: true
     //spinner:'ios'
   });
 }

 getNavParamData() {

   this.session.get(Constants.USER_DATA).then(val => {
     this.userData = new LoginResponseData(JSON.stringify(val));
     if (this.userData && this.userData.getTOKEN) {
       this.serverToken = this.userData.getTOKEN.toString().trim();
     }

   });

   if (this.navParams.get(Constants.TYPE)) {
     this.type = this.navParams.get(Constants.TYPE);
     if (this.type === Constants.UPDATE_HOROSCOPE) {
       this.horoscopeData = new HoroscopeResponseData(JSON.stringify(this.navParams.get('data')));
       this.horoscopeOriginalData = new HoroscopeResponseData(JSON.stringify(this.navParams.get('data')));
     } else {
       this.userData = this.navParams.get('data');
       this.horoscopeData.setHUserId = this.userData.getUserId;
       // alert(this.horoscopeData.getHUserId);
     }
   }

   if (this.navParams.get("callback")) {
     this.horoscopeListCallback = this.navParams.get("callback");
   }

   if (this.type == Constants.ADD_HOROSCOPE) {
     this.isEditable = true;
     this.title = strings.add_horoscope;
   //TODO
     // this.horoscopeData.setHNativePhoto = this.imageURI;

     this.session.get(Constants.USER_DATA).then(val => {
       this.userData = new LoginResponseData(JSON.stringify(val));
       this.horoscopeData.setHUserId = this.userData.getUserId;
     });
   } else {
     this.isEditable = false;
     this.title = strings.update_horoscope;
     if (!this.horoscopeData.getHNativePhoto) {
//TODO 
      // this.horoscopeData.setHNativePhoto = this.imageURI;
     }

     if(this.horoscopeData.getHDrr && (this.horoscopeData.getHDrr === null || this.horoscopeData.getHDrr === "null")){
       this.horoscopeData.setHDrr = "";
     }
    // this.setHoroscopeDataForUpdate();
   }

 }

 sampleHoroscopeData(): any {
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
   data.setHDrrT = '';
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

  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {

      // console.log(event.target.files[0]);
      
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event1) => { // called once readAsDataURL is completed
        this.horoscopeData.setHNativePhoto = reader.result.toString();

        let ext = this.horoscopeData.getHNativePhoto.substring(this.horoscopeData.getHNativePhoto.indexOf('/')+1,this.horoscopeData.getHNativePhoto.indexOf(';'));
        this.horoscopeData.setFileName = this.userData.getUserEmail.toString().trim() + "_horoscope_" + new Date().getTime().toString() + '.' + ext;
        // this.filePath.name = filename;
          //event.target.files[0].name = this.filename;
        this.horoscopeData.setFilePath = event.target.files[0];
      }
    }
  }

 async imageClick(event){
  let myTitle = strings.take_photo;
  let cam = strings.camera;
  let gallery = strings.gallery;
  let cancel = strings.cancel;
  let ok = strings.ok;

  this.translate.get(strings.take_photo).subscribe(
    value => {
      // value is our translated string
      myTitle = value;
    }
  )

  this.translate.get(strings.camera).subscribe(
    value => {
      // value is our translated string
      cam = value;
    }
  )

  this.translate.get(strings.gallery).subscribe(
    value => {
      // value is our translated string
      gallery = value;
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

  let prompt = this.alertCtrl.create({
    title: myTitle,
    inputs : [
    {
        type:'radio',
        label:cam,
        value:'Camera',
        checked:true
    },
    {
        type:'radio',
        label:gallery,
        value:'Gallery'
    }],
    buttons : [
    {
        text: cancel,
        handler: data => {
        //console.log("cancel clicked");
        }
    },
    {
        text: ok,
        handler: data => {
          if(data==='Camera'){
           this.getImage(); 
          }else{
            this.getImagefromGallery(event);
          }
          //console.log("search clicked");
        }
    }]});
    prompt.present();
 }

 takePhoto() {
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType:2,
  }

  this.camera.getPicture(options).then((imageData) => {
    let base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
    // Handle error
  });
}

 getImage() {
   const options: CameraOptions = {
     quality: 50,
     destinationType: this.camera.DestinationType.FILE_URI,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE,
     cameraDirection: 1,
     correctOrientation: true
   }

   this.camera.getPicture(options).then((imageData) => {
    this.horoscopeData.setHNativePhoto = imageData;
    
   }, (err) => {
     //console.log(err);
     //alert(err);
     this.alertProvider.basicAlertOnPage(AddHoroscopeImagePage,null, err, null);
     //this.presentToast(err);
   });
 }

 getImagefromGallery(event) {
    // var reader = new FileReader();
    // reader.onload = (event)=> {
    //   this.horoscopeData.setHNativePhoto=reader.result.toString();
    // };

    // reader.readAsDataURL(event.target.files[0]);

  const options: CameraOptions = {
    quality: 50,
    correctOrientation: true,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
  }

  this.camera.getPicture(options).then((imageData) => {
    this.horoscopeData.setHNativePhoto = imageData;
    
  }, (err) => {
    //console.log(err);
    //alert(err);
    this.alertProvider.basicAlertOnPage(AddHoroscopeImagePage,null,err, null);
    //this.presentToast(err);
  });
}

 saveProfile(status: string) {
  //  if (!this.validate()) {
  //    return;
  //  }
   
   //console.log("USER_DATA:"+JSON.stringify(this.userData));
    //console.log("HORO_DATA:"+JSON.stringify(this.horoscopeData));

   this.navCtrl.push(AddHoroscopeProfilePage, {
     type: this.type,
     userData: this.userData,
     horoscopeData: this.horoscopeData,
     horoscopeOriginalData:this.horoscopeOriginalData,
     callback: this.horoscopeListCallback
   });
 }


 validate(): boolean {

   let valid = true;
   if(this.horoscopeData.getHNativePhoto === this.imageURI){
     valid = false;
     //alert(strings.please_add_horoscope_image);
     this.alertProvider.basicAlertOnPage(AddHoroscopeImagePage,null,strings.please_add_horoscope_image,null);
     //this.isValidNativePhoto = false;
   }

   return valid;
 }

 ionViewWillEnter(){
    this.alertProvider.setCurrentPage(AddHoroscopeImagePage);
  }

}
