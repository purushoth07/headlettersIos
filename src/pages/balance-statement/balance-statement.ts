import { Component, state } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, Platform, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import { LoadingController } from 'ionic-angular';
import { HoroscopeListResponse } from '../../api/response/horoscope_list_response';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from '../../components/popover/popover';
import { StatementResponse } from '../../api/response/statement_response';
import { StatementData } from '../../api/response/statement_data';
import { Storage } from '@ionic/storage';
import { LoginResponseData } from '../../api/response/login_response_data';
import { BalanceData } from '../../api/response/balance';
import { DashboardPage } from '../dashboard/dashboard';
import { HCOMResponse } from '../../api/response/hcom_response';
import { EmailPredictionRequest } from '../../api/request/email_prediction_request';
import { NetworkProvider } from '../../providers/network/network';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import swal from 'sweetalert';
import { TranslateService } from '@ngx-translate/core';
import { MyCalendar } from '../../utils/calendar';
import { AccountHistoryBalance } from '../../api/response/account_history_balance';
import { AccountBalance } from '../../api/response/account_balance';
import { AccountTxn } from '../../api/response/account_txn';
import { AccountHistoryTxn } from '../../api/response/account_history_txn';
import { AccountStatementResponse } from '../../api/response/account_statement_response';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';
import { ModalDatePage } from '../modal-date/modal-date';
import { DatePopoverComponent } from '../../components/date-popover/date-popover';
import { PaypalPaymentPage } from '../paypal-payment/paypal-payment';
declare var RazorpayCheckout : any;

