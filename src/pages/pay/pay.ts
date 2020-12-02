import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { IonicPage, NavParams, PopoverController } from 'ionic-angular';

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
import { DashboardPage } from '../dashboard/dashboard';
import { PayRequest } from '../../api/request/pay_request';
import { PaymentRecordResponse } from '../../api/response/payment_record_response';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';

/**
 * Generated class for the PayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  userData:any;
  amount:string;
  email:string;
  currency:string;
  userId:string;
  payRequest:PayRequest = new PayRequest();
  isINR:boolean = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public session:Storage,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    public api:ApiProvider,
    private platform:Platform,
    public alertProvider:AlertProvider,
    public translate:TranslateService,
    public networkProvider:NetworkProvider,
    public utility:UtilityProvider) {

      this.alertProvider.setCurrentPage(PayPage);
      this.getNavParamData();

  }

  setHardwareBackButton(){
    this.platform.ready().then(() => {

      if (!this.platform.is('cordova')) {
        //this.isKeyboardOpen=true;
        return;
      }

      this.platform.registerBackButtonAction(() => {
        this.onBackPressed();
      });

    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PayPage');
  }

  ionViewDidEnter(){
    //console.log('ionViewDidEnter PayPage');
    //this.getNavParamData();
    this.setHardwareBackButton();
  }

  getNavParamData(){
    if(this.navParams.get('data')){
      this.userData = this.navParams.get('data');
      if(this.userData){
        if(this.userData.getUserId){
          this.userId = this.userData.getUserId;
        }
        if(this.userData.getUcurrency){
          this.currency = this.userData.getUcurrency;
          if(this.currency && (this.currency === Constants.USD || this.currency === "Usd")){
              this.isINR = false;
          }else{
            this.isINR = true;
          }
        }
        if(this.userData.getUserEmail){
          this.email = this.userData.getUserEmail;
        }
      }
    }else{
      this.session.get(Constants.USER_DATA).then(val=>{
          this.userData  = new LoginResponseData(JSON.stringify(val));
          if(this.userData){
            if(this.userData.getUserId){
                this.userId = this.userData.getUserId
            }
            if(this.userData.getUcurrency){
              this.currency = this.userData.getUcurrency;
              if(this.currency && (this.currency === Constants.USD || this.currency === "Usd")){
                  this.isINR = false;
              }else{
                this.isINR = true;
              }
            }
            if(this.userData.getUserEmail){
              this.email = this.userData.getUserEmail;
            }
          }
      });
    }
  }

  addAmount(amount:string){
    //this.amount = amount;
    this.payRequest.setAmount = Number(amount);
  }

  onHomePressed(){
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  onBackPressed(){
    this.navCtrl.pop();
  }

  onSendClick(){
    if(!this.isValidate()){
        return;
    }

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(PayPage,null,strings.no_internet_connection,null);
      return;
    }

    //this.payRequest.setAmount = Number(this.amount);
    this.payRequest.setEmail = this.email;
    this.payRequest.setCurrency = this.currency;
    this.payRequest.setUserId = this.userId;
    

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();
    
    this.api.addPaymentRequest(this.payRequest).subscribe(response=>{
      localLoader.dismiss();
      let data : PaymentRecordResponse = new PaymentRecordResponse(JSON.stringify(response));

      if(data && data.getErrormessage && data.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(PayPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }


      if(data && data.getStatus === 'Success'){

        this.alertProvider.basicAlertOnPage(PayPage,null,data.getMessage,null);
        this.onBackPressed();
      }else{
        //alert(data.getMessage);
        this.alertProvider.basicAlertOnPage(PayPage,null,data.getMessage,null);
      }
    },error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(PayPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
      || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(PayPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(PayPage,null,error.toString(), null);
      }
    },() => {
      //localLoader.dismiss();
      // No errors, route to new page
    });   
  }

  onSendCancel(){
    this.navCtrl.pop();
  }

  isValidate():boolean{
    let valid = true;
     
      // if(!this.amount || this.amount.toString().length == 0){
      //   this.alertProvider.basicAlertOnPage(PayPage,null,strings.please_enter_amount,null);
      //   valid = false;
      // }else if(this.amount.toString().length > 6){
      //   this.alertProvider.basicAlertOnPage(PayPage,null,strings.please_enter__max_amount_of_six_digits,null);
      //   valid = false;
      // }
      if(!this.payRequest.getAmount || this.payRequest.getAmount == 0){
        this.alertProvider.basicAlertOnPage(PayPage,null,strings.please_enter_amount,null);
         valid = false;
      }else if(this.payRequest.getAmount > 999999){
        this.alertProvider.basicAlertOnPage(PayPage,null,strings.please_enter__max_amount_of_six_digits,null);
         valid = false;
      }
      else if(!this.email || this.email.length == 0){
        this.alertProvider.basicAlertOnPage(PayPage,null,strings.please_enter_email_id,null);
        valid = false;
      }else if(!Constants.email_checker.test(this.email)){
        this.alertProvider.basicAlertOnPage(PayPage,null,strings.please_enter_valid_email_id,null);
        valid = false;
      }
        
      return valid;
  }

  onAmountChange(keyCode,value){
    // if(!Constants.NUMBER_CHECKER.test(this.amount)){
    //   for(let i=48;i<=57;i++){
    //     try{
    //       if(keyCode != i){
    //         this.amount.replace(value,'');
    //         console.log(i+" CODE:" + keyCode + " VALUE:" + value);
    //       }
    //       console.log(i+" CODE:" + keyCode + " VALUE:" + value);
    //     }catch(e){

    //     }
    //   }
        
    // }
  }

  ionViewWillEnter(){
    this.alertProvider.setCurrentPage(PayPage);
  }

}
