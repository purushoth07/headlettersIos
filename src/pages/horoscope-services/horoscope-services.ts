import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, Platform, ViewController } from 'ionic-angular';
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
import { PromisesPage } from '../promises/promises';
import { AddHoroscopePage } from '../add-horoscope/add-horoscope';
import { LoginResponseData } from '../../api/response/login_response_data';
import { LoginResponse } from '../../api/response/login_response';
import { DashboardPage } from '../dashboard/dashboard';
import { MyCalendar } from '../../utils/calendar';
import { MyTime } from '../../utils/mytime';
import { WeeklyRequestPage } from '../weekly-request/weekly-request';
import { DailyRequestPage } from '../daily-request/daily-request';
import { SpecialRequestPage } from '../special-request/special-request';
import { Storage } from '@ionic/storage';
import { FileTransferObject, FileTransfer } from '../../../node_modules/@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { EmailPredictionRequest } from '../../api/request/email_prediction_request';
import { HCOMResponse } from '../../api/response/hcom_response';
import { InAppBrowser } from '../../../node_modules/@ionic-native/in-app-browser';
import { Cordova } from '../../../node_modules/@ionic-native/core';
import { AlertProvider } from '../../providers/alert/alert';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { AddHoroscopeProfilePage } from '../add-horoscope-profile/add-horoscope-profile';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { NetworkProvider } from '../../providers/network/network';
import { AddHoroscopeImagePage } from '../add-horoscope-image/add-horoscope-image';
import { TransitCommentPage } from '../transit-comment/transit-comment';
import { UtilityProvider } from '../../providers/utility/utility';
import { SocialLoginPage } from '../social-login/social-login';
import { TermsConditionUpdatePage } from '../terms-condition-update/terms-condition-update';

