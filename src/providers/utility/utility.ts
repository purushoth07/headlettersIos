import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import * as strings from '../../utils/strings';
import * as Constants from '../../utils/constants';
import { SocialLoginPage } from '../../pages/social-login/social-login';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilityProvider {

  private user: firebase.User;

  constructor(public http: Http, public translate:TranslateService,public afAuth: AngularFireAuth) {
    //console.log('Hello UtilityProvider Provider');
    afAuth.authState.subscribe(user => {
			this.user = user;
		});
    try{
      this.changeLoadingTextLanguage();
    }catch(e){
      
    }
    
  }

  getEncodeData(data:string):string{
    // var phno = "1234568";
    // var data2= window.btoa(phno);
    // alert(data2);
    // var decodedata2=window.atob(data2);   //MTIzNDU2OA==
    // alert(decodedata2);
    if(!data || data === ""){
        return data;
    }

    //return window.btoa(data);
    var encoded = window.btoa(data);
    return window.atob(encoded);
  }

  getDecodeData(data:string):string{
    if(!data || data === ""){
        return data;
    }

   // return window.atob(data);

    var decoded = window.btoa(data);
    return window.atob(decoded);
  }

  setDefaultLanguage(code:string){
    this.translate.setDefaultLang(code);
    switch(code){
      case Constants.LANG_CODE_ENGLISH:
        this.setEnglishLanguage();
        break;
      case Constants.LANG_CODE_HINDI:
        this.setHindiLanguage();
        break;
      case Constants.LANG_CODE_TAMIL:
        this.setTamilLanguage();
        break;
      
    }
  }

  setEnglishLanguage(){
    this.translate.use(Constants.LANG_CODE_ENGLISH);
    this.changeLoadingTextLanguage();
  }

  setHindiLanguage(){
    this.translate.use(Constants.LANG_CODE_HINDI);
    this.changeLoadingTextLanguage();
  }

  setTamilLanguage(){
    this.translate.use(Constants.LANG_CODE_TAMIL);
    this.changeLoadingTextLanguage();
  }

  changeLoadingTextLanguage(){
    this.translate.get(strings.please_wait).subscribe(
      value => {
        // value is our translated string
        strings.loader.loader_text = value;
      }
    )
  }

  getCurrentLanguage(){
    return this.translate.currentLang;
  }
  
  // logoutSession (session,navCtrl){
  //  // new Promise((resolve, reject) => {
  //     session.clear().then(() => {
  //       navCtrl.setRoot(SocialLoginPage)
  //       navCtrl.popToRoot;
  //       //resolve();
  //       // this.navCtrl.push(SocialLoginPage, {
  //       // }).then(() => {
  //       //    let index = this.viewCtrl.index;
  //       //    this.navCtrl.remove(index);
  //       //   resolve();
  //       // });
  //     });
       
  //  // });
  // }



  logoutSession(session,navCtrl,root){
   // this.signOut().then(() =>{
      session.clear().then(() => {
        navCtrl.setRoot(root);
        navCtrl.popToRoot;
     });
    //});
  }


  signOut():Promise<void>{
    return this.afAuth.auth.signOut();
  }

}
