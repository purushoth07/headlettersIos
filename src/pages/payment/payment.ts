import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
import {LoadingController} from 'ionic-angular';
import { HoroscopeListResponse } from '../../api/response/horoscope_list_response';
import { HoroscopeResponseData } from '../../api/response/horoscope_response_data';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from '../../components/popover/popover';
import { StatementResponse } from '../../api/response/statement_response';
import { StatementData } from '../../api/response/statement_data';
import { Storage } from '@ionic/storage';
import { LoginResponseData } from '../../api/response/login_response_data';
import { BalanceStatementPage } from '../balance-statement/balance-statement';
import { DashboardPage } from '../dashboard/dashboard';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { PayPage } from '../pay/pay';
import { PaymentRecordListPage } from '../payment-record-list/payment-record-list';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  userData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public session:Storage,
    public translate:TranslateService,
    public platform:Platform,
    private alertProvider:AlertProvider) {
      this.alertProvider.setCurrentPage(PaymentPage);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PaymentPage');
  }

  getNavParamData(){
    if(this.navParams.get('data')){
      this.userData = this.navParams.get('data');
    }else{
      this.session.get(Constants.USER_DATA).then(val=>{
          this.userData  = new LoginResponseData(JSON.stringify(val));
      });
    }
  }

  goToBalance(){
    this.navCtrl.push(BalanceStatementPage, {
      data:this.userData
    });
  }

  goToPay(){
    this.navCtrl.push(PayPage, {
      data:this.userData
    });
  }

  goToPaymentRecord(){
    this.navCtrl.push(PaymentRecordListPage, {
      data:this.userData
    });
  }

  onBackPressed(){
    this.navCtrl.pop();
  }

  onHomePressed(){
    // this.navCtrl.push(DashboardPage, {
    //   //data:this.userData
    // });
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  ionViewWillEnter(){
    this.alertProvider.setCurrentPage(PaymentPage);
  }

  ionViewDidEnter(){
    //console.log('ionViewDidEnter PaymentPage');
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

}
