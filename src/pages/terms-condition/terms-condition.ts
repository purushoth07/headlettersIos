import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
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

/**
 * Generated class for the TermsConditionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-terms-condition',
  templateUrl: 'terms-condition.html',
})
export class TermsConditionPage implements OnInit {

  enableHome: boolean = true;
  profileCallback: any;
  isTermsChecked: boolean = false;
  myUrl: any;
  TCCODE: string;
  isLoaded: false;
  loader: any;
  userId: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertProvider: AlertProvider,
    public translate: TranslateService,
    private api: ApiProvider,
    public session: Storage,
    public utility: UtilityProvider,
    public platform: Platform,
    public networkProvider: NetworkProvider) {
    this.alertProvider.setCurrentPage(TermsConditionPage);

    //this.loadPrivacyPolicy2();
  }

  ngOnInit() {
    // let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    // this.myUrl = this.http
    // .get(proxyUrl + 'http://storeapp.yiipro.com/admin/policy/amazingfood')
    // .map(response => response.text())
    // .subscribe(
    //   function(data){
    //     document.getElementsByTagName("ion-card-content")[0].innerHTML = data;
    //   }
    // );
  }

  initiateLoder() {
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
  }

  ionViewDidEnter() {
    //console.log('ionViewDidEnter TermsConditionPage');
    //this.getNavParamData();
    this.setHardwareBackButton();
    this.getNavParams();
    this.callTermsAndConditionsApi();
  }

  setHardwareBackButton() {
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

  callTermsAndConditionsApi() {
    if (!this.networkProvider.isInternetConnected()) {
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(TermsConditionPage, null, strings.no_internet_connection, null);
      return;
    }

    this.initiateLoder();
    this.loader.present();

    this.api.getTermsAndConditionsUrl(this.userId).subscribe(response => {
      console.log('the response of terms and conditions Url');
      //this.loader.dismiss();
      //console.log(JSON.stringify(response));
      if (response && response.getErrorMessage && response.getErrorMessage === Constants.UNAUTHORIZED) {
        this.alertProvider.basicAlertOnPage(TermsConditionPage, null, strings.session_expired, null);
        this.utility.logoutSession(this.session, this.navCtrl, SocialLoginPage);
        return;
      }

      if (response) {
        if (response.Status === 'Success') {
          if (response.Data && response.Data != null && response.Data != "null" && response.Data != "" && response.TCCODE && response.TCCODE != null && response.TCCODE != "null" && response.TCCODE != "") {
            this.TCCODE = response.TCCODE;
            this.loadPrivacyPolicy(response.Data.toString().trim())
          } else if (response.Message) {
            this.alertProvider.basicAlertOnPage(TermsConditionPage, null, response.Message, null);
          } else if (response.ErrorMessage) {
            this.alertProvider.basicAlertOnPage(TermsConditionPage, null, response.ErrorMessage, null);
          } else {
            this.alertProvider.basicAlertOnPage(TermsConditionPage, null, strings.no_message_found, null);
          }
        } else if (response.Message) {
          this.alertProvider.basicAlertOnPage(TermsConditionPage, null, response.Message, null);
        } else {
          this.alertProvider.basicAlertOnPage(TermsConditionPage, null, strings.no_message_found, null);
        }
      } else {
        this.loader.dismiss();
        this.alertProvider.basicAlertOnPage(TermsConditionPage, null, strings.no_response_found, null);
      }


    }, error => {
      this.loader.dismiss();
      //alert(strings.server_error);
      //this.alertProvider.basicAlertOnPage(TermsConditionPage,null,strings.server_error,null);
      if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
        this.alertProvider.basicAlertOnPage(TermsConditionPage, null, strings.please_check_internet_access, null);
      } else {
        this.alertProvider.basicAlertOnPage(TermsConditionPage, null, error.toString(), null);
      }
    }, () => {
      //this.loader.dismiss();
      // No errors, route to new page
    });
  }

  loadPrivacyPolicy(url: string) {
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    this.myUrl = this.http
      .get(url)
      .finally(() => {
        // this.loader.dismiss()
      })
      .map(response => response.text())
      .subscribe(data => {
        // localLoader.dismiss();
        console.log(data);
        if(data){
          setTimeout(() => {
            document.getElementsByClassName("term-condition-wrapper")[0].innerHTML = data;
          },500)
        }else{
          alert('loading error');
        }
        //Com.getElementsByClassName("term-condition-wrapper")[0].value = data;
        this.loader.dismiss()
      }, error => {
        //localLoader.dismiss();
        //alert(strings.server_error);
        //this.alertProvider.basicAlertOnPage(TermsConditionPage,null,strings.server_error,null);
        if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
          // this.alertProvider.basicAlertOnPage(TermsConditionPage,null, strings.please_check_internet_access, null);

          this.loadPrivacyPolicy(proxyUrl + url);
        } else {
          this.loader.dismiss()
          this.alertProvider.basicAlertOnPage(TermsConditionPage, null, error.toString(), null);
        }
      }, () => {
        //localLoader.dismiss();
        // No errors, route to new page

      }
      );
  }

  loadPrivacyPolicyWithProxy(url: string) {
    // this.loader.present();
    this.myUrl = this.http
      .get(url)
      .finally(() => {
        // this.loader.dismiss()
      })
      .map(response => response.text())
      .subscribe(data => {
        // localLoader.dismiss();
        console.log("PROXY::::::")
        document.getElementsByClassName("term-condition-wrapper")[0].innerHTML = data;
        //Com.getElementsByClassName("term-condition-wrapper")[0].value = data;
        this.loader.dismiss()
      }, error => {
        this.loader.dismiss()
        //alert(strings.server_error);
        //this.alertProvider.basicAlertOnPage(TermsConditionPage,null,strings.server_error,null);
        if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
          this.alertProvider.basicAlertOnPage(TermsConditionPage, null, strings.please_check_internet_access, null);
        } else {
          this.alertProvider.basicAlertOnPage(TermsConditionPage, null, error.toString(), null);
        }
      }, () => {
        //localLoader.dismiss();
        // No errors, route to new page

      }
      );
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad TermsConditionPage');
    //this.getNavParams();
    //this.loadPrivacyPolicy();
  }

  getNavParams() {
    if (this.navParams.get('data')) {
      this.enableHome = false;
    } else {
      this.enableHome = true;
    }

    if (this.navParams.get("callback")) {
      this.profileCallback = this.navParams.get("callback");
    }

    if (this.navParams.get("check")) {
      this.isTermsChecked = this.navParams.get("check");
    }

    if (this.navParams.get("userId")) {
      this.userId = this.navParams.get("userId");
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

  updateTerms(isChecked: boolean, TCCODE: string) {
    if (this.profileCallback) {
      this.profileCallback(true, isChecked, TCCODE).then(() => {
        this.navCtrl.pop();
      });
    }
  }

  // saveTerms(){
  //     this.updateTerms(this.isTermsChecked);
  // }

  onClickDisagree() {
    console.log('terms and conditions disagreed')
    this.isTermsChecked = false;
    //console.log("disagree pressed"+this.TCCODE);
    this.updateTerms(this.isTermsChecked, this.TCCODE);
  }

  onClickAgree() {
    console.log('agree clicked');
    this.isTermsChecked = true;
    //console.log("Agree pressed"+this.TCCODE);
    this.updateTerms(this.isTermsChecked, this.TCCODE);
  }

  ionViewWillEnter() {
    this.alertProvider.setCurrentPage(TermsConditionPage);
  }

  // ionViewWillLeave(){
  //   this.alertProvider.dismiss();
  // }

}
