import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { IonicPage, NavParams, PopoverController } from 'ionic-angular';

import { BasicPage } from '../basic/basic';
import { Platform, ActionSheetController } from 'ionic-angular';
import { LoginResponseData } from '../../api/response/login_response_data';
import { Storage } from '@ionic/storage';
import * as Constants from '../../utils/constants';
import * as strings from '../../utils/strings';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ApiProvider } from '../../providers/api/api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PopoverComponent } from '../../components/popover/popover';
import { ProfilePage } from '../profile/profile';
import { UserData } from '../../models/user_data';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { NetworkProvider } from '../../providers/network/network';
import { LoginResponse } from '../../api/response/login_response';
import { UtilityProvider } from '../../providers/utility/utility';
import { SocialLoginPage } from '../social-login/social-login';




@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  loader :any;
  userProfile:LoginResponseData = new LoginResponseData();
  originalUserProfile:any;
  isEditable:boolean;
  lastProfileImage:string;
  language:string = "English";
  Gender:string;
  imageURI:any = "assets/images/upload-profile.svg";
  userProfileCallback: any;
  isDataUpdated:boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public session:Storage,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    public api:ApiProvider,
    private camera: Camera,
    private popOverController:PopoverController,
    private platform:Platform,
    public alertProvider:AlertProvider,
    public translate:TranslateService,
    public networkProvider:NetworkProvider,
    public toastCtrl: ToastController,
    public utility:UtilityProvider,
    public alertCtrl: AlertController) {
      
      this.alertProvider.setCurrentPage(UserProfilePage);
      this.setHardwareBackButton();

    if(!this.userProfile.getUserPhoto){
      this.userProfile.setUserPhoto = this.imageURI
    }

     this.initiateLoder();
     this.getNavParamData();

    this.Gender = "Male";

    // this.session.get(Constants.USER_DATA).then(val=>{
    //   console.log("VALUE",JSON.stringify(val));
    //   this.userProfile = new LoginResponseData(JSON.stringify(val));

    //     if(!this.userProfile){
    //       this.userProfile = new LoginResponseData();
    //       this.userProfile.setUserId = 'test@gmail.com';
    //       this.userProfile.setUserEmail = 'test@gmail.com';
    //       this.userProfile.setUserName = 'Test Name';
    //       this.userProfile.setTokenFacebook = '123dghdfg';
    //       this.userProfile.setTokenGoogle = '123dghdfg';
    //       this.userProfile.setTokenYahoo = '123dghdfg';
    //       this.userProfile.setUcountry = 'INDIA';
    //       this.userProfile.setUcurrency = 'INR';
    //       this.userProfile.setUserIdd = '+91';
    //       this.userProfile.setUserMobile = '12336555555';
    //       this.userProfile.setUcharge = "";
    //       this.userProfile.setUserPDate = "";
    //       this.userProfile.setUserPpLang = 'en';
    //   }else{
    //     this.originalUserProfile = this.userProfile;
    //     this.lastProfileImage = this.userProfile.getUserPhoto;
    //     this.language = this.getlanguageFromCode(this.userProfile.getUserPpLang);
    //   }
    // });

  }

  setHardwareBackButton(){
    this.platform.ready().then(() => {

      if(!this.platform.is('cordova')){
          //this.isKeyboardOpen=true;
          return;
      }
     
      this.platform.registerBackButtonAction(() => {
        this.alertProvider.dismiss();
        this.onBackPressed();
      });

    });
  }

  initiateLoder(){
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
  }

  getNavParamData(){

    if(this.navParams.get("callback")){
      this.userProfileCallback = this.navParams.get("callback");
    }
    

    if(this.navParams.get('data')){
      this.userProfile = this.navParams.get('data');
      if(this.userProfile && !this.userProfile.getUserPhoto){
        this.userProfile.setUserPhoto = this.imageURI
      }
      this.language = this.getlanguageFromCode(this.userProfile.getUserPpLang);
    }else{
      this.session.get(Constants.USER_DATA).then(val=>{
          this.userProfile  = new LoginResponseData(JSON.stringify(val));
          this.language = this.getlanguageFromCode(this.userProfile.getUserPpLang);
          if(!this.userProfile.getUserPhoto){
            this.userProfile.setUserPhoto = this.imageURI
          }
      });
    }

  }

  callback = function(isChange,userData) {
    return new Promise((resolve, reject) => {
      if(isChange){
        //alert("USER:"+JSON.stringify(userData));
        this.isDataUpdated = true;
        this.userProfile = userData;
        this.language = this.getlanguageFromCode(this.userProfile.getUserPpLang);
        this.setHardwareBackButton();
        resolve();
      }else{
        this.setHardwareBackButton();
        resolve();
      }
      //alert(this.test);
        
    });
  }

  onBackPressed(){
    if(this.userProfileCallback){
      this.userProfileCallback(this.isDataUpdated,this.userProfile).then(()=>{
        this.navCtrl.pop();
      });
    }else{
      this.navCtrl.pop();
    }
  }

  editProfile(){
    this.navCtrl.push(ProfilePage, {
        type:Constants.UPDATE_PROFILE,
        data:this.userProfile,
        callback:this.callback.bind(this)
      });
  }

  enableToEdit(){
    if(this.isEditable){
      this.isEditable = false;
      this.userProfile = this.originalUserProfile;
    }else{
      this.isEditable = true;
    }
  }

  go_to_another_page(){
   //console.log('on page clicked')
   this.navCtrl.push(BasicPage, {
    platform:Platform,
  	actionsheetCtrl:ActionSheetController
    });
  }

  getImage() {
    // const options: CameraOptions = {
    //   quality: 70,
    //     destinationType: this.camera.DestinationType.FILE_URI,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE,
    //     cameraDirection : 1,
    //     correctOrientation: true
    // }

    // this.camera.getPicture(options).then((imageData) => {
    // this.userProfile.setUserPhoto = imageData;
    
    // }, (err) => {
    //   console.log(err);
    //   alert(err);
    // });
  }

  selectLanguage(myEvent){
    // let items=[
    //   {item:Constants.LANG_ENGLISH},
    //   {item:Constants.LANG_HINDI},
    //   {item:Constants.LANG_TAMIL}
    // ]
    // let popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_LANGUAGE,data:items});
    // popover.present({
    //   ev:myEvent
    // });

    // popover.onDidDismiss(popOverData=>{
    //   if(!popOverData){
    //     return;
    //   }

    //   this.userProfile.setUserPpLang = popOverData.item;

    // });
  
  }

  validateProfile():boolean{
    return true;
  }

  updateProfile(){
    if(this.validateProfile()){
      if(this.lastProfileImage && this.lastProfileImage === this.userProfile.getUserPhoto){
        this.uploadOnlyData(this.userProfile);
      }else{
        this.uploadFile(this.userProfile);
      }
    }
  }

  uploadOnlyData(req:any){
    this.initiateLoder();
      this.loader.present();
      let postData = new FormData();
      postData.append("USERID", req.getUserId),
      postData.append("USERNAME", req.getUserName),
      postData.append("USEREMAIL", req.getUserEmail),
      postData.append("USERIDD", req.getUserIdd),
      postData.append("USERMOBILE", req.getUserMobile),
      //"USERACCOUNTNO": req.USERACCOUNTNO,
      postData.append("UCOUNTRY", req.getUcountry),
      postData.append("UCURRENCY", req.getUcurrency),
      postData.append("UCHARGE", req.getUcharge),
      postData.append("USERPDATE", req.getUserPDate),
      postData.append("USERPPLANG", req.getUserPpLang),
      //"USERLASTHOROID": req.USERLASTHOROID,
      //"PASSWORD": req.PASSWORD,
      postData.append("TOKENFACEBOOK", req.getTokenFacebook),
      postData.append("TOKENGOOGLE", req.getTokenGoogle),
      postData.append("TOKENYAHOO", req.getTokenYahoo)
      //postData.append("USERPHOTO",req.getUserPhoto)

      this.api.updateProfile(postData).subscribe(response => {
        this.loader.dismiss();
        //alert(JSON.stringify(response));
        if(response && response.getStatus === 'Success'){
            if(response.getData && response.getData.getUserId){
              //save data in storage
            }else{
              
              
            }
        }else{
          if(response && response.getMessage){
            //alert(JSON.stringify(response.getMessage));
            this.alertProvider.basicAlertOnPage(UserProfilePage,null,JSON.stringify(response.getMessage),null);
          }
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(UserProfilePage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
            this.alertProvider.basicAlertOnPage(UserProfilePage,null, strings.please_check_internet_access, null);
          }else{
            this.alertProvider.basicAlertOnPage(UserProfilePage,null,error.toString(), null);
          }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
  }

  uploadFile(req:any) {
    this.initiateLoder();
    this.loader.present();
    const fileTransfer:FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'USERPHOTO',
      fileName: req.getUserId+'.jpg',
      chunkedMode: false,
      mimeType: "image/jpg",
      // headers: {'Accept':'application/json',
      //           'Content-Type':'application/json'},
      params : {
        "USERID": req.getUserId,
        "USERNAME": req.getUserName,
        "USEREMAIL": req.getUserEmail,
        "USERIDD": req.getUserIdd,
        "USERMOBILE": req.getUserMobile,
        //"USERACCOUNTNO": req.USERACCOUNTNO,
        "UCOUNTRY": req.getUcountry,
        "UCURRENCY": req.getUcurrency,
        "UCHARGE": req.getUcharge,
        "USERPDATE": req.getUserPDate,
        "USERPPLANG": req.getUserPpLang,
        //"USERLASTHOROID": req.USERLASTHOROID,
        //"PASSWORD": req.PASSWORD,
        "TOKENFACEBOOK": req.getTokenFacebook,
        "TOKENGOOGLE": req.getTokenGoogle,
        "TOKENYAHOO": req.getTokenYahoo
      }

    }

    fileTransfer.upload(this.userProfile.getUserPhoto, 'http://49.50.103.131/api/profile/updateProfile', options)

      //fileTransfer.upload(this.userData.user_image, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
        //console.log(data+" Uploaded Successfully");
        //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
        this.loader.dismiss();
       alert("SUCCESS "+JSON.stringify(data));
      }, (err) => {
        //console.log(err);
        this.loader.dismiss();
        //this.presentToast(JSON.stringify(err));
        alert("ERROR" +JSON.stringify(err));
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

  ionViewWillEnter(){
    //console.log('ionViewWillEnter UserProfilePage');
      this.alertProvider.setCurrentPage(UserProfilePage);
  }

  ionViewDidEnter(){
    //console.log('ionViewDidEnter UserProfilePage');
  }

  ionViewWillLeave(){
    //console.log('ionViewWillLeave UserProfilePage');
  }

  ionViewDidLeave(){
    //console.log('ionViewDidLeave UserProfilePage');
  }

  ionViewWillUnload(){
    //console.log('ionViewWillUnload UserProfilePage');
  }

  async alertDeleteUserProfile() {
    let myTitle = strings.delete_title;
    let myMsg = strings.delete_user_profile_message;
    let cancel = strings.cancel;
    let ok = strings.ok;

    this.translate.get(strings.delete_title).subscribe(
      value => {
        // value is our translated string
        myTitle = value;
      }
    )

    this.translate.get(strings.delete_user_profile_message).subscribe(
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

    let alert = this.alertCtrl.create({
      title: myTitle,
      message: myMsg,
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
            this.callDeleteUserProfileApi(this.userProfile.getUserId);
          }
        }
      ]
    });
    alert.present();
  }

  callDeleteUserProfileApi(userId:any) {
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(UserProfilePage,null,strings.no_internet_connection,null);
      return;
    }

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();

    this.api.deleteUserProfile(userId).subscribe(response => {

      //alert(JSON.stringify(response));

      let data = new LoginResponse(JSON.stringify(response));

      if(data && data.getErrormessage && data.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(UserProfilePage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if (data && data.getStatus === 'Success') {
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);

      } else {
        localLoader.dismiss();
        if (data && data.getMessage) {
          this.presentToast(JSON.stringify(data.getMessage));
        }
      }

    }, error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.server_error, null);
      // this.loadNoDataUrl(true);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(UserProfilePage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(UserProfilePage,null,error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // this.loadNoDataUrl(true);
      // No errors, route to new page
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
}