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
import { RequestData } from '../../api/response/request_data';
import { MessageHistoryPage } from '../message-history/message-history';
import { UpdateCommentPage } from '../update-comment/update-comment';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
/**
 * Generated class for the PredictionListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-prediction-list',
  templateUrl: 'prediction-list.html',
})

export class PredictionListPage {

  loader:any;
  predictionList: PredictionData[]=[];
  userData:any = new LoginResponseData();
  //horoscopeList:HoroscopeResponseData[]=[];
  requestData = new RequestData();
  isChecked:boolean = true;
  requestType:string;
  descending: boolean = false;
  order: number;

  constructor(
    public navCtrl: NavController,
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
    public translate:TranslateService,
    public utility:UtilityProvider,
    public networkProvider:NetworkProvider) {

    this.sort();

    this.alertProvider.setCurrentPage(PredictionListPage);
     
     //this.callAllPredictionListApi('meme@gmail.com');
   }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad PredictionListPage');
    //this.getNavParamData();

     //translate.use('hi');
     this.initiateLoder();
     //this.sampleListData();
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
      this.requestData = this.navParams.get('data');

      // if(!this.platform.is('cordova')){
      //   this.sampleListData();
      //   return
      // }

      if(this.requestData 
        && this.requestData.getRQUSERID 
        && this.requestData.getRQHID
        && this.requestData.getRQID){
        this.callPredictionListApi(this.requestData.getRQUSERID.toString().trim(),
          this.requestData.getRQHID.toString().trim(),
          this.requestData.getRQID.toString().trim());
      }
    }
  }

  sampleListData(){

    let d = {
      "Status": "Success",
      "Message": "Messages Listing",
      "Data": [
          {
              "PRUSERID": "enuke.software38@gmail.com     ",
              "PRHID": "4    ",
              "PRREQUESTID": "1  ",
              "PRREQUESTIDSEQ": 1,
              "PRSIGNIFICATION": "Prediction Signification",
              "PRDATE": "2018-08-03T21:46:13.5779341+05:30",
              "PRENDTIME": "2018-08-03T21:46:13.5779341+05:30",
              "PRDDASA": "sample string 7",
              "PRDETAILS": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              //"PRFEEDFLAG": "",
              "PRCUSTOMERCOM": "Fhdhdy^ 8/4/2018 12:00:12 PM !",
              "PRAGENTCOM": "^ 8/4/2018 9:22:08 AM !Hi^ 8/4/2018 11:57:51 AM !Fhdhdy^ 8/4/2018 12:00:12 PM !",
              "PRHCOMMENTS": "Fhdhdy^ 8/4/2018 12:00:12 PM^ Agent !Hi^ 8/4/2018 11:57:51 AM !Fhdhdy^ 8/4/2018 12:00:12 PM !",
              "PRRECDELETED": "y",
              "PRSTATUS": "2",
              "PRUNREAD": "y",
              "customId":1,
              "HORONAME":"Sample Name"

          },
          {
            "PRUSERID": "enuke.software38@gmail.com     ",
            "PRHID": "4    ",
            "PRREQUESTID": "4  ",
            "PRREQUESTIDSEQ": 5.0,
            "PRSIGNIFICATION": "Prediction Signification",
            "PRDATE": "2018-08-04T21:46:13.5779341+05:30",
            "PRENDTIME": "2018-08-04T21:46:13.5779341+05:30",
            "PRDDASA": "sample string 7",
            "PRDETAILS": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            //"PRFEEDFLAG": "",
            "PRCUSTOMERCOM": "Fhdhdy^ 8/4/2018 12:00:12 PM !",
            "PRAGENTCOM": "^ 8/4/2018 9:22:08 AM !Hi^ 8/4/2018 11:57:51 AM !Fhdhdy^ 8/4/2018 12:00:12 PM !",
            "PRHCOMMENTS": "Fhdhdy^ 8/4/2018 12:00:12 PM !Hi^ 8/4/2018 11:57:51 AM !Fhdhdy^ 8/4/2018 12:00:12 PM !",
            "PRRECDELETED": null,
            "PRSTATUS": "2",
            "PRUNREAD": "y",
            "customId":2,
            "HORONAME":"Sample Name2"
          }
      ],
      "ErrorMessage": null
    }

    let data : PredictionResponse = new PredictionResponse(JSON.stringify(d));
    for(let item of data.getData){
      this.predictionList.push(item);
    }
    //this.predictionList = this.predictionList.filter(item => item.getPRSTATUS.toString().trim() === "2");
  }

  callPredictionListApi(userId:string,hId:string,requestId:string){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(PredictionListPage,null,strings.no_internet_connection,null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
   localLoader.present();
    this.api.getPredictionList(userId,hId,requestId).subscribe(response => {
      localLoader.dismiss();
       
      let dataObj: PredictionResponse = new PredictionResponse(JSON.stringify(response));
      if(dataObj && dataObj.getErrormessage && dataObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(PredictionListPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if(dataObj && dataObj.getStatus === 'Success'){
          if(dataObj.getData && dataObj.getData.length>0){
            //show listing
            //this.predictionList = this.predictionList.filter(item => item.getPRSTATUS.toString().trim() === "2");
            this.predictionList = dataObj.getData;
            for(let i=0;i<this.predictionList.length;i++){
                  this.predictionList[i].setCustomId = i+1;
            }

          }else{
            //show no list found
            
          }
      }else{
      
        if(dataObj && dataObj.getMessage){
          //alert(JSON.stringify(dataObj.getMessage));
          this.alertProvider.basicAlertOnPage(PredictionListPage,null,JSON.stringify(dataObj.getMessage),null);
        }
      }
      
    },error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(PredictionListPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
      || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(PredictionListPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(PredictionListPage,null,error.toString(), null);
      }
    },() => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }


  onBackPressed(){
    this.navCtrl.pop();
  }

  onHomePressed(){
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  checkFeedFlag(predictionData:PredictionData){

    // if(!predictionData.getPRSTATUS){
    //   alert(strings.prediction_is_not_completed_yet);
    //   return;
    // }

    // if(predictionData.getPRSTATUS && predictionData.getPRSTATUS.toString().trim() != "2" ){
    //   alert(strings.prediction_is_not_completed_yet);
    //   return;
    // }

    //predictionData.isFeedFlag = true;
    predictionData.setPRFEEDFLAG = Constants.TRUE;
    //console.log("CEHCK:"+JSON.stringify(predictionData));
    // this.navCtrl.push(UpdateCommentPage, {
    //   data:predictionData
    // });
  }

  unCheckFeedFlag(predictionData:PredictionData){

    // if(!predictionData.getPRSTATUS){
    //   alert(strings.prediction_is_not_completed_yet);
    //   return;
    // }

    // if(predictionData.getPRSTATUS && predictionData.getPRSTATUS.toString().trim() != "2"){
    //   alert(strings.prediction_is_not_completed_yet);
    //   return;
    // }

    predictionData.setPRFEEDFLAG = Constants.FALSE;
    //console.log("UNCEHCK:"+JSON.stringify(predictionData));
    // this.navCtrl.push(UpdateCommentPage, {
    //   data:predictionData
    // });
  }

  viewHistory(predictionData:PredictionData){
    //console.log("HIS " + JSON.stringify(predictionData.getHistoryCommentToDisplay(this.translate)));
    this.navCtrl.push(MessageHistoryPage, {
      data:predictionData.getHistoryCommentToDisplay(this.translate)
    });
  }

  viewCommentClick(predictionData:PredictionData){
    if(!predictionData.getPRFEEDFLAG){
      //alert(strings.please_select_one_of_above_options);
      this.alertProvider.basicAlertOnPage(PredictionListPage,null,strings.please_select_one_of_above_options,null);
      return;
    }

    if(!predictionData.getPRSTATUS){
      //alert(strings.prediction_is_not_completed_yet);
      this.alertProvider.basicAlertOnPage(PredictionListPage,null,strings.prediction_is_not_completed_yet,null);
      return;
    }

    if(predictionData.getPRSTATUS && predictionData.getPRSTATUS.toString().trim() != "2"){
      //alert(strings.prediction_is_not_completed_yet);
      this.alertProvider.basicAlertOnPage(PredictionListPage,null,strings.prediction_is_not_completed_yet,null);
      return;
    }

    
    this.navCtrl.push(UpdateCommentPage, {
      data:predictionData,
      reqType:this.requestData.getRequestType,
      callback:this.callback.bind(this)
    });
  }

  /**
   * callback to check any data is updated on next screen to update list in this screen
   */
  callback = function(isChange) {
    return new Promise((resolve, reject) => {
      if(isChange){
        if(this.requestData 
          && this.requestData.getRQUSERID 
          && this.requestData.getRQHID
          && this.requestData.getRQID){
          this.callPredictionListApi(this.requestData.getRQUSERID.toString().trim(),
            this.requestData.getRQHID.toString().trim(),
            this.requestData.getRQID.toString().trim());
        }
        resolve();
      }else{
        resolve();
      }
      //alert(this.test);
        
    });
  }


  ionViewWillEnter(){
    this.alertProvider.setCurrentPage(PredictionListPage);
  }

  /**
   * sorting prediction list by latest first
   */
  sort(){
    //this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
