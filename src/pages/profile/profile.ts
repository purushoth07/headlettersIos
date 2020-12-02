import { Component,ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavParams, PopoverController,Content } from 'ionic-angular';
import {LoadingController, NavController,ToastController,ViewController} from 'ionic-angular';

import {  GithubUsers } from '../../providers/github-users/github-users';

import{SimpleProvider} from '../../providers/simple/simple'

import {DatabaseProvider} from '../../providers/database/database'

//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { Country } from '../../models/country';
import { UserData } from '../../models/user_data';
import {SocialLoginPage} from "../social-login/social-login";
import { MyCalendar } from '../../utils/calendar';
import { ApiProvider } from '../../providers/api/api';
import { CountryResponse } from '../../api/response/country_response';
import { CountryResponseData } from '../../api/response/country_response_data';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { AddProfileRequest } from '../../api/request/add_profile_request';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import { DISABLED } from '@angular/forms/src/model';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from '../../components/popover/popover';
import { LoginResponse } from '../../api/response/login_response';
import { LoginResponseData } from '../../api/response/login_response_data';
import { Platform, ActionSheetController } from 'ionic-angular';
import { sample } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { TermsConditionPage } from '../terms-condition/terms-condition';
import { MyTime } from '../../utils/mytime';
import { NetworkProvider } from '../../providers/network/network';
import { FingerprintAIO,FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { FingerAuthPage } from '../fingerauth/fingerauth';
import { Keyboard } from '@ionic-native/keyboard';
import { AlertProvider } from '../../providers/alert/alert';
import { messages } from '../../utils/strings';
import { UtilityProvider } from '../../providers/utility/utility';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';
import { TermsConditionUpdatePage } from '../terms-condition-update/terms-condition-update';

/**
 * Generated class for the UserDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage implements OnInit{

  /**
   * content to refresh view if any changes made like hide/show header,footer
   */
@ViewChild(Content) content: Content;

login: string;
user: User;
userData : LoginResponseData = new LoginResponseData();
userOriginalData: LoginResponseData = new LoginResponseData();
countries: Country[] = [];
selectedCountry:CountryResponseData;
currency:string;
genderSelected:string

loader :any;

// imageURI:any ="assets/images/upload-profile.svg";
imageURI: any=Constants.COMMON_PROFILE_IMAGE;

imageFileName:any;
myDate: String;
calendar:MyCalendar = new MyCalendar();
countryList : CountryResponseData[] = [];

//disable only for email
isDisabled : boolean = true;
selectedDateFormat :string

isValidUserName:boolean = true;
isValidProfilePic:boolean = true;
isValidEmail:boolean =true;
isValidMobile:boolean =true;
isValidCountry:boolean =true;
isValidCurrency:boolean =true;
isValidLanguage:boolean =true;
//userProfile:LoginResponseData = new LoginResponseData();
//userOriginalProfile:LoginResponseData = new LoginResponseData();
type:string = Constants.ADD_PROFILE;
TCCODE:string;
//for complete form
isEditable:boolean = true;
selectedlanguage:string = Constants.LANG_ENGLISH;
selectedLanguageCode:string = Constants.LANG_CODE_ENGLISH;
title:string = strings.add_profile;
isTermsChecked:boolean = false;
currentDate:string;
myCalendar:MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_OWNER_DOB);
myTime:MyTime = new MyTime();
userProfileCallback:any;
isKeyboardOpen = false;
isFingerTouchEnabled:boolean = false;

// languages = Constants.availableLanguages;
previousSelectedLanguageCode:string;
//selectedLanguage = Constants.sysOptions.systemLanguage;
param = { value: 'world' };
mainPopOver:any;
medium:string;
currentPlatform:string;

