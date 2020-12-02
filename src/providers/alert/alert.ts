import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController , LoadingController , ToastController} from 'ionic-angular';
import * as Constants from '../../utils/constants'
import * as strings from '../../utils/strings'
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
// import { Page } from 'ionic-angular/umd/navigation/nav-util';
//import { Page } from 'ionic-angular/navigation/nav-util';
/*
  Generated class for the AlertProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertProvider {

  alerts:any;
  currentpage:any;

  constructor(public http: Http,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl:AlertController,
    public translate:TranslateService) {
    //console.log('Hello AlertProvider Provider');
  }

  setCurrentPage(page:any){
      this.currentpage = page;
  }

  basicAlertOnPage(myPage:any,title?:string,message?:string,buttonText?:string) {
    let myTitle =  title?title: strings.alert;
    let myButtontext = buttonText?buttonText:strings.ok;

    if(this.translate.currentLang != Constants.LANG_CODE_ENGLISH){
      this.translate.get(myTitle).subscribe(
        value => {
          // value is our translated string
          myTitle = value;
        }
      )
  
      this.translate.get(message).subscribe(
        value => {
          // value is our translated string
          message = value;
        }
      )
      
      this.translate.get(myButtontext).subscribe(
        value => {
          // value is our translated string
          myButtontext = value;
        }
      )
    }
   

    let alert = this.alertCtrl.create({
      title: myTitle,
      subTitle: message,
      buttons: [myButtontext]
    });

    if(myPage === this.currentpage){
      if(!this.alerts){
        this.alerts = [];
      }else{
        this.alerts.push(alert);
      }
      alert.present();
    }
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  basicAlert(title?:string,message?:string,buttonText?:string) {
    let myTitle =  title?title: strings.alert;
    let myButtontext = buttonText?buttonText:strings.ok;

    this.translate.get(myTitle).subscribe(
      value => {
        // value is our translated string
        myTitle = value;
      }
    )

    this.translate.get(message).subscribe(
      value => {
        // value is our translated string
        message = value;
      }
    )

    this.translate.get(myButtontext).subscribe(
      value => {
        // value is our translated string
        myButtontext = value;
      }
    )

    let alert = this.alertCtrl.create({
      title: myTitle,
      subTitle: message,
      buttons: [myButtontext]
    });
    

     alert.present();
    
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  dismiss(){
    // if(this.mainAlert){
    //   this.mainAlert.dismiss();
    //   this.mainAlert = null;
    // }

    if(this.alerts && this.alerts.length>0){
        for(let item of this.alerts){
            if(item){
              item.dismiss();
            }
        }
      this.alerts = [];
    }
  }

} 
