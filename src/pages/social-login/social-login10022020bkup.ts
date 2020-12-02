import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { BasicPage } from '../basic/basic';
import { Platform, ActionSheetController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { UserData } from '../../models/user_data';
import { ProfilePage } from '../profile/profile';
import { LoginRequest } from '../../api/request/login_request';
import { ApiProvider } from '../../providers/api/api';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings';
import {LoadingController} from 'ionic-angular';
import { LoginResponse } from '../../api/response/login_response';
import { LoginResponseData } from '../../api/response/login_response_data';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { TermsConditionPage } from '../terms-condition/terms-condition';
import { NetworkProvider } from '../../providers/network/network';
import { DatePipe } from '../../../node_modules/@angular/common';
import { FingerprintAIO,FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { FingerAuthPage } from '../fingerauth/fingerauth';
import { AlertProvider } from '../../providers/alert/alert';
import { UtilityProvider } from '../../providers/utility/utility';
import { TranslateService } from '@ngx-translate/core';
import { TermsConditionUpdatePage } from '../terms-condition-update/terms-condition-update';
 import { AuthService,SocialUser } from "angularx-social-login";
 import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";



@Component({
  selector: 'page-social-login',
  templateUrl: 'social-login.html',
})


export class SocialLoginPage implements OnInit{
   data:String;
   yahooToken:String;
   userData : LoginResponseData;
   googleUser:Observable<firebase.User>;
   loader :any;
   loaderTimeOut = 10000;
   socialUser: SocialUser;

   YAHOO = {
    clientId: 'dj0yJmk9UlRGUzRhdlhvd0QzJmQ9WVdrOVJtSktRV051Tm1VbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD02MQ--',
    clientSecret: '97b40dd867bfa3518254919cdd8f46e1f0f04f88',
    redirectUrl: 'https://headletters.com',
    requestAuthUrl: 'https://api.login.yahoo.com/oauth2/request_auth',
    requestTokenUrl: 'https://api.login.yahoo.com/oauth2/get_token'
  }

  yahooCreadentials = btoa(this.YAHOO.clientId + ':' + this.YAHOO.clientSecret);
  headersJson = new Headers();
  optionsJson :any;
  

  constructor(public navCtrl: NavController,
      public googleplus:GooglePlus,
      public http: Http,
      public inAppBrowser:InAppBrowser,
      public facebook:Facebook,
      public fireAuth:AngularFireAuth,
      public platform:Platform,
      public api:ApiProvider,
      public loadingCtrl: LoadingController,
      public session:Storage,
      public viewCtrl:ViewController,
      public networkProvider:NetworkProvider,
      private datePipe:DatePipe,
      private faio: FingerprintAIO,
      public alertProvider:AlertProvider,
      public utility:UtilityProvider,
      private translate:TranslateService) {

        this.alertProvider.setCurrentPage(SocialLoginPage);
        //this.checkFlow();
        this.userData = new LoginResponseData();
        this.googleUser = this.fireAuth.authState;
        this.initiateLoder();
  }


  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.socialUser = user;
    // });
  }

  initiateLoder(){
    this.loader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
  }

  signOutWithGoogle(){
    firebase.auth().signOut().then(function() {
      
      console.log("signOutWithGoogle=====================")
      //alert("successfully logout");// Sign-out successful.
    }).catch(function(error) {
      //alert("logout error");
      // An error happened.
    });
  }

  signInWithGoogleWeb(): void {
    console.log("LOGIN:","GOOGLE");
   this.signOutWithGoogle();
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

    setTimeout(() => {
      localLoader.dismiss();
    }, this.loaderTimeOut);
    var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    // provider.addScope('https://www.googleapis.com/auth/plus.profile.emails.read');
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    console.log("after provider ==================")
    firebase.auth().signInWithPopup(provider).then(result=> {
  
      console.log("PROVIDER_DATA:",JSON.stringify(result))
    if(result.user.providerData && result.user.providerData.length>0){
      console.log("test 1===========")
      if(result.user.providerData[0]){
        console.log("test 2==========")
          const user = result.user.providerData[0];
          this.userData.setTokenGoogle = user.uid;
          this.userData.setUserName = user.displayName;
          this.userData.setUserMobile = user.phoneNumber;
          this.userData.setUserPhoto = user.photoURL;
          this.userData.setUserEmail = user.email;
          
          if(!this.networkProvider.isInternetConnected()){
            console.log("test 3 internet=========")
            localLoader.dismiss();
            //alert(strings.no_internet_connection);
            this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
            return;
          }
          localLoader.dismiss();
          this.callLoginApi(Constants.medium_gmail);
        //  this.userData
          //alert("LOGIN SUCCESS " + JSON.stringify(user));
      }else{
        localLoader.dismiss();
        //alert(strings.please_try_again);
        this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.please_try_again,null);
      }
      //("LOGIN SUCCESS " + JSON.stringify(response));
    }else{
      localLoader.dismiss();
      //alert(strings.please_try_again);
      this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.please_try_again,null);
    }
    // ...
    }).catch(function(error) {
      // Handle Errors here.
      //console.log(error);
      //alert("Error");
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(val=>{
    //   alert("LOGIN:"+JSON.stringify(val));
    // });
  }
  

  checkFlow(){
    this.session.get(Constants.IS_LOGIN).then(val=>{
      //console.log("VALUE",JSON.stringify(val));
        if(val){
          this.goToDashboard()
        }
      });
  }

  go_to_another_page(){
   // console.log('on page clicked')
    this.navCtrl.push(BasicPage, {
      platform:Platform,
      actionsheetCtrl:ActionSheetController
      });
  }

  googleLogin(){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
      return;
    }
    if(this.platform.is('cordova')){
      this.logoutFromGoogle();
      //this.login();
    }else{
      this.signInWithGoogleWeb();
      console.log("i am calling first =============")
      //this.webGoogleLogin();
    }    
  }

  // async nativeGoogleLogin():Promise<void>{
  //   try{
  //       const gplusUser = await this.googleplus.login({
  //         'webClientId':'930996052486-0qejrgcf4ot8q97du0evq4pjbv1ki1dt.apps.googleusercontent.com',
  //         'offline':true,
  //         'scopes': 'profile email'
  //       })
 
  //       await this.fireAuth.auth.signInWithCredential(
  //           firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
  //       )
        
  //   }catch(err){
  //       console.log(err)
  //   }
  // }

  // async webGoogleLogin():Promise<void>{
  //   try{
  //       const provider = new firebase.auth.GoogleAuthProvider();
  //       const credential = await this.fireAuth.auth.signInWithPopup(provider);
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  signout(){
    this.fireAuth.auth.signOut();
    if(this.platform.is('cordova')){
      this.googleplus.logout();
    }
  }

  // login(){
  //   this.userData.setTokenGoogle = "107242309454263574808";
  //   this.userData.setUserName = "Gops";
  //   this.userData.setUserMobile = "";
  //   this.userData.setUserPhoto = "https://lh5.googleusercontent.com/-h6ZXjCP8GX0/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rebNq3QxZBRUciX7ermkdU6u39Rxw/photo.jpg";
  //   this.userData.setUserEmail = "vcdubai@gmail.com";
  //   this.callLoginApi(Constants.medium_gmail);
  // }

  login(){
    
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();
    // const WEB_CLIENT_ID: "26260079443-6su5mdpbihhg94omm3ncpqs5o5hdmgdd.apps.googleusercontent.com"

    // setTimeout(() => {
    //   localLoader.dismiss();
    // }, this.loaderTimeOut);
    this.googleplus.login({
      //'webClientId':'930996052486-0qejrgcf4ot8q97du0evq4pjbv1ki1dt.apps.googleusercontent.com',
      // 'webClientId':'800545831924-vjrt02hdd7qujt41qd4rtlirmjqc4qns.apps.googleusercontent.com',
      // 'webClientId':'463119616406-092u6rq2uvmef5sq7oga2b15mbcri2mm.apps.googleusercontent.com',
      'webClientId':Constants.WEB_CLIENT_ID,
      'offline':false
    }).then(res=>{
      if(!this.networkProvider.isInternetConnected()){
        localLoader.dismiss();
        //alert(strings.no_internet_connection);
        this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
        return;
      }

      
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(response=>{
        // alert("PROVIDER_DATA:"+JSON.stringify(response));
        console.log("PROVIDER_DATA:"+JSON.stringify(response));
        //this.loader.dismiss();
        if(response.providerData && response.providerData.length>0){
          if(response.providerData[0]){
              const user = response.providerData[0];
              this.userData.setTokenGoogle = user.uid;
              this.userData.setUserName = user.displayName;
              this.userData.setUserMobile = user.phoneNumber;
              this.userData.setUserPhoto = user.photoURL;
              this.userData.setUserEmail = user.email;
              if(!this.networkProvider.isInternetConnected()){
                localLoader.dismiss();
                //alert(strings.no_internet_connection);
                this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
                return;
              }
              localLoader.dismiss();
              this.callLoginApi(Constants.medium_gmail);
            //  this.userData
              //alert("LOGIN SUCCESS " + JSON.stringify(user));
          }else{
            localLoader.dismiss();
            //alert(strings.please_try_again);
            this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.please_try_again,null);
          }
          //("LOGIN SUCCESS " + JSON.stringify(response));
        }else{
          localLoader.dismiss();
          //alert(strings.please_try_again);
          this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.please_try_again,null);
        }

      //  console.log('LOG'+JSON.stringify(response))
      }).catch(ns=>{
        //alert("1");
        localLoader.dismiss();
        //this.alertProvider.basicAlertOnPage(SocialLoginPage,null,ns.toString(),null);
        // alert("ERROR:"+JSON.stringify(ns));
        console.log("ERROR:"+JSON.stringify(ns));
         //alert(strings.error + " " + JSON.stringify(ns))
      })
    }).catch(er=>{
      //alert("2");
      localLoader.dismiss();
      //this.alertProvider.basicAlertOnPage(SocialLoginPage,null,er.toString(),null);
     // console.log("==============",er)
      alert(strings.error + " " + JSON.stringify(er))
   });
  }


  yahooLogin(){
    console.log("LOGIN:","YAHOO");
    console.log("i am calling yahoo =============")
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
      return;
    }
    if(this.platform.is('cordova')){
      this.yahooLoginWithNative();
     }else{
       this.yahooLoginWithWeb2();
     }    
  }

  setJsonHeader(){
    this.headersJson = new Headers();
    this.headersJson.append('Authorization', 'Basic ' + this.yahooCreadentials);
    this.headersJson.append('Content-Type', 'application/x-www-form-urlencoded');
    // if(this.userData && this.userData.getTOKEN){
    //   this.headersJson.append('TOKEN',this.userData.getTOKEN.toString().trim());
    // }
    this.optionsJson = new RequestOptions({headers:this.headersJson});
  
}

