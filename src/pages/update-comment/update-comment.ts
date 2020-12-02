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
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import { HoroscopeListResponse } from '../../api/response/horoscope_list_response';
import { PredictionData } from '../../api/response/prediction_data';
import { PredictionResponse } from '../../api/response/prediction_response';
import { LoginResponseData } from '../../api/response/login_response_data';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { UpdatePredictionRequest } from '../../api/request/update_prediction_request';
import { UpdatePredictionResponse } from '../../api/response/update_prediction_response';
import { AlertProvider } from '../../providers/alert/alert';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';

/**
 * Generated class for the UpdateCommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-comment',
  templateUrl: 'update-comment.html',
})

export class UpdateCommentPage {

  loader:any;
  updatePredictionRequest:UpdatePredictionRequest = new UpdatePredictionRequest();
  predictionData : PredictionData = new PredictionData();
  previousPageCallback:any;
  reqType:string;
  horoscopeName:string;

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
    public session:Storage,
    public alertProvider:AlertProvider,
    public utility:UtilityProvider,
    public networkProvider:NetworkProvider) {

      this.alertProvider.setCurrentPage(UpdateCommentPage);
     
      this.initiateLoder();
      //this.sampleListData();
      this.getNavParamData();
     //this.callAllPredictionListApi('meme@gmail.com');
   }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UpdateCommentPage');
    //this.getNavParamData();
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
      this.predictionData = this.navParams.get('data');

      this.horoscopeName = this.predictionData.getHoroscopeName;
      this.updatePredictionRequest.setPRHID = this.predictionData.getPRHID;
      this.updatePredictionRequest.setPRUSERID = this.predictionData.getPRUSERID;
      this.updatePredictionRequest.setPRFEEDFLAG = this.predictionData.getPRFEEDFLAG;
      this.updatePredictionRequest.setPRREQUESTID = this.predictionData.getPRREQUESTID;
      this.updatePredictionRequest.setPRREQUESTIDSEQ = this.predictionData.getPRREQUESTIDSEQ;
      //this.updatePredictionRequest.setPRCUSTOMERCOM = this.predictionData.getPRCUSTOMERCOM;

    }

    if(this.navParams.get("reqType")){
      this.reqType = this.navParams.get("reqType");
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
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }


  onClickSave(){

    //alert("Data to Send " +JSON.stringify(this.updatePredictionRequest));

    if(!this.isValidate()){
        return;
    }

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(UpdateCommentPage,null,strings.no_internet_connection,null);
      return;
    }
 
      this.api.updatePrediction(this.updatePredictionRequest).subscribe(response=>{
        //alert("REQ:" + JSON.stringify(this.updatePredictionRequest) +"\nRES:"+JSON.stringify(response));
        let data : UpdatePredictionResponse = new UpdatePredictionResponse(JSON.stringify(response));
        //alert("DATA:"+JSON.stringify(data));
        if(data && data.getErrormessage && data.getErrormessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(UpdateCommentPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
        if(data && data.getStatus === 'Success'){
          //alert(data.getMessage);
          this.alertProvider.basicAlertOnPage(UpdateCommentPage,null,data.getMessage,null);
          this.updatePredictionListData();
          
        }else{
          //alert(data.getMessage);
          this.alertProvider.basicAlertOnPage(UpdateCommentPage,null,data.getMessage,null);
        }
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(UpdateCommentPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(UpdateCommentPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(UpdateCommentPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });  
  }

  isValidate():boolean{
    let isValid = true;
      if(!this.updatePredictionRequest || !this.updatePredictionRequest.getPRCUSTOMERCOM
        || this.updatePredictionRequest.getPRCUSTOMERCOM.toString().length === 0){
        //alert(strings.please_enter_message);
        this.alertProvider.basicAlertOnPage(UpdateCommentPage,null,strings.please_enter_message,null);
        isValid =  false;
      }
      return isValid; 
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
    this.alertProvider.setCurrentPage(UpdateCommentPage);
  }
  

}
