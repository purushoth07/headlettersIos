import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import { LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from '../../components/popover/popover';
import { resolveDep } from '@angular/core/src/view/provider';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import { HoroscopeListResponse } from '../../api/response/horoscope_list_response';
import { PromiseData } from '../../api/response/promise_data';
import { PromiseListResponse } from '../../api/response/promise_list_response';
import { UpdatePromisePage } from '../update-promise/update-promise';
import { DashboardPage } from '../dashboard/dashboard';
import { MessageHistoryPage } from '../message-history/message-history';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { NetworkProvider } from '../../providers/network/network';
import { SocialLoginPage } from '../social-login/social-login';
import { Storage } from '@ionic/storage';
import { UtilityProvider } from '../../providers/utility/utility';

/**
 * Generated class for the PromisesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-promises',
  templateUrl: 'promises.html',
})
export class PromisesPage {

  loader: any
  promiseList: PromiseData[] = []
  horoscopeData: HoroscopeResponseData = new HoroscopeResponseData();
  defaultFalseFlag: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private datePipe: DatePipe,
    private popOverController: PopoverController,
    public platform: Platform,
    public http: Http,
    public alertProvider: AlertProvider,
    private session: Storage,
    public utility: UtilityProvider,
    public translate: TranslateService,
    public networkProvider: NetworkProvider) {

    this.alertProvider.setCurrentPage(PromisesPage);

    //this.callPromiseListApi('meme@gmail.com','5');
    //this.sampleData();
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad Promises');
    this.initiateLoder();
    this.getNavParamData();
  }

  initiateLoder() {
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
  }

  getNavParamData() {
    if (this.navParams.get('data')) {
      this.horoscopeData = this.navParams.get('data');
      if (this.horoscopeData.getHUserId && this.horoscopeData.getHId) {
        this.callPromiseListApi(this.horoscopeData.getHUserId.toString().trim(), this.horoscopeData.getHId.toString().trim(), true);
      }

    }
  }

  onBackPressed() {
    this.navCtrl.pop();
  }

  onHomePressed() {
    // this.navCtrl.push(DashboardPage, {
    //   //data:this.userData
    // });
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  sampleData() {
    for (let i = 1; i <= 10; i++) {
      let data = new PromiseData();
      if ((i % 2) === 0) {
        data.setPmUserid = 'meme@gmail.com';
        data.setPmHId = '3'
        data.setPmSeq = 3
        data.setPmDetails = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        data.setPmPDate = '2018-08-01T15:06:00.8517803+05:30';
        data.setPmUnread = 'Y'
        data.setPmStatus = '2'
        data.setCustomId = i
        data.setPmHComments = 'Hello horo 11^ 8/8/2018 1:53:04 PM^ Raj Comment !Change^ 8/8/2018 2:10:57 PM^ HORO Comment !Cgggvffff^ 8/8/2018 2:15:02 PM !Rzgzxhx^ 8/8/2018 2:20:30 PM !'
        data.setHORONAME = 'Sample Name'
      } else {
        data.setPmUserid = 'meme@gmail.com';
        data.setPmHId = '17'
        data.setPmSeq = 4
        data.setPmDetails = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        data.setPmPDate = '2018-08-10T15:06:00.8517803+05:30';
        data.setPmUnread = 'N'
        data.setPmStatus = '0'
        data.setCustomId = i
        data.setPmHComments = 'Test test^ 8/9/2018 5:01:48 AM !'
        data.setHORONAME = 'Sample Name 2'
      }

      this.promiseList.push(data);
    }

    // for(let item of this.promiseList){
    //   console.log("DATE " + item.getdisplayDate + " TIME " + item.getdisplayTime)
    // }
  }

  callPromiseListApi(userId: string, hId: string, showLoader: boolean) {
    if (!this.networkProvider.isInternetConnected()) {
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(PromisesPage, null, strings.no_internet_connection, null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    if (showLoader) {
      localLoader.present();
    }

    this.api.getPromiseList(userId, hId).subscribe(response => {
      //localLoader.dismiss();
      //alert(JSON.stringify(response));
      let dataString = JSON.stringify(response);
      let dataObj: PromiseListResponse = new PromiseListResponse(dataString);

      if (dataObj && dataObj.getErrorMessage && dataObj.getErrorMessage === Constants.UNAUTHORIZED) {
        this.alertProvider.basicAlertOnPage(PromisesPage, null, strings.session_expired, null);
        this.utility.logoutSession(this.session, this.navCtrl, SocialLoginPage);
        return;
      }

      // for(let i = 0;i<this.horoscopeList.length; i++){
      //   let list :HoroscopeResponseData = new HoroscopeResponseData(JSON.stringify(fObj.getData));
      //   alert(this.horoscopeList[i].getHUserId);
      // }

      // alert(JSON.stringify(response));

      if (dataObj && dataObj.getStatus && dataObj.getStatus === 'Success') {
        //alert(JSON.stringify(dataObj.getData));
        if (dataObj.getData && dataObj.getData.length > 0) {
          //show listing

          localLoader.dismiss();
          this.promiseList = dataObj.getData;
          for (let i = 0; i < this.promiseList.length; i++) {

            this.promiseList[i].setPmPDate = this.promiseList[i].getPmPDate;
            this.promiseList[i].setCustomId = i + 1;
          }

        } else {
          //show no list found
          localLoader.dismiss();
          if (dataObj && dataObj.getMessage) {
            //alert(JSON.stringify(dataObj.getMessage));
            this.alertProvider.basicAlertOnPage(PromisesPage, null, dataObj.getMessage, null);
          }
        }
      } else {
        localLoader.dismiss();
        if (dataObj && dataObj.getMessage) {
          //alert(JSON.stringify(dataObj.getMessage));
          this.alertProvider.basicAlertOnPage(PromisesPage, null, dataObj.getMessage, null);
        }
      }

    }, error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(PromisesPage,null,strings.server_error,null);

      if (error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1)
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)) {
        this.alertProvider.basicAlertOnPage(PromisesPage, null, strings.please_check_internet_access, null);
      } else {
        this.alertProvider.basicAlertOnPage(PromisesPage, null, error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  checkFeedFlag(promiseData: PromiseData) {

    // if(!promiseData.getPmStatus){
    //   alert(strings.promise_is_not_completed_yet);
    //   return;
    // }

    // if(promiseData.getPmStatus && promiseData.getPmStatus.toString().trim() != "2" ){
    //   alert(strings.promise_is_not_completed_yet);
    //   return;
    // }

    promiseData.setPmFeedFlag = Constants.TRUE;
    //console.log("CEHCK:"+JSON.stringify(promiseData));
    // this.navCtrl.push(UpdatePromisePage, {
    //   data:promiseData
    // });
  }

  unCheckFeedFlag(promiseData: PromiseData) {
    // if(!promiseData.getPmStatus){
    //   alert(strings.promise_is_not_completed_yet);
    //   return;
    // }

    // if(promiseData.getPmStatus && promiseData.getPmStatus.toString().trim() != "2" ){
    //   alert(strings.promise_is_not_completed_yet);
    //   return;
    // }

    promiseData.setPmFeedFlag = Constants.FALSE;
    //console.log("UNCEHCK:"+JSON.stringify(promiseData));
    // this.navCtrl.push(UpdatePromisePage, {
    //   data:promiseData
    // });
  }

  viewHistory(promiseData: PromiseData) {
    //console.log("HIS " + JSON.stringify(promiseData.getHistoryCommentToDisplay(this.translate)));
    this.navCtrl.push(MessageHistoryPage, {
      data: promiseData.getHistoryCommentToDisplay(this.translate)
    });
  }

  viewCommentClick(promiseData: PromiseData) {

    if (!promiseData.getPmFeedFlag
      || (promiseData.getPmFeedFlag != Constants.TRUE
        && promiseData.getPmFeedFlag != Constants.FALSE)) {
      //alert(strings.please_select_one_of_above_options);
      this.alertProvider.basicAlertOnPage(PromisesPage, null, strings.please_select_one_of_above_options, null);
      return;
    }

    if (!promiseData.getPmStatus) {
      //alert(strings.promise_is_not_completed_yet);
      this.alertProvider.basicAlertOnPage(PromisesPage, null, strings.promise_is_not_completed_yet, null);
      return;
    }

    if (promiseData.getPmStatus && promiseData.getPmStatus.toString().trim() != "2") {
      //alert(strings.promise_is_not_completed_yet);
      this.alertProvider.basicAlertOnPage(PromisesPage, null, strings.waiting_for_agent_to_reply, null);
      return;
    }

    this.navCtrl.push(UpdatePromisePage, {
      data: promiseData,
      callback: this.callback.bind(this)
    });
  }

  /**
   * callback to check any data is updated on next screen to update list in this screen
   */
  callback = function (isChange) {
    return new Promise((resolve, reject) => {
      if (isChange) {
        if (this.horoscopeData.getHUserId && this.horoscopeData.getHId) {
          this.callPromiseListApi(this.horoscopeData.getHUserId.toString().trim(), this.horoscopeData.getHId.toString().trim(), false);
        }
        resolve();
      } else {
        resolve();
      }
      //alert(this.test);

    });
  }

  ionViewWillEnter() {
    this.alertProvider.setCurrentPage(PromisesPage);
  }

}