yahooLoginWithWeb(){
  window.open('https://api.login.yahoo.com/oauth2/request_auth?client_id='+Constants.YAHOO_CLIENT_ID+'&redirect_uri=https://headletters.com&response_type=token', '_blank', 'location=no')
   .addEventListener("loadstart", (event: any) => {
        console.log("DATA:","DATA");
      });

      // ref.addEventListener( "loadstart", function() {
      //   setTimeout(function() {
      //     console.log("EVE:","EVE");
      //       //ref.close();
      //   }, 5000 );
      // });

    //let url = 'https://api.login.yahoo.com/oauth2/request_auth?client_id='+Constants.YAHOO_CLIENT_ID+'&redirect_uri=https://headletters.com&response_type=token';
    //let browser = this.inAppBrowser.create( url, "_blank", "EnableViewPortScale=yes,closebuttoncaption=Done" );
    // browser.on('loadstart').subscribe(event => {
    //                   console.log("DATA:","DATA");
    //                   //this.loadURLtoMemory();
    //                 },
    //                 err => {
    //                   console.log("InAppBrowser Loadstop Event Error: " + err);
    //                  });

    //   browser.on('exit').subscribe(()=>{
    //   },error => {
    //   },() => {
    //     //localLoader.dismiss();
    //     // No errors, route to new page
    //   });
}

  yahooLoginWithWeb2(){
    this.setJsonHeader();
    
     let ref = window.open('https://api.login.yahoo.com/oauth2/request_auth?client_id='+Constants.YAHOO_CLIENT_ID+'&redirect_uri=https://headletters.com&response_type=token', '_blank', 'location=no');
//     let browserRef = this.inAppBrowser.create('https://api.login.yahoo.com/oauth2/request_auth?client_id='+Constants.YAHOO_CLIENT_ID+'&redirect_uri=https://headletters.com&response_type=token', '_blank', 'location=no');
//     browserRef.on("loadstop").subscribe(
//        () => {
//          this.loadURLtoMemory();
//        },
//        err => {
//          console.log("InAppBrowser Loadstop Event Error: " + err);
// });
  
    // browserRef.addEventListener("loadstart", (event: any) => {
    //   console.log("DATA:",JSON.stringify(event));
    //    if ((event.url).indexOf('https://headletters.com') === 0) {

    //          browserRef.removeEventListener('exit', () => {});
    //          browserRef.close();
    //          const responseParameters = ((event.url).split('#')[1]).split('&');
    //          const parsedResponse = {};
    //          for (let i = 0; i < responseParameters.length; i++) {
    //             parsedResponse[responseParameters[i].split('=')[0]] =
    //             responseParameters[i].split('=')[1];
    //          }
    //       alert("SUCCESS " +JSON.stringify((<any>parsedResponse).access_token));
    //    }
    // });

    ref.addEventListener('load',(event:any)=>{
      console.log("YAHOO LOAD:",event.url);

    });

    ref.addEventListener('loadend',(event:any)=>{
      console.log("YAHOO LOADEND:",event.url);

    });

    ref.addEventListener('progress',(event:any)=>{
      console.log("YAHOO PROGRESS:",event.url);

    });

    ref.addEventListener('loadstart', (event: any) => {
      console.log("YAHOO:",event.url);
      if((event.url).indexOf('https://headletters.com') == 0) {
        let access_code = (event.url).split("code=")[1];
        
        let data = {
          redirect_uri: + this.YAHOO.redirectUrl,
          grant_type: 'authorization_code',
          code: access_code
        }
        //post on yahoo to get access and refresh tokens
        // $http({
        //   method: 'POST',
        //   url: this.YAHOO.requestTokenUrl,
        //   headers: {
        //     Authorization: 'Basic ' + this.yahooCreadentials,
        //    'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        //   data: {
        //     redirect_uri: + this.YAHOO.redirectUrl,
        //     grant_type: 'authorization_code',
        //     code: access_code
        //   }
        // })
        // .then(
        //   function(response) {
        //     //accessToken: response.access_token
        //     //refreshToken: response.refresh_token
        //     //expiresIn: response.expires_in
        //     //xoauthYahooGuid: response.xoauth_yahoo_guid
        //   },
        //   function(error) {
        //     //show errors
        //   }
        // );

         let myUrl = this.http
        // .get(proxyUrl + 'http://49.50.103.132/letterHead/Links/TermCondition.html')
        .post(this.YAHOO.requestTokenUrl,data,this.optionsJson)
        // .get(proxyUrl + 'http://storeapp.yiipro.com/admin/policy/amazingfood')
        //.get(proxyUrl + 'http://49.50.103.132/ak45.html')
        //.finally(() => localLoader.dismiss())
        .map(response => response.text())
        .subscribe(data =>{
           // localLoader.dismiss();
           console.log("RES:",JSON.stringify(data));
    
          },error => {
            //localLoader.dismiss();
            //alert(strings.server_error);
            // this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage,null,strings.server_error,null);
    
            if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
            || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
              this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage,null, strings.please_check_internet_access, null);
            }else{
              this.alertProvider.basicAlertOnPage(TermsConditionUpdatePage,null,error.toString(), null);
            }
          },() => {
            //localLoader.dismiss();
            // No errors, route to new page
            
          }
        );
      }
      else {
        //show errors
      }
    });
  }

   yahooLoginWithNative(){
      /*this.http.get('https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9akthYkpVaFRQZ2xRJmQ9WVdrOWNsSk1SRTgxTlRJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01Mw--&redirect_uri=http://www.enukesoftware.com&response_type=token')
         .map(res => res.toMap())
         .subscribe(data=>{
            alert("LOGIN SUCCESS " + data);
         },err =>{
            alert("NOT SUCCESS " + err);
      });*/

       /*let browserRef = window.open('https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9akthYkpVaFRQZ2xRJmQ9WVdrOWNsSk1SRTgxTlRJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01Mw--&redirect_uri=http://enukesoftware.com&response_type=token', '_blank', 'location=no');
         browserRef.addEventListener("loadstart", (event: any) => {
            if ((event.url).indexOf('http://enukesoftware.com') === 0) {

                  browserRef.removeEventListener('exit', () => {});
                  browserRef.close();
                  const responseParameters = ((event.url).split('#')[1]).split('&');
                  const parsedResponse = {};
                  for (let i = 0; i < responseParameters.length; i++) {
                     parsedResponse[responseParameters[i].split('=')[0]] =
                     responseParameters[i].split('=')[1];
                  }
               alert("SUCCESS " +JSON.stringify((<any>parsedResponse).access_token));
            }
      })*/

      let localLoader = this.loadingCtrl.create({
        content: strings.loader.loader_text,
        dismissOnPageChange:true
        //spinner:'ios'
      });
      localLoader.present();

      setTimeout(() => {
        localLoader.dismiss();
      }, this.loaderTimeOut);

      if(!this.networkProvider.isInternetConnected()){
        localLoader.dismiss();
        //alert(strings.no_internet_connection);
        this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
        return;
      }
      //this.initiateLoder();
      //this.loader.present();
      //const browser = this.inAppBrowser.create('https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9akthYkpVaFRQZ2xRJmQ9WVdrOWNsSk1SRTgxTlRJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01Mw--&redirect_uri=http://enukesoftware.com&response_type=token', '_blank', 'location=no');
    // alert("ALERT YAHOO 4");
     
     try{

      const browser = this.inAppBrowser.create('https://api.login.yahoo.com/oauth2/request_auth?client_id='+Constants.YAHOO_CLIENT_ID+'&redirect_uri=https://headletters.com&response_type=token', '_blank', 'location=no');

      if(!browser){
        localLoader.dismiss();
        return;
      }//kInAppBrowserTargetSelf
      //browser.show();
      browser.on('loadstart').subscribe(event => {
        //this.initiateLoder();
        //this.loader.present();
        //console.log("YAHOO","YAHOO");
         if ((event.url).indexOf('https://headletters.com') === 0) {

                  //browserRef.removeEventListener('exit', () => {});
                  browser.close();
                  const responseParameters = ((event.url).split('#')[1]).split('&');
                  const parsedResponse = {};
                  for (let i = 0; i < responseParameters.length; i++) {
                     parsedResponse[responseParameters[i].split('=')[0]] =
                     responseParameters[i].split('=')[1];
                  }

                  localLoader.dismiss();
                  this.getGuidFromtoken((<any>parsedResponse).access_token);
               
                //alert("CHECK " +responseParameters.toString());
               //alert("SUCCESS " +JSON.stringify((<any>parsedResponse).access_token));
               //this.yahooToken = JSON.stringify((<any>parsedResponse).access_token);
               //this.getYahooUserData();
            }
      },error => {
        localLoader.dismiss();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(SocialLoginPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(SocialLoginPage,null,error.toString(), null);
        }
      },() => {
        //localLoader.dismiss();
        // No errors, route to new page
      });

      browser.on('exit').subscribe(()=>{
        localLoader.dismiss();
      },error => {
        localLoader.dismiss();
      },() => {
        //localLoader.dismiss();
        // No errors, route to new page
      });

    }catch(e){
     // alert("ERROR:"+e);
     // alert("ERROR:"+JSON.stringify(e));
      localLoader.dismiss();
    }

   }

   getGuidFromtoken(token:String){
    //this.initiateLoder();
    //this.loader.present();
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

    setTimeout(() => {
      localLoader.dismiss();
    }, this.loaderTimeOut);
      const url = "https://social.yahooapis.com/v1/me/guid?format=json&access_token="+ token;

       this.http.get(url)
         .map(res => res.json())
         .subscribe(data=>{
            localLoader.dismiss();
            //alert("LOGIN SUCCESS " + JSON.stringify(data));
            this.getYahooProfileData(data.guid.value,token);
         },err =>{
            localLoader.dismiss();
            //alert("Error " + err);
            this.alertProvider.basicAlertOnPage(SocialLoginPage,null,err,null);
      });

   }

   getYahooProfileData(guid:String,token:String){
    //this.initiateLoder();
    //this.loader.present();
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

    setTimeout(() => {
      localLoader.dismiss();
    }, this.loaderTimeOut);
      const url = "https://social.yahooapis.com/v1/user/" + guid + "/profile?format=json&access_token=" + token;

       this.http.get(url)
         .map(res => res.json())
         .subscribe(data=>{
          //this.loader.dismiss();
           if(data.profile){
               const user = data.profile;
               if(user.emails && user.emails.length>0){
                 this.userData.setUserEmail = user.emails[0];
                 if(user.emails[0].handle){
                  this.userData.setUserEmail = user.emails[0].handle;
                 }
               }
               this.userData.setTokenYahoo = user.guid;
               this.userData.setUserName = user.givenName;
               //this.userData.phone = user.phoneNumber;
               this.userData.setUserPhoto = user.image.imageUrl;
               //this.userData.provider = "yahoo";
              //  if(user.gender === "M"){
              //    this.userData.gender = "Male";
              //  }else if(user.gender === "F"){
              //    this.userData.gender = "Female";
              //  }
               //  this.userData
              //alert("LOGIN USER " + JSON.stringify(this.userData));

              if(!this.networkProvider.isInternetConnected()){
                localLoader.dismiss();
                //alert(strings.no_internet_connection);
                this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
                return;
              }
              localLoader.dismiss();
              this.callLoginApi(Constants.medium_yahoo);
           }else{
            localLoader.dismiss();
             //alert("Please Try Again");
             this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.please_try_again,null);
           }
           // alert("LOGIN SUCCESS " + JSON.stringify(data));
         },err =>{
            localLoader.dismiss();
            //alert("Error " + err);
            this.alertProvider.basicAlertOnPage(SocialLoginPage,strings.error,err,null);
      });
   }

  // onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  facebookLogin(){
    if(!this.networkProvider.isInternetConnected()){
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
      return;
    }
    if(this.platform.is('cordova')){
      this.facebookLoginNative();
      //this.login();
    }else{
      this.signInWithFacebookWeb();
      //this.webGoogleLogin();
    }    
  }

  facebookLoginNative(){
  //using browser
    /*let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider)
    .then(()=>{
      firebase.auth().getRedirectResult().then((result)=>{
          alert(JSON.stringify(result));
      }).catch(function(error){
        alert(JSON.stringify(error))
      });
    }); */

    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

    setTimeout(() => {
      localLoader.dismiss();
    }, this.loaderTimeOut);

    if(!this.networkProvider.isInternetConnected()){
      localLoader.dismiss();
     // alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
      return;
    }

    //this.logoutFromGoogle();
    //this.initiateLoder();
    //this.loader.present();
      // using native
    this.facebook.login(['public_profile','email'])
    .then((loginResponse) => {
      //alert("FB1:" + JSON.stringify(loginResponse));
      let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);

      firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then((response) => {
        //alert("FB2:" + JSON.stringify(loginResponse));

        //this.loader.dismiss();
        //alert(JSON.stringify(response));
        if(response.user && response.user.providerData && response.user.providerData.length>0){
          if(response.user.providerData[0]){
            //alert("FB3:" + JSON.stringify(response.user.providerData[0]));

              const user = response.user.providerData[0];
              this.userData.setTokenFacebook = user.uid;
              this.userData.setUserName = user.displayName;
              this.userData.setUserMobile = user.phoneNumber;
              this.userData.setUserPhoto = user.photoURL;
              this.userData.setUserEmail = user.email;
              //this.userData.provider = user.providerId;
            //  this.userData
            //  alert("LOGIN SUCCESS " + JSON.stringify(user));
            //this.goToProfile();

            if(!this.networkProvider.isInternetConnected()){
              localLoader.dismiss();
             // alert(strings.no_internet_connection);
              this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
              return;
            }
            localLoader.dismiss();
            this.callLoginApi(Constants.medium_faebook);
          }else{
            localLoader.dismiss();
            //alert(strings.please_try_again);
            this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.please_try_again,null);
          }
        }else{
          localLoader.dismiss();
          //alert(strings.please_try_again);
          this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.please_try_again,null);
        }

        /*if(!info.uid){
            getUserDataByToken(info.oauthAccessToken);
        }else{
          alert(JSON.stringify(info));
        }*/

        //this.getUserDetail(response.authResponse.userID);
      }).catch(function(error){
        //alert("3");
        localLoader.dismiss();
        //alert(strings.error + " " + JSON.stringify(error))
        // this.alertProvider.basicAlertOnPage(SocialLoginPage,strings.error,JSON.stringify(error),null);
        this.alertProvider.basicAlertOnPage(SocialLoginPage,null,error.toString(),null);
      });
    }).catch(function(error){
      //alert("4");
      localLoader.dismiss();
      //alert(strings.error + " " + JSON.stringify(error))
      try{
        this.alertProvider.basicAlertOnPage(SocialLoginPage,null,error.toString(),null);

      }catch(e){

      }
    });

  }

  signInWithFacebookWeb(): void {
    //this.signOutWithGoogle();
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    localLoader.present();

    setTimeout(() => {
      localLoader.dismiss();
    }, this.loaderTimeOut);
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    // provider.addScope('https://www.facebook.com/v3.2/dialog/oauth?client_id='+Constants.FACEBOOK_APP_ID+'&redirect_uri=https://www.facebook.com/connect/login_success.html&state=st=state123abc,ds=123456789');
    // &redirect_uri={redirect-uri}
    // &state={state-param}')
    firebase.auth().signInWithPopup(provider).then(result=> {
  //console.log("RESULT:",JSON.stringify(result));
    if(result.user.providerData && result.user.providerData.length>0){
      if(result.user.providerData[0]){
          const user = result.user.providerData[0];
          this.userData.setTokenFacebook = user.uid;
          this.userData.setUserName = user.displayName;
          this.userData.setUserMobile = user.phoneNumber;
          this.userData.setUserPhoto = user.photoURL;
          this.userData.setUserEmail = user.email;
          if(!this.networkProvider.isInternetConnected()){
            localLoader.dismiss();
            //alert(strings.no_internet_connection);
            this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
            return;
          }
          localLoader.dismiss();
          this.callLoginApi(Constants.medium_faebook);
        //  this.userData
          //alert("LOGIN SUCCESS " + JSON.stringify(user));
      }else{
        localLoader.dismiss();
        //alert(strings.please_try_again);
        this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.please_try_again,null);
      }
      //("LOGIN SUCCESS " + JSON.stringify(response));
    }else{
      localLoader.dismiss();
      //alert(strings.please_try_again);
      this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.please_try_again,null);
    }
    // ...
    }).catch(function(error) {
      // Handle Errors here.
      //console.log(error);
      //alert("Error");
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(val=>{
    //   alert("LOGIN:"+JSON.stringify(val));
    // });
  }

  async logoutFromGoogle(){
        // firebase.auth().signOut().then(function() {
        //   // Sign-out successful.
        // }).catch(function(error) {
        //   // An error happened.
        // });

        //alert("LOGOUT");
        //this.logoutGoogleSession();
        const options = {
          webClientId: Constants.WEB_CLIENT_ID,
          offline: false
        };
        //this.googlePlus = await this.session.get("GPLUS");
        // this.session.get("GPLUS").then(val=>{
        //     this.googlePlus = val;
        // });
        try{
          await this.googleplus.trySilentLogin(options);
        }catch(e){
          // alert(e);
        }

        try{
          await this.googleplus.logout();
        }catch(e){
          
        }
        
        await this.login();

  }

  getUserDataByToken(token:string){
    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(token))
      .then(response=>{
        //alert("LOGIN SUCCESS " + JSON.stringify(response))
        //console.log('LOG'+JSON.stringify(response))
      }).catch(ns=>{
        //alert("NOT SUCCESS" + JSON.stringify(ns))
      })
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage, {type:Constants.ADD_PROFILE,data:this.userData});
  }

  goToDashboard(data?:LoginResponseData){
    this.navCtrl.push(DashboardPage, {
      data:data
    }).then(() => {
      let index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }

  callLoginApi(medium:string){
    console.log("test 4 callloginapi=======")
    

    // alert("DATA:" + JSON.stringify(this.userData));
    // if(medium){
    //   return;
    // }
    /**
     * deault starting language
     */
    this.session.set(Constants.SELECTED_LANGUAGE,Constants.LANG_CODE_ENGLISH);
    this.utility.setDefaultLanguage(Constants.LANG_CODE_ENGLISH);

    if(!this.networkProvider.isInternetConnected()){
      console.log("test 5 internetconnected=======")
      //alert(strings.no_internet_connection);
      this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.no_internet_connection,null);
      return;
    }
  
    let localLoader = this.loadingCtrl.create({
      content: strings.loader.loader_text,
      dismissOnPageChange:true
      //spinner:'ios'
    });
    console.log("test 6 internetconnectedd=======")

    localLoader.present();

      let request = new LoginRequest();
      request.Email = this.userData.getUserEmail;
      console.log("Email",request.Email)
      request.Medium = medium;
      if(medium === Constants.medium_faebook){
        request.TokenId = this.userData.getTokenFacebook;
      }else if(medium === Constants.medium_gmail){
        request.TokenId = this.userData.getTokenGoogle;
      }else if(medium === Constants.medium_yahoo){
        request.TokenId = this.userData.getTokenYahoo;
      }
      request.PASSWORD = Constants.PASSWORD;
      // alert("REQ:" + JSON.stringify(request));
      
      //alert(JSON.stringify(request));

      //this.alertProvider.basicAlertOnPage(SocialLoginPage,null,JSON.stringify(request),null);
      
      
      this.api.login(request).subscribe(data => {
        console.log("test 5 callloginapi=======")
        localLoader.dismiss();
      //  alert("DATA:" +JSON.stringify(data));
      console.log("LOGIN_RESPONSE:"+JSON.stringify(data));

        let loginResponse : LoginResponse = new LoginResponse(JSON.stringify(data)) ;

        // console.log("REQUEST:",JSON.stringify(request));
        // console.log("RESPONSE:",JSON.stringify(loginResponse));

        if(loginResponse && loginResponse.getStatus === 'Success'){
          this.session.set("GPLUS",this.googleplus);
          this.session.set("FACEBOOK",this.facebook);
          //alert('STATUS '+loginResponse.getStatus);
          //alert('NAME '+loginResponse.getData.getUserName);
            if(loginResponse.getData && loginResponse.getData.getUserId){
              localLoader.dismiss();

              /**
               * decode user mobile num and save data
               */
              let mobile =  this.utility.getDecodeData(loginResponse.getData.getUserMobile.toString().trim());
              loginResponse.getData.setUserMobile = mobile;
              this.api.updateTokenForAPI(this.userData);
              //go to Home Screen
              this.session.set(Constants.USER_DATA,loginResponse.getData);
              this.session.set(Constants.IS_LOGIN,true);
              this.session.set(Constants.LOGIN_WITH,medium);
              //this.session.set(Constants.SESSION_GOOGLE,this.googleplus);
              //this.goToDashboard(loginResponse.getData);

              if(loginResponse.getData.getUserPpLang 
                && loginResponse.getData.getUserPpLang != null 
                && loginResponse.getData.getUserPpLang != 'null'
                && (loginResponse.getData.getUserPpLang === Constants.LANG_CODE_ENGLISH
                || loginResponse.getData.getUserPpLang === Constants.LANG_CODE_HINDI
                || loginResponse.getData.getUserPpLang === Constants.LANG_CODE_TAMIL)){
                /**
                * deault starting language
                */
                this.session.set(Constants.SELECTED_LANGUAGE,loginResponse.getData.getUserPpLang.toString().trim());
                this.utility.setDefaultLanguage(loginResponse.getData.getUserPpLang.toString().trim());
              }

              

              if(loginResponse.getData.getTOUCHID && loginResponse.getData.getTOUCHID.toString().trim() === Constants.TRUE){
                this.checkFingerAIO(loginResponse.getData);
              }else{
                // if(!loginResponse.getData.getTCFlag || loginResponse.getData.getTCFlag.toString().trim() === Constants.NO){
                //   this.gotToUpdateTerms(loginResponse.getData,false);
                // }else{
                  this.goToDashboard(loginResponse.getData);
                // }
                
              }
              
            }else{
              localLoader.dismiss();
              //go to create profile
              this.goToProfile();
            }
        }else{
          localLoader.dismiss();
          //this.goToProfile();
          if(loginResponse && loginResponse.getMessage){
            this.alertProvider.basicAlertOnPage(SocialLoginPage,null,loginResponse.getMessage,null);
          }
        }
        
      },error => {
        console.log("testing login error ========"+JSON.stringify(error));
        localLoader.dismissAll();
        //alert(strings.server_error);
        // this.alertProvider.basicAlertOnPage(SocialLoginPage,null,strings.server_error,null);

        if(error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_1) 
        || error.toString().includes(Constants.RESPONSE_WITH_STATUS_0_2)){
          this.alertProvider.basicAlertOnPage(SocialLoginPage,null, strings.please_check_internet_access, null);
        }else{
          this.alertProvider.basicAlertOnPage(SocialLoginPage,null,error.toString(), null);
        }
      },() => {
        //localLoader.dismissAll();
        // No errors, route to new page
      });
      
      // this.api.getCountries().subscribe(res=>{
      //   alert(JSON.stringify(res));
      // });
    }


     /**
     * cehck finger auth
     * 
     */
    async checkFingerAIO(userData:LoginResponseData){
      try{
      //const ready = await this.platform.ready();
    // alert("PLATFORM:"+ready);
        const available = await this.faio.isAvailable();
        //console.log("CHECK:"+available);
        //alert("CHECK:"+available);
        if(available === 'OK' || available === 'finger'){
          // if(!userData.getTCFlag || userData.getTCFlag.toString().trim() === Constants.NO){
          //   this.gotToUpdateTerms(userData,true);
          // }else{
            this.goToFingerAuth();
          // }
          //this.goToFingerAuth();
        }else{
          // if(!userData.getTCFlag || userData.getTCFlag.toString().trim() === Constants.NO){
          //   this.gotToUpdateTerms(userData,false);
          // }else{
            this.goToDashboard();
          // }
        }
      }catch(e){
        //console.error("ERROR:"+ e);
        // if(!userData.getTCFlag || userData.getTCFlag.toString().trim() === Constants.NO){
        //   this.gotToUpdateTerms(userData,false);
        // }else{
          this.goToDashboard();
        // }
      }
    }

    goToFingerAuth(){
      this.navCtrl.push(FingerAuthPage, {
  
      }).then(() => {
        let index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
    }

    ionViewWillEnter(){
      this.alertProvider.setCurrentPage(SocialLoginPage);
    }

    gotToUpdateTerms(userData:LoginResponseData,goForFingerTouch:boolean){
      this.navCtrl.push(TermsConditionUpdatePage,{
        data:"false",
        updateTerms:"updateTerms",
        user:userData,
        fingerTouch:goForFingerTouch
      }).then(() => {
        let index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
    }

    setDataForTest(){
      let data = {
        "Status": "Success",
        "Message": "Profile Data return successfully.",
        "Data": {
            "USERID": "enuke.software38@gmail.com",
            "USERNAME": "RAJ Raj",
            "USEREMAIL": "enuke.software38@gmail.com",
            "USERIDD": "+91                                                ",
            "USERMOBILE": "6532145688",
            "USERPHOTO": "https://api.headletters.com/Userimage/enuke.software38@gmail.com1542277204930.jpg",
            "USERACCOUNTNO": "100000000081",
            "UCOUNTRY": "INDIA",
            "UCURRENCY": "INR",
            "UCHARGE": "y",
            "USERPDATE": "2018-10-11T00:29:02",
            "USERPPLANG": "en",
            "USERLASTHOROID": 18,
            "PASSWORD": "HeadLetters@#!123456",
            "TOKENFACEBOOK": "undefined",
            "TOKENGOOGLE": "116919976700611146047",
            "TOKENYAHOO": "undefined",
            "TOUCHID": "F",
            "TOKEN": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyICI6ImVudWtlLnNvZnR3YXJlMzhAZ21haWwuY29tIiwicGFzc3dvcmQgIjoiSGVhZExldHRlcnNAIyExMjM0NTYiLCJzY29wZSI6Imh0dHA6Ly9kdW1teS5jb20vIn0.-2RLhMaTEQiGpuUGMUY_DIeA9F5Uuk6zMHKuTKv9cuk",
            "TCFlag": "y         "
        },
        "ErrorMessage": null
      }

      let loginResponse:LoginResponse = new LoginResponse(JSON.stringify(data));

      if(loginResponse && loginResponse.getStatus === 'Success'){
        this.session.set("GPLUS",this.googleplus);
        this.session.set("FACEBOOK",this.facebook);
        //alert('STATUS '+loginResponse.getStatus);
        //alert('NAME '+loginResponse.getData.getUserName);
          if(loginResponse.getData && loginResponse.getData.getUserId){

            /**
             * decode user mobile num and save data
             */
            let mobile =  this.utility.getDecodeData(loginResponse.getData.getUserMobile.toString().trim());
            loginResponse.getData.setUserMobile = mobile;
            this.api.updateTokenForAPI(this.userData);
            //go to Home Screen
            this.session.set(Constants.USER_DATA,loginResponse.getData);
            this.session.set(Constants.IS_LOGIN,true);
            this.session.set(Constants.LOGIN_WITH,Constants.medium_gmail);
            //this.session.set(Constants.SESSION_GOOGLE,this.googleplus);
            //this.goToDashboard(loginResponse.getData);

            if(loginResponse.getData.getUserPpLang 
              && loginResponse.getData.getUserPpLang != null 
              && loginResponse.getData.getUserPpLang != 'null'
              && (loginResponse.getData.getUserPpLang === Constants.LANG_CODE_ENGLISH
              || loginResponse.getData.getUserPpLang === Constants.LANG_CODE_HINDI
              || loginResponse.getData.getUserPpLang === Constants.LANG_CODE_TAMIL)){
              /**
              * deault starting language
              */
              this.session.set(Constants.SELECTED_LANGUAGE,loginResponse.getData.getUserPpLang.toString().trim());
              this.utility.setDefaultLanguage(loginResponse.getData.getUserPpLang.toString().trim());
            }

            

            if(loginResponse.getData.getTOUCHID && loginResponse.getData.getTOUCHID.toString().trim() === Constants.TRUE){
              this.checkFingerAIO(loginResponse.getData);
            }else{
              // if(!loginResponse.getData.getTCFlag || loginResponse.getData.getTCFlag.toString().trim() === Constants.NO){
              //   this.gotToUpdateTerms(loginResponse.getData,false);
              // }else{
                this.goToDashboard(loginResponse.getData);
              // }
              
            }
            
          }else{
            //go to create profile
            this.goToProfile();
          }
      }
    }
}
