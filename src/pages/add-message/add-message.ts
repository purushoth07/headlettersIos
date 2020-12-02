import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController, Platform} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import {AddMessageRequest} from '../../api/request/add_message_request';
import { ApiProvider } from '../../providers/api/api';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import { Storage } from '@ionic/storage';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import { MessageData } from '../../api/response/message_data';
import { AddMessageResponse } from '../../api/response/add_message_response';
import { DashboardPage } from '../dashboard/dashboard';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
/**
 * Generated class for the AddmessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-message',
  templateUrl: 'add-message.html',
 
})

export class AddMessagePage {

  loader:any;
  title:string =strings.add_message;
  horoscopeList:HoroscopeResponseData[]=[];
  hName:string;
  userId:string;
  messageData: MessageData = new MessageData();
  type:string = Constants.ADD_MESSAGE;
  isAddHoroscope:boolean = false;
  messageRequest:AddMessageRequest = new AddMessageRequest();
  messageListCallback:any;
  mainPopOver:any;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private popOverController:PopoverController,
     public loadingCtrl: LoadingController,
     private api:ApiProvider,
     private session:Storage,
     public alertProvider:AlertProvider,
     public translate:TranslateService,
    public platform:Platform,
    public utility:UtilityProvider,
    public networkProvider:NetworkProvider) {

      this.alertProvider.setCurrentPage(AddMessagePage);

      this.platform.ready().then(() => {

      if(!platform.is('cordova')){
          //this.isKeyboardOpen=true;
          return;
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
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddmessagePage');
    this.getNavParamData();
  }

  initiateLoder(){
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
  }

  getNavParamData(){
    if(this.navParams.get('type')){
      this.type = this.navParams.get('type');
    }

    if(this.navParams.get("callback")){
      this.messageListCallback = this.navParams.get("callback");
    }

    if(this.type === Constants.ADD_MESSAGE){
        this.title = strings.add_message;
        this.isAddHoroscope = true;
        if(this.navParams.get('horoscopeData')){
          this.horoscopeList = this.navParams.get('horoscopeData');
        }
    }else if(this.type === Constants.UPDATE_MESSAGE){
        this.title = strings.reply_message;
        this.isAddHoroscope = false;
        if(this.navParams.get('data')){
          this.messageData = this.navParams.get('data');
          if(this.messageData && this.messageData.getMsgHId){
            this.hName = this.messageData.getHORONAME;
             this.messageRequest.setMsgHId = this.messageData.getMsgHId;
             this.messageRequest.setMsgUserId = this.messageData.getMsgUserId;
             this.messageRequest.setMsgMessageId = this.messageData.getMsgMessageId;
             //this.messageRequest.setMsgCustomerCom = this.messageData.getMsgCustomerCom;
          }
        }
    }
    
  }


  onBackPressed(){
   // this.navCtrl.pop();
    // if(this.type === Constants.ADD_MESSAGE){
    //   this.navCtrl.pop();
    // }else{
      if(this.messageListCallback){
        this.messageListCallback(false).then(()=>{
          this.navCtrl.pop();
        });
      }else{
        this.navCtrl.pop();
      }
    //}
  }

  onHomePressed(){
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
    // this.navCtrl.push(DashboardPage, {
    //   //data:this.userData
    // });
  }


  requestClick(){

    if(!this.horoscopeList || this.horoscopeList.length == 0){
      return;
    }

    let popover = this.popOverController.create(PopoverComponent,{type:Constants.POPOVER_HOROSCOPE_NAME,data:this.horoscopeList});
    this.mainPopOver = popover;
    popover.present({
      //ev:myEvent
    });

    popover.onDidDismiss(popOverData=>{
      this.mainPopOver = null;
      if(!popOverData){
        return;
      }

      this.messageRequest.setMsgHId = popOverData.item.getHId;
      this.messageRequest.setMsgUserId = popOverData.item.getHUserId;
      this.hName = popOverData.item.getHName;
      
    });
  } 

 
  addMessageApi()
  {
    // let request=new AddMessageRequest();
    // request.setMsgCustomerCom="1";
    // request.setMsgHComments="2";
    // request.setMsgHId="3";
    // request.setMsgMessageId="4";
    // request.setMsgStatus="success";
    // request.setMsgUnread="yes";
    // request.setMsgUserId="7"; 

    //alert("Data to Send " +JSON.stringify(this.messageRequest));

    if(!this.isValidate()){
        return;
      }

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(AddMessagePage,null,strings.no_internet_connection,null);
      return;
    }
    
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
     localLoader.present();
      this.messageRequest.setMsgStatus = "1";
      this.messageRequest.setMsgUnread = "Y";
 
      if(this.type === Constants.ADD_MESSAGE){
        this.api.addMessage(this.messageRequest).subscribe(response=>{
          localLoader.dismiss();
          let data : AddMessageResponse = new AddMessageResponse(JSON.stringify(response));

          if(data && data.getErrormessage && data.getErrormessage === Constants.UNAUTHORIZED){
            this.alertProvider.basicAlertOnPage(AddMessagePage,null, strings.session_expired, null);
            this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
            return;
          }

          if(data && data.getStatus === 'Success'){

            //alert(data.getMessage);
            this.updateMessageListData();
            
          }else{
            //alert(data.getMessage);
            this.alertProvider.basicAlertOnPage(AddMessagePage,null,data.getMessage,null);
          }
        },error => {
          localLoader.dismiss();
          //alert(strings.server_error);
          // this.alertProvider.basicAlertOnPage(AddMessagePage,null,strings.server_error,null);

          if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
            || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
            this.alertProvider.basicAlertOnPage(AddMessagePage,null, strings.please_check_internet_access, null);
          }else{
            this.alertProvider.basicAlertOnPage(AddMessagePage,null,error.toString(), null);
          }
        },() => {
          //localLoader.dismiss();
          // No errors, route to new page
        });   
      }else{
        this.api.updateMessage(this.messageRequest).subscribe(response=>{
          localLoader.dismiss();
          let data : AddMessageResponse = new AddMessageResponse(JSON.stringify(response));

          if(data && data.getErrormessage && data.getErrormessage === Constants.UNAUTHORIZED){
            this.alertProvider.basicAlertOnPage(AddMessagePage,null, strings.session_expired, null);
            this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
            return;
          }

          if(data && data.getStatus === 'Success'){

            this.updateMessageListData();
            
          }else{
            //alert(data.getMessage);
            this.alertProvider.basicAlertOnPage(AddMessagePage,null,data.getMessage,null);
          }
        },error => {
          localLoader.dismiss();
         // alert(strings.server_error);
          // this.alertProvider.basicAlertOnPage(AddMessagePage,null,strings.server_error,null);
          if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
            || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
            this.alertProvider.basicAlertOnPage(AddMessagePage,null, strings.please_check_internet_access, null);
          }else{
            this.alertProvider.basicAlertOnPage(AddMessagePage,null,error.toString(), null);
          }
        },() => {
          //localLoader.dismiss();
          // No errors, route to new page
        });
      }
    
  }

  isValidate():boolean{
    if(this.type === Constants.ADD_MESSAGE){
      if(!this.messageRequest.getMsgHId){
        //alert(strings.please_select_horoscope);
        this.alertProvider.basicAlertOnPage(AddMessagePage,null,strings.please_select_horoscope,null);
        return false;
      }

      if(!this.messageRequest.getMsgCustomerCom || this.messageRequest.getMsgCustomerCom.toString().length == 0){
        //alert(strings.please_enter_message);
        this.alertProvider.basicAlertOnPage(AddMessagePage,null,strings.please_enter_message,null);
        return false;
      }
    }else{
      if(!this.messageRequest.getMsgCustomerCom || this.messageRequest.getMsgCustomerCom.toString().length == 0){
        //alert(strings.please_enter_message);
        this.alertProvider.basicAlertOnPage(AddMessagePage,null,strings.please_enter_message,null);
        return false;
      } 
    }

    return true;
  }

  updateMessageListData(){
    if(this.messageListCallback){
      this.messageListCallback(true).then(()=>{
        this.navCtrl.pop();
      });
    }else{
      this.navCtrl.pop();
    }
    
  }

  ionViewWillEnter(){
    this.alertProvider.setCurrentPage(AddMessagePage);
  }

}
