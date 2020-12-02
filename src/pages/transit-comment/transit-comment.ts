import { Component, OnInit, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, PopoverController, Platform, PopoverOptions, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { MyLocation } from '../../models/location';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
import { MyCalendar } from '../../utils/calendar';
import { MyTime } from '../../utils/mytime';
import { CheckDuplicateResponse } from '../../api/response/check_duplicate_response';
import { AddDailyRequest } from '../../api/request/add_daily_request';
import { AddRequestResponse } from '../../api/response/add_request_response';
import { DashboardPage } from '../dashboard/dashboard';
import { TimeZone } from '../../api/response/time_zone_data';
import { PopoverComponent } from '../../components/popover/popover';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { CalendarModalOptions, CalendarModal, CalendarComponentOptions, CalendarResult } from 'ion2-calendar';
import { ChargesPage } from '../charges/charges';
import { NetworkProvider } from '../../providers/network/network';
import { AddTransitRequest } from '../../api/request/add_transit_request';
import { TransitCommentResponse } from '../../api/response/transit_comment_response';
import { TransitCommentResponsedata } from '../../api/response/transit_comment_response_data';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
import { AddTransitResponse } from '../../api/response/add_transit_response';
import { Diagnostic } from '@ionic-native/diagnostic';


/**
 * Generated class for the TransitCommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transit-comment',
  templateUrl: 'transit-comment.html',
})
export class TransitCommentPage {

  loader: any;
  type: string = Constants.REQ_CAT_JU;
  transitName: string;
  title: string = "Transit";
  horoscopeData: HoroscopeResponseData = new HoroscopeResponseData();
  addTransitRequest: AddTransitRequest = new AddTransitRequest();
  transitCommentResponseData: TransitCommentResponsedata = new TransitCommentResponsedata();
  uCharge: string = Constants.YES;
  uCurrency: string = Constants.INR;
  alertForSettingsVisible: boolean = false;
  alertforpleasewait: boolean = false;
  mainAlert: any;
  timeStamp: string;
  displayTime: string;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private datePipe: DatePipe,
    private popOverController: PopoverController,
    public platform: Platform,
    public session: Storage,
    private geolocation: Geolocation,
    public alertProvider: AlertProvider,
    public translate: TranslateService,
    public modalCtrl: ModalController,
    public utility: UtilityProvider,
    public networkProvider: NetworkProvider,
    private diagnostic: Diagnostic) {

    this.setUpDatePipeForLanguage();
    this.alertProvider.setCurrentPage(TransitCommentPage);

    this.timeStamp = new Date().getTime().toString();

    //set timestamp value in request
    this.addTransitRequest.setTIMESTAMP = this.timeStamp;
    this.setDisplayTime();
    //translate.use('hi');

    //this.sampleListData();

  }

  ionViewDidEnter() {
    this.getNavParams();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TransitCommentPage');
    this.getCoordinates();
    this.checkGPSEnabled();
  }

  initiateLoder() {
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
  }

  sampleListData() {

    let d = {
      "Status": "Success",
      "Message": "Messages Listing",
      "Data": {
        "TRPLANET": "ME",
        "TRSDATE": "2019-04-12T00:12:12",
        "TREDAT": "2020-04-12T00:12:12",
        "TRDETAILS": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "ACTIVE": "N",
      },

      "ErrorMessage": null
    }

    let data: TransitCommentResponse = new TransitCommentResponse(JSON.stringify(d));
    this.transitCommentResponseData = data.getData;
    //this.messageList = this.messageList.filter(item => item.getMsgStatus.toString().trim() === "2");

  }

  getNavParams() {
    if (this.navParams.get('data')) {
      this.horoscopeData = this.navParams.get('data');
      if (this.horoscopeData && this.horoscopeData.getHUserId && this.horoscopeData.getHId) {
        this.addTransitRequest.setUSERID = this.horoscopeData.getHUserId.toString().trim();
        this.addTransitRequest.setHID = this.horoscopeData.getHId.toString().trim();
      }
    }

    if (this.navParams.get("type")) {
      this.addTransitRequest.setTYPE = this.navParams.get("type");
    }

    if (this.navParams.get('charge')) {
      this.uCharge = this.navParams.get('charge');
    }

    if (this.navParams.get('currency')) {
      this.uCurrency = this.navParams.get('currency');
    }

    switch (this.addTransitRequest.getTYPE) {
      case Constants.REQ_CAT_JU:
        this.title = strings.jupiter;
        this.transitName = Constants.TRANSIT_JU;
        this.callTransitCommentApi();
        break;

      case Constants.REQ_CAT_SA:
        this.title = strings.saturn;
        this.transitName = Constants.TRANSIT_SA;
        this.callTransitCommentApi();

        break;

      case Constants.REQ_CAT_RA:
        this.title = strings.rahu;
        this.transitName = Constants.TRANSIT_RA;
        this.callTransitCommentApi();
        break;

      case Constants.REQ_CAT_KE:
        this.title = strings.ketu;
        this.transitName = Constants.TRANSIT_KE;
        this.callTransitCommentApi();
        break;

      case Constants.REQ_CAT_MA:
        this.title = strings.mars;
        this.transitName = Constants.TRANSIT_MA;
        this.callTransitCommentApi();
        break;

      case Constants.REQ_CAT_SU:
        this.title = strings.sun;
        this.transitName = Constants.TRANSIT_SU;
        this.callTransitCommentApi();
        break;

      case Constants.REQ_CAT_ME:
        this.title = strings.mercury;
        this.transitName = Constants.TRANSIT_ME;
        this.callTransitCommentApi();
        break;

    }



  }

  /**
   * update datepipe according to current selected language
   */
  setUpDatePipeForLanguage() {
    this.datePipe = new DatePipe(this.translate.currentLang);
  }

  goToAddTansitRequest() {
    this.callCheckDuplicateRequestApi();
  }


  callTransitCommentApi() {
    // let localLoader = this.loadingCtrl.create({
    //   content: strings.loader.loader_text,
    //   dismissOnPageChange:true
    //   //spinner:'ios'
    // });

    if (!this.networkProvider.isInternetConnected()) {
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.no_internet_connection, null);
      return;
    }

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    //alert("REQ:" + this.transitName);
    localLoader.present();
    this.api.getTransitComment(this.transitName).subscribe(response => {
      localLoader.dismiss();

      //alert("RES:" + JSON.stringify(response));
      //let d = JSON.stringify(response);
      let fObj: TransitCommentResponse = new TransitCommentResponse(JSON.stringify(response));

      if (fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED) {
        this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.session_expired, null);
        this.utility.logoutSession(this.session, this.navCtrl, SocialLoginPage);
        return;
      }

      if (fObj && fObj.getStatus === 'Success') {
        this.transitCommentResponseData = fObj.getData;
        this.addTransitRequest.setStartDate = this.transitCommentResponseData.getStartDateForRequest();
        this.addTransitRequest.setEndDate = this.transitCommentResponseData.getEndDateForRequest();
        if (this.transitCommentResponseData.getTRDETAILS
          && this.transitCommentResponseData.getTRDETAILS != null
          && this.transitCommentResponseData.getTRDETAILS != 'null') {
          this.addTransitRequest.setDetail = this.transitCommentResponseData.getTRDETAILS;
        }
      } else {
        if (fObj && fObj.getMessage) {
          //alert(JSON.stringify(fObj.getMessage));
          //this.presentToast(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(TransitCommentPage, null, fObj.getMessage, null);
        }
      }

    }, error => {
      localLoader.dismiss();
      // alert("ERROR:"+error);
      // alert("ERROR:"+JSON.stringify(error));
      // this.alertProvider.basicAlertOnPage(TransitCommentPage,null, strings.server_error, null);

      if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
        this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.please_check_internet_access, null);
      } else {
        this.alertProvider.basicAlertOnPage(TransitCommentPage, null, error.toString(), null);
      }
    }, () => {
      // localLoader.dismiss();
      // No errors, route to new page
    });
  }

  isValidate(): boolean {
    if (!this.addTransitRequest.getLATITUDE ||
      !this.addTransitRequest.getLONGITUDE) {
      this.checkGPSEnabled();

      return false;
    }
    else if (!this.addTransitRequest.getStartDate
      || this.addTransitRequest.getStartDate === null
      || this.addTransitRequest.getStartDate.toString().trim() === 'null') {

      this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.start_date_not_available, null);
      return false;
    } else if (!this.addTransitRequest.getEndDate
      || this.addTransitRequest.getEndDate === null
      || this.addTransitRequest.getEndDate.toString().trim() === 'null') {
      this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.end_date_not_available, null);
      return false;
    }

    return true;
  }

  callCheckDuplicateRequestApi() {
    //alert("REQ:"+JSON.stringify(this.addTransitRequest));

    this.alertforpleasewait = true;
    if (!this.isValidate()) {
      return;
    }

    if (!this.networkProvider.isInternetConnected()) {
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.no_internet_connection, null);
      return;
    }

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();

    setTimeout(() => {
      localLoader.dismiss();
    }, 5000);

    this.api.checkDuplicateRequest(this.addTransitRequest.getUSERID.toString().trim(),
      this.addTransitRequest.getHID.toString().trim(),
      this.addTransitRequest.getStartDate.toString().trim(),
      this.addTransitRequest.getEndDate,
      this.addTransitRequest.getTYPE).subscribe(response => {

        localLoader.dismiss();

        // alert(JSON.stringify(response));
        //let d = JSON.stringify(response);
        let fObj: CheckDuplicateResponse = new CheckDuplicateResponse(JSON.stringify(response));
        if (fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED) {
          this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.session_expired, null);
          this.utility.logoutSession(this.session, this.navCtrl, SocialLoginPage);
          return;
        }

        if (fObj && fObj.getStatus === 'Success') {

          //check if request already exist or not
          if (fObj.getData && fObj.getData === Constants.NO) {
            //call daily request api
            //this.callAddDailyRequestApi();
            if (this.uCharge === Constants.YES) {
              this.callChargesApi();
            } else {
              this.callAddTransitRequest();
            }

          } else {
            //show alert for request already exist
            //alert(fObj.getMessage);
            this.alertProvider.basicAlertOnPage(TransitCommentPage, null, fObj.getMessage, null);
          }
        } else {

          if (fObj && fObj.getMessage) {
            //alert(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(TransitCommentPage, null, JSON.stringify(fObj.getMessage), null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }

      }, error => {
        localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(DailyRequestPage,null,strings.server_error,null);
        if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
          this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.please_check_internet_access, null);
        } else {
          this.alertProvider.basicAlertOnPage(TransitCommentPage, null, error.toString(), null);
        }
      }, () => {
        //localLoader.dismiss();
        // No errors, route to new page
      });
  }

  callChargesApi() {

    if (!this.networkProvider.isInternetConnected()) {
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.no_internet_connection, null);
      return;
    }

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });

    localLoader.present();
    setTimeout(() => {
      localLoader.dismiss();
    }, 5000);


    //alert("REQ:"+this.addTransitRequest.getTYPE,this.uCurrency)

    this.api.getCharges(this.addTransitRequest.getTYPE, this.uCurrency).subscribe(response => {
      localLoader.dismiss();

      if (response && response.ErrorMessage && response.ErrorMessage === Constants.UNAUTHORIZED) {
        this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.session_expired, null);
        this.utility.logoutSession(this.session, this.navCtrl, SocialLoginPage);
        return;
      }
      //alert(JSON.stringify(response));
      if (response && response.Status === 'Success') {
        if (response.Data && response.Data != null && response.Data != "null" && response.Data != "") {
          this.navCtrl.push(ChargesPage, {
            type: this.addTransitRequest.getTYPE,
            url: response.Data.toString().trim(),
            request: this.addTransitRequest
          });
        } else if (response.Message) {
          this.alertProvider.basicAlertOnPage(TransitCommentPage, null, response.Message, null);
        } else if (response.ErrorMessage) {
          this.alertProvider.basicAlertOnPage(TransitCommentPage, null, response.ErrorMessage, null);
        } else {
          this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.no_message_found, null);
        }
      } else if (response.Message) {
        this.alertProvider.basicAlertOnPage(TransitCommentPage, null, response.Message, null);
      } else {
        this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.no_message_found, null);
      }

    }, error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(TransitCommentPage,null,strings.server_error,null);

      if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
        this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.please_check_internet_access, null);
      } else {
        this.alertProvider.basicAlertOnPage(TransitCommentPage, null, error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  callAddTransitRequest() {
    if (!this.networkProvider.isInternetConnected()) {
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(ChargesPage, null, strings.no_internet_connection, null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();
    setTimeout(() => {
      localLoader.dismiss();
    }, 5000);

    //alert("REQ:" + JSON.stringify(this.addTransitRequest));

    this.api.addTransitRequest(this.addTransitRequest).subscribe(response => {
      localLoader.dismiss();
      //alert("RES:" + JSON.stringify(response));

      //alert(response);
      //let d = JSON.stringify(response);
      let fObj: AddTransitResponse = new AddTransitResponse(JSON.stringify(response));

      if (fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED) {
        this.alertProvider.basicAlertOnPage(ChargesPage, null, strings.session_expired, null);
        this.utility.logoutSession(this.session, this.navCtrl, SocialLoginPage);
        return;
      }

      if (fObj && fObj.getStatus === 'Success') {

        if (fObj.getData) {
          //call daily request api
          //alert(fObj.getMessage);  
          if (fObj.getMessage) {
            this.alertProvider.basicAlertOnPage(ChargesPage, null, fObj.getMessage, null);
          }
          this.navCtrl.pop();
          // let index = this.viewCtrl.index;
          // this.navCtrl.popTo(this.navCtrl.getByIndex(index-2));
        } else {
          //show alert for request already exist
          //alert(fObj.getMessage);
          if (fObj.getMessage) {
            this.alertProvider.basicAlertOnPage(ChargesPage, null, fObj.getMessage, null);
          }
        }
      } else {

        if (fObj && fObj.getMessage) {
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(ChargesPage, null, JSON.stringify(fObj.getMessage), null);
          //this.presentToast(JSON.stringify(fObj.getMessage));
        }
      }

    }, error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(ChargesPage,null,strings.server_error,null);

      if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
        this.alertProvider.basicAlertOnPage(ChargesPage, null, strings.please_check_internet_access, null);
      } else {
        this.alertProvider.basicAlertOnPage(ChargesPage, null, error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  onBackPressed() {
    this.navCtrl.pop();
  }

  onHomePressed() {
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  ionViewWillEnter() {
    this.alertProvider.setCurrentPage(TransitCommentPage);
  }

  getCoordinates() {

    this.platform.ready().then(() => {
      this.getLocation();
    });
  }

  getLocation() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {

      if (resp.coords.latitude && resp.coords.longitude) {
        this.addTransitRequest.setLATITUDE = resp.coords.latitude.toString();
        this.addTransitRequest.setLONGITUDE = resp.coords.longitude.toString();
      }

    }).catch((error) => {
      // console.log('Error getting location', error);
    });
  }

  /**
   * checking if gps is enabled or not
   */
  checkGPSEnabled() {
    this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) {
        //this.isKeyboardOpen=true;
        return;
      }
      this.getCoordinates();


      this.diagnostic.isLocationEnabled().then((isAvailable) => {
        //console.log('Is available? ' + isAvailable);
        // alert('Is available? ' + isAvailable);
        if (!isAvailable) {

          /**
           * alert for settings will be shown only once
           */
          if (!this.alertForSettingsVisible) {
            // alert("in go to settings enabled")
            this.alertGoToSettings();
          }
          this.getCoordinates();
        } else if (!this.addTransitRequest.getLATITUDE || !this.addTransitRequest.getLONGITUDE
          || !this.addTransitRequest.getLATITUDE === null || !this.addTransitRequest.getLONGITUDE === null) {
          //alert("LOC");
          this.getCoordinates();
          if (this.alertforpleasewait) {
            this.alertProvider.basicAlertOnPage(TransitCommentPage, null, strings.unable_to_fetch_location, null);
          }//alert("Please wait we are trying to fetching your location");
        }
      }).catch((e) => {
        // console.log(e);
        alert("Error " + JSON.stringify(e));
      });
    });

  }

  async alertGoToSettings() {
    //this.alertForSettingsVisible = true;
    let myTitle = strings.settings_title;
    let myMsg = strings.settings_message;
    let cancel = strings.cancel;
    let ok = strings.ok;
    //alert("go to settings ");
    this.translate.get(strings.settings_title).subscribe(
      value => {
        // value is our translated string
        myTitle = value;
      }
    )

    this.translate.get(strings.settings_message).subscribe(
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

    this.mainAlert = this.alertCtrl.create({
      title: myTitle,
      message: myMsg,
      enableBackdropDismiss: false,
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
            //     console.log('Ok clicked');
            this.diagnostic.switchToSettings();
          }
        }
      ]
    });
    this.mainAlert.present();
  }

  setWebDisplayDateTime(dateTime: string) {
    this.addTransitRequest.setCOMPLETEDATETIME = dateTime;
  }

  setDisplayTime() {
    let currentDate = new Date();
    let date = this.datePipe.transform(currentDate, 'dd/MM/yyyy').toString();
    let millis = currentDate.getMilliseconds().toString();
    let time = this.datePipe.transform(currentDate, 'hh:mm:ss').toString();
    let h = this.datePipe.transform(currentDate, 'HH');
    let ampm: string;
    if (Number(h) > 12) {
      ampm = 'PM';
    } else {
      ampm = 'AM';
    }

    this.setWebDisplayDateTime(date + " " + time + ":" + millis + " " + ampm);


    this.translate.get(ampm).subscribe(
      value => {
        // value is our translated string
        ampm = value;
        //console.log("AMPM:"+ampm);
        this.displayTime = time + ' ' + ampm;
        //console.log("TIME:"+this.displayTime);
      }
    )
  }

}
