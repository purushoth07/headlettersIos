import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { IonicPage, NavParams, PopoverController } from 'ionic-angular';

import { Platform, ActionSheetController } from 'ionic-angular';
import { LoginResponseData } from '../../api/response/login_response_data';
import { Storage } from '@ionic/storage';
import * as Constants from '../../utils/constants';
import * as strings from '../../utils/strings';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ApiProvider } from '../../providers/api/api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PopoverComponent } from '../../components/popover/popover';
import { ProfilePage } from '../profile/profile';
import { UserData } from '../../models/user_data';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { PaymentRecordResponse } from '../../api/response/payment_record_response';
import { PaymentRecordResponseData } from '../../api/response/payment_record_response_data';
import { DashboardPage } from '../dashboard/dashboard';
import { PaymentRecordPrimary } from '../../api/response/payment_record_primary';
import { NetworkProvider } from '../../providers/network/network';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { SocialLoginPage } from '../social-login/social-login';
import { UtilityProvider } from '../../providers/utility/utility';


/**
 * Generated class for the PaymentRecordListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment-record-list',
  templateUrl: 'payment-record-list.html',
})
export class PaymentRecordListPage {

  browserTitle = strings.invoice;
  userData:any;
  paymentRecordList:PaymentRecordPrimary[] = [];
  themeableBrowserOptions:ThemeableBrowserOptions = {
    statusbar: {
      color: '#f46100'
    },
    toolbar: {
      height: 44,
      color: '#f46100'
    },
    title: {
      color: '#ffffff',
      showPageTitle: true,
      staticText:this.browserTitle
    },
    // backButton: {
    //   wwwImage: 'assets/icon/back_arrow.png',
    //   wwwImagePressed: 'asset/icon/back_arrow.png',
    //   wwwImageDensity: 1,
    //   // image: 'back',
    //   // imagePressed: 'back_pressed',
    //   align: 'left',
    //   event: 'backPressed'
    // },
    // forwardButton: {
    //   image: 'forward',
    //   imagePressed: 'forward_pressed',
    //   align: 'left',
    //   event: 'forwardPressed'
    // },
    closeButton: {
      wwwImage: 'assets/icon/back_arrow.png',
        wwwImagePressed: 'asset/icon/back_arrow.png',
      // image: 'close',
      // imagePressed: 'close_pressed',
      align: 'left',
      event: 'closePressed'
    },
    // customButtons: [
    //   {
    //     image: 'share',
    //     imagePressed: 'share_pressed',
    //     align: 'right',
    //     event: 'sharePressed'
    //   }
    // ],
    // menu: {
    //   image: 'menu',
    //   imagePressed: 'menu_pressed',
    //   title: 'Test',
    //   cancel: 'Cancel',
    //   align: 'right',
    //   items: [
    //     {
    //       event: 'helloPressed',
    //       label: 'Hello World!'
    //     },
    //     {
    //       event: 'testPressed',
    //       label: 'Test!'
    //     }
    //   ]
    // },
    backButtonCanClose: true
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public session:Storage,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    public api:ApiProvider,
    private platform:Platform,
    public alertProvider:AlertProvider,
    public translate:TranslateService,
    public utility:UtilityProvider,
    public networkProvider:NetworkProvider,
    public themeableBrowser: ThemeableBrowser) {

      this.alertProvider.setCurrentPage(PaymentRecordListPage);
      //translate.use('hi');

      //this.sampleListData();
      

      this.translate.get(this.browserTitle).subscribe(
        value => {
          // value is our translated string
          this.browserTitle = value;
        }
      )
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad PaymentRecordListPage');
    this.getNavParamData();
  }

  getNavParamData(){
    if(this.navParams.get('data')){
      this.userData = this.navParams.get('data');
      if(this.userData && this.userData.getUserId){
        this.callPaymentRecordApi(this.userData.getUserId);
      }
    }else{
      this.session.get(Constants.USER_DATA).then(val=>{
          this.userData  = new LoginResponseData(JSON.stringify(val));
          if(this.userData && this.userData.getUserId){
            this.callPaymentRecordApi(this.userData.getUserId);
          }
      });
    }
  }

  sampleListData(){
  let data = {
      "Status": "Success",
      "Message": "Horoscope Listing",
      "Data": {
          "PrimaryList":[
            {
                "UID": "meme@gmail.com                ",
                "HID": "17                            ",
                "PAYMENTREQUEST": "",
                "INVOICE": "1",
                "INVOICEDATE": "1990-04-12T12:12:12",
                "PAYMENTLINKREFNUMBER": "https://www.sandbox.paypal.com/invoice/payerView/details/INV2-2E5G-J8Y7-FQWG-HLM6",
                "TOTALINVOICEAMOUNT": 50,
                "PPREFNUMBER": "458FA",
                "CURRENCY": "USD",
                "PAIDDATE": "1990-04-12T12:12:12",
                "PAIDAMOUNT": 20,
                "PAIDSTATUS": "Y"
            },
            {
              "UID": "meme@gmail.com                ",
              "HID": "17                            ",
              "PAYMENTREQUEST": "",
              "INVOICE": "2",
              "INVOICEDATE": "1990-04-12T00:12:12",
              "PAYMENTLINKREFNUMBER": "https://www.sandbox.paypal.com/invoice/payerView/details/INV2-2E5G-J8Y7-FQWG-HLM6",
              "TOTALINVOICEAMOUNT": "500",
              "PPREFNUMBER": "4585FA",
              "CURRENCY": "INR",
              "PAIDDATE": "1990-04-12T00:12:12",
              "PAIDAMOUNT": "200        ",
              "PAIDSTATUS": "N"
            },
            {
              "UID": "meme@gmail.com                ",
              "HID": "17                            ",
              "PAYMENTREQUEST": "",
              "INVOICE": "3",
              "INVOICEDATE": "1990-04-12T00:12:12",
              "PAYMENTLINKREFNUMBER": "https://www.sandbox.paypal.com/invoice/payerView/details/INV2-2E5G-J8Y7-FQWG-HLM6",
              "TOTALINVOICEAMOUNT": "505",
              "PPREFNUMBER": "88458FA",
              "CURRENCY": "USD",
              "PAIDDATE": "1990-04-12T00:12:12",
              "PAIDAMOUNT": "120        ",
              "PAIDSTATUS": "C"
            }
            
        ],
          "SecondaryList":[
            {
                "UID": "meme@gmail.com                ",
                "HID": "17                            ",
                "PAYMENTREQUEST": "",
                "INVOICE": "1",
                "INVOICEDATE": "1990-04-12T00:12:12",
                "PAYMENTLINKREFNUMBER": "https://www.sandbox.paypal.com/invoice/payerView/details/INV2-2E5G-J8Y7-FQWG-HLM6",
                "TOTALINVOICEAMOUNT": "50",
                "PPREFNUMBER": "458FA",
                "CURRENCY": "USD",
                "PAIDDATE": "1990-04-12T00:12:12",
                "PAIDAMOUNT": "20        ",
                "PAIDSTATUS": "Y",
                "TYPE":"1"
                
            },
            {
                "UID": "meme@gmail.com                ",
                "HID": "17                            ",
                "PAYMENTREQUEST": "",
                "INVOICE": "1",
                "INVOICEDATE": "1990-04-12T00:12:12",
                "PAYMENTLINKREFNUMBER": "https://www.sandbox.paypal.com/invoice/payerView/details/INV2-2E5G-J8Y7-FQWG-HLM6",
                "TOTALINVOICEAMOUNT": "50",
                "PPREFNUMBER": "458FA",
                "CURRENCY": "USD",
                "PAIDDATE": "1990-04-12T00:12:12",
                "PAIDAMOUNT": "20        ",
                "PAIDSTATUS": "Y",
                "TYPE":"2"
                
            },
            {
              "UID": "meme@gmail.com                ",
              "HID": "17                            ",
              "PAYMENTREQUEST": "",
              "INVOICE": "1",
              "INVOICEDATE": "1990-04-12T00:12:12",
              "PAYMENTLINKREFNUMBER": "https://www.sandbox.paypal.com/invoice/payerView/details/INV2-2E5G-J8Y7-FQWG-HLM6",
              "TOTALINVOICEAMOUNT": "50",
              "PPREFNUMBER": "458FA",
              "CURRENCY": "USD",
              "PAIDDATE": "1990-04-12T00:12:12",
              "PAIDAMOUNT": "20        ",
              "PAIDSTATUS": "Y",
              "TYPE":"3"
          },
            {
              "UID": "meme@gmail.com                ",
              "HID": "17                            ",
              "PAYMENTREQUEST": "",
              "INVOICE": "2",
              "INVOICEDATE": "1990-04-12T00:12:12",
              "PAYMENTLINKREFNUMBER": "https://www.sandbox.paypal.com/invoice/payerView/details/INV2-2E5G-J8Y7-FQWG-HLM6",
              "TOTALINVOICEAMOUNT": "500",
              "PPREFNUMBER": "4585FA",
              "CURRENCY": "INR",
              "PAIDDATE": "1990-04-12T00:12:12",
              "PAIDAMOUNT": "200        ",
              "PAIDSTATUS": "N",
              "TYPE":"1"
            },
            {
              "UID": "meme@gmail.com                ",
              "HID": "17                            ",
              "PAYMENTREQUEST": "",
              "INVOICE": "2",
              "INVOICEDATE": "1990-04-12T00:12:12",
              "PAYMENTLINKREFNUMBER": "1485654",
              "TOTALINVOICEAMOUNT": "500",
              "PPREFNUMBER": "4585FA",
              "CURRENCY": "INR",
              "PAIDDATE": "1990-04-12T00:12:12",
              "PAIDAMOUNT": "200        ",
              "PAIDSTATUS": "N",
              "TYPE":"2"
            },
            {
              "UID": "meme@gmail.com                ",
              "HID": "17                            ",
              "PAYMENTREQUEST": "",
              "INVOICE": "2",
              "INVOICEDATE": "1990-04-12T00:12:12",
              "PAYMENTLINKREFNUMBER": "1485654",
              "TOTALINVOICEAMOUNT": "500",
              "PPREFNUMBER": "4585FA",
              "CURRENCY": "INR",
              "PAIDDATE": "1990-04-12T00:12:12",
              "PAIDAMOUNT": "200        ",
              "PAIDSTATUS": "N",
              "TYPE":"3"
            },
            {
              "UID": "meme@gmail.com                ",
              "HID": "17                            ",
              "PAYMENTREQUEST": "",
              "INVOICE": "3",
              "INVOICEDATE": "1990-04-12T00:12:12",
              "PAYMENTLINKREFNUMBER": "1485654",
              "TOTALINVOICEAMOUNT": "505",
              "PPREFNUMBER": "88458FA",
              "CURRENCY": "USD",
              "PAIDDATE": "1990-04-12T00:12:12",
              "PAIDAMOUNT": "120        ",
              "PAIDSTATUS": "C",
              "TYPE":"1"
            },{
              "UID": "meme@gmail.com                ",
              "HID": "17                            ",
              "PAYMENTREQUEST": "",
              "INVOICE": "3",
              "INVOICEDATE": "1990-04-12T00:12:12",
              "PAYMENTLINKREFNUMBER": "1485654",
              "TOTALINVOICEAMOUNT": "505",
              "PPREFNUMBER": "88458FA",
              "CURRENCY": "USD",
              "PAIDDATE": "1990-04-12T00:12:12",
              "PAIDAMOUNT": "120        ",
              "PAIDSTATUS": "C",
              "TYPE":"2"
            },
            {
              "UID": "meme@gmail.com                ",
              "HID": "17                            ",
              "PAYMENTREQUEST": "",
              "INVOICE": "3",
              "INVOICEDATE": "1990-04-12T00:12:12",
              "PAYMENTLINKREFNUMBER": "1485654",
              "TOTALINVOICEAMOUNT": "505",
              "PPREFNUMBER": "88458FA",
              "CURRENCY": "USD",
              "PAIDDATE": "1990-04-12T00:12:12",
              "PAIDAMOUNT": "120        ",
              "PAIDSTATUS": "C",
              "TYPE":"3"
            }
        ]
        },
      "ErrorMessage": null
    }

    

    let h : PaymentRecordResponse = new PaymentRecordResponse(JSON.stringify(data));
   
    //console.log("DATA3:"+JSON.stringify(h.getData.getPrimaryList));

    for(let item of h.getData.getPrimaryList){
      for(let secItem of h.getData.getSecondaryList){
        if(item.getINVOICE === secItem.getINVOICE){
            switch(secItem.getTYPE){
              case Constants.AMOUNT_TYPE.TOP_UP:
                  item.setTopUp = secItem.getTOTALINVOICEAMOUNT
              break;
              case Constants.AMOUNT_TYPE.TAXES:
                  item.setTaxes = secItem.getTOTALINVOICEAMOUNT
              break;
              case Constants.AMOUNT_TYPE.SERVICE_CHARGE:
                  item.setServiceCharge = secItem.getTOTALINVOICEAMOUNT
              break;

            }
        }
      }
    }

    this.paymentRecordList = h.getData.getPrimaryList;

  }

  onHomePressed(){
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  onBackPressed(){
    this.navCtrl.pop();
  }

  expand(item:PaymentRecordResponseData){
      if(item.isCollapsed){
        item.isCollapsed = false;
      }else{
        item.isCollapsed = true;
      }
      
  }


  callPaymentRecordApi(userId:string){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(PaymentRecordListPage,null,strings.no_internet_connection,null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });

    localLoader.present();
      this.api.getPaymentRecords(userId.toString().trim()).subscribe(response => {
        localLoader.dismiss();
 
       //alert("RES:" + JSON.stringify(response));
        //let d = JSON.stringify(response);
        let fObj: PaymentRecordResponse = new PaymentRecordResponse(JSON.stringify(response));
        
        if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
          this.alertProvider.basicAlertOnPage(PaymentRecordListPage,null, strings.session_expired, null);
          this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
          return;
        }
        
        if(fObj && fObj.getStatus === 'Success'){
          if(fObj.getData.getPrimaryList){
            if(fObj.getData.getPrimaryList.length >0
              && fObj.getData.getSecondaryList 
              && fObj.getData.getSecondaryList.length >0
              ){
              for(let item of fObj.getData.getPrimaryList){
                for(let secItem of fObj.getData.getSecondaryList){
                  if(item.getINVOICE === secItem.getINVOICE){
                      switch(secItem.getTYPE){
                        case Constants.AMOUNT_TYPE.TOP_UP:
                            item.setTopUp = secItem.getTOTALINVOICEAMOUNT
                        break;
                        case Constants.AMOUNT_TYPE.TAXES:
                            item.setTaxes = secItem.getTOTALINVOICEAMOUNT
                        break;
                        case Constants.AMOUNT_TYPE.SERVICE_CHARGE:
                            item.setServiceCharge = secItem.getTOTALINVOICEAMOUNT
                        break;
          
                      }
                  }
                }
              }
            }

            this.paymentRecordList = fObj.getData.getPrimaryList;
          }
        }else{
        
          if(fObj && fObj.getMessage){
            //alert(JSON.stringify(fObj.getMessage));
            //this.presentToast(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(PaymentRecordListPage,null,JSON.stringify(fObj.getMessage),null);
          }
        }
        
      },error => {
        localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(PaymentRecordListPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(PaymentRecordListPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(PaymentRecordListPage,null,error.toString(), null);
        }
      },() => {
        //localLoader.dismiss();
        // No errors, route to new page
      });
    }

    openPaymentLink(item:PaymentRecordPrimary){
        if(item && item.getPAYMENTLINKREFNUMBER && item.getPAYMENTLINKREFNUMBER != null && item.getPAYMENTLINKREFNUMBER != 'null'){
          if (this.platform.is('cordova')) {
            const browser: ThemeableBrowserObject = this.themeableBrowser.create(item.getPAYMENTLINKREFNUMBER.toString().trim(), '_blank', this.themeableBrowserOptions);
          }else{
            window.open(item.getPAYMENTLINKREFNUMBER.toString().trim());
          }
        }else{
          this.alertProvider.basicAlertOnPage(PaymentRecordListPage,null,strings.invoice_link_not_available,null);
        }
    }

    ionViewDidLeave(){
      // this.alertProvider.dismiss();
    }

    ionViewWillEnter(){
      this.alertProvider.setCurrentPage(PaymentRecordListPage);
    }

}