constructor(public navCtrl: NavController, 
        private navParams: NavParams, 
        private githubUsers:GithubUsers,
        public loadingCtrl: LoadingController, 
        public sesson: SimpleProvider,
       // private transfer: FileTransfer,
        private camera: Camera,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public api:ApiProvider,
        private transfer: FileTransfer,
        private datePipe: DatePipe,
        private popOverController:PopoverController,
        public platform:Platform,
        public session:Storage,
        public viewCtrl:ViewController,
        public networkProvider:NetworkProvider,
        private faio: FingerprintAIO,
        public keyboard:Keyboard,
        public alertProvider:AlertProvider,
        public utility:UtilityProvider,
        public globalization:Globalization,
        public translate:TranslateService) {

        this.alertProvider.setCurrentPage(ProfilePage);

         // this.translate.use('hi');
          //   this.translate.instant('hi');
        
        //session.set(Constants.SELECTED_LANGUAGE,code);
        /**
         * get already selected language
         */
        this.session.get(Constants.SELECTED_LANGUAGE).then(val=>{
          this.previousSelectedLanguageCode = (val)?val:Constants.defaultLanguage;
        });

        this.session.get(Constants.LOGIN_WITH).then(val=>{
          this.medium = val;
          if(this.medium && this.medium === Constants.medium_faebook){
            this.isDisabled = false;
          }
        });

        this.initiateLoder();
        this.getNavParamData();

        // var enc = utility.getEncodeData("9540641790");

        // alert("ENCODED:"+enc);
        // alert("DECODED:"+utility.getDecodeData(enc));


      //this.userData = navParams.get('data');
      //this.userOriginalData = navParams.get('data');

      //this.userData = this.sampleUserData();
      //this.userOriginalData = this.sampleUserData();

      


      //let date= new Date();
       //this.myDate = new Date().toLocaleDateString();
      // this.myDate = new Date().toISOString();
      
      // current custom date format
      // this.myDate = this.datePipe.transform(date,"MMddyy");
      // alert("DATE " + this.myDate);
      //this.checkDateTimeFormatForServer();
      this.setCalendarYears();
      this.currentDate = this.getCurrentDate(this.myCalendar) + this.getCurrentTime(this.myTime);
      //this.createCountryData();
      
      //this.loader.present();
      if(networkProvider.isInternetConnected()){
        this.loadCountryData();
      }
      
      this.platform.ready().then(() => {

        // translate.setDefaultLang(Constants.defaultLanguage);

        // if((<any>window).cordova){
        //     globalization.getPreferredLanguage().then(result=>{
        //       var language = this.getSuitableLanguage(result.value);
        //       translate.use(language);
        //       Constants.sysOptions.systemLanguage = language;
        //     });
        // }else{
        //     let browserLanguage = translate.getBrowserLang() || Constants.defaultLanguage;
        //     var language = this.getSuitableLanguage(browserLanguage);
        //     translate.use(language);
        //     Constants.sysOptions.systemLanguage = language;
        // }

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
          
          this.keyboard.onKeyboardShow().subscribe(() => {
                this.isKeyboardOpen = true;
                //document.body.classList.add('keyboard-is-open');
                //document.getElementsByClassName("scroll-content")[0].
                this.footerUpdated();
            });
        
          this.keyboard.onKeyboardHide().subscribe(() => {
              this.isKeyboardOpen = false;
              //document.body.classList.remove('keyboard-is-open');
              this.footerUpdated();
          });  

          platform.resume.subscribe ((e) => {
            //console.trace("resume called"); 
              if(this.isFingerTouchEnabled){
                  this.checkFingerAioOnResume();
              }
          });
          
          platform.pause.subscribe ( (e) => {
           // console.trace("pause called"); 
          });
      });

  }


  filePath:any;
  filename:string;
  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {

      console.log(event.target.files[0]);
      
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event1) => { // called once readAsDataURL is completed
        this.userData.setUserPhoto = reader.result.toString();
        
        // let ext = reader.result.toString().substring(reader.result.toString().indexOf('/')+1,reader.result.toString().indexOf(';'));

        let ext = this.userData.getUserPhoto.substring(this.userData.getUserPhoto.indexOf('/')+1,this.userData.getUserPhoto.indexOf(';'));
        this.filename = this.userData.getUserEmail.toString().trim() + new Date().getTime().toString() + '.' + ext;
        // this.filePath.name = filename;
          //event.target.files[0].name = this.filename;
        this.filePath = event.target.files[0];
      }
    }
  }

  applyLanguage(code:string) {
    this.translate.use(code);
    //this.alertProvider.basicAlertOnPage(ProfilePage,null,"Code:"+code,null);
    switch(code){
      case 'en':
        this.utility.setEnglishLanguage();
        break;
      case 'hi':
        this.utility.setHindiLanguage();
        break;
      case 'ta':
        this.utility.setTamilLanguage();
        break;
    }
    this.content.resize();
    //this.utility.changeLoadingTextLanguage();
	}

  // getSuitableLanguage(language){
  //   language = language.substring(0,2).toLowerCase();
  //   return Constants.availableLanguages.some(x => x.code == language)?language:Constants.defaultLanguage;
  // }


  ngOnInit() {
    // if(this.code){
    //   this.translate.use(this.code);
    //   this.translate.instant(this.code);
    // }
  }

  /**
   * refresh view if any changes made like hide/show header,footer
   */
  footerUpdated() {
    this.content.resize();
  }

  initiateLoder(){
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
  }

  getNavParamData(){
console.log('&c where the navparams TCCode is', 'color:blue', this.TCCODE);
console.log('type', this.navParams.get('type'), 'callback', this.navParams.get("callback"), 'data', this.navParams.get('data'), 'userData', this.userData);
    if(this.navParams.get('type')){
      this.type = this.navParams.get('type');
    }

    if(this.navParams.get("callback")){
      this.userProfileCallback = this.navParams.get("callback");
    }

    if(this.navParams.get('data')){
      this.userData = new LoginResponseData(JSON.stringify(this.navParams.get('data')));
      if(this.type === Constants.UPDATE_PROFILE){
        this.userOriginalData = new LoginResponseData(JSON.stringify(this.navParams.get('data')));
      }
      //this.language = this.getlanguageFromCode(this.userData.getUserPpLang);
    }else{
      if(this.type === Constants.UPDATE_PROFILE){
        this.session.get(Constants.USER_DATA).then(val=>{
            this.userData  = new LoginResponseData(JSON.stringify(val));
            //this.language = this.getlanguageFromCode(this.userData.getUserPpLang);
            this.userOriginalData = new LoginResponseData(JSON.stringify(val));
        });
      }
    }

    if(!this.userData){
      this.userData = new LoginResponseData();
      this.userData.setUserPhoto = this.imageURI;
    }else if(!this.userData.getUserPhoto){
      this.userData.setUserPhoto = this.imageURI;
    }
    
    if(this.type===Constants.ADD_PROFILE){
     // alert("COME");
        this.isTermsChecked = false;
        this.isEditable = true;
        this.title = strings.add_profile;
      if(this.userData && this.userData.getUserEmail){
        this.isDisabled = true;
      }else{
        this.isDisabled = false;
      }
    }else{
      //this.isDisabled = false;
      this.isTermsChecked = true;
      this.isEditable =false;
      this.title = strings.update_profile;
      this.selectedCountry = {PARAMCOUNTRYDESC:this.userData.getUcountry,PARAMCOUNTRYIDD:this.userData.getUserIdd,PARAMCOUNTRYCODE:"",PARAMDATEFORMAT:"",PARAMCOUNTRYDST:0}
      this.currency = this.userData.getUcurrency;
      this.selectedlanguage = this.getlanguageFromCode(this.userData.getUserPpLang);
      this.selectedLanguageCode = (this.userData.getUserPpLang)?this.userData.getUserPpLang.toString().trim():Constants.LANG_CODE_ENGLISH;
      if(this.userData.getTOUCHID 
        && this.userData.getTOUCHID != null 
        && this.userData.getTOUCHID.toString().trim() === Constants.TRUE){
            this.isFingerTouchEnabled = true;
      }

      if(this.medium && this.medium === Constants.medium_faebook){
        this.isDisabled = false;
      }
    }

  }


  sampleUserData():any{
    let data = new LoginResponseData();
    data.setUserId = 'meme@gmail.com';
    data.setUserEmail = 'meme@gmail.com';
    data.setUserName = 'MEME';
    data.setTokenFacebook = 'sgr346345356';
    data.setTokenGoogle = null;
    data.setTokenYahoo = null;
    data.setUcountry = 'INDIA';
    data.setUcurrency = 'INR';
    data.setUserIdd = '+91';
    data.setUserMobile = '235787456544';
    data.setUcharge = "";
    data.setUserPDate = ""
    data.setUserPpLang = this.getCodeFromLanguage('English'); 
    data.setUserPhoto = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg';
    return data;
  }

  checkDateTimeFormatForServer(){
    //current date time
    // let date= new Date();
    // this.myDate = this.datePipe.transform(date,Constants.DATE_TIME_FORMAT_SERVER);
    // alert("DATE " + this.myDate);

    //convert datetime
    // let date= new Date('120490');
    // this.myDate = this.datePipe.transform(date,Constants.DATE_TIME_FORMAT_SERVER);
    // alert("DATE " + this.myDate);

  }

  setCalendarYears(){
    const formatedDate = new Date().toISOString().substring(0, 4);
    this.calendar.previousYears = Number(formatedDate);

    const year = new Date().getFullYear().toString();
    const month = new Date().getMonth().toString();
    const date = new Date().getDate().toString();

    this.myCalendar.previousYears = Number(year);
    this.myCalendar.setCurrentMonth = Number(month);
    this.myCalendar.setCurrentDate = Number(date);
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserDetailsPage');
  }

  getImage() {
    /*const options: CameraOptions = {

      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection : 1
      //sourceType: this.camera.MediaType.PICTURE
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }*/

    const options: CameraOptions = {
      quality: 70,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection : 1,
        correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
    this.userData.setUserPhoto = imageData;
    //this.imageURI = 'data:image/jpeg;base64,' + imageData;
    //this.presentToast(this.imageURI);
      //this.imageURI = base64Image;
    }, (err) => {
      //console.log(err);
      //this.presentToast(err);
      this.alertProvider.basicAlertOnPage(ProfilePage,null, err, null);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }

  selectGender() {

      // let alert = this.alertCtrl.create();
      // alert.setTitle('Select Gender');

      // alert.addInput({
      //   type: 'radio',
      //   label: 'Male',
      //   value: 'Male',
      //   checked: (this.userData && this.userData.gender && this.userData.gender === "Male")?true:false
      // });

      // alert.addInput({
      //     type: 'radio',
      //     label: 'Female',
      //     value: 'Female',
      //     checked: (this.userData && this.userData.gender && this.userData.gender === "Female")?true:false
      //   });


      // alert.addButton('Cancel');
      // alert.addButton({
      //   text: 'OK',
      //   handler: data => {
      //     (this.userData)?this.userData.gender = data:this.userData = new UserData();
      //     this.userData.gender = data;
      //   }
      // });
      // alert.present();
  }

  selectCountry(myEvent){
    if(!this.isEditable){
      return;
    }

    //this.createCountryData2();

    if(this.countryList && this.countryList.length>0){
      let popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_COUNTRY,data:this.countryList});
      this.mainPopOver = popover;
      popover.present({
        ev:myEvent
      });

      popover.onDidDismiss(popOverData=>{
        this.mainPopOver = null;
        if(!popOverData){
          return;
        }
        this.selectedCountry = <CountryResponseData>popOverData;
        if(!this.selectedCountry.PARAMCOUNTRYIDD.includes('+')){
          this.selectedCountry.PARAMCOUNTRYIDD = '+' + this.selectedCountry.PARAMCOUNTRYIDD;
        }
        this.currency = (this.selectedCountry)?(this.selectedCountry.PARAMCOUNTRYDESC.trim() === "INDIA")?Constants.INR:Constants.USD:"";

      });
    }else{
     // alert(strings.no_country_found);
      this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.no_country_found,null);
      if(this.networkProvider.isInternetConnected()){
        if(this.platform.is('cordova')){
          this.initiateLoder();
          this.loader.present();
        }
        this.loadCountryData();
      }
    }

    // let alert = this.alertCtrl.create();
    //   alert.setTitle('Select Country');

    //   for(const item of this.countryList){
    //     alert.addInput({
    //       type: 'radio',
    //       label: item.PARAMCOUNTRYDESC.trim(),
    //       value: item.PARAMCOUNTRYCODE.trim(),
    //       checked: (this.selectedCountry)?(this.selectedCountry.PARAMCOUNTRYCODE.trim() === item.PARAMCOUNTRYCODE.trim())?true:false:false
    //     });
    //   }


    //   alert.addButton('Cancel');
    //   alert.addButton({
    //     text: 'OK',
    //     handler: data => {
    //       //this.testRadioOpen = false;
    //       const c = this.countryList.filter(item => item.PARAMCOUNTRYCODE.trim() === data);

    //       this.selectedCountry = (c && c.length>0)?c[0]:null;
    //       this.selectedCountry.PARAMCOUNTRYIDD = '+' + this.selectedCountry.PARAMCOUNTRYIDD;
    //       this.currency = (this.selectedCountry)?(this.selectedCountry.PARAMCOUNTRYDESC.trim() === "INDIA")?"INR":"DOLLAR":"";

    //     }
    //   });
    //   alert.present();
    }

    loadCountryData(){
      this.api.getCountries().subscribe(countryResponse=>{
        this.loader.dismiss();  
        if(countryResponse && countryResponse.Data && countryResponse.Data.CountryList){
            this.countryList = countryResponse.Data.CountryList;

            if(this.type===Constants.ADD_PROFILE){
              const c = this.countryList.filter(item => item.PARAMCOUNTRYDESC.trim() === 'INDIA');
              this.selectedCountry = (c && c.length>0)?c[0]:null;
              if(!this.selectedCountry.PARAMCOUNTRYIDD.includes('+')){
                this.selectedCountry.PARAMCOUNTRYIDD = '+' + this.selectedCountry.PARAMCOUNTRYIDD;
              }
              this.currency = (this.selectedCountry)?(this.selectedCountry.PARAMCOUNTRYDESC.trim() === "INDIA")?Constants.INR:Constants.USD:"";
            }
          }
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        //this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.server_error,null);
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }

    selectDateFormat(){
      // let alert = this.alertCtrl.create();
      // alert.setTitle('Select Date Format');

      
      // alert.addInput({
      //   type: 'radio',
      //   label: 'DDMMYY',
      //   value: 'ddMMyy',
      //   checked: (this.selectedDateFormat)?(this.selectedDateFormat === 'ddMMyy')?true:false:false
      // });
      
      // alert.addInput({
      //   type: 'radio',
      //   label: 'MMDDYY',
      //   value: 'MMddyy',
      //   checked: (this.selectedDateFormat)?(this.selectedDateFormat === 'MMddyy')?true:false:false
      // });


      // alert.addButton('Cancel');
      // alert.addButton({
      //   text: 'OK',
      //   handler: data => {
      //     this.selectedDateFormat = data;
         
      //   }
      // });
      // alert.present();
    }


    createCountryData(){
       for(let i=0;i<10;i++){
         const country = {code:"IN" + i,name:"INDIA" + i,dialCode:"+91" + i,flag:""};

         this.countries.push(country);
      }
    }

    createCountryData2(){
      for(let i=0;i<10;i++){
        const countryResponseData = {PARAMCOUNTRYCODE:"IN" + i,PARAMCOUNTRYDESC:"INDIA" + i,
        PARAMCOUNTRYDST:0,PARAMCOUNTRYIDD:"+91" + i,PARAMDATEFORMAT:""};

        this.countryList.push(countryResponseData);
     }
   }

    selectCalendar(type:number){
      let alert = this.alertCtrl.create();
      if(type === 1){
        alert.setTitle('Select Date');
        for(const item of this.calendar.dates){
          alert.addInput({
            type: 'radio',
            label: item.toString() ,
            value: item.toString(),
            checked: (this.calendar.getSelectedDate)?(this.calendar.getSelectedDate === item.toString())?true:false:false
          });
        }
      }else if(type === 2){
        alert.setTitle('Select Month');
        for(const item of this.calendar.months){
          alert.addInput({
            type: 'radio',
            label: item.toString() ,
            value: item.toString(),
            checked: (this.calendar.getSelectedMonth)?(this.calendar.getSelectedMonth === item.toString())?true:false:false
          });
        }
      }else if(type === 3){
        alert.setTitle('Select Year');
        for(const item of this.calendar.years){
          alert.addInput({
            type: 'radio',
            label: item.toString() ,
            value: item.toString(),
            checked: (this.calendar.getSelectedYear)?(this.calendar.getSelectedYear === item.toString())?true:false:false
          });
        }
      }


        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            if(type === 1){
              this.calendar.setSelectedDate=data;
            }else if(type === 2){
                this.calendar.setSelectedMonth=data;
                if(this.calendar.getSelectedMonth == "2"){
                  if(this.calendar.getSelectedYear
                    && this.calendar.isLeapYear(Number(this.calendar.getSelectedYear))){
                    if(Number(this.calendar.getSelectedDate) > 29){
                      this.calendar.setSelectedDate = "29";
                    }
                  }
                  else if(this.calendar.getSelectedDate && Number(this.calendar.getSelectedDate) > 28){
                      this.calendar.setSelectedDate = "28";
                  }
                }else if(this.calendar.getSelectedMonth === "4"
                  || this.calendar.getSelectedMonth === "6"
                  || this.calendar.getSelectedMonth === "9"
                  || this.calendar.getSelectedMonth === "11"){
                    if(this.calendar.getSelectedDate && Number(this.calendar.getSelectedDate) > 30){
                        this.calendar.setSelectedDate = "30";
                    }
                }
             }else if(type === 3){
                this.calendar.setSelectedYear=data;
                if(this.calendar.getSelectedMonth){
                if(this.calendar.getSelectedMonth == "2"){
                  if(this.calendar.getSelectedDate){
                    if(this.calendar.getSelectedYear
                      && this.calendar.isLeapYear(Number(this.calendar.getSelectedYear))){
                      if(Number(this.calendar.getSelectedDate) > 29){
                        this.calendar.setSelectedDate = "29";
                      }
                    }
                    else if(Number(this.calendar.getSelectedDate) > 28){
                      this.calendar.setSelectedDate = "28";
                    }
                  }
                }if(this.calendar.getSelectedMonth === "4"
                  || this.calendar.getSelectedMonth === "6"
                  || this.calendar.getSelectedMonth === "9"
                  || this.calendar.getSelectedMonth === "11"){
                    if(this.calendar.getSelectedDate && Number(this.calendar.getSelectedDate) > 30){
                        this.calendar.setSelectedDate = "30";
                    }
                }
              }
             }
          }
        });
        alert.present();
    }

    selectLanguage(myEvent){
      let items=[
        {item:Constants.LANG_ENGLISH},
        {item:Constants.LANG_HINDI},
        {item:Constants.LANG_TAMIL}
      ]
      let popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_LANGUAGE,data:items});
      this.mainPopOver = popover;
      popover.present({
        ev:myEvent
      });

      popover.onDidDismiss(popOverData=>{
        this.mainPopOver = null;
        if(!popOverData){
          return;
        }

        this.selectedlanguage = popOverData.item;
       // console.log("LANG:"+this.selectedlanguage);
        let code = this.getCodeFromLanguage(this.selectedlanguage);
        this.selectedLanguageCode = code;
       // console.log("CODE:"+code);
        this.applyLanguage(code);
        //this.session.set(Constants.SELECTED_LANGUAGE,code);
       // this.navCtrl.setRoot(this.navCtrl.getActive().component);
      // window.location.reload();
      // this.code = 'hi';
       // this.ngOnInit();
       // window.location.reload();
      });
    
    }

    onBackPressed(){

      /**
       * apply previos selected language again if user not save changes
       */
      if(this.selectedLanguageCode != this.previousSelectedLanguageCode){
          this.applyLanguage(this.previousSelectedLanguageCode);
      }

      if(this.type === Constants.ADD_PROFILE){
        this.navCtrl.pop();
      }else{
        if(this.userProfileCallback){
          this.userProfileCallback(false,this.userData).then(()=>{
            this.navCtrl.pop();
          });
        }else{
          this.navCtrl.pop();
        }
      }

    }

    updateProfileData(data:LoginResponseData){
      if(this.userProfileCallback){
        this.userProfileCallback(true,data).then(()=>{
          this.navCtrl.pop();
        });
      }
    }

    

    saveProfile(){
      console.log('the tccode is', this.TCCODE);
        if(this.validateProfile()){

          if(!this.networkProvider.isInternetConnected()){
              //alert(strings.no_internet_connection);
              this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.no_internet_connection,null);
              return;
          }

          this.initiateLoder();
          this.loader.present();
          const req = new AddProfileRequest();
          if(this.type === Constants.ADD_PROFILE){
            req.setUserId = this.utility.getEncodeData(this.userData.getUserEmail);
            req.setTCCODE = this.TCCODE ;
          }else{console.log('%c the value of user data is', 'color:green',this.userData);
            req.setUserId = this.userData.getUserId;
            req.setTCCODE = this.userData.getTCCODE;
          }
          req.setUserEmail = this.userData.getUserEmail;
          req.setUserName = this.userData.getUserName;
          req.setTokenFacebook = this.userData.getTokenFacebook;
          req.setTokenGoogle = this.userData.getTokenGoogle;
          req.setTokenYahoo = this.userData.getTokenYahoo;
          req.setUcountry = this.selectedCountry.PARAMCOUNTRYDESC.toString().trim();
          req.setUcurrency = this.currency;
          req.setUserIdd = this.selectedCountry.PARAMCOUNTRYIDD;
          req.setUserMobile = this.utility.getEncodeData(this.userData.getUserMobile);
          //req.setUcharge = "";
          req.setUserPDate = this.currentDate;
          req.setUserPpLang = this.getCodeFromLanguage(this.selectedlanguage);
          req.setUserPhoto = this.userData.getUserPhoto;
          req.setTOUCHID = this.isFingerTouchEnabled?Constants.TRUE:Constants.FALSE;
          
          if(this.userData.getPassword && this.userData.getPassword != null && this.userData.getPassword.toString().trim() != ''){
              req.setPassword = this.userData.getPassword.toString().trim();
          }else{
              req.setPassword = Constants.PASSWORD;
          }
          if(this.type === Constants.ADD_PROFILE){
            if(this.currentPlatform == 'cordova'){
              if(this.userData.getUserPhoto.includes('http')){
                this.addProfileOnlyData(req);
              }else{
                this.uploadFileForAddProfile(req);
              }
            }else{
                this.addProfileFromWeb(req);
            }
            
          }else{
             //this.updateProfileFromWeb(req);
            //alert(this.userData.getUserPhoto + " , "+ this.userOriginalData.getUserPhoto);
            if(this.currentPlatform == 'cordova'){
              if(this.userData.getUserPhoto === this.userOriginalData.getUserPhoto ){
                this.updateProfileOnlyData(req);
              }else{
                this.uploadFileForUpdateProfile(req);
                
              }
            }else{
              this.updateProfileFromWeb(req);
            }
          }
        }
    }

    checkDateTimeNotBlank(dateTime:string):string{
      return (dateTime && dateTime != Constants.BLANK_DATE_TIME)?dateTime:"";
     }

     

    validateProfile():boolean{
      //var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //if(!re.test("userEmailAddressFromInput")) {
        // Invalid Email
      //}
      let valid = true;
        if(this.userData.getUserPhoto === this.imageURI){
          valid = false;
          this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.please_add_profile_image,null);
        }else 
        if(!this.userData.getUserName || this.userData.getUserName.toString().length == 0){
          //alert(strings.please_enter_user_name);
          this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.please_enter_user_name,null);
          valid = false;
        }
        // else if(!Constants.NAME_CHECKER.test(this.userData.getUserName)){
        //   this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.please_enter_correct_name,null);
        //   valid = false;
        // }
        else if(!this.userData.getUserEmail || this.userData.getUserEmail.length == 0){
          //alert(strings.please_enter_email_id);
          this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.please_enter_email_id,null);
          valid = false;
        }else if(!Constants.email_checker.test(this.userData.getUserEmail)){
          //alert(strings.please_enter_valid_email_id);
          this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.please_enter_valid_email_id,null);
          valid = false;
        }
        // code123
        // else if(!this.userData.getUserMobile || this.userData.getUserMobile.toString().length == 0){
        //   //alert(strings.please_enter_mobile_number);
        //   this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.please_enter_mobile_number,null);
        //   valid = false;
        //}
        else if(!this.isTermsChecked){
          //alert(strings.please_accept_terms_and_conditions);
          this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.please_accept_terms_and_conditions,null);
          valid = false;
        }
          
        return valid;
    }

    uploadFileForAddProfile(req:AddProfileRequest) {
      let filename = req.getUserEmail.toString().trim() + new Date().getTime().toString() + '.jpg';
      //alert("DATA:"+JSON.stringify(req));
      const fileTransfer:FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'USERPHOTO',
        fileName: filename,
        chunkedMode: false,
        mimeType: "image/jpg",
        // headers: {'Accept':'application/json',
        //           'Content-Type':'multipart/form-data'},
        params : {
          "USERID": req.getUserId,
          "USERNAME": req.getUserName,
          "USEREMAIL": req.getUserEmail,
          "USERIDD": req.getUserIdd,
          "USERMOBILE": req.getUserMobile,
          //"USERACCOUNTNO": req.USERACCOUNTNO,
          "UCOUNTRY": req.getUcountry,
          "UCURRENCY": req.getUcurrency,
          //"UCHARGE": req.getUcharge,
          "USERPDATE": this.checkDateTimeNotBlank(req.getUserPDate),
          "USERPPLANG": req.getUserPpLang,
          //"USERLASTHOROID": req.USERLASTHOROID,
          //"PASSWORD": req.PASSWORD,
          "TOKENFACEBOOK": req.getTokenFacebook,
          "TOKENGOOGLE": req.getTokenGoogle,
          "TOKENYAHOO": req.getTokenYahoo,
          "TOUCHID":req.getTOUCHID,
          "PASSWORD":req.getPassword,
          "TCCODE":req.getTCCODE
        }

      }
  

      this.addProfileApi(this.userData.getUserPhoto,fileTransfer,options);
     

     }

     uploadFileForUpdateProfile(req:AddProfileRequest) {
      let filename = req.getUserEmail.toString().trim() + new Date().getTime().toString() + '.jpg';
      //alert("DATA:"+JSON.stringify(req));
      const fileTransfer:FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'USERPHOTO',
        fileName: filename,
        chunkedMode: false,
        mimeType: "image/jpg",
        headers: { 'TOKEN': (this.userData.getTOKEN)?this.userData.getTOKEN.toString().trim():"" },
        // headers: {'Accept':'application/json',
        //           'Content-Type':'multipart/form-data'},
        params : {
          "USERID": req.getUserId,
          "USERNAME": req.getUserName,
          "USEREMAIL": req.getUserEmail,
          "USERIDD": req.getUserIdd,
          "USERMOBILE": req.getUserMobile,
          //"USERACCOUNTNO": req.USERACCOUNTNO,
          "UCOUNTRY": req.getUcountry,
          "UCURRENCY": req.getUcurrency,
          //"UCHARGE": req.getUcharge,
          "USERPDATE": this.checkDateTimeNotBlank(req.getUserPDate),
          "USERPPLANG": req.getUserPpLang,
          //"USERLASTHOROID": req.USERLASTHOROID,
          //"PASSWORD": req.PASSWORD,
          "TOKENFACEBOOK": req.getTokenFacebook,
          "TOKENGOOGLE": req.getTokenGoogle,
          "TOKENYAHOO": req.getTokenYahoo,
          "TOUCHID":req.getTOUCHID,
          "PASSWORD":req.getPassword,
          "TCCODE":req.getTCCODE
        }

      }

        this.updateProfileApi(this.userData.getUserPhoto,fileTransfer,options);

     }

     addProfileApi(image:string,fileTransfer:FileTransferObject,options:FileUploadOptions){
      // fileTransfer.upload(image, 'http://49.50.103.132/LetterHead/api/profile/addProfile', options)
      fileTransfer.upload(image, Constants.BASE_URL+'api/profile/addProfile', options)
      //fileTransfer.upload(this.userData.user_image, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
        //console.log(data+" Uploaded Successfully");
        this.loader.dismiss();
        //let res : LoginResponse = new LoginResponse(JSON.stringify(JSON.parse(data.response)));
        let res : LoginResponse;
        if(data.response){
          res = new LoginResponse(JSON.stringify(JSON.parse(data.response)));
        }else{
          res = new LoginResponse(JSON.stringify(data));
        }

        if(res && res.getErrormessage && res.getErrormessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(ProfilePage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
        
        if(res && res.getStatus === 'Success' && res.getData){
          if(res.getData && res.getData.getUserId){
            this.userData = res.getData;
            
            /**
             * decode user mobile num and save data
             */
            let mobile =  this.utility.getDecodeData(res.getData.getUserMobile.toString().trim());
            res.getData.setUserMobile = mobile;

            this.session.set(Constants.SELECTED_LANGUAGE,this.selectedLanguageCode);
            this.session.set(Constants.USER_DATA,res.getData);
            this.session.set(Constants.IS_LOGIN,true);
            this.session.set(Constants.LOGIN_WITH,res.getData.getMedium);
            
            if(res.getData.getTOUCHID && res.getData.getTOUCHID.toString().trim() === Constants.TRUE){
              this.checkFingerAIO(res.getData);
            }else{
              // if(!res.getData.getTCFlag || res.getData.getTCFlag.toString().trim() === Constants.NO){
              //   this.gotToUpdateTerms(res.getData,false);
              // }else{
                this.goToDashboard(res.getData);
              //}
              //this.goToDashboard(res.getData);
            }
          }else{
            
            this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
          }
        }else{
            if(res && res.getMessage){
              
              this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
            }
        }

      }, (err) => {
       // console.log(err);
        this.loader.dismiss();
        //this.presentToast(JSON.stringify(err));
        //alert('ERROR '+JSON.stringify(err));
        this.alertProvider.basicAlertOnPage(ProfilePage,null,JSON.stringify(err),null);
      });
     }

     updateProfileApi(image:string,fileTransfer:FileTransferObject,options:FileUploadOptions){
        // fileTransfer.upload(image, 'http://49.50.103.132/LetterHead/api/profile/updateProfile', options)
        fileTransfer.upload(image, Constants.BASE_URL+'api/profile/updateProfile', options)
        //fileTransfer.upload(this.userData.user_image, 'http://192.168.0.7:8080/api/uploadImage', options)
        .then((data) => {
          //console.log(data+" Uploaded Successfully");
          this.loader.dismiss();
          //let res : LoginResponse = new LoginResponse(JSON.stringify(JSON.parse(data.response)));
          //alert("RES:" + JSON.stringify(data.response));
          let res : LoginResponse;
          if(data.response){
            res = new LoginResponse(JSON.stringify(JSON.parse(data.response)));
          }else{
            res = new LoginResponse(JSON.stringify(data));
          }

          // alert("DATA:"+ JSON.stringify(res));
          if(res && res.getStatus === 'Success' && res.getData){
            if(res.getData && res.getData.getUserId){
              /**
               * decode user mobile num and save data
               */
              let mobile =  this.utility.getDecodeData(res.getData.getUserMobile.toString().trim());
              res.getData.setUserMobile = mobile;

              this.session.set(Constants.SELECTED_LANGUAGE,this.selectedLanguageCode);
              this.userData = res.getData;
              this.session.set(Constants.USER_DATA,res.getData);
              //this.session.set(Constants.IS_LOGIN,true);
              //this.navCtrl.pop();
              // if(!res.getData.getTCFlag || res.getData.getTCFlag.toString().trim() === Constants.NO){
              //   this.gotToUpdateTerms(res.getData,false);
              // }else{
                this.updateProfileData(res.getData);
              // }
              
              //this.goToDashboard(res.getData);
            }else{
              //go to create profile
              //alert(res.getMessage);
              this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
            }
          }else{
              if(res && res.getMessage){
                //alert(res.getMessage);
                this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
              }
          }
  
        }, (err) => {
          //console.log(err);
          this.loader.dismiss();
          //this.presentToast(JSON.stringify(err));
          //alert('ERROR '+JSON.stringify(err));
          this.alertProvider.basicAlertOnPage(ProfilePage,null,JSON.stringify(err),null);
        });
     }

     addProfileOnlyData(req:any){
      console.log('where the user id and user email is',req);
      let postData = new FormData();
      postData.append("USERID", req.getUserId),
      postData.append("USERNAME", req.getUserName),
      postData.append("USEREMAIL", req.getUserEmail),
      postData.append("USERIDD", req.getUserIdd),
      postData.append("USERMOBILE", req.getUserMobile),
      //"USERACCOUNTNO": req.USERACCOUNTNO,
      postData.append("UCOUNTRY", req.getUcountry),
      postData.append("UCURRENCY", req.getUcurrency),
      //postData.append("UCHARGE", req.getUcharge),
      postData.append("USERPDATE", this.checkDateTimeNotBlank(req.getUserPDate)),
      postData.append("USERPPLANG", req.getUserPpLang),
      //"USERLASTHOROID": req.USERLASTHOROID,
      //"PASSWORD": req.PASSWORD,
      postData.append("TOKENFACEBOOK", req.getTokenFacebook),
      postData.append("TOKENGOOGLE", req.getTokenGoogle),
      postData.append("TOKENYAHOO", req.getTokenYahoo),
      postData.append("USERPHOTO",req.getUserPhoto),
      postData.append("TOUCHID", req.getTOUCHID),
      postData.append("PASSWORD",req.getPassword),   
      postData.append("TCCODE",req.getTCCODE)
     // console.log("add profile onlyData req"+req.getTCCODE);
     console.log('Iam sending the fb data is',req, postData);
      this.api.addProfile(postData).subscribe(data => {
        this.loader.dismiss();
        console.log('my response after form data', data);
       // console.log("add profile onlyData res"+JSON.stringify(data));
        let res : LoginResponse;
        if(data.response){
          res = new LoginResponse(JSON.stringify(JSON.parse(data.response)));
          console.log('parse data response', res);
        }else{
          res = new LoginResponse(JSON.stringify(data));
          console.log('data response', res);
        }
        //let res : LoginResponse= new LoginResponse(JSON.stringify(data));
        if(res && res.getStatus === 'Success' && res.getData){
          console.log('here the all `user `informations is ', res);
          if(res.getData && res.getData.getUserId){
              /**
               * decode user mobile num and save data
               */
              let mobile =  this.utility.getDecodeData(res.getData.getUserMobile.toString().trim());
              res.getData.setUserMobile = mobile;

            this.userData = res.getData;

            this.session.set(Constants.SELECTED_LANGUAGE,this.selectedLanguageCode);
            this.session.set(Constants.USER_DATA,res.getData);
            this.session.set(Constants.IS_LOGIN,true);
            this.session.set(Constants.LOGIN_WITH,res.getData.getMedium);
            //this.goToDashboard(res.getData);
            if(res.getData.getTOUCHID && res.getData.getTOUCHID.toString().trim() === Constants.TRUE){
              this.checkFingerAIO(res.getData);
            }else{
              // if(!res.getData.getTCFlag || res.getData.getTCFlag.toString().trim() === Constants.NO){
              //   this.gotToUpdateTerms(res.getData,false);
              // }else{
                this.goToDashboard(res.getData);
              //}
            }
          }else{
            this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
          }
        }else{
            if(res && res.getMessage){
              //alert(res.getMessage);
              this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
            }
        }

      },error => {
        this.loader.dismiss();
        //alert(strings.server_error + " " + error);
        // this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(ProfilePage,null, strings.please_check_internet_access, null);
        }else{
          alert('last error hit')
          this.alertProvider.basicAlertOnPage(ProfilePage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }

     updateProfileOnlyData(req:any){
      
      let postData = new FormData();
      postData.append("USERID", req.getUserId),
      postData.append("USERNAME", req.getUserName),
      postData.append("USEREMAIL", req.getUserEmail),
      postData.append("USERIDD", req.getUserIdd),
      postData.append("USERMOBILE", req.getUserMobile),
      //"USERACCOUNTNO": req.USERACCOUNTNO,
      postData.append("UCOUNTRY", req.getUcountry),
      postData.append("UCURRENCY", req.getUcurrency),
      //postData.append("UCHARGE", req.getUcharge),
      postData.append("USERPDATE", this.checkDateTimeNotBlank(req.getUserPDate)),
      postData.append("USERPPLANG", req.getUserPpLang),
      //"USERLASTHOROID": req.USERLASTHOROID,
      //"PASSWORD": req.PASSWORD,
      postData.append("TOKENFACEBOOK", req.getTokenFacebook),
      postData.append("TOKENGOOGLE", req.getTokenGoogle),
      postData.append("TOKENYAHOO", req.getTokenYahoo),
      postData.append("USERPHOTO",req.getUserPhoto),
      postData.append("TOUCHID", req.getTOUCHID),
      postData.append("PASSWORD",req.getPassword),
      postData.append("TCCODE",req.getTCCODE)

      //console.log("updateProfileOnlyData req"+JSON.stringify(req.getTCCODE));
      this.api.updateProfile(postData).subscribe(data => {
        this.loader.dismiss();
       // console.log("updateProfileOnlyData req"+JSON.stringify(data));
        let res : LoginResponse;
        if(data.response){
          res = new LoginResponse(JSON.stringify(JSON.parse(data.response)));
        }else{
          res = new LoginResponse(JSON.stringify(data));
        }

        if(res && res.getErrormessage && res.getErrormessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(ProfilePage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
        
        if(res && res.getStatus === 'Success' && res.getData){
          if(res.getData && res.getData.getUserId){
            // alert("RES:" + JSON.stringify(res));
            /**
             * decode user mobile num and save data
             */
            let mobile =  this.utility.getDecodeData(res.getData.getUserMobile.toString().trim());
            res.getData.setUserMobile = mobile;

            this.userData = res.getData;

            this.session.set(Constants.SELECTED_LANGUAGE,this.selectedLanguageCode);
            this.session.set(Constants.USER_DATA,res.getData);
            //this.session.set(Constants.IS_LOGIN,true);
            //this.session.set(Constants.LOGIN_WITH,res.getData.getMedium);
            //this.navCtrl.pop();
            
            // if(!res.getData.getTCFlag || res.getData.getTCFlag.toString().trim() === Constants.NO){
            //   this.gotToUpdateTerms(res.getData,false);
            // }else{
              this.updateProfileData(res.getData);
            //}
            //this.goToDashboard(res.getData);
          }else{
            //go to create profile
            //alert(res.getMessage);
            this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
          }
        }else{
            if(res && res.getMessage){
              //alert(res.getMessage);
              this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
            }
        }

      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(ProfilePage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(ProfilePage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }

    addProfileFromWeb(req:any){
      
      let postData = new FormData();
      if(this.filePath){
        postData.append("USERPHOTO",this.filePath,this.filename)
      }else{
        postData.append("USERPHOTO",this.userData.getUserPhoto)
      }

      postData.append("USERID", req.getUserId),
      postData.append("USERNAME", req.getUserName),
      postData.append("USEREMAIL", req.getUserEmail),
      postData.append("USERIDD", req.getUserIdd),
      postData.append("USERMOBILE", req.getUserMobile),
      //"USERACCOUNTNO": req.USERACCOUNTNO,
      postData.append("UCOUNTRY", req.getUcountry),
      postData.append("UCURRENCY", req.getUcurrency),
      //postData.append("UCHARGE", req.getUcharge),
      postData.append("USERPDATE", this.checkDateTimeNotBlank(req.getUserPDate)),
      postData.append("USERPPLANG", req.getUserPpLang),
      //"USERLASTHOROID": req.USERLASTHOROID,
      //"PASSWORD": req.PASSWORD,
      postData.append("TOKENFACEBOOK", req.getTokenFacebook),
      postData.append("TOKENGOOGLE", req.getTokenGoogle),
      postData.append("TOKENYAHOO", req.getTokenYahoo),
      //postData.append("USERPHOTO",req.getUserPhoto),
      postData.append("TOUCHID", req.getTOUCHID),
      postData.append("PASSWORD",req.getPassword),   
      postData.append("TCCODE",req.getTCCODE)
     // console.log("add profile onlyData req"+req.getTCCODE);
      this.api.addProfile(postData).subscribe(data => {
        this.loader.dismiss();
       // console.log("add profile onlyData res"+JSON.stringify(data));
        let res : LoginResponse;
        if(data.response){
          res = new LoginResponse(JSON.stringify(JSON.parse(data.response)));
        }else{
          res = new LoginResponse(JSON.stringify(data));
        }
        //let res : LoginResponse= new LoginResponse(JSON.stringify(data));
        if(res && res.getStatus === 'Success' && res.getData){
          if(res.getData && res.getData.getUserId){
              /**
               * decode user mobile num and save data
               */
              let mobile =  this.utility.getDecodeData(res.getData.getUserMobile.toString().trim());
              res.getData.setUserMobile = mobile;

            this.userData = res.getData;

            this.session.set(Constants.SELECTED_LANGUAGE,this.selectedLanguageCode);
            this.session.set(Constants.USER_DATA,res.getData);
            this.session.set(Constants.IS_LOGIN,true);
            this.session.set(Constants.LOGIN_WITH,res.getData.getMedium);
            //this.goToDashboard(res.getData);
            if(res.getData.getTOUCHID && res.getData.getTOUCHID.toString().trim() === Constants.TRUE){
              this.checkFingerAIO(res.getData);
            }else{
              // if(!res.getData.getTCFlag || res.getData.getTCFlag.toString().trim() === Constants.NO){
              //   this.gotToUpdateTerms(res.getData,false);
              // }else{
                this.goToDashboard(res.getData);
              //}
            }
          }else{
            //alert(res.getMessage);
            this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
          }
        }else{
            if(res && res.getMessage){
              //alert(res.getMessage);
              this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
            }
        }

      },error => {
        this.loader.dismiss();
        //alert(strings.server_error + " " + error);
        // this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(ProfilePage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(ProfilePage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }

    updateProfileFromWeb(req:any){
      // let ext = this.userData.getUserPhoto.substring(this.userData.getUserPhoto.indexOf('/')+1,this.userData.getUserPhoto.indexOf(';'));
      // let filename = this.userData.getUserEmail.toString().trim() + new Date().getTime().toString() + '.' + ext;
      // this.filePath.name = filename;
      let postData = new FormData();
      
      if(this.filePath){
        postData.append("USERPHOTO",this.filePath,this.filename)
      }else{
        postData.append("USERPHOTO",this.userData.getUserPhoto)
      }
     // postData.set("USERPHOTO",this.filePath,this.filename),
      postData.append("USERID", req.getUserId),
      postData.append("USERNAME", req.getUserName),
      postData.append("USEREMAIL", req.getUserEmail),
      postData.append("USERIDD", req.getUserIdd),
      postData.append("USERMOBILE", req.getUserMobile),
      //"USERACCOUNTNO": req.USERACCOUNTNO,
      postData.append("UCOUNTRY", req.getUcountry),
      postData.append("UCURRENCY", req.getUcurrency),
      //postData.append("UCHARGE", req.getUcharge),
      postData.append("USERPDATE", this.checkDateTimeNotBlank(req.getUserPDate)),
      postData.append("USERPPLANG", req.getUserPpLang),
      //"USERLASTHOROID": req.USERLASTHOROID,
      //"PASSWORD": req.PASSWORD,
      postData.append("TOKENFACEBOOK", req.getTokenFacebook),
      postData.append("TOKENGOOGLE", req.getTokenGoogle),
      postData.append("TOKENYAHOO", req.getTokenYahoo),
      //postData.append("USERPHOTO",req.getUserPhoto),
      postData.append("TOUCHID", req.getTOUCHID),
      postData.append("PASSWORD",req.getPassword),
      postData.append("TCCODE",req.getTCCODE)

      //let mFile = postData.get("USERPHOTO");

      //console.log("IMAGE_NAME:"+mFile.name);
      //console.log("updateProfileOnlyData req"+JSON.stringify(req.getTCCODE));
      this.api.updateProfile(postData).subscribe(data => {
        this.loader.dismiss();
       // console.log("updateProfileOnlyData req"+JSON.stringify(data));
        let res : LoginResponse;
        if(data.response){
          res = new LoginResponse(JSON.stringify(JSON.parse(data.response)));
        }else{
          res = new LoginResponse(JSON.stringify(data));
        }

        if(res && res.getErrormessage && res.getErrormessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(ProfilePage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
        
        if(res && res.getStatus === 'Success' && res.getData){
          if(res.getData && res.getData.getUserId){
            // alert("RES:" + JSON.stringify(res));
            /**
             * decode user mobile num and save data
             */
            let mobile =  this.utility.getDecodeData(res.getData.getUserMobile.toString().trim());
            res.getData.setUserMobile = mobile;

            this.userData = res.getData;
            //console.log("UIMAGE:",res.getData.getUserPhoto);

            this.session.set(Constants.SELECTED_LANGUAGE,this.selectedLanguageCode);
            this.session.set(Constants.USER_DATA,res.getData);
            //this.session.set(Constants.IS_LOGIN,true);
            //this.session.set(Constants.LOGIN_WITH,res.getData.getMedium);
            //this.navCtrl.pop();
            
            // if(!res.getData.getTCFlag || res.getData.getTCFlag.toString().trim() === Constants.NO){
            //   this.gotToUpdateTerms(res.getData,false);
            // }else{
              this.updateProfileData(res.getData);
            //}
            //this.goToDashboard(res.getData);
          }else{
            //go to create profile
            //alert(res.getMessage);
            this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
          }
        }else{
            if(res && res.getMessage){
              //alert(res.getMessage);
              this.alertProvider.basicAlertOnPage(ProfilePage,null,res.getMessage,null);
            }
        }

      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(ProfilePage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(ProfilePage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    }


     getlanguageFromCode(code:string):string{
        switch(code){
          case Constants.LANG_CODE_ENGLISH:
            return Constants.LANG_ENGLISH;  
          case Constants.LANG_CODE_HINDI:
            return Constants.LANG_HINDI;  
          case Constants.LANG_CODE_TAMIL:
            return Constants.LANG_TAMIL;  
        }
     }

     getCodeFromLanguage(lang:string):string{
        switch(lang){
          case Constants.LANG_ENGLISH:
            return Constants.LANG_CODE_ENGLISH;  
          case Constants.LANG_HINDI:
            return Constants.LANG_CODE_HINDI;  
          case Constants.LANG_TAMIL:
            return Constants.LANG_CODE_TAMIL;  
        }
     }

     goToDashboard(data?:LoginResponseData){
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
      this.navCtrl.push(DashboardPage, {
        data:data
      }).then(() => {
        
        this.navCtrl.remove(this.viewCtrl.index);
      });
    }

    toggleTermsAndConditions(){
      if(this.isTermsChecked){
          this.isTermsChecked = false;
      }else{
          this.isTermsChecked = true;
      }

      //this.isTermsChecked = myEvent.checked;
     // console.log("TERMS " + this.isTermsChecked );
      //alert("TERMS:" + this.isTermsChecked);
    }

    onClickTerms1(){
        this.navCtrl.push(TermsConditionPage,{
          data:"false",
          callback:this.callback.bind(this),
          check:this.isTermsChecked,
          userId:this.userData.getUserId
        });
    }

    onClickTerms2(event){
      //console.log("CHECK:" + event.checked);
      if(event.checked !== this.isTermsChecked) {
          event.checked = this.isTermsChecked;
          //myModel.toggleChecked();
         
      }else{
        this.navCtrl.push(TermsConditionPage,{
          data:"false",
          callback:this.callback.bind(this),
          userId:this.userData.getUserId
          //check:this.isTermsChecked
        });
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

    /**
     * callback to check fingerauth is enabled or not
     */
    callbackForFingerTouch = function(isChange,isChecked,event) {
      return new Promise((resolve, reject) => {
       // console.log("FINGER_TOUCH_CALLBACK:"+isChecked);

        if(isChange){
          if(!isChecked){
            this.isFingerTouchEnabled = isChecked;
            event.checked = isChecked;
          }
          
          resolve();
        }else{
          resolve();
        }
        //alert(this.test);
          
      });
    }

    /**
     * callback to check if terms and conditions are checked
     */
    callback = function(isChange,isChecked,TCCODE) {
      return new Promise((resolve, reject) => {
        if(isChange){
          //alert("USER:"+JSON.stringify(userData));
          this.isTermsChecked = isChecked;
          this.TCCODE = TCCODE;
          //console.log("callback"+this.TCCODE);          
          resolve();
        }else{
          resolve();
        }
        //alert(this.test);
          
      });
    }

     /**
     * cehck finger auth
     * 
     */
    async checkFingerAIO(userData:LoginResponseData){
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
          //}
          //this.goToFingerAuth();
        }else{
          // if(!userData.getTCFlag || userData.getTCFlag.toString().trim() === Constants.NO){
          //   this.gotToUpdateTerms(userData,false);
          // }else{
            this.goToDashboard();
          // }
        }
      }catch(e){
        //console.error("ERROR:"+ e);
        //alert("ERROR:"+ e);
        //this.navCtrl.pop();
        // if(!userData.getTCFlag || userData.getTCFlag.toString().trim() === Constants.NO){
        //   this.gotToUpdateTerms(userData,false);
        // }else{
          this.goToDashboard();
        //}
      }
    }

    goToFingerAuth(){
      this.navCtrl.push(FingerAuthPage, {
  
      }).then(() => {
        let index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
    }

    onFingerTouchToggle(event){


      // if(event.checked !== this.isTermsChecked) {
      //   event.checked = this.isTermsChecked;
      //   //myModel.toggleChecked();
       
      // }else{
      //   this.navCtrl.push(TermsConditionPage,{
      //     data:"false",
      //     callback:this.callback.bind(this)
      //     //check:this.isTermsChecked
      //   });
      // }

      //console.log("FINGER_TOUCH:"+event.checked);
      //console.log("FINGER_TOUCH:"+this.isFingerTouchEnabled);

      if(event.checked) {
        //event.checked = false;
        //this.isFingerTouchEnabled = false;

        // this.navCtrl.push(FingerAuthPage,{
        //   register_for_touch:Constants.REGISTER_FOR_TOUCH,
        //   callback:this.callbackForFingerTouch.bind(this),
        //   togglEvent:event
        // });
        this.checkFingerAForRegister(event);
       
      }else{
        this.isFingerTouchEnabled = false;
        
      }
    }

    /**
     * cehck finger auth for register
     * 
     */
    async checkFingerAForRegister(event){
      try{
      //const ready = await this.platform.ready();
    // alert("PLATFORM:"+ready);
        const available = await this.faio.isAvailable();
        //console.log("CHECK:"+available);
        //alert("CHECK:"+available);
        if(available === 'OK' || available === 'finger'){
          this.navCtrl.push(FingerAuthPage,{
            register_for_touch:Constants.REGISTER_FOR_TOUCH,
            callback:this.callbackForFingerTouch.bind(this),
            togglEvent:event
            //check:this.isTermsChecked
          });
        }else{
          //alert(strings.please_register_touch);
          this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.please_register_touch,null);
          event.checked = false;
          this.isFingerTouchEnabled = false;
        }
      }catch(e){
        //console.error("ERROR:"+ e);
        //alert("ERROR:"+ e);
        //this.navCtrl.pop();
        //alert(strings.please_register_touch);
        this.alertProvider.basicAlertOnPage(ProfilePage,null,strings.please_register_touch,null);
        event.checked = false;
        this.isFingerTouchEnabled = false;
      }
    }

    /**
     * check finger print is available or not when user open app again
     */
    async checkFingerAioOnResume(){
      try{
        await this.platform.ready();
    // alert("PLATFORM:"+ready);
        const available = await this.faio.isAvailable();
        //console.log("CHECK:"+available);
        //alert("CHECK:"+available);
        if(available === 'OK' || available === 'finger'){
          
        }else{
          //alert(strings.please_register_touch);
          //event.checked = false;
          this.isFingerTouchEnabled = false;
        }
      }catch(e){
        //console.error("ERROR:"+ e);
        //alert("ERROR:"+ e);
        //this.navCtrl.pop();
        //alert(strings.please_register_touch);
        //event.checked = false;
        this.isFingerTouchEnabled = false;
      }
    }

    

    ionViewWillEnter(){
      //console.log('ionViewWillEnter ProfilePage');
      this.alertProvider.setCurrentPage(ProfilePage);
      
    }
  
    ionViewDidEnter(){
     // console.log('ionViewDidEnter ProfilePage');
    }
  
    ionViewWillLeave(){
    
    //  console.log('ionViewWillLeave ProfilePage');
    }
  
    ionViewDidLeave(){
    //console.log('ionViewDidLeave ProfilePage');
    }
  
    ionViewWillUnload(){
      //console.log('ionViewWillUnload ProfilePage');
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
        // if(this.type === Constants.UPDATE_PROFILE){
        //   this.navCtrl.remove(this.navCtrl.getPrevious().index - 1);
        //   this.navCtrl.remove(this.navCtrl.getPrevious().index);
        //   //let index = this.viewCtrl.index;
        //   //this.navCtrl.remove(index);
        // }else{
        //   this.navCtrl.remove(this.navCtrl.getPrevious().index);
        //   let index = this.viewCtrl.index;
        //   this.navCtrl.remove(index);
        // }
        
      });
    }

    async imageClick(){
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
           // console.log("cancel clicked");
            }
        },
        {
            text: ok,
            handler: data => {
              if(data==='Camera'){
               this.getImage(); 
              }else{
                this.getImagefromGallery();
              }
             // console.log("search clicked");
            }
        }]});
        prompt.present();

      //this.changeListener(event);
     }

     getImagefromGallery() {
      const options: CameraOptions = {
        quality: 50,
        correctOrientation: true,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
      }
    
      this.camera.getPicture(options).then((imageData) => {
        // alert("IMAGE:"+imageData);
        this.userData.setUserPhoto = imageData;
        
      }, (err) => {
      //  console.log(err);
        //alert(err);
        this.alertProvider.basicAlertOnPage(ProfilePage,null, err, null);
        //this.presentToast(err);
      });
    }
}