/**
 * Generated class for the HoroscopeServicesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-horoscope-services',
  templateUrl: 'horoscope-services.html',
})
export class HoroscopeServicesPage {

  userData: LoginResponseData = new LoginResponseData();
  loader: any;
  horoscopeList: HoroscopeResponseData[] = [];
  showNoData: boolean = false;
  descending: boolean = false;
  order: number;
  noDataHtml: any;
  mainPopOver: any;
  nodataLength: any;

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
      staticText:"Chart"
    },
    backButton: {
      wwwImage: 'assets/icon/back_arrow.png',
      wwwImagePressed: 'asset/icon/back_arrow.png',
      wwwImageDensity: 1,
      // image: 'back',
      // imagePressed: 'back_pressed',
      align: 'left',
      event: 'backPressed'
    },
    // forwardButton: {
    //   image: 'forward',
    //   imagePressed: 'forward_pressed',
    //   align: 'left',
    //   event: 'forwardPressed'
    // },
    closeButton: {
      wwwImage: 'assets/icon/close_icon.png',
        wwwImagePressed: 'asset/icon/close_icon.png',
      // image: 'close',
      // imagePressed: 'close_pressed',
      align: 'right',
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
    backButtonCanClose: true,
    clearcache: true
  };

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
    public session: Storage,
    public transfer: FileTransfer,
    public file: File,
    public inAppBrowser: InAppBrowser,
    public viewCtrl:ViewController,
    public alertProvider: AlertProvider,
    public translate: TranslateService,
    public themeableBrowser: ThemeableBrowser,
    public networkProvider:NetworkProvider,
    public utility:UtilityProvider) {
    this.alertProvider.setCurrentPage(HoroscopeServicesPage);
    // alertProvider.setCurrentPage(HoroscopeServicesPage);
    //translate.use('hi');
    //this.loadNoDataUrl(false);
    //this.sampleListData();
    console.log('where the nodata length is', this.nodataLength);

    this.translate.get(strings.chart).subscribe(
      value => {
        // value is our translated string
        this.themeableBrowserOptions.title.staticText = value;
      }
    )

  }

  /**
   * sorting horoscope list by name
   */
  sort() {
    // this.descending = !this.descending;
    this.descending = true;
    this.order = this.descending ? 1 : -1;
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad HoroscopeServicesPage');
    
    this.alertProvider.setCurrentPage(HoroscopeServicesPage);
    this.setHardwareBackButton();

    this.initiateLoder();
    this.sort();
    this.getNavParamData();
  }

  setHardwareBackButton(){
    this.platform.ready().then(() => {

      if (!this.platform.is('cordova')) {
        //this.isKeyboardOpen=true;
        return;
      }

      this.platform.registerBackButtonAction(() => {
        //alert("HORO");
        this.alertProvider.dismiss();
        if (this.mainPopOver) {
          this.mainPopOver.dismiss();
          this.mainPopOver = null;
          return;
        }
        this.onBackPressed();
      });

    });
  }
  

  initiateLoder() {
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
    });
  }


  getNavParamData() {
    if (this.navParams.get('data')) {
      this.userData = this.navParams.get('data');
      if (this.userData && this.userData.getUserId) {
        this.callHoroscopeListApi(this.userData.getUserId,true);
      }
    } else {
      this.session.get(Constants.USER_DATA).then(val => {
        this.userData = new LoginResponseData(JSON.stringify(val));
        if (this.userData && this.userData.getUserId) {
          this.callHoroscopeListApi(this.userData.getUserId,true);
        }
      });
    }
    //this.callHoroscopeListApi("enuke.software38@gmail.com",true);
  }

  onBackPressed() {
    //console.log("LEN:" + this.navCtrl.length());
    this.navCtrl.pop();
  }

  onHomePressed() {
    // this.navCtrl.push(DashboardPage, {
    //   //data:this.userData
    // });
    this.navCtrl.setRoot(DashboardPage)
    this.navCtrl.popToRoot;
  }

  sampleListData() {
    let data = {
      "Status": "Success",
      "Message": "Horoscope Listing",
      "Data": [
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "17                            ",
          "HNAME": "MEME Test",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "M",
          "HDOBNATIVE": "1990-04-12T00:12:12",
          "HHOURS": 1,
          "HMIN": 2,
          "HSS": 3,
          "HAMPM": "AM        ",
          "HPLACE": "Place",
          "HLANDMARK": "MARK",
          "HMARRIAGEDATE": null,
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
          "RECTIFIEDDATE": null,
          "RECTIFIEDTIME": null,
          "RECTIFIEDDST": null,
          "RECTIFIEDPLACE": null,
          "RECTIFIEDLONGTITUDE": null,
          "RECTIFIEDLONGTITUDEEW": null,
          "RECTIFIEDLATITUDE": null,
          "RECTIFIEDLATITUDENS": null,
          "HPDF": "http://49.50.103.132/templates/k5pibx6ONMsyKHoxfXH+UrYTLhI7aWSNbAeD/YJ1yhZIqM1l8xGzqM7MNo/qSN6T.html",
          "LASTREQUESTID": 0,
          "LASTMESSAGEID": 0,
          "LASTWPDATE": null,
          "LASTDPDATE": null,
          "HLOCKED": null,
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000032,
          "REPEATREQUEST": ""
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "18                            ",
          "HNAME": "test teste1",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "Male",
          "HDOBNATIVE": "1998-04-25T00:13:14",
          "HHOURS": 12,
          "HMIN": 13,
          "HSS": 14,
          "HAMPM": "AM        ",
          "HPLACE": "Delhi",
          "HLANDMARK": "Hospital",
          "HMARRIAGEDATE": null,
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
          "RECTIFIEDDATE": null,
          "RECTIFIEDTIME": null,
          "RECTIFIEDDST": null,
          "RECTIFIEDPLACE": null,
          "RECTIFIEDLONGTITUDE": null,
          "RECTIFIEDLONGTITUDEEW": null,
          "RECTIFIEDLATITUDE": null,
          "RECTIFIEDLATITUDENS": null,
          "HPDF": "http://49.50.103.132/templates/k5pibx6ONMsyKHoxfXH+UrYTLhI7aWSNbAeD/YJ1yhZIqM1l8xGzqM7MNo/qSN6T.html",
          "LASTREQUESTID": 0,
          "LASTMESSAGEID": 0,
          "LASTWPDATE": null,
          "LASTDPDATE": null,
          "HLOCKED": null,
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000049,
          "REPEATREQUEST": null
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "19                            ",
          "HNAME": "test teste2",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "Male",
          "HDOBNATIVE": "1998-04-25T00:13:14",
          "HHOURS": 12,
          "HMIN": 13,
          "HSS": 14,
          "HAMPM": "AM        ",
          "HPLACE": "Delhi",
          "HLANDMARK": "Hospital",
          "HMARRIAGEDATE": "2012-12-12T00:12:12",
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": "2012-12-12T00:00:00",
          "HMARRIAGEAMPM": "PM",
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000050,
          "REPEATREQUEST": "y"
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "20                            ",
          "HNAME": "test teste3",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "Male",
          "HDOBNATIVE": "1998-04-25T00:13:14",
          "HHOURS": 12,
          "HMIN": 13,
          "HSS": 14,
          "HAMPM": "AM        ",
          "HPLACE": "Delhi",
          "HLANDMARK": "Hospital",
          "HMARRIAGEDATE": null,
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000051,
          "REPEATREQUEST": "n"
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "21                            ",
          "HNAME": "test teste4",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "Male",
          "HDOBNATIVE": "1998-04-25T00:13:14",
          "HHOURS": 12,
          "HMIN": 13,
          "HSS": 14,
          "HAMPM": "AM        ",
          "HPLACE": "Delhi",
          "HLANDMARK": "Hospital",
          "HMARRIAGEDATE": null,
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000052,
          "REPEATREQUEST": "y"
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "22                            ",
          "HNAME": "new newdhdrhdfgdfghdfghfghjfghjdfjdfjdfgjfgjdfhjdfjfdjdfghjdfghjfdhy",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "Male",
          "HDOBNATIVE": "1998-04-05T00:13:14",
          "HHOURS": 12,
          "HMIN": 13,
          "HSS": 14,
          "HAMPM": "AM        ",
          "HPLACE": "Delhi",
          "HLANDMARK": "Hospital",
          "HMARRIAGEDATE": null,
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000053,
          "REPEATREQUEST": "n"
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "23                            ",
          "HNAME": "new new",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "Male",
          "HDOBNATIVE": "1998-04-05T00:00:00",
          "HHOURS": 12,
          "HMIN": 13,
          "HSS": 14,
          "HAMPM": "AM        ",
          "HPLACE": "Delhi",
          "HLANDMARK": "Hospital",
          "HMARRIAGEDATE": null,
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000054,
          "REPEATREQUEST": ""
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "24                            ",
          "HNAME": "new new",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "Male",
          "HDOBNATIVE": "1998-04-05T00:00:00",
          "HHOURS": 0,
          "HMIN": 0,
          "HSS": 0,
          "HAMPM": "AM        ",
          "HPLACE": "Delhi",
          "HLANDMARK": "Hospital",
          "HMARRIAGEDATE": null,
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000055,
          "REPEATREQUEST": null
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "28                            ",
          "HNAME": "new new",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "Male",
          "HDOBNATIVE": "1998-04-05T00:00:00",
          "HHOURS": 0,
          "HMIN": 0,
          "HSS": 0,
          "HAMPM": "AM        ",
          "HPLACE": "Delhi",
          "HLANDMARK": "Hospital",
          "HMARRIAGEDATE": null,
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000059
        },
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
          "HMARRIAGEPLACE": "London",
          "HMARRIAGETIME": "2012-05-24T02:47:07",
          "HMARRIAGEAMPM": "pm       ",
          "HFIRSTCHILDDATE": "2012-05-24T02:47:07",
          "HFIRSTCHILDPLACE": "xfcd",
          "HFIRSTCHILDTIME": "2012-05-24T02:47:07",
          "HFIRSTCHILDTIMEAMPM": "am       ",
          "HATDATE": "2012-05-24T02:47:07",
          "HATPLACE": "dfd",
          "HATTIME": "2012-05-24T02:47:07",
          "HATTAMPM": "am       ",
          "HAFLIGHTNO": "fdf",
          "HCRDATE": "2012-05-24T02:47:07",
          "HCRTIME": "2012-05-24T02:47:07",
          "HCRPLACE": "dfd",
          "HCRTAMPM": "pm     ",
          "HDRR": "dfsd",
          "HDRRD": "2012-05-24T02:47:07",
          "HDRRP": "fdd",
          "HDRRT": "2012-05-24T02:47:07",
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "2012-05-24T02:47:07",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000008
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000018
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "7                             ",
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
          "HMARRIAGEDATE": "1990-04-12T04:15:40",
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": "Am        ",
          "HFIRSTCHILDDATE": "1990-04-12T04:15:40",
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000022
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "8                             ",
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
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000023
        },
        {
          "HUSERID": "meme@gmail.com                ",
          "HID": "9                             ",
          "HNAME": "test",
          "HNATIVEPHOTO": null,
          "HHOROSCOPEPHOTO": null,
          "HGENDER": "M",
          "HDOBNATIVE": "1990-04-12T00:07:18",
          "HHOURS": 1,
          "HMIN": 2,
          "HSS": 3,
          "HAMPM": "PM        ",
          "HPLACE": "TEST",
          "HLANDMARK": "Hoapital",
          "HMARRIAGEDATE": null,
          "HMARRIAGEPLACE": null,
          "HMARRIAGETIME": null,
          "HMARRIAGEAMPM": null,
          "HFIRSTCHILDDATE": null,
          "HFIRSTCHILDPLACE": null,
          "HFIRSTCHILDTIME": null,
          "HFIRSTCHILDTIMEAMPM": null,
          "HATDATE": null,
          "HATPLACE": null,
          "HATTIME": null,
          "HATTAMPM": null,
          "HAFLIGHTNO": null,
          "HCRDATE": null,
          "HCRTIME": null,
          "HCRPLACE": null,
          "HCRTAMPM": null,
          "HDRR": null,
          "HDRRD": null,
          "HDRRP": null,
          "HDRRT": null,
          "HDRRTAMPM": null,
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
          "HSTATUS": "1",
          "HRECDELETED": "n",
          "HCREATIONDATE": "0001-01-01T00:00:00",
          "HRECDELETEDD": null,
          "HTOTALTRUE": 0,
          "HTOTALFALSE": 0,
          "HTOTALPARTIAL": 0,
          "HUNIQUE": 100000000024
        }
      ],
      "ErrorMessage": null
    }

    let h: HoroscopeListResponse = new HoroscopeListResponse(JSON.stringify(data));
    //this.showNoData = false;
    this.updateNoData(false);
    for (let item of h.getData) {
      if (!item.getHNativePhoto) {
        item.setHNativePhoto = "assets/icon/profile-pic.svg";
      }
    }
    this.horoscopeList = h.getData;


    // for(let i = 0;i<10;i++){
    //   let data = new HoroscopeResponseData();
    //   data.setHUserId = 'meme@gmail.com';
    //   data.setHId = '1';
    //   data.setHName = 'MEME ';
    //   data.setHGender = 'M';
    //   data.setHDobNative = "1990-04-12T00:12:12";
    //   data.setHHours = 9;
    //   data.setHMin = 10;
    //   data.setHSs = 10;
    //   data.setHAmpm = 'AM';
    //   data.setHPlace = 'Place';
    //   data.setHLandmark = "Hospital";
    //   data.setHMarriageDate = ""
    //   data.setHMarriagePlace = ''; 
    //   data.setHNativePhoto = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg';
    //   data.setHMarriageTime = '2018-07-28T11:29:49.9404154+05:30';
    //   data.setHMarriageAmpm = 'PM';
    //   data.setHFirstChildDate = '2018-07-28T11:29:49.9404154+05:30';
    //   data.setHFirstChildPlace = 'Delhi';
    //   data.setHFirstChildTime = '2018-07-28T11:29:49.9404154+05:30';
    //   data.setHFirstChildTimeAmpm = 'AM';
    //   data.setHAtDate = '2018-07-28T11:29:49.9560151+05:30';
    //   data.setHAtPlace = '';
    //   data.setHAtTime = '';
    //   data.setHAmpm = '';
    //   data.setHAFlightNo = '';
    //   data.setHCrDate = '';
    //   data.setHCrTime = '';
    //   data.setHCrTAmpm = '';
    //   data.setHCrPlace = '';
    //   data.setHDrr = '';
    //   data.setHDrrD = '';
    //   data.setHDrrT ='';
    //   data.setHDrrP = '';
    //   data.setHDrrTAmpm = '';
    //   data.setRectifieDdst = 87;
    //   data.setRectifiedDate = '';
    //   data.setRectifiedTime = '';
    //   data.setRectifiedPlace = '';
    //   data.setRectifiedLatitude = '';
    //   data.setRectifiedLatitudeNs = '';
    //   data.setRectifiedLongtitude = '';
    //   data.setRectifiedLongtitudeEw = '';
    //   data.setHPdf = '';
    //   data.setLastRequestId = 45;
    //   data.setLastmessageId = 3;
    //   data.setLastWpDate = '';
    //   data.setLastDpDate = '';
    //   data.setHLocked = '';
    //   data.setHRecDeleted = '';
    //   data.setHCreationDate = '';
    //   data.setHRecDeletedD = '';
    //   data.setHTotalTrue = 50;
    //   data.setHTotalFalse = 34;
    //   data.setHTotalPartial = 32;
    //   data.setHUnique = 3;
    //   data.setHStatus = '';

    //   this.showNoData = false;
    //   this.horoscopeList.push(data);
    // }

    // console.log(JSON.stringify(this.horoscopeList));
  }

  callHoroscopeListApi(userId: string,showLoading:boolean) {
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,strings.no_internet_connection,null);
      return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });

    if(showLoading){
      console.log("SHOW_LOADER");
      localLoader.present();

      setTimeout(() => {
        localLoader.dismiss();
      }, 5000);
    }
    //alert("REQ:" + userId);
    this.api.getHoroscopeList(userId.toString().trim()).subscribe(response => {
      //this.api.getHoroscopeList("enuke.software38@gmail.com").subscribe(response => {
      //this.loader.dismiss();
      // alert("REQ:" + userId);
      // alert("RES:" + JSON.stringify(response));
      //let d = JSON.stringify(response);
      let fObj: HoroscopeListResponse = new HoroscopeListResponse(JSON.stringify(response));
      //localLoader.dismiss();
      this.nodataLength = fObj.getData.length;
      if(fObj && fObj.getErrorMessage && fObj.getErrorMessage === Constants.UNAUTHORIZED){
        localLoader.dismiss();
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if (fObj && fObj.getStatus === 'Success') {
        
        //alert(JSON.stringify(fObj));
        if (fObj.getData && fObj.getData.length > 0) {
        
          //show listing
          //this.showNoData = false;
          //this.updateNoData(false);
          //this.loadNoDataUrl(localLoader);
          this.showNoData = false;
          setTimeout(() => {
            this.horoscopeList = fObj.getData;
          },200)
          localLoader.dismissAll();
          // this.hideLoader(localLoader);
          console.log("HIDE_LOADER");
          console.log("HoroscopeList:"+JSON.stringify(this.horoscopeList));

          // for(let item of fObj.getData){
          //   let o:HoroscopeResponseData=new HoroscopeResponseData(JSON.stringify(item));
          //   this.horoscopeList.push(o);
          // }

          for (let item of this.horoscopeList) {
            if (!item.getHNativePhoto) {
              //item.setHNativePhoto = Constants.COMMON_PROFILE_IMAGE;
            }
          }

        } else {
          localLoader.dismiss();
          this.loadNoDataUrl2();
          //show no list found
          //this.showNoData = true;
          //this.updateNoData(true);
        }
      } else {
        localLoader.dismiss();
        // this.updateNoData(true);
        if (fObj && fObj.getMessage) {
          //alert(JSON.stringify(fObj.getMessage));
          this.presentToast(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,fObj.getMessage, null);
        }
        this.loadNoDataUrl2();
      }

    }, error => {
      //this.updateNoData(true);
      localLoader.dismissAll();
       // alert("ERROR1:"+error);
       if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }


  addHoroscopeClick() {
    //this.updateNoData(true);
    this.session.get(Constants.USER_DATA).then(val => {
      this.userData = new LoginResponseData(JSON.stringify(val));
      this.navCtrl.push(AddHoroscopeImagePage, {
        type: Constants.ADD_HOROSCOPE,
        data: this.userData,
        callback: this.callback.bind(this)
      });
    });

  }



  promiseClick(horoscope: HoroscopeResponseData) {
    if (horoscope.getHStatus === '5') {
      this.navCtrl.push(PromisesPage, {
        data: horoscope
      });
    } else {
      //alert(strings.promise_yet_to_be_generated);
      this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.promise_yet_to_be_generated, null);
    }
  }

  requestClick(myEvent, horoscope: HoroscopeResponseData) {
    if(horoscope.getHStatus != '5'){
        //this.alertProvider.basicAlert
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.chart_is_not_rectified_yet, null);
        return;
    }
    let dailyData;
    //console.log("HORO:" + JSON.stringify(horoscope));
    if (horoscope.getREPEATREQUEST && horoscope.getREPEATREQUEST.toString().trim() === Constants.YES) {
      dailyData = strings.stop_repeat_daily_prediction;
    } else {
      dailyData = strings.daily_prediction;
    }

    // let items = [
    //   { item: strings.weekly_prediction },
    //   { item: dailyData },
    //   { item: strings.special_prediction }
    // ]

    let items = [
      { item: dailyData },
      { item: strings.weekly_prediction },
      { item: strings.special_prediction },
      { item: strings.jupiter },
      { item: strings.saturn },
      { item: strings.rahu },
      { item: strings.ketu },
      { item: strings.mars },
      { item: strings.sun },
      { item: strings.mercury }
    ]

    let popover = this.popOverController.create(PopoverComponent, { type: Constants.POPOVER_HOROSCOPE_MENU, data: items });
    this.mainPopOver = popover;
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popOverData => {
      this.mainPopOver = null;
      if (!popOverData) {
        return;
      }


      switch (popOverData.item) {
        case strings.weekly_prediction:
          this.navCtrl.push(WeeklyRequestPage, {
            data: horoscope,
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
        case strings.daily_prediction:
          this.navCtrl.push(DailyRequestPage, {
            data: horoscope,
            callback: this.callback.bind(this),
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
        case strings.stop_repeat_daily_prediction:
          this.alertStopDailyPrediction(horoscope);
          break;
        case strings.special_prediction:
          this.navCtrl.push(SpecialRequestPage, {
            data: horoscope,
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
        case strings.jupiter:
          this.navCtrl.push(TransitCommentPage, {
            data: horoscope,
            type:Constants.REQ_CAT_JU,
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
        case strings.saturn:
          this.navCtrl.push(TransitCommentPage, {
            data: horoscope,
            type:Constants.REQ_CAT_SA,
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
        case strings.rahu:
          this.navCtrl.push(TransitCommentPage, {
            data: horoscope,
            type:Constants.REQ_CAT_RA,
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
        case strings.ketu:
          this.navCtrl.push(TransitCommentPage, {
            data: horoscope,
            type:Constants.REQ_CAT_KE,
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
        case strings.mars:
          this.navCtrl.push(TransitCommentPage, {
            data: horoscope,
            type:Constants.REQ_CAT_MA,
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
        case strings.sun:
          this.navCtrl.push(TransitCommentPage, {
            data: horoscope,
            type:Constants.REQ_CAT_SU,
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
        case strings.mercury:
          this.navCtrl.push(TransitCommentPage, {
            data: horoscope,
            type:Constants.REQ_CAT_ME,
            charge:this.userData.getUcharge,
            currency:this.userData.getUcurrency
          });
          break;
      }

      //this.horoscopeData.setHGender = popOverData.item;


    });
  }

  async alertStopDailyPrediction(horoscope: HoroscopeResponseData) {
    let myTitle = strings.stop_repeat_title;
    let myMsg = strings.stop_repeat_daily_request_message;
    let cancel = strings.cancel;
    let ok = strings.ok;

    this.translate.get(strings.stop_repeat_title).subscribe(
      value => {
        // value is our translated string
        myTitle = value;
      }
    )

    this.translate.get(strings.stop_repeat_daily_request_message).subscribe(
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


    let alert = this.alertCtrl.create({
      title: myTitle,
      message: myMsg,
      buttons: [
        {
          text: cancel,
          //role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: ok,
          handler: () => {
            //console.log('Ok clicked');
            this.callCancelRepeatRequestApi(horoscope);
            //api will hit to change status of repeat request
            //horoscope.setREPEATREQUEST = "false";
          }
        }
      ]
    });
    alert.present();
  }

  moreMenu(myEvent, horoscope: HoroscopeResponseData) {
    console.log(myEvent, horoscope);
    this.showMenuOne(myEvent, horoscope);
  }

  showMenuOne(myEvent, horoscope: HoroscopeResponseData) {
    let items = [
      { item: strings.show_horoscope },
      { item: strings.edit_horoscope },
      { item: strings.email_horoscope },
      { item: strings.delete_horoscope }
    ]

    let popover = this.popOverController.create(PopoverComponent, { type: Constants.POPOVER_HOROSCOPE_MENU, data: items });
    this.mainPopOver = popover;
    popover.present({
      ev:myEvent
    });

    popover.onDidDismiss(popOverData => {
      this.mainPopOver = null;
      if (!popOverData) {
        return;
      }

      switch (popOverData.item) {
        case strings.show_horoscope:
          //this.loader.present();
          //this.download();
          if (!horoscope.getHPdf || horoscope.getHPdf.toString().length == 0 || horoscope.getHPdf.toString().trim() === 'undefined' || horoscope.getHPdf.toString().trim() === 'null') { 
            // alert(strings.chart_does_not_exist);
            //this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.chart_does_not_exist, null);
            this.callGetHoroscopeChartApi(horoscope);
            //return;
          }else{
            this.showHoroscopeClick(horoscope.getHPdf);
          }
          
          break;
        case strings.edit_horoscope:
          if (horoscope.getHStatus && horoscope.getHStatus.toString().trim() === "1") {
            this.navCtrl.push(AddHoroscopeImagePage, {
              type: Constants.UPDATE_HOROSCOPE,
              data: horoscope,
              callback: this.callback.bind(this)
            });
          } else {
            // alert(strings.you_can_not_edit_this_horoscope);
            this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.you_can_not_edit_this_horoscope, null);
          }

          break;
        case strings.email_horoscope:
          this.callEmailHoroPDFApi(horoscope);
          break;
        case strings.delete_horoscope:
          //this.loader.present();
          this.alertDeleteHoroscope(horoscope);
          //this.callDeleteHoroscopeApi('meme@gmail.com','2');
          break;
      }

      //this.horoscopeData.setHGender = popOverData.item;


    });
  }

  async alertDeleteHoroscope(horoscope: HoroscopeResponseData) {
    let myTitle = strings.delete_title;
    let myMsg = strings.delete_horoscope_message;
    let cancel = strings.cancel;
    let ok = strings.ok;

    this.translate.get(strings.delete_title).subscribe(
      value => {
        // value is our translated string
        myTitle = value;
      }
    )

    this.translate.get(strings.delete_horoscope_message).subscribe(
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

    let alert = this.alertCtrl.create({
      title: myTitle,
      message: myMsg,
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
            //console.log('Ok clicked');
            this.callDeleteHoroscopeApi(horoscope);
          }
        }
      ]
    });
    alert.present();
  }

  callDeleteHoroscopeApi(horoscope: HoroscopeResponseData) {
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,strings.no_internet_connection,null);
      return;
    }

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();

    this.api.deleteHoroscope(horoscope.getHUserId, horoscope.getHId).subscribe(response => {

      //alert(JSON.stringify(response));

      let data = new LoginResponse(JSON.stringify(response));

      if(data && data.getErrormessage && data.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if (data && data.getStatus === 'Success') {
        //remove deleted item from local list
        this.horoscopeList = this.horoscopeList.filter(item => item !== horoscope);
        localLoader.dismiss();
        //alert(data.getStatus);
        if (this.horoscopeList.length > 0) {
          //show listing
          //this.showNoData = false;
          // this.loadNoDataUrl(true);
          this.updateNoData(false);
        } else {
          //show no list found
          //this.showNoData = true;
          // this.loadNoDataUrl(true);
          this.updateNoData(true);
        }
      } else {
        localLoader.dismiss();
        if (data && data.getMessage) {
          this.presentToast(JSON.stringify(data.getMessage));
        }
        // this.loadNoDataUrl(true);
        this.updateNoData(true);
      }

    }, error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.server_error, null);
      // this.loadNoDataUrl(true);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // this.loadNoDataUrl(true);
      // No errors, route to new page
    });
  }

  /**
   * callback to check any data is updated on next screen to update list in this screen
   */
  callback = function (isChange) {
    return new Promise((resolve, reject) => {
      if (isChange) {
        if (this.userData && this.userData.getUserId) {
          this.callHoroscopeListApi(this.userData.getUserId,false);
        }
        //this.setHardwareBackButton();
        resolve();
      } else {
        //this.setHardwareBackButton();
        resolve();
      }
      //alert(this.test);

    });
  }

  // download(){
  //     this.loader.present();
  //     //alert('download start: ');
  //     const fileTransfer: FileTransferObject = this.transfer.create();
  //     const url = 'https://devdactic.com/html/5-simple-hacks-LBT.pdf';
  //     fileTransfer.download(url, this.file.externalDataDirectory +'horo.pdf').then((entry) => {
  //       //this.loader.dismiss();
  //       alert('PDF Downloaded' + entry.toURL());
  //     }, (error) => {
  //     // handle error
  //       //this.loader.dismiss();
  //       alert(JSON.stringify(error));
  //     });
  //   }

  download() {
    //alert("START");
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();
    //Check the Directory 
    this.file.checkDir(this.file.externalRootDirectory, 'HeadLetters')
      .then(_ => {
        //alert('Directory exists')
        //Download File
        this.downloadFile(localLoader);
      })
      .catch(err => {
        // alert('Directory doesn\'t exist');
        //Create Directory
        this.createDir(localLoader);
        //Download File
        //this.downloadFile();
      });
  }

  downloadFile(localLoader: any) {
    const url = 'https://devdactic.com/html/5-simple-hacks-LBT.pdf';
    const fileTransfer: FileTransferObject = this.transfer.create();
    let name;
    let time = new Date().getTime().toString();
    if (this.userData.getUserName) {
      name = this.userData.getUserName.toString().trim() + "_" + time + ".pdf";
    } else {
      name = this.userData.getUserId.toString().trim() + "_" + time + ".pdf";
    }

    fileTransfer.download(url, this.file.externalRootDirectory + '/HeadLetters/' + name).then((entry) => {
      //alert('Please check PDF in HeadLetters Directory');
      this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, 'Please check PDF in HeadLetters Directory', null);
      localLoader.dismiss();
    }, (error) => {
      localLoader.dismiss();
      //this.createDir();
      // handle error
      // alert(JSON.stringify(error));
    });
  }

  createDir(localLoader: any) {
    this.file.createDir(this.file.externalRootDirectory, 'HeadLetters', false)
      .then(_ => {
        //alert('Directory created')
        this.downloadFile(localLoader);
      })
      .catch(err => {
        localLoader.dismiss();
        //console.log('Failed to create Directory')
      });
  }

  callEmailHoroPDFApi(requestData: HoroscopeResponseData) {

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,strings.no_internet_connection,null);
      return;
    }

    let req: EmailPredictionRequest = new EmailPredictionRequest();
    req.setUserId = requestData.getHUserId.toString().trim();
    req.setHId = requestData.getHId.toString().trim();

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();
    this.api.emailHoroPDF(req).subscribe(response => {
      localLoader.dismiss();

      let fObj: HCOMResponse = new HCOMResponse(JSON.stringify(response));

      if(fObj && fObj.getErrormessage && fObj.getErrormessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if (fObj && fObj.getStatus === 'Success') {
        if (fObj.getData) {

          // alert(fObj.getMessage);
          this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, fObj.getMessage, null);

        } else {
          //show no list found
          if (fObj.getMessage) {
            //alert(JSON.stringify(fObj.getMessage));
            this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, JSON.stringify(fObj.getMessage), null);
            //this.presentToast(JSON.stringify(fObj.getMessage));
          }
        }
      } else {

        if (fObj && fObj.getMessage) {
          // alert(JSON.stringify(fObj.getMessage));
          this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, JSON.stringify(fObj.getMessage), null);
          //this.presentToast(JSON.stringify(fObj.getMessage));
        }
      }

    }, error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.server_error, null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // No errors, route to new page
    });

  }


  showHoroscopeClick(url: string) {
    // if (!url || url.toString().length == 0) { 
    //   // alert(strings.chart_does_not_exist);
    //   this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.chart_does_not_exist, null);
    //   return;
    // }

    //console.log("URL:"+url);


    if (this.platform.is('cordova')) {

      let localLoader:any;

      // const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', this.themeableBrowserOptions);
     
      // browser.on('loadstart').subscribe(event => {
      //   console.log("loadstart");
      //    START loadingCtrl 
      //   alert("START");
      //   localLoader = this.loadingCtrl.create({
      //     content: strings.loader.loader_text,
      //     dismissOnPageChange: true
      //     //spinner:'ios'
      //   });
      //   localLoader.present();
         
      //   });
      //   browser.on('loadstop').subscribe(event => {
      //   console.log("loadstop");
      //   STOP loadingCtrl 
      //   alert("STOP");
      //   localLoader.dismiss();
      //   });

      //   browser.on('closePressed').subscribe(event => {
      //     localLoader.dismiss();
      //   });
      
      
      const browser = this.inAppBrowser.create(url,'_blank','location=no');
          browser.on('loadstart').subscribe(event => {

          },error => {

           // alert(strings.server_error);
            this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,strings.server_error,null);
          },() => {

            // No errors, route to new page
          });

          browser.on('exit').subscribe(()=>{

          },error => {

          },() => {
            // No errors, route to new page
          });
    } else {
      window.open(url);
    }

  }

  callCancelRepeatRequestApi(horoscope: HoroscopeResponseData) {
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,strings.no_internet_connection,null);
      return;
    }

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();

    this.api.cancelRepeatRequest(horoscope.getHUserId.toString().trim(), horoscope.getHId.toString().trim()).subscribe(response => {

      //alert(JSON.stringify(response));
      localLoader.dismiss();

      if(response && response.getErrorMessage && response.getErrorMessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if (response) {
        if (response.Status === 'Success') {
          if (response.Message) {
            this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, response.Message, null);
          }
          horoscope.setREPEATREQUEST = Constants.NO;
          // if(response.Data && response.Data != null && response.Data != "null" && response.Data != ""){
          //   horoscope.setREPEATREQUEST = Constants.NO;
          //   this.horoscopeList = this.horoscopeList.filter(item => item !== horoscope);
          //   this.horoscopeList.push(horoscope);
          //   this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,response.Message,null);
          // }else if(response.Message){
          //   this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,response.Message,null);
          // }else if(response.ErrorMessage){
          //   this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,response.ErrorMessage,null);
          // }else{
          //   this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,strings.server_error,null);
          // }
        } else if (response.Message) {
          this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, response.Message, null);
        }
      } else {
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.no_message_found, null);
      }
    }, error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.server_error, null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }

  loadNoDataUrl(showLoader:boolean) {
    if(this.noDataHtml && this.noDataHtml != null && this.noDataHtml != "null"){
        return;
    }
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    // if(showLoader){
    //   localLoader.present();
    // }
    
    let proxyUrl:string = "";
    if(!this.platform.is('cordova')){
      // proxyUrl = "https://cors-anywhere.herokuapp.com/";
    }
    let myUrl = this.http
      //.get(proxyUrl + url)
      // .get(proxyUrl + 'http://49.50.103.132/ak45.html')
      // .get(proxyUrl + 'http://49.50.103.132/letterHead/Links/notfound.html')
      .get(proxyUrl + Constants.BASE_URL + 'Links/notfound.html')
      .finally(() => this.loader.dismiss())
      .map(response => response.text())
      .subscribe(data => {
        localLoader.dismiss();
        // localLoader.dismiss();
        this.noDataHtml = data;
        try {
          if(this.noDataHtml && this.showNoData){
            document.getElementsByClassName("no-data-wrapper")[0].innerHTML = data;
          }
          
        } catch (e) {

        }

        //Com.getElementsByClassName("term-condition-wrapper")[0].value = data;
        //this.updateNoData(true);
      }, error => {
        localLoader.dismiss();
        //alert(strings.server_error);
        //this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.server_error, null);
      }, () => {
        //localLoader.dismiss();
        // No errors, route to new page

      });
  }

  loadNoDataUrl2() {
    this.showNoData = true;
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });

    localLoader.present();
    setTimeout(() => {
      localLoader.dismiss();
    }, 5000);
   
    
    let myUrl = this.http
      .get(Constants.BASE_URL+'Links/notfound.html')
      .finally(() => this.loader.dismiss())
      .map(response => response.text())
      .subscribe(data => {
        localLoader.dismissAll();
        // localLoader.dismiss();
        this.noDataHtml = data;
        try {
          this.showNoData = true;
          //if(this.noDataHtml && this.showNoData){
            document.getElementsByClassName("no-data-wrapper")[0].innerHTML = data;
          //}
            
        } catch (e) {

        }

        //Com.getElementsByClassName("term-condition-wrapper")[0].value = data;
        //this.updateNoData(true);
      }, error => {
        localLoader.dismissAll();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.server_error, null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          // this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.please_check_internet_access, null);
          this.loadNoDataUrl2WithProxy();
        }else{
          this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,error.toString(), null);
        }
      }, () => {
        //localLoader.dismissAll();
        // No errors, route to new page

      }
      );
  }

  loadNoDataUrl2WithProxy() {
    this.showNoData = true;
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });

    localLoader.present();
    setTimeout(() => {
      localLoader.dismiss();
    }, 5000);
   
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
   
    let myUrl = this.http
      .get(proxyUrl + Constants.BASE_URL+'Links/notfound.html')
      .finally(() => this.loader.dismiss())
      .map(response => response.text())
      .subscribe(data => {
        localLoader.dismissAll();
        // localLoader.dismiss();
        this.noDataHtml = data;
        try {
          this.showNoData = true;
          //if(this.noDataHtml && this.showNoData){
            document.getElementsByClassName("no-data-wrapper")[0].innerHTML = data;
          //}
            
        } catch (e) {

        }

        //Com.getElementsByClassName("term-condition-wrapper")[0].value = data;
        //this.updateNoData(true);
      }, error => {
        localLoader.dismissAll();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.server_error, null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
          || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,error.toString(), null);
        }
      }, () => {
        //localLoader.dismissAll();
        // No errors, route to new page

      }
      );
  }

  callGetHoroscopeChartApi(horoscope: HoroscopeResponseData) {
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,strings.no_internet_connection,null);
      return;
    }

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange: true
      //spinner:'ios'
    });
    localLoader.present();

    this.api.getHoroscopeChart(horoscope.getHUserId.toString().trim(), horoscope.getHId.toString().trim()).subscribe(response => {

      //alert(JSON.stringify(response));
      localLoader.dismiss();

      if(response && response.getErrorMessage && response.getErrorMessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if (response) {
        if (response.Status === 'Success') {
          if (response.Data && response.Data.includes('http') && response.Data.toString().trim() != 'undefined' && response.Data.toString().trim() != 'null' ) {
            horoscope.setHPdf = response.Data.toString().trim();
            this.showHoroscopeClick(response.Data.toString().trim());
          }else{
            this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.chart_does_not_exist, null);
          }
        } else if (response.Message) {
          this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, response.Message, null);
        }
      } else {
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.no_message_found, null);
      }
    }, error => {
      localLoader.dismiss();
      //alert(strings.server_error);
      // this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.server_error, null);

      if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.please_check_internet_access, null);
      }else{
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null,error.toString(), null);
      }
    }, () => {
      //localLoader.dismiss();
      // No errors, route to new page
    });
  }


  updateNoData(noData: boolean) {
    this.showNoData = noData;
    if (this.showNoData) {
      //console.log("NO_DATA:"+this.noDataHtml);
      if(this.noDataHtml){
        document.getElementsByClassName("no-data-wrapper")[0].innerHTML = this.noDataHtml;
      }
    }
  }

  // ionViewWillEnter(){
  //   this.alertProvider.setCurrentPage(HoroscopeServicesPage);
  // }

  ionViewWillLeave(){
    // this.alertProvider.dismiss();
    this.loader.dismissAll();
  }

  // ionViewDidEnter(){
   // console.log('ionViewDidEnter HoroscopeServicesPage');
    //this.getNavParamData();
    // this.setHardwareBackButton(); 
  // this.callGetUserStatusApi();
  // }

  callGetUserStatusApi() {
    // let localLoader = this.loadingCtrl.create({
    //   content: strings.loader.loader_text,
    //   dismissOnPageChange:true
    //   //spinner:'ios'
    // });

    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      //this.alertProvider.basicAlertOnPage(DashboardPage,null,strings.no_internet_connection,null);
      return;
    }

    // let localLoader = this.loadingCtrl.create({
    //   content: strings.loader.loader_text,
    //   dismissOnPageChange: true
    //   //spinner:'ios'
    // });
    //alert("REQ:" + this.transitName);
    // localLoader.present();
    this.api.getTermsConditionStatus(this.userData.getUserId.toString().trim()).subscribe(response => {
      // localLoader.dismiss();
       
      if(response && response.ErrorMessage && response.ErrorMessage === Constants.UNAUTHORIZED){
        this.alertProvider.basicAlertOnPage(HoroscopeServicesPage,null, strings.session_expired, null);
        this.utility.logoutSession(this.session,this.navCtrl,SocialLoginPage);
        return;
      }

      if(response && response.Status === 'Success'){
        if(response.UserCharge && (response.UserCharge.toString().trim() === Constants.YES || response.UserCharge.toString().trim() === Constants.NO)){
          this.userData.setUcharge = response.UserCharge.toString().trim();
          this.session.set(Constants.USER_DATA,this.userData);
        }

        if (response.Data && response.Data === Constants.NO) {
          // this.navCtrl.push(TermsConditionPage,{
          //   data:"false",
          //   updateTerms:"updateTerms"
          // });
        }

        if (response.Data && response.Data.toString().trim() === Constants.NO) {
            this.userData.setTCFlag = Constants.NO;
            this.session.set(Constants.USER_DATA,this.userData);
            this.navCtrl.push(TermsConditionUpdatePage,{
              data:"false",
              updateTerms:"updateTerms",
              user:this.userData
            }).then(() => {
              let index = this.viewCtrl.index;
              this.navCtrl.remove(index);
              //this.navCtrl.popTo(this.navCtrl.getByIndex(index - 7));
            });
        } 
      }
    }, error => {
    
    }, () => {
      // localLoader.dismiss();
      // No errors, route to new page
    });
  }

  hideLoader(localLoader){
    setTimeout(() => {
        localLoader.dismiss();
      }, 3000);
  }

}
