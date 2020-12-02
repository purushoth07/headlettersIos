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
import { RequestListResponse } from '../../api/response/request_list_response';
import { PredictionListPage } from '../prediction-list/prediction-list';
import { EmailPredictionRequest } from '../../api/request/email_prediction_request';
import { HCOMResponse } from '../../api/response/hcom_response';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
/**
 * Generated class for the PredictionRequestListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-prediction-request-list',
  templateUrl: 'prediction-request-list.html',
})

export class PredictionRequestListPage {

  loader:any;
  predictionRequestList: RequestData[]=[];
  userData:any = new LoginResponseData();
  horoscopeList:HoroscopeResponseData[]=[];
  descending: boolean = false;
  order: number;
  nodatalength: any;

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
    public translate:TranslateService,
    public utility:UtilityProvider,
    public networkProvider:NetworkProvider) {

      this.sort();

      this.alertProvider.setCurrentPage(PredictionRequestListPage);
      //translate.use('hi');
      this.initiateLoder();
      //this.sampleListData();
     //this.callAllPredictionListApi('meme@gmail.com');
   }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PredictionRequestListPage');
    this.getNavParamData();
  }

  ionViewDidEnter(){
    //console.log('ionViewDidEnter PredictionRequestListPage');
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
 
  initiateLoder(){
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
  }

  initiateLocalLoder(){
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });

    return localLoader;
  }
 
  getNavParamData(){

    //console.log(this.platform.ge);
    // if(!this.platform.is('cordova')){
      
    //   this.sampleListData();
    //   this.sampleHoroscopeData();
    //   return
    // }

    if(this.navParams.get('data')){
      this.userData = this.navParams.get('data');
      if(this.userData && this.userData.getUserId){
        this.callAllRequestListApi(this.userData.getUserId);
        // this.callHoroscopeListApi(this.userData.getUserId);
      }
    }else{
      this.session.get(Constants.USER_DATA).then(val=>{
          this.userData  = new LoginResponseData(JSON.stringify(val));
          if(this.userData && this.userData.getUserId){
            this.callAllRequestListApi(this.userData.getUserId);
            // this.callHoroscopeListApi(this.userData.getUserId);
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
              "RQUSERID": "enuke.software38@gmail.com    ",
              "RQHID": "4   ",
              "RQID": "1   ",
              "REQCAT": "6  ",
              "RQSPECIALDETAILS": "",
              "RQSDATE": "2018-08-05T10:15:33.188629+05:30",
              "RQEDATE": "2018-08-05T10:15:33.188629+05:30",
              "RQLONGTIDUE": "sample string 6",
              "RQLONGTITUDEEW": "sample string 7",
              "RQLATITUDE": "sample string 8",
              "RQLATITUDENS": "sample string 9",
              "RQDST": "sample string 10",
              "RQRECDELETED": "sample string 11",
              "RQPRSTATUS": "2   ",
              "RQUNREAD": "y  ",
              "RQCHARGE": null,
              "REQCREDATE": "2018-11-10T02:03:15"

          },
          {
            "RQUSERID": "enuke.software38@gmail.com    ",
              "RQHID": "4   ",
              "RQID": "2   ",
              "REQCAT": "1  ",
              "RQSPECIALDETAILS": "Special request detail",
              "RQSDATE": "2018-08-05T10:15:33.188629+05:30",
              "RQEDATE": "2018-08-05T10:15:33.188629+05:30",
              "RQLONGTIDUE": "sample string 6",
              "RQLONGTITUDEEW": "sample string 7",
              "RQLATITUDE": "sample string 8",
              "RQLATITUDENS": "sample string 9",
              "RQDST": "sample string 10",
              "RQRECDELETED": "sample string 11",
              "RQPRSTATUS": "2   ",
              "RQUNREAD": "y  ",
              "RQCHARGE": null,
              "REQCREDATE": "2018-11-10T02:03:15"
          },
          {
              "RQUSERID": "enuke.software38@gmail.com    ",
              "RQHID": "4   ",
              "RQID": "3   ",
              "REQCAT": "11  ",
              "RQSPECIALDETAILS": "Special request detail",
              "RQSDATE": "2018-08-05T10:15:33.188629+05:30",
              "RQEDATE": "2018-08-05T10:15:33.188629+05:30",
              "RQLONGTIDUE": "sample string 6",
              "RQLONGTITUDEEW": "sample string 7",
              "RQLATITUDE": "sample string 8",
              "RQLATITUDENS": "sample string 9",
              "RQDST": "sample string 10",
              "RQRECDELETED": "sample string 11",
              "RQPRSTATUS": "2   ",
              "RQUNREAD": "y  ",
              "RQCHARGE": null,
              "REQCREDATE": "2018-11-11T02:03:15"
          },
          {
            "RQUSERID": "enuke.software38@gmail.com    ",
            "RQHID": "4   ",
            "RQID": "4   ",
            "REQCAT": "2  ",
            "RQSPECIALDETAILS": "Special request detail",
            "RQSDATE": "2018-08-05T10:15:33.188629+05:30",
            "RQEDATE": "2018-08-05T10:15:33.188629+05:30",
            "RQLONGTIDUE": "sample string 6",
            "RQLONGTITUDEEW": "sample string 7",
            "RQLATITUDE": "sample string 8",
            "RQLATITUDENS": "sample string 9",
            "RQDST": "sample string 10",
            "RQRECDELETED": "sample string 11",
            "RQPRSTATUS": "2   ",
            "RQUNREAD": "y  ",
            "RQCHARGE": null,
            "REQCREDATE": "2018-11-12T02:03:15"

        },
        {
          "RQUSERID": "enuke.software38@gmail.com    ",
            "RQHID": "4   ",
            "RQID": "5   ",
            "REQCAT": "1  ",
            "RQSPECIALDETAILS": "Special request detail",
            "RQSDATE": "2018-08-05T10:15:33.188629+05:30",
            "RQEDATE": "2018-08-05T10:15:33.188629+05:30",
            "RQLONGTIDUE": "sample string 6",
            "RQLONGTITUDEEW": "sample string 7",
            "RQLATITUDE": "sample string 8",
            "RQLATITUDENS": "sample string 9",
            "RQDST": "sample string 10",
            "RQRECDELETED": "sample string 11",
            "RQPRSTATUS": "2   ",
            "RQUNREAD": "y  ",
            "RQCHARGE": null,
            "REQCREDATE": "2018-11-10T02:03:15"
        },
        {
            "RQUSERID": "enuke.software38@gmail.com    ",
            "RQHID": "4   ",
            "RQID": "6   ",
            "REQCAT": "3  ",
            "RQSPECIALDETAILS": "Special request detail",
            "RQSDATE": "2018-08-05T10:15:33.188629+05:30",
            "RQEDATE": "2018-08-05T10:15:33.188629+05:30",
            "RQLONGTIDUE": "sample string 6",
            "RQLONGTITUDEEW": "sample string 7",
            "RQLATITUDE": "sample string 8",
            "RQLATITUDENS": "sample string 9",
            "RQDST": "sample string 10",
            "RQRECDELETED": "sample string 11",
            "RQPRSTATUS": "2   ",
            "RQUNREAD": "y  ",
            "RQCHARGE": null,
            "REQCREDATE": null
        }
      ],
      "ErrorMessage": null
    }

    let data : RequestListResponse = new RequestListResponse(JSON.stringify(d));
    for(let item of data.getData){
      this.predictionRequestList.push(item);
    }

    //this.predictionRequestList = this.predictionRequestList.filter(item => item.getRQPRSTATUS.toString().trim() === "2");
    if(this.predictionRequestList.length > 0 && this.horoscopeList.length>0){
      for(let pItem of this.predictionRequestList){
        for(let hItem of this.horoscopeList){
            if(pItem.getRQHID.toString().trim() === hItem.getHId.toString().trim()){
              pItem.setHoroscopeName = hItem.getHName;
              pItem.setHoroscopeImage = hItem.getHNativePhoto;
              break;
            }
        }
      }  
    }

    //console.log("REQUEST DATA " + JSON.stringify(this.predictionRequestList));


  }


  sampleHoroscopeData(){
     let d =  {
        "Status": "Success",
        "Message": "Horoscope Listing",
        "Data": [
            {
                "HUSERID": "meme@gmail.com                ",
                "HID": "3                             ",
                "HNAME": "hbdjfb",
                "HNATIVEPHOTO": null,
                "HHOROSCOPEPHOTO": null,
                "HGENDER": "jndfjj",
                "HDOBNATIVE": "2012-05-24T02:47:07",
                "HHOURS": 1,
                "HMIN": 2,
                "HSS": 3,
                "HAMPM": "dfd       ",
                "HPLACE": "dfd",
                "HLANDMARK": "dfd",
                "HMARRIAGEDATE": "2012-05-24T02:47:07",
                "HMARRIAGEPLACE": null,
                "HMARRIAGETIME": null,
                "HMARRIAGEAMPM": "dfd       ",
                "HFIRSTCHILDDATE": "2012-05-24T02:47:07",
                "HFIRSTCHILDPLACE": "xfcd",
                "HFIRSTCHILDTIME": "dff",
                "HFIRSTCHILDTIMEAMPM": "dfd       ",
                "HATDATE": "2012-05-24T02:47:07",
                "HATPLACE": "dfd",
                "HATTIME": "fdd",
                "HATTAMPM": "dfd       ",
                "HAFLIGHTNO": "fdf",
                "HCRDATE": "2012-05-24T02:47:07",
                "HCRTIME": "fd",
                "HCRPLACE": "dfd",
                "HCRTAMPM": "gfdgd     ",
                "HDRR": "dfsd",
                "HDRRD": "2012-05-24T02:47:07",
                "HDRRP": "fdd",
                "HDRRT": "4",
                "HDRRTAMPM": "am        ",
                "RECTIFIEDDATE": null,
                "RECTIFIEDTIME": null,
                "RECTIFIEDDST": null,
                "RECTIFIEDPLACE": null,
                "RECTIFIEDLONGTITUDE": null,
                "RECTIFIEDLONGTITUDEEW": null,
                "RECTIFIEDLATITUDE": null,
                "RECTIFIEDLATITUDENS": null,
                "HPDF": null,
                "LASTREQUESTID": 0,
                "LASTMESSAGEID": 0,
                "LASTWPDATE": null,
                "LASTDPDATE": null,
                "HLOCKED": null,
                "HSTATUS": "0",
                "HRECDELETED": "n",
                "HCREATIONDATE": "0001-01-01T00:00:00",
                "HRECDELETEDD": null,
                "HTOTALTRUE": 0,
                "HTOTALFALSE": 0,
                "HTOTALPARTIAL": 0,
                "HUNIQUE": 100000000008
            },
            {
                "HUSERID": "meme@gmail.com                ",
                "HID": "4                             ",
                "HNAME": "hbdjfb",
                "HNATIVEPHOTO": null,
                "HHOROSCOPEPHOTO": null,
                "HGENDER": "jndfjj",
                "HDOBNATIVE": "2012-05-24T02:47:07",
                "HHOURS": 1,
                "HMIN": 2,
                "HSS": 3,
                "HAMPM": "dfd       ",
                "HPLACE": "dfd",
                "HLANDMARK": "dsgs",
                "HMARRIAGEDATE": null,
                "HMARRIAGEPLACE": null,
                "HMARRIAGETIME": null,
                "HMARRIAGEAMPM": "dfd       ",
                "HFIRSTCHILDDATE": null,
                "HFIRSTCHILDPLACE": "xfcd",
                "HFIRSTCHILDTIME": "dff",
                "HFIRSTCHILDTIMEAMPM": "sfd       ",
                "HATDATE": null,
                "HATPLACE": "dfd",
                "HATTIME": "fdd",
                "HATTAMPM": "dfd       ",
                "HAFLIGHTNO": null,
                "HCRDATE": null,
                "HCRTIME": "fd",
                "HCRPLACE": "dfd",
                "HCRTAMPM": "gfdgd     ",
                "HDRR": "dfsd",
                "HDRRD": null,
                "HDRRP": "fdd",
                "HDRRT": "4",
                "HDRRTAMPM": "am        ",
                "RECTIFIEDDATE": null,
                "RECTIFIEDTIME": null,
                "RECTIFIEDDST": null,
                "RECTIFIEDPLACE": null,
                "RECTIFIEDLONGTITUDE": null,
                "RECTIFIEDLONGTITUDEEW": null,
                "RECTIFIEDLATITUDE": null,
                "RECTIFIEDLATITUDENS": null,
                "HPDF": null,
                "LASTREQUESTID": 0,
                "LASTMESSAGEID": 0,
                "LASTWPDATE": null,
                "LASTDPDATE": null,
                "HLOCKED": null,
                "HSTATUS": "0",
                "HRECDELETED": "n",
                "HCREATIONDATE": "0001-01-01T00:00:00",
                "HRECDELETEDD": null,
                "HTOTALTRUE": 0,
                "HTOTALFALSE": 0,
                "HTOTALPARTIAL": 0,
                "HUNIQUE": 100000000011
            },
            {
                "HUSERID": "meme@gmail.com                ",
                "HID": "5                             ",
                "HNAME": "test horo",
                "HNATIVEPHOTO": null,
                "HHOROSCOPEPHOTO": null,
                "HGENDER": "M",
                "HDOBNATIVE": "1990-04-12T04:15:40",
                "HHOURS": 1,
                "HMIN": 2,
                "HSS": 3,
                "HAMPM": "AM        ",
                "HPLACE": "hgkjhgj",
                "HLANDMARK": "hghgjkh",
                "HMARRIAGEDATE": null,
                "HMARRIAGEPLACE": null,
                "HMARRIAGETIME": null,
                "HMARRIAGEAMPM": "          ",
                "HFIRSTCHILDDATE": null,
                "HFIRSTCHILDPLACE": "",
                "HFIRSTCHILDTIME": "",
                "HFIRSTCHILDTIMEAMPM": "          ",
                "HATDATE": null,
                "HATPLACE": "",
                "HATTIME": "",
                "HATTAMPM": "          ",
                "HAFLIGHTNO": "",
                "HCRDATE": null,
                "HCRTIME": "",
                "HCRPLACE": "",
                "HCRTAMPM": "          ",
                "HDRR": "",
                "HDRRD": null,
                "HDRRP": "",
                "HDRRT": "",
                "HDRRTAMPM": "          ",
                "RECTIFIEDDATE": null,
                "RECTIFIEDTIME": null,
                "RECTIFIEDDST": null,
                "RECTIFIEDPLACE": null,
                "RECTIFIEDLONGTITUDE": null,
                "RECTIFIEDLONGTITUDEEW": null,
                "RECTIFIEDLATITUDE": null,
                "RECTIFIEDLATITUDENS": null,
                "HPDF": null,
                "LASTREQUESTID": 0,
                "LASTMESSAGEID": 0,
                "LASTWPDATE": null,
                "LASTDPDATE": null,
                "HLOCKED": null,
                "HSTATUS": "0",
                "HRECDELETED": "n",
                "HCREATIONDATE": "0001-01-01T00:00:00",
                "HRECDELETEDD": null,
                "HTOTALTRUE": 0,
                "HTOTALFALSE": 0,
                "HTOTALPARTIAL": 0,
                "HUNIQUE": 100000000018
            }
        ],
        "ErrorMessage": null
    }

    let data : HoroscopeListResponse = new HoroscopeListResponse(JSON.stringify(d));
    for(let item of data.getData){
      this.horoscopeList.push(item);
    }

    //this.predictionRequestList = this.predictionRequestList.filter(item => item.getRQPRSTATUS.toString().trim() === "2");
    if(this.predictionRequestList.length > 0 && this.horoscopeList.length>0){
      for(let pItem of this.predictionRequestList){
        for(let hItem of this.horoscopeList){
            if(pItem.getRQHID.toString().trim() === hItem.getHId.toString().trim()){
              pItem.setHoroscopeName = hItem.getHName;
              pItem.setHoroscopeImage = hItem.getHNativePhoto;
              break;
            }
        }
      }  
    }

    //console.log("REQUEST DATA " + JSON.stringify(this.predictionRequestList));

  }


  callAllRequestListApi(userId:string){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.no_internet_connection,null);
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
    localLoader.present();
    this.api.getAllRequestList(userId.toString().trim()).subscribe(response => {
      

      let dataObj: RequestListResponse = new RequestListResponse(JSON.stringify(response));
      this.nodatalength = dataObj.getData.length;
      if(dataObj && dataObj.getErrormessage && dataObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if(dataObj && dataObj.getStatus === 'Success'){
          if(dataObj.getData && dataObj.getData.length>0){
            localLoader.dismiss();
            this.predictionRequestList = dataObj.getData;
            //show listing
           // this.predictionList = this.predictionList.filter(item => item.getPRSTATUS.toString().trim() === "2");
            
           
          //  if(this.predictionRequestList.length > 0 && this.horoscopeList.length>0){
          //     for(let pItem of this.predictionRequestList){
          //       for(let hItem of this.horoscopeList){
          //           if(pItem.getRQHID.toString().trim() === hItem.getHId.toString().trim()){
          //             pItem.setHoroscopeName = hItem.getHName;
          //             pItem.setHoroscopeImage = hItem.getHNativePhoto;
          //             break;
          //           }
          //       }
          //     }  
          //   }

          //this.callHoroscopeListApi(this.userData.getUserId);

          }else{
            localLoader.dismiss();
            //show no list found
            if(dataObj.getMessage){
              //alert(JSON.stringify(dataObj.getMessage));
            }
          }
      }else{
        localLoader.dismiss();
        if(dataObj && dataObj.getMessage){
          //alert(JSON.stringify(dataObj.getMessage));
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,JSON.stringify(dataObj.getMessage),null);
        }
      }
      
    },error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.server_error,null);
      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
      || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,error.toString(), null);
      }
    },() => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  callHoroscopeListApi(userId:string){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.no_internet_connection,null);
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
    //localLoader.present();
      this.api.getHoroscopeList(userId.toString().trim()).subscribe(response => {
        localLoader.dismiss();

       //alert(response);
        //let d = JSON.stringify(response);
        let fObj: HoroscopeListResponse = new HoroscopeListResponse(JSON.stringify(response));
        
        
        if(fObj && fObj.getStatus === 'Success'){
          //alert(JSON.stringify(fObj));
            if(fObj.getData && fObj.getData.length>0){   
              this.horoscopeList = fObj.getData; 
              //show listing
              //this.horoscopeList = fObj.getData;
              if(this.predictionRequestList.length > 0 && this.horoscopeList.length>0){
                for(let pItem of this.predictionRequestList){
                  for(let hItem of this.horoscopeList){
                      if(pItem.getRQHID.toString().trim() === hItem.getHId.toString().trim()){
                        pItem.setHoroscopeName = hItem.getHName;
                        pItem.setHoroscopeImage = hItem.getHNativePhoto;
                        break;
                      }
                  }
                } 
              }

            }else{
              //show no list found
              if(fObj.getMessage){
                //alert(JSON.stringify(fObj.getMessage));
                this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,JSON.stringify(fObj.getMessage),null);
                //this.presentToast(JSON.stringify(fObj.getMessage));
              }
            }
        }else{
        
          if(fObj && fObj.getMessage){
            //alert(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,JSON.stringify(fObj.getMessage),null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }
        
      },error => {
        localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.server_error,null);
        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,error.toString(), null);
        }
      },() => {
        //localLoader.dismiss();
        // No errors, route to new page
      });
    }

  onClickEmailPrediction(requestData:RequestData){

    // if(!requestData.getRQPRSTATUS){
    //     //alert(strings.prediction_is_not_completed_yet);
    //     this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.prediction_is_not_completed_yet,null);
    //     return;
    // }
    
    if(requestData.getRQPRSTATUS && requestData.getRQPRSTATUS.toString().trim() === '2'){

      //alert(strings.prediction_is_not_completed_yet);
    //   this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.prediction_is_not_completed_yet,null);
    //   return;
    // }

      this.callEmailPredictionApi(requestData);
    
      }else{
        this.callRequestStatusApi(requestData,1);
      }
    
    }

  onClickViewPrediction(requestData:RequestData){
    // if(!requestData.getRQPRSTATUS){
    //   this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.prediction_is_not_completed_yet,null);
    //   return;
    // }

    if(requestData.getRQPRSTATUS && requestData.getRQPRSTATUS.toString().trim() === '2'){
      this.navCtrl.push(PredictionListPage,{
        data:requestData
      });
    }else{
      this.callRequestStatusApi(requestData,2);
      //this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.prediction_is_not_completed_yet,null);
    }

   

  }

  onBackPressed(){
    this.navCtrl.pop();
  }

  onHomePressed(){
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  alertDeleteMessage(requestData:RequestData) {
    let alertTitle = strings.delete_title;
    let alertMessage = strings.delete_prediction_request;
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
            this.callDeleteRequestApi(requestData);
          }
        }
      ]
    });
    alert.present();
  }

  callDeleteRequestApi(requestData:RequestData){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.no_internet_connection,null);
      return;
    }
    //alert(message.getMsgUserId + " " + message.getMsgHId + " " + message.getMsgMessageId);
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
   localLoader.present();
   //alert("REQ:"+JSON.stringify(requestData));
    this.api.deleteRequest(requestData.getRQUSERID.toString().trim(),requestData.getRQHID.toString().trim(),requestData.getRQID.toString().trim()).subscribe(response=>{

      localLoader.dismiss();
      //let obj: RequestListResponse = new AddMessageResponse(JSON.stringify(response));

      if(response && response.ErrorMessage && response.ErrorMessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      //alert("RES:"+JSON.stringify(response));
      if(response && response.Status === 'Success'){
    
        //if(obj.getData && obj.getData.getMsgMessageId){
          this.predictionRequestList = this.predictionRequestList.filter(item => item !== requestData);
          //alert(obj.getMessage);
          if(response.Message){
            this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,response.Message,null);
          }
          
        // }
      }else{
        if(response.Message){
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,response.Message,null);
        }
      }
    },error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.server_error,null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
      || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,error.toString(), null);
      }
    },() => {
      //localLoader.dismiss();
      // No errors, route to new page
    });  
  }

  callEmailPredictionApi(requestData:RequestData){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.no_internet_connection,null);
      return;
    }

    let req:EmailPredictionRequest = new EmailPredictionRequest();
    req.setUserId = requestData.getRQUSERID.toString().trim();
    req.setHId = requestData.getRQHID.toString().trim();
    req.setRequestId=requestData.getRQID.toString().trim();
    
   // alert("EMAIL " + JSON.stringify(req));
    this.initiateLoder();
    this.loader.present();
      this.api.emailRequestPrediction(req).subscribe(response => {
        this.loader.dismiss();

        let fObj: HCOMResponse = new HCOMResponse(JSON.stringify(response));
        
        if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
        
        if(fObj && fObj.getStatus === 'Success'){
             if(fObj.getData){   

              //alert(fObj.getMessage);
              this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,fObj.getMessage,null);

            }else{
              //show no list found
              if(fObj.getMessage){
                //alert(JSON.stringify(fObj.getMessage));
                this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,JSON.stringify(fObj.getMessage),null);
                //this.presentToast(JSON.stringify(fObj.getMessage));
              }
            }
        }else{
        
          if(fObj && fObj.getMessage){
            //alert(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,JSON.stringify(fObj.getMessage),null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });

  }

  callRequestStatusApi(requestData:RequestData,status:number){

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.no_internet_connection,null);
      return;
    }

   // alert("EMAIL " + JSON.stringify(req));
    this.initiateLoder();
    this.loader.present();
      this.api.getPredictionRequestStatus(requestData.getRQUSERID.toString().trim(),requestData.getRQHID.toString().trim(),requestData.getRQID.toString().trim()).subscribe(response => {
        this.loader.dismiss();

        if(response && response.getErrorMessage && response.getErrorMessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
  
        if (response) {
          if (response.Status === 'Success') {

            if(response.Data &&  response.Data.toString().trim() === '2'){
              requestData.setRQPRSTATUS = response.Data.toString().trim();
              if(status == 1){

                this.callEmailPredictionApi(requestData);
              }else if(status == 2){
                this.navCtrl.push(PredictionListPage,{
                  data:requestData
                });
              }
              
            }else{
              this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.prediction_is_not_completed_yet,null);
            }
        
           
          } else if (response.Message) {
            this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, response.Message, null);
          }
        } else {
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.no_message_found, null);
        }
        
      },error => {
        this.loader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(PredictionRequestListPage,null,error.toString(), null);
        }
      },() => {
        //this.loader.dismiss();
        // No errors, route to new page
      });
    
    }

  ionViewWillEnter(){
    this.alertProvider.setCurrentPage(PredictionRequestListPage);
  }

  /**
   * sorting prediction request list by latest first
   */
  sort(){
    //this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
