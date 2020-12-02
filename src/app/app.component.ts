import { Component, ViewChild,OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UsersPage } from '../pages/users/users';
import { ReposPage } from '../pages/repos/repos';
import { OrganisationsPage } from '../pages/organisations/organisations';
import { SocialLoginPage } from '../pages/social-login/social-login';

import {UserDetailsPage } from '../pages/user-details/user-details';
import { TranslateService } from '@ngx-translate/core';
import { SimpleProvider } from '../providers/simple/simple';
import { ProfilePage } from '../pages/profile/profile';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { BalanceStatementPage } from '../pages/balance-statement/balance-statement';
import { HoroscopeServicesPage } from '../pages/horoscope-services/horoscope-services';
import { PaymentPage } from '../pages/payment/payment';
import { UpdatePromisePage } from '../pages/update-promise/update-promise';
import { AddHoroscopePage } from '../pages/add-horoscope/add-horoscope';
import { PromisesPage } from '../pages/promises/promises';
import * as Constants from '../utils/constants';
import { Storage } from '@ionic/storage';
import { MessagesPage } from '../pages/messages/messages';
import { PredictionListPage } from '../pages/prediction-list/prediction-list';
import { PredictionRequestListPage } from '../pages/prediction-request-list/prediction-request-list';
import { TermsConditionPage } from '../pages/terms-condition/terms-condition';
import { SpecialRequestPage } from '../pages/special-request/special-request';
import { DailyRequestPage } from '../pages/daily-request/daily-request';
import { SplashScreenPage } from '../pages/splash-screen/splash-screen';
import { messages, daily } from '../utils/strings';
import { AddMessagePage } from '../pages/add-message/add-message';
import * as $ from 'jquery';
import { WeeklyRequestPage } from '../pages/weekly-request/weekly-request';
import { FingerAuthPage } from '../pages/fingerauth/fingerauth';
import { MessageHistoryPage } from '../pages/message-history/message-history';
import { UpdateCommentPage } from '../pages/update-comment/update-comment';
import { AddHoroscopeNewPage } from '../pages/add-horoscope-new/add-horoscope-new';
import { AddHoroscopeProfilePage } from '../pages/add-horoscope-profile/add-horoscope-profile';
import { AddHoroscopeMariagePage } from '../pages/add-horoscope-mariage/add-horoscope-mariage';
import { AddHoroscopeChildPage } from '../pages/add-horoscope-child/add-horoscope-child';
import { AddHoroscopeDemisePage } from '../pages/add-horoscope-demise/add-horoscope-demise';
import { AddHoroscopeLastCallPage } from '../pages/add-horoscope-last-call/add-horoscope-last-call';
import { AddHoroscopeAbroadTravelPage } from '../pages/add-horoscope-abroad-travel/add-horoscope-abroad-travel';
import { PayPage } from '../pages/pay/pay';
import { PaymentRecordListPage } from '../pages/payment-record-list/payment-record-list';
import { ChargesPage } from '../pages/charges/charges';
import { TransitCommentPage } from '../pages/transit-comment/transit-comment';
import { UtilityProvider } from '../providers/utility/utility';
import { AppCenterCrashes } from '@ionic-native/app-center-crashes';
import { TermsConditionUpdatePage } from '../pages/terms-condition-update/terms-condition-update';

//import * as test from '../assets/data/test'; 
//import * as multiDatefrom 'jquery-ui-multidatespicker/jquery-ui.multidatespicker.js';


@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;
  multiDatesPicker:any;
  
  rootPage: any = SplashScreenPage;

  pages: Array<{title: string, component: any, pic:string}>;

  constructor(public platform: Platform,
    private AppCenterCrashes: AppCenterCrashes,
    public statusBar: StatusBar,
    public utility: UtilityProvider,
    translate: TranslateService,
    public splashScreen: SplashScreen,public session:Storage) {
      // translate.setDefaultLang('en');
     //this.checkFlow();
    this.initializeApp();
    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage , pic:"home"},
      { title: 'List', component: ListPage ,pic :"list"},
      { title: 'Users', component: UsersPage ,pic:"person" },
      { title: 'Repos', component: ReposPage, pic:"folder" },
      { title: 'Organisations', component: OrganisationsPage , pic: "briefcase" }
    ];  

  }

  

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.appCrashes();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    //this.hideSplashScreen();
    });
  }

  appCrashes(){
    this.AppCenterCrashes.setEnabled(true).then(() => {
      setTimeout(() => {
        this.AppCenterCrashes.lastSessionCrashReport().then(report => {
          console.log('Last session Crash report', report);
          if(report != null){
            alert(report);
          }
      });
      this.AppCenterCrashes.hasCrashedInLastSession().then(report => {
        console.log('has last session Crash report', report);
        if(report != false){
          alert(report);
        }
    });
      },5000)
   });
  }

  chooseLanguage(language){
    console.log('the selected language is ', language);
    if(language == 'tamil'){
      console.log('tamil selected');
      this.utility.setTamilLanguage();
    }else if(language == 'hindi'){
      console.log('hindi selected');
      this.utility.setHindiLanguage();
    }else{
      this.utility.setEnglishLanguage();
    }
  }

   /*hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
  }*/

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public translatedText: string;
    public supportedLangs: any[];
    ngOnInit() {
        // standing data
        this.supportedLangs = [
        { display: 'English', value: 'en' },
        { display: 'Español', value: 'es' },
        { display: '华语', value: 'zh' },
        { display: 'Hindi', value: 'hi' }
        ];

        // set current langage
        
        //console.log("LANG LANG");
        //let val = this.session.get(Constants.SELECTED_LANGUAGE);
        //console.log("LANG:"+ val);
        // this.session.get(Constants.SELECTED_LANGUAGE).then(val=>{
        //   if(val){
        //     console.log("LANG:"+ val);
        //     this.selectLang(val);
        //   }else{
        //     console.log("LANG:ENG");
        //     this.selectLang('en');
        //   }
        // });

        
    }
  

}