/**
 * Generated class for the BalanceStatementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-balance-statement',
  templateUrl: 'balance-statement.html',
})
export class BalanceStatementPage {

  topup_amount:number;

  userData: LoginResponseData = new LoginResponseData();
  statementResponse: StatementResponse = new StatementResponse();
  statementList: StatementData[] = [];
  balanceData: BalanceData = new BalanceData();
  loader: any;
  currencySign = Constants.CURRENCY_INR;
  horoscopeList: HoroscopeResponseData[] = [];
  statementCalendar: MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_STATEMENT);
  // showStatementDialog: boolean = false;
  dialogType: number = 1;

  isCurrentData: boolean = true;
  payment_method: any = 'razor';
  mainBalance: string = '--';
  currentStatementList: AccountTxn[] = [];
  oldStatementList: AccountHistoryTxn[] = [];

  openingCurrentBalance = new AccountHistoryBalance();
  closingCurrentBalance = new AccountBalance();
  openingOldBalance = new AccountHistoryBalance();
  closingOldBalance = new AccountHistoryBalance();
  mainPopOver:any;

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
    public networkProvider: NetworkProvider,
    public alertProvider: AlertProvider,
    public translate: TranslateService,
    public utility:UtilityProvider,
    private modal:ModalController) {

      //var date = new Date('2018-11-17UTC06:50:59'); alert(date.toLocaleString());

    this.alertProvider.setCurrentPage(BalanceStatementPage);
   //this.presentPrompt();
    this.platform.ready().then(() => {

      if(!platform.is('cordova')){
          return;
      }
      
      platform.registerBackButtonAction(() => {
        this.alertProvider.dismiss();
        if(this.mainPopOver){
            this.mainPopOver.dismiss();
            this.mainPopOver = null;
            return;
        }
        this.onBackPressed();
      });

    });

    

    //this.sampleStatementData();

    //this.sampleDataForBalanceAndStatement();
  }



  initiateLoder() {
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
  }

  setCalendarYears() {
    const year = new Date().getFullYear().toString();
    const month = new Date().getMonth().toString();
    const date = new Date().getDate().toString();
    // alert(year + '-' + month + '-' + date);
    //const formatedDate = new Date().toISOString().substring(0, 4);
    this.statementCalendar.previousYearsForStatement = Number(year);
    this.statementCalendar.setCurrentMonth = Number(month);
    this.statementCalendar.setCurrentDate = Number(date);

  }

  onHomePressed() {
    // if (this.showStatementDialog) {
    //   this.statementDialog(1);
    // } else {
      this.navCtrl.setRoot(DashboardPage)
      this.navCtrl.popToRoot;
    //}

  }

  ionViewDidEnter(){
    this.initiateLoder();
    this.setCalendarYears();
    this.getNavParamData();
  }

  getNavParamData() {
    if (this.navParams.get('data')) {
      this.userData = this.navParams.get('data');
      this.statementCalendar.setSelectedMonth = this.statementCalendar.getCurrentMonth;
      this.statementCalendar.setSelectedYear = this.statementCalendar.getCurrentYear;
      let month = ((this.statementCalendar.getSelectedMonth.length === 1) ? "0" + this.statementCalendar.getSelectedMonth : this.statementCalendar.getSelectedMonth) + this.statementCalendar.getSelectedYearShort;

      if (this.userData) {
        if (this.userData.getUcurrency === Constants.USD) {
          this.currencySign = Constants.CURRENCY_USD
        } else {
          this.currencySign = Constants.CURRENCY_INR
        }
        if (this.userData.getUserId) {
          this.callStatementListApi(this.userData.getUserId.toString().trim(), month);
        }
       
      }

    } else {
      this.session.get(Constants.USER_DATA).then(val => {
        if (val) {
          this.userData = new LoginResponseData(JSON.stringify(val));
          this.statementCalendar.setSelectedMonth = this.statementCalendar.getCurrentMonth;
          this.statementCalendar.setSelectedYear = this.statementCalendar.getCurrentYear;
          let month = ((this.statementCalendar.getSelectedMonth.length === 1) ? "0" + this.statementCalendar.getSelectedMonth : this.statementCalendar.getSelectedMonth) + this.statementCalendar.getSelectedYearShort;
          if (this.userData) {
            if (this.userData.getUcurrency === Constants.USD) {
              this.currencySign = Constants.CURRENCY_USD
            } else {
              this.currencySign = Constants.CURRENCY_INR
            }
            if (this.userData.getUserId) {
              this.callStatementListApi(this.userData.getUserId.toString().trim(), month);
            }
            
          }
          
        }
      });
    }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BalanceStatementPage');
    //this.callStatementListApi('meme@gmail.com');
    //this.getNavParamData();
  }


  onBackPressed() {
    // if (this.showStatementDialog) {
    //   this.statementDialog(1);
    // } else {
      this.navCtrl.pop();
    //}

  }

  sampleDataForBalanceAndStatement() {
    this.openingCurrentBalance.setACCOUNTBAL = 2000;
    this.openingCurrentBalance.setHISACCOUNTCCY = "INR";


    this.closingCurrentBalance.setACCOUNTBAL = 500;
    this.closingCurrentBalance.setACCOUNTCCY = "INR";


    for (let i = 1; i <= 10; i++) {
      let accountData = new AccountTxn();
      if (i % 2 === 0) {
        accountData.setTXNAMOUNT = 200;
        accountData.setTXNTYPE = 'D';
        accountData.setTXNDATE = '2018-08-04T15:08:00.8517803+05:30';
        accountData.setTXNTIME = '2018-08-01T15:06:00.8517803+05:30';
        accountData.setTXNACCOUNTCCY = "INR";
        accountData.setNARRATION = "Added to Account From: SBI";
      } else {
        accountData.setTXNAMOUNT = 800;
        accountData.setTXNTYPE = 'C';
        accountData.setTXNDATE = '2018-08-01T15:06:00.8517803+05:30';
        accountData.setTXNTIME = '2018-08-01T15:06:00.8517803+05:30';
        accountData.setTXNACCOUNTCCY = "INR";
        accountData.setTXNEREF = "Charge For Horoscope Services HealLetters pvt ltd.";
      }

      this.currentStatementList.push(accountData);

    }


    this.openingOldBalance.setACCOUNTBAL = 1000;
    this.openingOldBalance.setHISACCOUNTCCY = "USD";


    this.closingOldBalance.setACCOUNTBAL = 2000;
    this.closingOldBalance.setHISACCOUNTCCY = "USD";


    for (let i = 1; i <= 10; i++) {
      let accountOldData = new AccountHistoryTxn();
      if (i % 2 === 0) {
        accountOldData.setHTXNAMOUNT = 800;
        accountOldData.setHTXNTYPE = 'D';
        accountOldData.setHTXNDATE = '2018-08-01T15:06:00.8517803+05:30';
        accountOldData.setHTXNTIME = '2018-08-01T15:06:00.8517803+05:30';
        accountOldData.setHTXNACCOUNTCCY = "USD";
        accountOldData.setHTXNEREF = "Added to Account From: SBI";
      } else {
        accountOldData.setHTXNAMOUNT = 200;
        accountOldData.setHTXNTYPE = 'C';
        accountOldData.setHTXNDATE = '2018-08-01T15:06:00.8517803+05:30';
        accountOldData.setHTXNTIME = '2018-08-01T15:06:00.8517803+05:30';
        accountOldData.setHTXNACCOUNTCCY = "USD";
        accountOldData.setHTXNEREF = "Charge For Horoscope Services HealLetters pvt ltd.";
      }

      this.mainBalance = this.openingCurrentBalance.getACCOUNTBAL.toString();
      this.oldStatementList.push(accountOldData);

    }


  }

  addamount(amount){
    console.log(amount)
    this.topup_amount = amount;
  }

  sampleStatementData() {
    this.balanceData.setACCOUNTBAL = 10000;
    for (let i = 1; i <= 10; i++) {
      let data = new StatementData();
      if ((i % 2) === 0) {
        data.setTXNAMOUNT = 455;
        data.setTXNTYPE = 'D'
        data.setTAXCODE = 'Added to Account From: SBI'
        data.setTXNDATE = '2018-08-01T15:06:00.8517803+05:30';
        data.setTXNTIME = '2018-08-01T15:06:00.8517803+05:30';
      } else {
        data.setTXNAMOUNT = 200;
        data.setTXNTYPE = 'C'
        data.setTAXCODE = 'Charge For Horoscope Services HealLetters pvt ltd.'
        data.setTXNDATE = '2018-08-10T15:06:00.8517803+05:30';
        data.setTXNTIME = '2018-08-10T15:06:00.8517803+05:30';
      }

      this.statementList.push(data);
    }

    for (let item of this.statementList) {
      //console.log("DATE " + item.getdisplayDate + " TIME " + item.getdisplayTime)
    }
  }

  click() {
    //this.callStatementListApi('meme@gmail.com');
  }

  callStatementListApi2(userId: string, month: string) {

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(BalanceStatementPage,null,strings.no_internet_connection,null);
      return;
    }

    this.api.getStatementList(userId, month).subscribe(response => {
      this.loader.dismiss();

      //var jsObj = angular.fromJSON(<your_json_string>);
      let d = JSON.stringify(response);
      let fObj: StatementResponse = new StatementResponse(d);

      if(fObj && fObj.getErrorMessage && fObj.getErrorMessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if (fObj && fObj.getStatus === 'Success') {
        //alert(JSON.stringify(fObj.getData));

        if (fObj.getBalance && fObj.getBalance.getACCOUNTBAL) {
          this.balanceData = fObj.getBalance;
        }

        if (fObj.getData && fObj.getData.length > 0) {
          //show listing
          this.statementList = fObj.getData;

        } else {
          //show no list found

        }
      } else {

        if (fObj && fObj.getMessage) {
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, JSON.stringify(fObj.getMessage), null);
        }
      }

    }, error => {
      this.loader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.server_error, null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null,error.toString(), null);
      }
    }, () => {
      //this.loader.dismiss();
      // No errors, route to new page
    });
  }

  callStatementListApi(userId: string, month: string) {

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(BalanceStatementPage,null,strings.no_internet_connection,null);
      return;
    }
    
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();
    this.api.getStatementList(userId, month).subscribe(response => {
      localLoader.dismiss();
      //  alert("REQ:"+userId + " month:"+month);
      // alert("RES:"+JSON.stringify(response));
      //var jsObj = angular.fromJSON(<your_json_string>);
      //let d = JSON.stringify(response);
      let fObj: AccountStatementResponse = new AccountStatementResponse(JSON.stringify(response));
      //console.log("RES:",JSON.stringify(fObj));
      if(fObj && fObj.getErrorMessage && fObj.getErrorMessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }


      if (fObj && fObj.getStatus === 'Success') {
        //alert(JSON.stringify(fObj.getData));
        /**
         * check if selected year and month is current month and year then get data of resposnse from current data
         * else get form old data 
         * 
         */
        if (this.statementCalendar.getSelectedYearShort === this.statementCalendar.getCurrentYearShort
          && this.statementCalendar.getSelectedMonth === this.statementCalendar.getCurrentMonth) {
          this.isCurrentData = true;
          if (fObj.getCloseCurrentBalance) {
            fObj.getCloseCurrentBalance.defaultCurrencySign =  this.userData.getUcurrency
            if(fObj.getCloseCurrentBalance.getACCOUNTBAL){
              this.mainBalance = fObj.getCloseCurrentBalance.getACCOUNTBAL.toString();
            }else{
              this.mainBalance = '0';
            }

            if(fObj.getCloseCurrentBalance.getCurrencySign){
              this.currencySign = fObj.getCloseCurrentBalance.getCurrencySign;
            }else{
              if (this.userData && this.userData.getUcurrency === Constants.USD) {
                this.currencySign = Constants.CURRENCY_USD
              } else {
                this.currencySign = Constants.CURRENCY_INR
              }
            }
            
            
          } else {
            this.mainBalance = '0';
            if (this.userData && this.userData.getUcurrency === Constants.USD) {
              this.currencySign = Constants.CURRENCY_USD
            } else {
              this.currencySign = Constants.CURRENCY_INR
            }
          }

          if (fObj.getData && fObj.getData.getCurrentData) {
            this.currentStatementList = fObj.getData.getCurrentData;
          } else {
            this.currentStatementList = [];
          }

        } else {
          this.isCurrentData = false;
          if (fObj.getClosingOldBalance ) {
            if(fObj.getClosingOldBalance.getACCOUNTBAL){
              this.mainBalance = fObj.getClosingOldBalance.getACCOUNTBAL.toString();
            }else{
              this.mainBalance = '0';
            }

            if(fObj.getClosingOldBalance.getCurrencySign){
              this.currencySign = fObj.getClosingOldBalance.getCurrencySign;
            }else{
              if (this.userData && this.userData.getUcurrency === Constants.USD) {
                this.currencySign = Constants.CURRENCY_USD
              } else {
                this.currencySign = Constants.CURRENCY_INR
              }
            }

          } else {
            this.mainBalance = '0';
            if (this.userData && this.userData.getUcurrency === Constants.USD) {
              this.currencySign = Constants.CURRENCY_USD
            } else {
              this.currencySign = Constants.CURRENCY_INR
            }
          }

          if (fObj.getData && fObj.getData.getOldData) {
            this.oldStatementList = fObj.getData.getOldData;
          } else {
            this.oldStatementList = [];
          }
        }
      } else {

        if (fObj && fObj.getMessage) {
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, fObj.getMessage, null);
        }
      }

    }, error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.server_error, null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null,error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }


  sendStatement() {

    // if(this.horoscopeList.length === 0){
    //   this.callHoroscopeListApi(this.userData.getUserId.toString().trim());
    // }else{
    //   this.showHoroscopeList();
    // }


    if (!this.validate()) {
      return;
    }

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(BalanceStatementPage,null,strings.no_internet_connection,null);
      return;
    }

    //   if(!this.networkProvider.isInternetConnected()){
    //     //alert(strings.no_internet_connection);
    //     this.alertProvider.basicAlertOnPage(BalanceStatementPage,null,strings.no_internet_connection,null);
    //     return;
    //   }
    if (this.userData && this.userData.getUserId) {
      if (this.dialogType === 1) {
        //this.statementDialog(1);
        /**
         * check if selected year and month is current month and year then get data of resposnse from current data
         * else get form old data 
         * 
         */
        //  if(this.statementCalendar.getSelectedYearShort === this.statementCalendar.getCurrentYearShort
        //    && this.statementCalendar.getSelectedMonth === this.statementCalendar.getCurrentMonth){
        //       this.isCurrentData = true;
        //       this.mainBalance = this.closingCurrentBalance.getACCOUNTBAL.toString().trim();
        //       this.currencySign = this.closingCurrentBalance.getCurrencySign.toString().trim();
        //  }else{
        //       this.isCurrentData = false;
        //       this.mainBalance = this.closingOldBalance.getACCOUNTBAL.toString().trim();
        //       this.currencySign = this.closingOldBalance.getCurrencySign.toString().trim();
        //  }
        let month = ((this.statementCalendar.getSelectedMonth.length === 1) ? "0" + this.statementCalendar.getSelectedMonth : this.statementCalendar.getSelectedMonth) + this.statementCalendar.getSelectedYearShort;
        this.callStatementListApi(this.userData.getUserId, month);
      } else {
        //this.statementDialog(1);
        let req: EmailPredictionRequest = new EmailPredictionRequest();
        req.setUserId = this.userData.getUserId.toString().trim();
        req.setStatementDate = ((this.statementCalendar.getSelectedMonth.length === 1) ? "0" + this.statementCalendar.getSelectedMonth : this.statementCalendar.getSelectedMonth) + this.statementCalendar.getSelectedYearShort;
        //console.log("REQ:" + JSON.stringify(req));
        this.callEmailStatementApi(req);
      }

    }

  }

  callHoroscopeListApi(userId: string) {
    this.initiateLoder();
    this.loader.present();
    this.api.getHoroscopeList(userId).subscribe(response => {
      this.loader.dismiss();
      let fObj: HoroscopeListResponse = new HoroscopeListResponse(JSON.stringify(response));


      if (fObj && fObj.getStatus === 'Success') {
        if (fObj.getData && fObj.getData.length > 0) {
          //show listing
          this.horoscopeList = fObj.getData;
          this.showHoroscopeList();

        } else {
          //show no list found
        }
      } else {

        if (fObj && fObj.getMessage) {
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, JSON.stringify(fObj.getMessage), null);
        }
      }

    }, error => {
      this.loader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.server_error, null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null,error.toString(), null);
      }
    }, () => {
      //this.loader.dismiss();
      // No errors, route to new page
    });
  }

  showHoroscopeList() {

    if (!this.horoscopeList || this.horoscopeList.length === 0) {
      return;
    }
    let popover = this.popOverController.create(PopoverComponent, { type: Constants.POPOVER_HOROSCOPE_NAME, data: this.horoscopeList });
    this.mainPopOver = popover;
    popover.present({
      //ev:myEvent
    });

    popover.onDidDismiss(popOverData => {
      this.mainPopOver = null;
      if (!popOverData) {
        return;
      }

      let req: EmailPredictionRequest = new EmailPredictionRequest();
      //req.setHId = popOverData.item.getHId;
      req.setUserId = popOverData.item.getHUserId;
      //req.setStatementDate = "0918";

      this.callEmailStatementApi(req);

    });
  }

  callEmailStatementApi(req: EmailPredictionRequest) {

    //req.setUserId = requestData.getRQUSERID.toString().trim();
    //req.setHId = requestData.getRQHID.toString().trim();

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(BalanceStatementPage,null,strings.no_internet_connection,null);
      return;
    }

    this.initiateLoder();
    this.loader.present();
    this.api.emailSendStatement(req).subscribe(response => {
      this.loader.dismiss();

      let fObj: HCOMResponse = new HCOMResponse(JSON.stringify(response));

      if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if (fObj && fObj.getStatus === 'Success') {
        if (fObj.getData) {

          //alert(fObj.getMessage);
          this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, fObj.getMessage, null);

        } else {
          //show no list found
          if (fObj.getMessage) {
            //alert(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, JSON.stringify(fObj.getMessage), null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }
      } else {

        if (fObj && fObj.getMessage) {
          //alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, JSON.stringify(fObj.getMessage), null);
          //this.presentToast(JSON.stringify(fObj.getMessage));
        }
      }

    }, error => {
      this.loader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.server_error, null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(BalanceStatementPage,null,error.toString(), null);
      }
    }, () => {
      //this.loader.dismiss();
      // No errors, route to new page
    });

  }

  // showStatmentCalendarList(type: number) {
  //   let popover: any;
  //   if (type == Constants.CALENDAR_DATE) {
  //     popover = this.popOverController.create(PopoverComponent, { type: Constants.POPOVER_DATE, data: this.statementCalendar.dates });
  //     this.mainPopOver = popover;
  //     popover.present({
  //       //ev:myEvent
  //     });


  //   } else if (type == Constants.CALENDAR_MONTH) {
  //     let monthNames: string[] = [];
  //     if (this.statementCalendar.selectedYear
  //       && Number(this.statementCalendar.getSelectedYear) == this.statementCalendar.currentYear) {
  //       for (let i = 0; i < this.statementCalendar.monthNames.length; i++) {
  //         if (i < this.statementCalendar.currentMonth) {
  //           monthNames.push(this.statementCalendar.monthNames[i])
  //         }

  //       }
  //     } else {
  //       monthNames = this.statementCalendar.monthNames;
  //     }
  //     popover = this.popOverController.create(PopoverComponent, { type: Constants.POPOVER_MONTH, data: monthNames });
  //     this.mainPopOver = popover;
  //     popover.present({
  //       // ev:myEvent
  //     });
  //   } else if (type == Constants.CALENDAR_YEAR) {
  //     popover = this.popOverController.create(PopoverComponent, { type: Constants.POPOVER_YEAR, data: this.statementCalendar.year });
  //     this.mainPopOver = popover;
  //     popover.present({
  //       //ev:myEvent
  //     });
  //   }


  //   popover.onDidDismiss(popOverData => {
  //     this.mainPopOver = null;
  //     if (!popOverData) {
  //       return;
  //     }

  //     if (type == Constants.CALENDAR_DATE) {
  //       //this.ownerDOBCalendar.setSelectedDate = popOverData.item;
  //     } else if (type == Constants.CALENDAR_MONTH) {
  //       //get month nummber from name
  //       this.statementCalendar.setSelectedMonth = this.statementCalendar.getMonthNumberFromName(popOverData.item);
  //       //this.ownerDOBCalendar.setSelectedMonth=popOverData.item;

  //     } else if (type == Constants.CALENDAR_YEAR) {
  //       this.statementCalendar.setSelectedYear = popOverData.item;

  //       if (this.statementCalendar.getSelectedMonth) {

  //         if (Number(this.statementCalendar.getSelectedYear) == this.statementCalendar.currentYear) {
  //           if (Number(this.statementCalendar.getSelectedMonth) > this.statementCalendar.currentMonth) {
  //             this.statementCalendar.setSelectedMonth = null
  //           } else if (Number(this.statementCalendar.getSelectedMonth) == this.statementCalendar.currentMonth) {
  //             if (this.statementCalendar.getSelectedDate
  //               && (Number(this.statementCalendar.getSelectedDate) >= this.statementCalendar.currentDate)) {
  //               this.statementCalendar.setSelectedDate = null
  //             }
  //           }
  //         }
  //         else if (this.statementCalendar.getSelectedMonth == "2") {
  //           if (this.statementCalendar.getSelectedDate) {
  //             if (this.statementCalendar.getSelectedYear
  //               && this.statementCalendar.isLeapYear(Number(this.statementCalendar.getSelectedYear))) {
  //               if (Number(this.statementCalendar.getSelectedDate) > 29) {
  //                 this.statementCalendar.setSelectedDate = null//"29";
  //               }
  //             }
  //             else if (Number(this.statementCalendar.getSelectedDate) > 28) {
  //               this.statementCalendar.setSelectedDate = null//"28";
  //             }
  //           }
  //         } else if (this.statementCalendar.getSelectedMonth == "4"
  //           || this.statementCalendar.getSelectedMonth == "6"
  //           || this.statementCalendar.getSelectedMonth == "9"
  //           || this.statementCalendar.getSelectedMonth == "11") {
  //           if (this.statementCalendar.getSelectedDate && Number(this.statementCalendar.getSelectedDate) > 30) {
  //             this.statementCalendar.setSelectedDate = null//"30";
  //           }
  //         }
  //       }
  //     }

  //     console.log("Month:" + this.statementCalendar.getSelectedMonth + " Year:" + this.statementCalendar.getSelectedYear);
  //   });
  // }

  // statementDialog(type: number) {
  //   this.dialogType = type;
  //   if (this.showStatementDialog) {
  //     this.showStatementDialog = false;
  //   } else {
  //     this.showStatementDialog = true;
  //   }
  //   //this.presentPrompt();

  //   //const myModal = this.modal.create(ModalDatePage);
  //   //myModal.present();

  // }

  validate(): boolean {

    let valid = true;
    if (!this.statementCalendar.getSelectedMonth) {
      valid = false;
      this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.please_select_month, null);
    }
    else if (!this.statementCalendar.getSelectedYear) {
      this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.please_select_year, null);
      valid = false;
    }

    return valid;

  }

  public getDefaultCurrencySign(): string {
    if(this.userData && this.userData.getUcurrency === Constants.USD){
        return Constants.CURRENCY_USD;
      }else{
        return Constants.CURRENCY_INR
      }
  } 

  presentPrompt() {
    let alert = this.alertCtrl.create({
      //title: 'Login',
      

      inputs: [
        {
          name: 'Month',
          placeholder: 'Month',
          disabled:true
        },
        {
          name: 'Year',
          placeholder: 'Year',
          disabled: true
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            // if (User.isValid(data.username, data.password)) {
            //   // logged in!
            // } else {
            //   // invalid login
            //   return false;
            // }
          }
        }
      ]
    });
    alert.present();
  }


  selectDates(myEvent,dialogType){
    //this.createCountryData2();
    this.dialogType = dialogType;
      // let popover = this.popOverController.create(DatePopoverComponent,{type:Constants.POPOVER_COUNTRY,data:this.countryList});
      let popover = this.popOverController.create(DatePopoverComponent,{ data: this.statementCalendar});
      this.mainPopOver = popover;
      popover.present({
        ev:myEvent
      });   

      popover.onDidDismiss(popOverData=>{
        this.mainPopOver = null;
        if(!popOverData){
          return;
        }


        this.statementCalendar = <MyCalendar>popOverData;

        this.sendStatement();
       

      });
   
    }

    // ionViewDidLeave(){
    //   this.alertProvider.dismiss();
    // }

    ionViewWillEnter(){
      this.alertProvider.setCurrentPage(BalanceStatementPage);
    }


    addbalance(){
      console.log ('payment method is', this.payment_method);
      if(this.payment_method == 'razor'){
        console.log('razorpay entered', 'the amount is ', this.topup_amount);
        var options = {
          description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: 'rzp_test_TSJJaKeLn2yYBz',
          amount: this.topup_amount.toString()+'00',
          name: 'foo',
          theme: {
            color: '#F37254'
          }
        }
        
        var successCallback = function(success) {
          console.log('Success callback', success);
          // alert('payment_id: ' + success.razorpay_payment_id);
          var orderId = success.razorpay_order_id
          var signature = success.razorpay_signature
          if(success.razorpay_payment_id){
            swal({
              title: "Payment Success",
              text: "Your payment is successfully paid",
              icon: "success",
            })
            .then(() => {
              this.ionViewDidEnter();
            });
          }
        }
        
        var cancelCallback = function(error) {
          alert(error.description + ' (Error '+error.code+')')
        }
        
        RazorpayCheckout.on('payment.success', successCallback)
        RazorpayCheckout.on('payment.cancel', cancelCallback)
        RazorpayCheckout.open(options)
      }else if(this.payment_method = 'paypal'){
        console.log('this is for paypal payment medhod');
        let payInfo = {
          amount: this.topup_amount,
        } 
       //  this.paywithpayPal();
        this.navCtrl.push(PaypalPaymentPage, {'paypalPayinfo': payInfo}); 
      }
    }
  

}
