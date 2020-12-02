import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Slides } from 'ionic-angular';
import * as Constants from '../utils/constants';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BasicPage } from '../pages/basic/basic'
import { UsersPage } from '../pages/users/users';
import { ReposPage } from '../pages/repos/repos';
import { OrganisationsPage } from '../pages/organisations/organisations';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { SocialLoginPage } from '../pages/social-login/social-login';
import { ProfilePage } from '../pages/profile/profile';
import { LiveChatPage } from '../pages/live-chat/live-chat';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import firebase from 'firebase/app';
import { AppVersion } from '@ionic-native/app-version';
import { AppCenterCrashes } from '@ionic-native/app-center-crashes';


// export const firebaseConfig={
//     apiKey: "AIzaSyCv0_DNUXA4WD-QqcZHR6vqW_nfP8TLlwM",
//     authDomain: "myionicapp-b5b28.firebaseapp.com",
//     databaseURL: "https://myionicapp-b5b28.firebaseio.com",
//     projectId: "myionicapp-b5b28",
//     storageBucket: "myionicapp-b5b28.appspot.com",
//     messagingSenderId: "930996052486"

// };

export const firebaseConfig={
  // apiKey: "AIzaSyDBmkUZNs66bjn-ZtmH-29rQMdKC_x5F0A",
  // authDomain: "headletters-212905.firebaseapp.com",
  // databaseURL: "https://headletters-212905.firebaseio.com",
  // projectId: "headletters-212905",
  // storageBucket: "headletters-212905.appspot.com",
  // messagingSenderId: "800545831924"

  // apiKey: "AIzaSyCabG1RTJb4ADBT3OW4i58YjLn5oYICyc4",
  // authDomain: "headletters-840fd.firebaseapp.com",
  // databaseURL: "https://headletters-840fd.firebaseio.com",
  // projectId: "headletters-840fd",
  // storageBucket: "headletters-840fd.appspot.com",
  // messagingSenderId: "463119616406"

  // apiKey: "AIzaSyA8Grs-9xMNsEGBH5ayxndbC3rMyNSowY0",
  // authDomain: "headletters-d373f.firebaseapp.com",
  // databaseURL: "https://headletters-d373f.firebaseio.com",
  // projectId: "headletters-d373f",
  // storageBucket: "headletters-d373f.appspot.com",
  // messagingSenderId: "26260079443"

  apiKey: "AIzaSyD3TyPIvMgs9VOoq_CLHldF1gHnSi3zosA",
  authDomain: "headletter-e6845.firebaseapp.com",
  databaseURL: "https://headletter-e6845.firebaseio.com",
  projectId: "headletter-e6845",
  storageBucket: "headletter-e6845.appspot.com",
  messagingSenderId: "184381835681",
  appId: "1:184381835681:web:91e7bb65c8e4145da6e3e0",
  measurementId: "G-HZQX5CQ47M"

  // apiKey: "AIzaSyAyKzed0Q9Pc-S5Hy_kFNEueRYOhErTpxw",
  //   authDomain: "headletters-d373f.firebaseapp.com",
  //   databaseURL: "https://headletters-d373f.firebaseio.com",
  //   projectId: "headletters-d373f",
  //   storageBucket: "headletters-d373f.appspot.com",
  //   messagingSenderId: "26260079443",
  //   appId: "1:26260079443:web:1726396a5fc6ce1fa5d7a6"

};
firebase.initializeApp(firebaseConfig)

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GithubUsers } from '../providers/github-users/github-users';
import { HttpModule, Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { SimpleProvider } from '../providers/simple/simple';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';

import { InAppBrowser } from '@ionic-native/in-app-browser';

//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { ApiProvider } from '../providers/api/api';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DashboardPage,LanguagePopover } from '../pages/dashboard/dashboard';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from '../components/popover/popover';
import { AddHoroscopePage } from '../pages/add-horoscope/add-horoscope';
import { BalanceStatementPage } from '../pages/balance-statement/balance-statement';
import { FindPlacePage } from '../pages/find-place/find-place';
import { HoroscopeServicesPage } from '../pages/horoscope-services/horoscope-services';
import { PromisesPage } from '../pages/promises/promises';
import { PaymentPage } from '../pages/payment/payment';
import { UpdatePromisePage } from '../pages/update-promise/update-promise';
import { PredictionListPage } from '../pages/prediction-list/prediction-list';
import { messages } from '../utils/strings';
import { MessagesPage } from '../pages/messages/messages';
import { AddMessagePage } from '../pages/add-message/add-message';
import { MessageHistoryPage } from '../pages/message-history/message-history';
import { PredictionRequestListPage } from '../pages/prediction-request-list/prediction-request-list';
import { UpdateCommentPage } from '../pages/update-comment/update-comment';
import { TermsConditionPage } from '../pages/terms-condition/terms-condition';
import { SpecialRequestPage } from '../pages/special-request/special-request';
import { PaypalPaymentPage } from '../pages/paypal-payment/paypal-payment';
import { DailyRequestPage } from '../pages/daily-request/daily-request';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { WeeklyRequestPage } from '../pages/weekly-request/weekly-request';
import { SplashScreenPage } from '../pages/splash-screen/splash-screen';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network';
import { CalendarModule } from "ion2-calendar";
import * as $ from 'jquery';
import { SortPipe } from '../pipes/sort/sort';
import { FingerAuthPage } from '../pages/fingerauth/fingerauth';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Keyboard } from '@ionic-native/keyboard';
import { AlertProvider } from '../providers/alert/alert';
import { UtilityProvider } from '../providers/utility/utility';
// import { TranslateModule } from 'ng2-translate/ng2-translate';
// import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';
import { Globalization } from '@ionic-native/globalization';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AddHoroscopeNewPage } from '../pages/add-horoscope-new/add-horoscope-new';
import { AddHoroscopeProfilePage } from '../pages/add-horoscope-profile/add-horoscope-profile';
import { AddHoroscopeMariagePage } from '../pages/add-horoscope-mariage/add-horoscope-mariage';
import { AddHoroscopeChildPage } from '../pages/add-horoscope-child/add-horoscope-child';
import { AddHoroscopeAbroadTravelPage } from '../pages/add-horoscope-abroad-travel/add-horoscope-abroad-travel';
import { AddHoroscopeLastCallPage } from '../pages/add-horoscope-last-call/add-horoscope-last-call';
import { AddHoroscopeDemisePage } from '../pages/add-horoscope-demise/add-horoscope-demise';
import { PayPage } from '../pages/pay/pay';
import { PaymentRecordListPage } from '../pages/payment-record-list/payment-record-list';
import { ChargesPage } from '../pages/charges/charges';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { AddHoroscopeImagePage } from '../pages/add-horoscope-image/add-horoscope-image';
import { TransitCommentPage } from '../pages/transit-comment/transit-comment';
import { ModalDatePage } from '../pages/modal-date/modal-date';
import { MythsPage } from '../pages/myths/myths';
import { DatePopoverComponent } from '../components/date-popover/date-popover';
import { TermsConditionUpdatePage } from '../pages/terms-condition-update/terms-condition-update';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { LoginOpt } from 'angularx-social-login/src/auth.service';
import { DateTimeFormatPipe } from '../utils/date_time_format_pipe';
import { StreamingMedia } from '@ionic-native/streaming-media';
// import { ClickBlock } from 'ionic-angular/umd/components/app/click-block';
// import { OverlayPortal } from 'ionic-angular/components/app/overlay-portal';
//import{ LocationAccuracy } from '@ionic-native/location-accuracy'
//import { multidatespicker } from 'jquery-ui-multidatespicker';

// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// const fbLoginOptions: LoginOpt = {
//   scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
//   return_scopes: true,
//   enable_profile_selector: true
// }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

// const googleLoginOptions: LoginOpt = {
//   scope: 'profile email'
// }; 

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(Constants.WEB_CLIENT_ID)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(Constants.FACEBOOK_APP_ID)
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BasicPage,
    UsersPage,
    ReposPage,
    OrganisationsPage,
    UserDetailsPage,
    SocialLoginPage,
    FindPlacePage,
    ProfilePage,
    DashboardPage,
    LanguagePopover,
    UserProfilePage,
    PopoverComponent,
    AddHoroscopePage,
    BalanceStatementPage,
    HoroscopeServicesPage,
    PromisesPage,
    PaymentPage,
    UpdatePromisePage,
    PredictionListPage,
    MessagesPage,
    MythsPage,
    AddMessagePage,
    MessageHistoryPage,
    PredictionRequestListPage,
    UpdateCommentPage,
    TermsConditionPage,
    SpecialRequestPage,
    DailyRequestPage,
    WeeklyRequestPage,
    SplashScreenPage,
    PaypalPaymentPage,
    SortPipe,
    FingerAuthPage,
    AddHoroscopeNewPage,
    AddHoroscopeProfilePage,
    AddHoroscopeMariagePage,
    AddHoroscopeChildPage,
    AddHoroscopeAbroadTravelPage,
    AddHoroscopeLastCallPage,
    AddHoroscopeDemisePage,
    PayPage,
    PaymentRecordListPage,
    ChargesPage,
    LiveChatPage,
    AddHoroscopeImagePage,
    TransitCommentPage,
    ModalDatePage,
    DatePopoverComponent,
    TermsConditionUpdatePage,
    DateTimeFormatPipe,
    //OverlayPortal
  ],
  imports: [
    IonicModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {mode:'md'}),
   // IonicModule.forRoot(MyApp,{useHash:true}),
    IonicStorageModule.forRoot(),
    // TranslateModule.forRoot({
    //   provide:TranslateLoader,
    //   useFactory:(createTranslateLoader),
    //   deps:[Http]
    // }),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    CalendarModule,
    TranslateModule.forRoot({
      loader: { 
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    SocialLoginModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BasicPage,
    MythsPage,
    LiveChatPage,
    UsersPage,
    ReposPage,
    OrganisationsPage,
    UserDetailsPage,
    SocialLoginPage,
    FindPlacePage,
    ProfilePage,
    DashboardPage,
    LanguagePopover,
    UserProfilePage,
    PopoverComponent,
    AddHoroscopePage,
    BalanceStatementPage,
    HoroscopeServicesPage,
    PaypalPaymentPage,
    PromisesPage,
    PaymentPage,
    UpdatePromisePage,
    PredictionListPage,
    MessagesPage,
    AddMessagePage,
    MessageHistoryPage,
    PredictionRequestListPage,
    UpdateCommentPage,
    TermsConditionPage,
    SpecialRequestPage,
    DailyRequestPage,
    WeeklyRequestPage,
    SplashScreenPage,
    FingerAuthPage,
    AddHoroscopeNewPage,
    AddHoroscopeProfilePage,
    AddHoroscopeMariagePage,
    AddHoroscopeChildPage,
    AddHoroscopeAbroadTravelPage,
    AddHoroscopeLastCallPage,
    AddHoroscopeDemisePage,
    PayPage,
    PaymentRecordListPage,
    ChargesPage,
    AddHoroscopeImagePage,
    TransitCommentPage,
    ModalDatePage,
    DatePopoverComponent,
    TermsConditionUpdatePage
  ],
  providers: [
    GithubUsers,
    StatusBar,
    SplashScreen,
    AppVersion,
    AppCenterCrashes,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SimpleProvider,
    SQLite,
    DatabaseProvider,
    GooglePlus,
    InAppBrowser,
    AngularFireDatabase,
    StreamingMedia,
    //FileTransfer,
    //FileUploadOptions,
    // FileTransferObject,
   // File,
    Camera,
    Facebook,
    ApiProvider,
    FileTransfer,
    File,
    FileTransferObject,
    DatePipe,
    NativeGeocoder,
    Network,
    NetworkProvider,
    FingerprintAIO,
    Keyboard,
    AlertProvider,
    UtilityProvider,
    Globalization,
    ThemeableBrowser,
    Diagnostic,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
    //LocationAccuracy    
  ]
})
export class AppModule {}
