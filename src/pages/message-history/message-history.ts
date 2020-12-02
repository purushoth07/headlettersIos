import { Component } from '@angular/core';
import {LoadingController} from 'ionic-angular';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { NetworkProvider } from '../../providers/network/network';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the MessageHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-message-history',
  templateUrl: 'message-history.html',
})
export class MessageHistoryPage {

  historyList:string[] = [];
  loader:any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public translate:TranslateService,
    public networkProvider:NetworkProvider,
    public alertProvider:AlertProvider) {
  
      this.alertProvider.setCurrentPage(MessageHistoryPage);
      this.initiateLoder();
    }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad MessagesPage');
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
      this.historyList = this.navParams.get('data');
    }
  }

  onBackPressed(){
    this.navCtrl.pop();
  }

  onHomePressed(){
    // this.navCtrl.push(DashboardPage, {
       
    // });
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  ionViewWillEnter(){
    this.alertProvider.setCurrentPage(MessageHistoryPage);
  }

}
