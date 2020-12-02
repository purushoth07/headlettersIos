import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, Platform} from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import { MessageData } from '../../api/response/message_data';
import { MessageListResponse } from '../../api/response/message_list_reponse';
import {LoadingController} from 'ionic-angular';
import { LoginResponseData } from '../../api/response/login_response_data';
import { Storage } from '@ionic/storage';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import { HoroscopeListResponse } from '../../api/response/horoscope_list_response';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import { DashboardPage } from '../dashboard/dashboard';
import { AddMessagePage } from '../add-message/add-message';
import { AddMessageResponse } from '../../api/response/add_message_response';
import { DatePipe } from '@angular/common';
import { MessageHistoryPage } from '../message-history/message-history';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
import { LiveChatPage } from '../live-chat/live-chat';

/**
 * Generated class for the MessagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})


export class MessagesPage  {

   title:string = strings.all_messages
   loader:any;
   userData:any = new LoginResponseData();
   messageList:MessageData[] = [];
   horoscopeList:HoroscopeResponseData[]=[];
   noName:string = strings.no_name_found;

   constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public loadingCtrl: LoadingController,
      private api:ApiProvider,
      public alertCtrl: AlertController,
      private datePipe: DatePipe,
      private session:Storage,
      public alertProvider:AlertProvider,
      public translate:TranslateService,
      public platform:Platform,
      public networkProvider:NetworkProvider,
      public utility:UtilityProvider) {

      this.alertProvider.setCurrentPage(MessagesPage);
      
      
      //console.log('Constructor MessagesPage');
    }



    ionViewDidLoad() {
      //console.log('ionViewDidLoad MessagesPage');
      //this.getNavParamData();
      //this.sampleListData();
    }

    

    ionViewWillEnter(){
      //console.log('ionViewWillEnter MessagesPage');
      this.alertProvider.setCurrentPage(MessagesPage);
      this.translate.get(this.noName).subscribe(
        value => {
          // value is our translated string
          this.noName = value;
          //this.sampleListData();
          this.getNavParamData();
        }
      ) 

      this.initiateLoder();
    }

    ionViewDidEnter(){
      //console.log('ionViewDidEnter MessagesPage');
      //this.getNavParamData();
      this.setHardwareBackButton();
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

    ionViewWillLeave(){
      //console.log('ionViewWillLeave MessagesPage');
      // this.alertProvider.dismiss();
      
    }

    ionViewDidLeave(){
     // console.log('ionViewDidLeave MessagesPage');
      // this.alertProvider.dismiss();
    }

    ionViewWillUnload(){
      //console.log('ionViewWillUnload MessagesPage');

    }

    initiateLoder(){
      this.loader = this.loadingCtrl.create({
        content: strings.loader.loader_text,
        dismissOnPageChange:true
        //spinner:'ios'
      });
    }

    getNavParamData(){
      if(this.navParams.get('data')){
        this.userData = this.navParams.get('data');
        if(this.userData && this.userData.getUserId){
          // this.callHoroscopeListApi(this.userData.getUserId);
          this.callGetMessageApi(this.userData.getUserId,true);
        }
      }else{
        this.session.get(Constants.USER_DATA).then(val=>{
            this.userData  = new LoginResponseData(JSON.stringify(val));
            if(this.userData && this.userData.getUserId){
              // this.callHoroscopeListApi(this.userData.getUserId);
              this.callGetMessageApi(this.userData.getUserId,true);
            }
        });
      }
    }

  sampleListData(){

    let d = {
      "Status": "Success",
      "Message": "Messages Listing",
      "Data": [
          {
            "MSGUSERID": "enuke.software38@gmail.com    ",
            "MSGHID": "11                            ",
            "MSGMESSAGEID": "1                             ",
            "MSGCUSTOMERCOM": "Rzgzxhx^ 8/8/2018 2:20:30 PM !",
            "MSGAGENTCOM": "Hello horo 11^ 8/8/2018 1:53:04 PM^Agent Message !Change^ 8/8/2018 2:10:57 PM !Cgggvffff^ 8/8/2018 2:15:02 PM !Rzgzxhx^ 8/8/2018 2:20:30 PM ^Agent Message!",
            "MSGHCOMMENTS": "Hello horo 11^ 8/8/2018 1:53:04 PM^ Raj Comment !Change^ 8/8/2018 2:10:57 PM^ HORO Comment !Cgggvffff^ 8/8/2018 2:15:02 PM !Rzgzxhx^ 8/8/2018 2:20:30 PM !",
            "MSGSTATUS": "2         ",
            "MSGUNREAD": "y         ",
            "MSGDELETED": "y         "
        },
        {
            "MSGUSERID": "enuke.software38@gmail.com    ",
            "MSGHID": "11                            ",
            "MSGMESSAGEID": "2                             ",
            "MSGCUSTOMERCOM": "Test test^ 8/9/2018 5:01:48 AM !",
            "MSGAGENTCOM": "Hello horo 11^ 8/8/2018 1:53:04 PM !",
            "MSGHCOMMENTS": "Test test^ 8/9/2018 5:01:48 AM !",
            "MSGSTATUS": "2         ",
            "MSGUNREAD": "y         ",
            "MSGDELETED": null
        }
      ],
      "ErrorMessage": null
    }

    let data : MessageListResponse = new MessageListResponse(JSON.stringify(d));
    for(let item of data.getData){
      //console.log("DATA:" + JSON.stringify(item));
      this.messageList.push(item);
    }
    //this.messageList = this.messageList.filter(item => item.getMsgStatus.toString().trim() === "2");
  
  }

  onBackPressed(){
    this.navCtrl.pop();
  }

  onHomePressed(){
    // this.navCtrl.push(DashboardPage, {
    //    data:this.userData
    // });

    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }


  goToAddMessage(){
    this.navCtrl.push(LiveChatPage)
    // if(!this.horoscopeList || this.horoscopeList.length === 0){
    //   this.callHoroscopeListApi(this.userData.getUserId);
    // }else{
    //   this.navCtrl.push(AddMessagePage, {
    //     type:Constants.ADD_MESSAGE,
    //       horoscopeData:this.horoscopeList,
    //       callback:this.callback.bind(this)
    //   });
    // }
  }

  goToReplyMessage(message:MessageData){
    this.navCtrl.push(AddMessagePage, {
        type:Constants.UPDATE_MESSAGE,
        horoscopeData:this.horoscopeList,
        data:message,
        callback:this.callback.bind(this)
    });
  }

  viewHistory(message:MessageData){
    //console.log("CHECK" + JSON.stringify(message.getHistoryMessageToDisplay(this.noName)));
    this.navCtrl.push(MessageHistoryPage, {
      data:message.getHistoryMessageToDisplay(this.noName)
    });
  }

  alertDeleteMessage(message:MessageData) {
    let alertTitle = strings.delete_title;
    let alertMessage = strings.delete_message_message;
    let btnOk = strings.ok;
    let btnCancel = strings.cancel;

    this.translate.get(alertTitle).subscribe(
      value => {
        // value is our translated string
        alertTitle = value;
      }
    )

    this.translate.get(alertMessage).subscribe(
      value => {
        // value is our translated string
        alertMessage = value;
      }
    )

    this.translate.get(btnOk).subscribe(
      value => {
        // value is our translated string
        btnOk = value;
      }
    )

    this.translate.get(btnCancel).subscribe(
      value => {
        // value is our translated string
        btnCancel = value;
      }
    )

    let alert = this.alertCtrl.create({
      title: alertTitle,
      message: alertMessage,
      buttons: [
        {
          text: btnCancel,
          //role: 'cancel',
          handler: () => {
            
            //console.log('Cancel clicked');
          }
        },
        {
          text: btnOk,
          handler: () => {
           // console.log('Ok clicked');
            this.callDeleteMessagepeApi(message);
          }
        }
      ]
    });
    alert.present();
  }

  callDeleteMessagepeApi(message:MessageData){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(MessagesPage,null,strings.no_internet_connection,null);
      return;
    }
    //alert(message.getMsgUserId + " " + message.getMsgHId + " " + message.getMsgMessageId);
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
   localLoader.present();
    this.api.deleteMessage(message.getMsgUserId.toString().trim(),message.getMsgHId.toString().trim(),message.getMsgMessageId.toString().trim()).subscribe(response=>{

      localLoader.dismiss();
      let obj: AddMessageResponse = new AddMessageResponse(JSON.stringify(response));

      if(obj && obj.getErrormessage && obj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(MessagesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

        if(obj && obj.getStatus === 'Success'){
      
          //if(obj.getData && obj.getData.getMsgMessageId){
            this.messageList = this.messageList.filter(item => item !== message);
            //alert(obj.getMessage);
            this.alertProvider.basicAlertOnPage(MessagesPage,null,obj.getMessage,null);
         // }
        }else{
            //alert(obj.getMessage);
            this.alertProvider.basicAlertOnPage(MessagesPage,null,obj.getMessage,null);
        }
    },error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(MessagesPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
      || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(MessagesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(MessagesPage,null,error.toString(), null);
      }
    },() => {
      //localLoader.dismiss();
      // No errors, route to new page
    });  
  }

  callGetMessageApi(userId:string,showLoader:boolean){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(MessagesPage,null,strings.no_internet_connection,null);
      return;
    }

    if(!userId){
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    if(showLoader){
      localLoader.present();
    }
   
    this.api.getMessageList(userId.toString().trim()).subscribe(response=>{

      localLoader.dismiss();
      //alert("MESSAGE"+JSON.stringify(response));
      let fObj: MessageListResponse = new MessageListResponse(JSON.stringify(response));

      if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(MessagesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }


      if(fObj.getData && fObj.getData.length>0){
       // this.showNoData = false;
              this.messageList = fObj.getData;
              

             // this.messageList = this.messageList.filter(item => item.getMsgStatus.toString().trim() === "2");

         /* if(response.getData && response.getData.getUserId){
            //save data in storage
          }else{
          }*/
      }else{
        //if(response && response.getMessage){
          //alert("MESSAGE"+JSON.stringify(response.getMessage));
       // }
       //alert("FAILURE"+JSON.stringify(response));
      }
    },error => {
      localLoader.dismiss();
     // alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(MessagesPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
      || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(MessagesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(MessagesPage,null,error.toString(), null);
      }
    },() => {
     //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  callHoroscopeListApi(userId:string){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(MessagesPage,null,strings.no_internet_connection,null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();
      this.api.getHoroscopeList(userId.toString().trim()).subscribe(response => {
        localLoader.dismiss();

       //alert(response);
        //let d = JSON.stringify(response);
        let fObj: HoroscopeListResponse = new HoroscopeListResponse(JSON.stringify(response));
        if(fObj && fObj.getErrorMessage && fObj.getErrorMessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(MessagesPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
        
        if(fObj && fObj.getStatus === 'Success'){
          //alert(JSON.stringify(fObj));
            if(fObj.getData && fObj.getData.length>0){    
              //show listing
              this.horoscopeList = fObj.getData;
              this.navCtrl.push(AddMessagePage, {
                type:Constants.ADD_MESSAGE,
                  horoscopeData:this.horoscopeList,
                  callback:this.callback.bind(this)
              });

            }else{
              //show no list found
              //this.showNoData = true;
              this.alertProvider.basicAlertOnPage(MessagesPage,null,strings.please_add_horoscope_to_send_message,null);
            }
        }else{
        
          if(fObj && fObj.getMessage){
            //alert(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(MessagesPage,null,JSON.stringify(fObj.getMessage),null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }
        
      },error => {
        localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(MessagesPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(MessagesPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(MessagesPage,null,error.toString(), null);
        }
      },() => {
       //localLoader.dismiss();
        // No errors, route to new page
      });
    }

    /**
     * callback to check any data is updated on next screen to update list in this screen
     */
    callback = function(isChange) {
      return new Promise((resolve, reject) => {
        if(isChange){
          if(this.userData && this.userData.getUserId){
            this.callGetMessageApi(this.userData.getUserId,false);
          }
          resolve();
        }else{
          resolve();
        }
        //alert(this.test);
          
      });
    }
  

}
