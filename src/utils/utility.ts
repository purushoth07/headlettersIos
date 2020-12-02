import {LoadingController, NavController,ToastController} from 'ionic-angular';
import * as Constants from './constants'
import * as strings from './strings'

////export default class Utility{
    //  toastCtrl:ToastController;

    //  export function showToast(msg:string) {
    //     // let toast = this.toastCtrl.create({
    //     //     message: msg,
    //     //     duration: 3000,
    //     //     position: 'bottom'
    //     // });
    
    //     // toast.onDidDismiss(() => {
    //     //     console.log('Dismissed toast');
    //     // });
    
    //     // toast.present();
    //     console.log('toast');
    //     return;
    // }

//}


function getDateFromComplete(d:string,type:number):string{
    let date = new Date(d);
    switch(type){
        case Constants.CALENDAR_DATE:
            return this.datePipe.transform(date, 'dd');
        case Constants.CALENDAR_MONTH:
            return this.datePipe.transform(date, 'MM');
        case Constants.CALENDAR_YEAR:
            return this.datePipe.transform(date, 'yy');
        case Constants.CALENDAR_MONTH_NAME:
            return this.datePipe.transform(date, 'MMM');
        case Constants.CALENDAR_YEAR_FULL:
            return this.datePipe.transform(date, 'yyyy');
    }
}

function getTimeFromComplete(d:string,type:number):string{
  let date = new Date(d);
  switch(type){
    case Constants.TIME_HOUR:
      return this.datePipe.transform(date, 'hh');
    case Constants.TIME_MIN:
      return this.datePipe.transform(date, 'mm');
    case Constants.TIME_SEC:
      return this.datePipe.transform(date, 'ss');
    case Constants.TIME_AM_PM:
      let h =  this.datePipe.transform(date, 'HH');
      if(Number(h)>12){
        return 'PM';
      }else{
        return 'AM';
      }
  }
}