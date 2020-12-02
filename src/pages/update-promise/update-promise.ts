import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import {LoadingController} from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from '../../components/popover/popover';
import { resolveDep } from '@angular/core/src/view/provider';
import 'rxjs/add/operator/map';
import { Http,Headers } from '@angular/http';
import { PromiseData } from '../../api/response/promise_data';
import { PromiseListResponse } from '../../api/response/promise_list_response';
import { UpdatePromiseRequest } from '../../api/request/update_promise_request';
import { UpdatePromiseResponse } from '../../api/response/update_promise_response';
import { DashboardPage } from '../dashboard/dashboard';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UpdatePromisePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-promise',
  templateUrl: 'update-promise.html',
})

export class UpdatePromisePage {

  loader:any;
  promiseData:PromiseData;
  //userComment:string;
  updatePromiseRequest:UpdatePromiseRequest = new UpdatePromiseRequest();
  previousPageCallback:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api:ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private datePipe: DatePipe,
    private popOverController:PopoverController,
    public platform:Platform,
    public http: Http,
    public alertProvider:AlertProvider,
    private session:Storage,
    public utility:UtilityProvider,
    public translate:TranslateService,
    public networkProvider:NetworkProvider) {

      this.alertProvider.setCurrentPage(UpdatePromisePage);
      this.initiateLoder();
      //this.getNavParamData();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UpdatePromisePage');
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
    if(this.navParams.get('data')){
      this.promiseData = this.navParams.get('data');
      this.updatePromiseRequest.setPmUserId = this.promiseData.getPmUseriId.toString().trim();
      this.updatePromiseRequest.setPmHId = this.promiseData.getPmHId.toString().trim();
      this.updatePromiseRequest.setPmSeq = this.promiseData.getPmSeq;
      this.updatePromiseRequest.setPmFeedFlag = this.promiseData.getPmFeedFlag;
    }

    if(this.navParams.get("callback")){
      this.previousPageCallback = this.navParams.get("callback");
    }
  }

  onBackPressed(){
    if(this.previousPageCallback){
      this.previousPageCallback(false).then(()=>{
        this.navCtrl.pop();
      });
    }else{
      this.navCtrl.pop();
    }
  }

  onHomePressed(){
    // this.navCtrl.push(DashboardPage, {
    //   //data:this.userData
    // });

    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  callUpdatePromiseApi(){
    if(!this.isValidate()){
        return;
    }

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(UpdatePromisePage,null,strings.no_internet_connection,null);
      return;
    }
      this.initiateLoder();
      this.loader.present();
      
        // let request = new UpdatePromiseRequest();
        // request.setPmHId = this.promiseData.getPmHId;
        // request.setPmUserId = this.promiseData.getPmUseriId;
        // request.setPmFeedFlag = this.promiseData.getPmFeedFlag;
        // request.setPmSeq = this.promiseData.getPmSeq;
        // request.setPmCustomerCom = this.promiseData.getPmCustomerCom;
        
        //alert(JSON.stringify(this.updatePromiseRequest));
      
      //  alert("Request  "+JSON.stringify(this.updatePromiseRequest)); 

        this.api.updatePromise(this.updatePromiseRequest).subscribe(res => {
          this.loader.dismiss();
          //alert(JSON.stringify(res));
          let data : UpdatePromiseResponse = new UpdatePromiseResponse(JSON.stringify(res))

          if(data && data.getErrorMessage && data.getErrorMessage === Constants.UNAUTHORIZED){
            this.alertProvider.basicAlertOnPage(UpdatePromisePage,null, strings.session_expired, null);
            this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
            return;
          }

          if(data && data.getStatus === 'Success'){
              if(data.getData){

                this.updatePredictionListData();

              }else{
                //alert(data.getMessage);
                this.alertProvider.basicAlertOnPage(UpdatePromisePage,null,data.getMessage,null);
              }
          }else{
            //this.goToProfile();
            if(data && data.getMessage){
              //alert(JSON.stringify(data.getMessage));
              this.alertProvider.basicAlertOnPage(UpdatePromisePage,null,JSON.stringify(data.getMessage),null);
            }
          }
          
        },error => {
          this.loader.dismiss();
          //alert(strings.server_error);
          // this.alertProvider.basicAlertOnPage(UpdatePromisePage,null,strings.server_error,null);

          if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
            this.alertProvider.basicAlertOnPage(UpdatePromisePage,null, strings.please_check_internet_access, null);
          }else{
            this.alertProvider.basicAlertOnPage(UpdatePromisePage,null,error.toString(), null);
          }
        },() => {
          //this.loader.dismiss();
          // No errors, route to new page
        });
    }

    isValidate():boolean{
        if(this.updatePromiseRequest.getPmCustomerCom 
          && this.updatePromiseRequest.getPmCustomerCom.length>0){
            return true;
        }else{
          //alert(strings.please_enter_message);
          this.alertProvider.basicAlertOnPage(UpdatePromisePage,null,strings.please_enter_message,null);
          return false;
        }
    }

    updatePredictionListData(){
      if(this.previousPageCallback){
        this.previousPageCallback(true).then(()=>{
          this.navCtrl.pop();
        });
      }else{
        this.navCtrl.pop();
      }
      
    }

    ionViewWillEnter(){
      this.alertProvider.setCurrentPage(UpdatePromisePage);
    }

}
