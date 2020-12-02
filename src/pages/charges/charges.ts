import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, Platform } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { Http } from '@angular/http';
import * as strings from '../../utils/strings'
import * as Constants from '../../utils/constants'
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { AddDailyRequest } from '../../api/request/add_daily_request';
import { AddSpecialRequest } from '../../api/request/add_special_request';
import { AddRequestResponse } from '../../api/response/add_request_response';
import { ApiProvider } from '../../providers/api/api';
import { NetworkProvider } from '../../providers/network/network';
import { AddTransitRequest } from '../../api/request/add_transit_request';
import { AddTransitResponse } from '../../api/response/add_transit_response';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ChargesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-charges',
  templateUrl: 'charges.html',
})
export class ChargesPage {

  myUrl:any;
  type:string = Constants.REQ_CAT_DAILY;
  addDailyRequest:AddDailyRequest = new AddDailyRequest();
  addSpecialRequest:AddSpecialRequest = new AddSpecialRequest();
  addTransitRequest:AddTransitRequest = new AddTransitRequest();
  horoscopeListCallback: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http:Http,
    public loadingCtrl: LoadingController,
    public alertProvider:AlertProvider,
    public translate:TranslateService,
    private api:ApiProvider,
    public viewCtrl: ViewController,
    public utility:UtilityProvider,
    public session:Storage,
    public platform:Platform,
    public networkProvider:NetworkProvider) {

      this.alertProvider.setCurrentPage(ChargesPage);
      
      
  }


  ionViewDidEnter() {
    //console.log('ionViewDidLoad ChargesPage');
    //this.loadCharges();
    this.getNavParams();
  }

  getNavParams(){
    if (this.navParams.get(Constants.TYPE)) {
      this.type = this.navParams.get(Constants.TYPE);
    }

    if(this.type === Constants.REQ_CAT_SPECIAL){
      if (this.navParams.get("request")) {
        this.addSpecialRequest = this.navParams.get("request");
      }
    }else if(this.type === Constants.REQ_CAT_DAILY || this.type === Constants.REQ_CAT_WEEKLY){
      if (this.navParams.get("request")) {
        this.addDailyRequest = this.navParams.get("request");
      }
    }else{
      if (this.navParams.get("request")) {
        this.addTransitRequest = this.navParams.get("request");
       // alert("REQ:" + JSON.stringify(this.addTransitRequest));
      }
    }

    if (this.navParams.get("callback")) {
      this.horoscopeListCallback = this.navParams.get("callback");
    }

    if(this.navParams.get("url")){
      this.loadCharges(this.navParams.get("url"));
    }
  }

  onBackPressed(){
    this.navCtrl.pop();
  }

  onHomePressed(){
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  onClickDisagree(){
    this.navCtrl.pop();
  }

  onClickAgree(){
    switch(this.type){
      case Constants.REQ_CAT_DAILY:
        this.callAddDailyRequestApi();
      break;
      case Constants.REQ_CAT_WEEKLY:
        this.callAddWeeklyRequestApi();
      break;
      case Constants.REQ_CAT_SPECIAL:
        this.callAddSpecialRequestApi();
      break;
      case Constants.REQ_CAT_JU:
      case Constants.REQ_CAT_SA:
      case Constants.REQ_CAT_RA:
      case Constants.REQ_CAT_KE:
      case Constants.REQ_CAT_MA:
      case Constants.REQ_CAT_SU:
      case Constants.REQ_CAT_ME:
        this.callAddTransitRequest();
      break;
    }
  }

  updateHoroscopeListData() {
    if (this.horoscopeListCallback) {
      this.horoscopeListCallback(true).then(() => {
        let index = this.viewCtrl.index;
        this.navCtrl.popTo(this.navCtrl.getByIndex(index-2));
      });
    } else {
      // this.navCtrl.pop();
      let index = this.viewCtrl.index;
      this.navCtrl.popTo(this.navCtrl.getByIndex(index-2));
    }

  }

  loadCharges(url:string){
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();
    localLoader.dismiss();
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
   
    this.myUrl = this.http
    .get(url)
    //.get(proxyUrl + 'http://49.50.103.132/ak45.html')
    .finally(() => localLoader.dismiss())
    .map(response => response.text())
    .subscribe(data =>{
       localLoader.dismiss();
       
        document.getElementsByClassName("charges")[0].innerHTML = data;
        //Com.getElementsByClassName("term-condition-wrapper")[0].value = data;

      },error => {
        //localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          // this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.please_check_internet_access, null);
          this.loadChargesWithProxy(proxyUrl+url);
        }else{
          this.alertProvider.basicAlertOnPage(ChargesPage,null,error.toString(), null);
        }
      },() => {
        //localLoader.dismiss();
        // No errors, route to new page
        
      }
    );
  }

  loadChargesWithProxy(url:string){
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();
    
    this.myUrl = this.http
    .get(url)
    .finally(() => localLoader.dismiss())
    .map(response => response.text())
    .subscribe(data =>{
       // localLoader.dismiss();
       
        document.getElementsByClassName("charges")[0].innerHTML = data;
        //Com.getElementsByClassName("term-condition-wrapper")[0].value = data;

      },error => {
        //localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(ChargesPage,null,error.toString(), null);
        }
      },() => {
        //localLoader.dismiss();
        // No errors, route to new page
        
      }
    );
  }

  callAddDailyRequestApi(){
    //alert("REQ:"+JSON.stringify(this.addDailyRequest));
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.no_internet_connection,null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

    this.api.addDailyRequest(this.addDailyRequest).subscribe(response => {
      console.log('daily request response', response);
      localLoader.dismiss();
     //alert(response);
      //let d = JSON.stringify(response);
      //alert("RES:"+JSON.stringify(response));
      let fObj: AddRequestResponse = new AddRequestResponse(JSON.stringify(response));
      if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }
      
      if(fObj && fObj.getStatus === 'Success'){

          if(fObj.getData ){  
            //call daily request api
            //alert(fObj.getMessage);  
            if(fObj.getMessage){
              this.alertProvider.basicAlertOnPage(ChargesPage,null,fObj.getMessage,null);
            }
            this.updateHoroscopeListData();
          }else{
            //show alert for request already exist
            //alert(fObj.getMessage);
            if(fObj.getMessage){
              this.alertProvider.basicAlertOnPage(ChargesPage,null,fObj.getMessage,null);
            }
          }
      }else{
      
        if(fObj && fObj.getMessage){
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(ChargesPage,null,JSON.stringify(fObj.getMessage),null);
          //this.presentToast(JSON.stringify(fObj.getMessage));
        }
      }
      
    },error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(ChargesPage,null,error.toString(), null);
      }
    },() => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  callAddWeeklyRequestApi(){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.no_internet_connection,null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

    // alert("REQ:"+JSON.stringify(this.addDailyRequest));

    this.api.addWeeklyRequest(this.addDailyRequest).subscribe(response => {
      localLoader.dismiss();
      // alert("RES:"+JSON.stringify(response));

     //alert(response);
      //let d = JSON.stringify(response);
      let fObj: AddRequestResponse = new AddRequestResponse(JSON.stringify(response));
      if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }
      
      if(fObj && fObj.getStatus === 'Success'){

          if(fObj.getData ){  
            //call daily request api
            //alert(fObj.getMessage);  
            if(fObj.getMessage){
              this.alertProvider.basicAlertOnPage(ChargesPage,null,fObj.getMessage,null);
            }
            let index = this.viewCtrl.index;
            this.navCtrl.popTo(this.navCtrl.getByIndex(index-2));
          }else{
            //show alert for request already exist
            //alert(fObj.getMessage);
            if(fObj.getMessage){
              this.alertProvider.basicAlertOnPage(ChargesPage,null,fObj.getMessage,null);
            }
          }
      }else{
      
        if(fObj && fObj.getMessage){
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(ChargesPage,null,JSON.stringify(fObj.getMessage),null);
          //this.presentToast(JSON.stringify(fObj.getMessage));
        }
      }
      
    },error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(ChargesPage,null,error.toString(), null);
      }
    },() => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  callAddSpecialRequestApi(){

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.no_internet_connection,null);
      return;
    }

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

    //alert("REQ:"+this.addSpecialRequest);
    this.api.addSpecialRequest(this.addSpecialRequest).subscribe(response => {
      localLoader.dismiss();

     //alert("RES:" + JSON.stringify(response));
      //let d = JSON.stringify(response);
      let fObj: AddRequestResponse = new AddRequestResponse(JSON.stringify(response));
      if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }
      
      if(fObj && fObj.getStatus === 'Success'){

          if(fObj.getData ){  
            //call daily request api
            //alert(fObj.getMessage);  
            if(fObj.getMessage){
              this.alertProvider.basicAlertOnPage(ChargesPage,null,fObj.getMessage,null);
            }
            let index = this.viewCtrl.index;
            this.navCtrl.popTo(this.navCtrl.getByIndex(index-2));
          }else{
            //show alert for request already exist
            //alert(fObj.getMessage);
            if(fObj.getMessage){
              this.alertProvider.basicAlertOnPage(ChargesPage,null,fObj.getMessage,null);
            }
          }
      }else{
      
        if(fObj && fObj.getMessage){
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(ChargesPage,null,JSON.stringify(fObj.getMessage),null);
          //this.presentToast(JSON.stringify(fObj.getMessage));
        }
      }
      
    },error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(ChargesPage,null,error.toString(), null);
      }
    },() => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  callAddTransitRequest(){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.no_internet_connection,null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

    //alert("REQ:" + JSON.stringify(this.addTransitRequest));

    this.api.addTransitRequest(this.addTransitRequest).subscribe(response => {
      localLoader.dismiss();
      //alert("RES:" + JSON.stringify(response));

     //alert(response);
      //let d = JSON.stringify(response);
      let fObj: AddTransitResponse = new AddTransitResponse(JSON.stringify(response));
      
      if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }
      
      if(fObj && fObj.getStatus === 'Success'){

          if(fObj.getData ){  
            //call daily request api
            //alert(fObj.getMessage);  
            if(fObj.getMessage){
              this.alertProvider.basicAlertOnPage(ChargesPage,null,fObj.getMessage,null);
            }
            let index = this.viewCtrl.index;
            this.navCtrl.popTo(this.navCtrl.getByIndex(index-2));
          }else{
            //show alert for request already exist
            //alert(fObj.getMessage);
            if(fObj.getMessage){
              this.alertProvider.basicAlertOnPage(ChargesPage,null,fObj.getMessage,null);
            }
          }
      }else{
      
        if(fObj && fObj.getMessage){
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(ChargesPage,null,JSON.stringify(fObj.getMessage),null);
          //this.presentToast(JSON.stringify(fObj.getMessage));
        }
      }
      
    },error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(ChargesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(ChargesPage,null,error.toString(), null);
      }
    },() => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  ionViewWillEnter(){
    this.alertProvider.setCurrentPage(ChargesPage);
  }
}
