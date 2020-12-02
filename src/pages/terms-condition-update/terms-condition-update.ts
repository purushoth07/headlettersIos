import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { Http } from '@angular/http';
import * as strings from '../../utils/strings'
import * as Constants from '../../utils/constants';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from '../../providers/api/api';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
import { Storage } from '@ionic/storage';
import { UpdateTermsConditionRequest } from '../../api/request/update_terms_condition_request';
import { LoginResponseData } from '../../api/response/login_response_data';
import { FingerAuthPage } from '../fingerauth/fingerauth';
import { AnonymousSubject } from 'rxjs';

/**
 * Generated class for the TermsConditionUpdatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-terms-condition-update',
  templateUrl: 'terms-condition-update.html',
})
export class TermsConditionUpdatePage {
  enableHome: boolean = true;
  profileCallback: any;
  addDemiseCallback: any;
  isTermsChecked: boolean = false;
  myUrl: any;
  TCCODE: string;
  isLoaded: false;
  loader: any;
  requestUpdateTermsCondition = new UpdateTermsConditionRequest();
  userData = new LoginResponseData();
  goToFingerTouch: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertProvider: AlertProvider,
    public translate: TranslateService,
    private api: ApiProvider,
    private alertCtrl: AlertController,
    public session: Storage,
    public utility: UtilityProvider,
    public platform: Platform,
    public networkProvider: NetworkProvider) {

    this.alertProvider.setCurrentPage(TermsConditionUpdatePage);
    this.platform.ready().then(() => {
      if (!platform.is('cordova')) {
        //this.isKeyboardOpen=true;
        return;
      }
      platform.registerBackButtonAction(() => {

      });

    });


    //this.loadPrivacyPolicy2();

  }

  ionViewDidEnter() {
    //console.log('ionViewDidEnter TermsConditionPage');
    //this.getNavParamData();
    this.getNavParams();
    this.callTermsAndConsitionsApi();
  }

  initiateLoder() {
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
  }


  callTermsAndConsitionsApi() {
    if (!this.networkProvider.isInternetConnected()) {
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.no_internet_connection, null);
      return;
    }
    this.initiateLoder();
    this.loader.present();
    this.api.getTermsAndConditionsUrl(this.userData.getUserId.toString().trim()).subscribe(response => {
      //this.loader.dismiss();
      //console.log(JSON.stringify(response));
      if (response && response.getErrorMessage && response.getErrorMessage === Constants.UNAUTHORIZED) {
        this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.session_expired, null);
        this.utility.logoutSession(this.session, this.navCtrl, SocialLoginPage);
        return;
      }
      if (response) {
        if (response.Status === 'Success') {
          if (response.Data && response.Data != null && response.Data != "null" && response.Data != "" && response.ChartCharges && response.ChartCharges != null && response.ChartCharges != "null" && response.ChartCharges != ""
            && response.TCCODE != null && response.TCCODE != "null") {
            this.TCCODE = response.TCCODE.toString().trim();
            // console.log("get terms url " + JSON.stringify(this.TCCODE));

            //this.loadPrivacyPolicy(response.Data.toString().trim());
            if (this.addDemiseCallback) {
              this.goToAlert(response);
            }//else{
            this.loadPrivacyPolicy(response.Data.toString().trim());
            // }

          } else if (response.Message) {
            this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, response.Message, null);
          } else if (response.ErrorMessage) {
            this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, response.ErrorMessage, null);
          } else {
            this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.no_message_found, null);
          }
        } else if (response.Message) {
          this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, response.Message, null);
        } else {
          this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.no_message_found, null);
        }
      } else {
        this.loader.dismiss();
        this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.no_message_found, null);
      }
    }, error => {
      this.loader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage,null,strings.server_error,null);

      if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
        this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.please_check_internet_access, null);
      } else {
        this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, error.toString(), null);
      }
    }, () => {
      //this.loader.dismiss();
      // No errors, route to new page
    });
  }

  async goToAlert(response) {

    //let myTitle = strings.the_chart_charges_are;
    let myMsgStart = strings.charges_message_start;
    let myMsgEnd = strings.charges_message_end;
    let cancel = strings.cancel;
    let ok = strings.ok;

    this.translate.get(strings.charges_message_start).subscribe(
      value => {
        // value is our translated string
        myMsgStart = value;
      }
    )

    this.translate.get(strings.charges_message_end).subscribe(
      value => {
        // value is our translated string
        myMsgEnd = value;
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
      //title: myTitle +' '+response.ChartCharges,
      message: myMsgStart + ' ' + this.userData.getCurrencySign + ' ' + response.ChartCharges + ' ' + myMsgEnd,
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
            //console.log('Cancel clicked');
          }
        },
        {
          text: ok,
          handler: () => {
            //this.loadPrivacyPolicy(response.Data.toString().trim());
            //console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();


  }

  loadPrivacyPolicy(url: string) {
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";

    this.myUrl = this.http
      .get(url)
      .finally(() => this.loader.dismiss())
      .map(response => response.text())
      .subscribe(data => {
        // localLoader.dismiss();
        document.getElementsByClassName("term-condition-wrapper")[0].innerHTML = data;
        //Com.getElementsByClassName("term-condition-wrapper")[0].value = data;
      }, error => {
        //localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage,null,strings.server_error,null);
        if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
          // this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage,null, strings.please_check_internet_access, null);
          this.loadPrivacyPolicyWithProxy(proxyUrl + url);
        } else {
          this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, error.toString(), null);
        }
      }, () => {
        //localLoader.dismiss();
        // No errors, route to new page  
      }
      );
  }

  loadPrivacyPolicyWithProxy(url: string) {
    this.myUrl = this.http
      .get(url)
      .finally(() => this.loader.dismiss())
      .map(response => response.text())
      .subscribe(data => {
        // localLoader.dismiss();
        document.getElementsByClassName("term-condition-wrapper")[0].innerHTML = data;
        //Com.getElementsByClassName("term-condition-wrapper")[0].value = data;
      }, error => {
        //localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage,null,strings.server_error,null);
        if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
          this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.please_check_internet_access, null);
        } else {
          this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, error.toString(), null);
        }
      }, () => {
        //localLoader.dismiss();
        // No errors, route to new page  
      }
      );
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad TermsConditionUpdatePage');
    //this.getNavParams();
    //this.loadPrivacyPolicy();
  }

  getNavParams() {
    if (this.navParams.get("user")) {
      this.userData = this.navParams.get("user");
      this.api.updateTokenForAPI(this.userData);
      this.requestUpdateTermsCondition.setUserId = this.userData.getUserId.toString().trim();
    }
    if (this.navParams.get("callback")) {
      this.addDemiseCallback = this.navParams.get("callback");
    }

    // if(this.navParams.get("TCCODE")){
    //       this.TCCODE=this.navParams.get("TCCODE");
    // }

    if (this.navParams.get("fingerTouch")) {
      this.goToFingerTouch = this.navParams.get("fingerTouch");
    }
  }

  onBackPressed() {
    this.navCtrl.pop();
  }

  onHomePressed() {
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  // toggleTermsAndConditions(){
  //     if(this.isTermsChecked){
  //       this.isTermsChecked = false;
  //     }else{
  //       this.isTermsChecked = true;
  //     }
  // }

  // updateTerms(isChecked:boolean){
  //   if(this.profileCallback){
  //     this.profileCallback(true,isChecked).then(()=>{
  //       this.navCtrl.pop();
  //     });
  //   }
  // }

  // saveTerms(){
  //     this.updateTerms(this.isTermsChecked);
  // }

  onClickDisagree() {
    if (this.addDemiseCallback) {
      this.navCtrl.pop();
    } else {


      //this.requestUpdateTermsCondition.setIsCheck = Constants.NO;
      //this.callUpdateTermsConditionApi(this.requestUpdateTermsCondition);
      this.utility.logoutSession(this.session, this.navCtrl, SocialLoginPage);
    }
  }

  onClickAgree() {
    // if(this.addDemiseCallback){
    //   this.addDemiseCallback(true,true).then(()=>{
    //     this.navCtrl.pop();
    //  });
    // }else{
    this.isTermsChecked = true;
    this.requestUpdateTermsCondition.setIsCheck = Constants.YES;
    //console.log(this.TCCODE);
    this.requestUpdateTermsCondition.setTCCODE = this.TCCODE;
    this.callUpdateTermsConditionApi(this.requestUpdateTermsCondition);
    // }
  }

  callUpdateTermsConditionApi(req) {
    //alert("Data to Send " +JSON.stringify(this.updatePredictionRequest));
    if (!this.networkProvider.isInternetConnected()) {
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.no_internet_connection, null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();
    this.api.updateTermsConditionStatus(req).subscribe(response => {
      localLoader.dismiss();
      //console.log("update terms status"+ JSON.stringify(response));
      //alert("REQ:" + JSON.stringify(this.updatePredictionRequest) +"\nRES:"+JSON.stringify(response));
      // let data : UpdatePredictionResponse = new UpdatePredictionResponse(JSON.stringify(response));
      //alert("DATA:"+JSON.stringify(data));
      if (response && response.ErrorMessage && response.ErrorMessage === Constants.UNAUTHORIZED) {
        this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.session_expired, null);
        this.utility.logoutSession(this.session, this.navCtrl, SocialLoginPage);
        return;
      }
      if (response) {
        if (response.Status === 'Success' && response.Data && response.Data.toString().trim() === Constants.YES && response.TCCODE != null && response.TCCODE != "null") {
          this.userData.setTCFlag = Constants.YES;
          this.userData.setTCCODE = response.TCCODE;
          this.session.set(Constants.USER_DATA, this.userData);
          if (this.goToFingerTouch) {
            this.navCtrl.setRoot(FingerAuthPage);
            this.navCtrl.popToRoot;
          } else if (this.addDemiseCallback) {
            // alert(JSON.stringify(response));
            this.addDemiseCallback(true, true).then(() => {
              this.navCtrl.pop();
            });
          }
          else {
            this.navCtrl.setRoot(DashboardPage);
            this.navCtrl.popToRoot;
          }
        } else if (response.Message) {
          this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, response.Message, null);
        }
      } else {
        this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.no_message_found, null);
      }
    }, error => {
      localLoader.dismiss();
      //alert(error);
      // this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage,null,strings.server_error,null);

      if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
        this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, strings.please_check_internet_access, null);
      } else {
        this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage, null, error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  ionViewWillEnter() {
    this.alertProvider.setCurrentPage(TermsConditionUpdatePage);
  }

}
