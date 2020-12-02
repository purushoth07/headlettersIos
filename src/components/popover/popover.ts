import { Component } from '@angular/core';
import * as Constants from '../../utils/constants'
import { ViewController, NavParams } from 'ionic-angular';
import { CountryResponseData } from '../../api/response/country_response_data';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  descending: boolean = false;
  order: number;

  items:any;
  //countryList:CountryResponseData[]=[]
  isLanguage: boolean = false;
  isCountry:boolean = false;
  isGender:boolean = false;
  isDate:boolean = false;
  isMonth:boolean = false;
  isYear:boolean = false;
  isHour:boolean = false;
  isMin:boolean = false;
  isSec:boolean = false;
  isAmPm:boolean = false;
  isMenu:boolean = false;
  isHoroscopeName:boolean = false;
  isCalendar:boolean = false;
  isBirthOrder = false;


  constructor(public viewCtrl:ViewController,
    public navParams:NavParams,
    public translate:TranslateService) {
    //console.log("POP",this.navParams.data);
   
    this.sort();
    
    if(navParams && navParams.get('type')){
      if(navParams.get('type') === Constants.POPOVER_LANGUAGE){
        this.isLanguage = true;
        this.items = navParams.get('data');
      }else if(navParams.get('type') === Constants.POPOVER_GENDER){
        this.isGender = true;
        this.items = navParams.get('data');
      }else if(navParams.get('type') === Constants.POPOVER_COUNTRY){
        this.isCountry = true;
        this.items = navParams.get('data');
      //this.countryList = navParams.get('data');
      }else if(navParams.get('type') === Constants.POPOVER_DATE){
        this.isDate = true;
        let dates = navParams.get('data');
        for(let date of dates){
            if(!this.items){
              this.items = [];
            }
            this.items.push({item:date});
        }
      }else if(navParams.get('type') === Constants.POPOVER_MONTH){
        this.isMonth = true;
        let months = navParams.get('data');
        for(let month of months){
            if(!this.items){
              this.items = [];
            }
            this.items.push({item:month});
        }
      }else if(navParams.get('type') === Constants.POPOVER_YEAR){
        this.isYear = true;
        let years = navParams.get('data');
        for(let year of years){
            if(!this.items){
              this.items = [];
            }
            this.items.push({item:year});
        }
      }else if(navParams.get('type') === Constants.POPOVER_HOUR){
          this.isHour = true;
          let hours = navParams.get('data');
          for(let hour of hours){
            if(!this.items){
              this.items = [];
            }
            this.items.push({item:hour});
        }
      }else if(navParams.get('type') === Constants.POPOVER_MIN){
        this.isMin = true;
        let mins = navParams.get('data');
        for(let min of mins){
          if(!this.items){
            this.items = [];
          }
          this.items.push({item:min});
        }
      }else if(navParams.get('type') === Constants.POPOVER_SEC){
          this.isSec = true;
          let seconds = navParams.get('data');
          for(let sec of seconds){
            if(!this.items){
              this.items = [];
            }
            this.items.push({item:sec});
          }

      }else if(navParams.get('type') === Constants.POPOVER_AM_PM){
        this.isAmPm = true;
        let aps = navParams.get('data');
        for(let ap of aps){
          if(!this.items){
            this.items = [];
          }
          this.items.push({item:ap});
        }
      }else if(navParams.get('type') === Constants.POPOVER_HOROSCOPE_MENU){
        this.isMenu = true;
        this.items = navParams.get('data');
      }else if(navParams.get('type') === Constants.POPOVER_HOROSCOPE_NAME){
        this.isHoroscopeName = true;
        let aps = navParams.get('data');
        for(let ap of aps){
          if(!this.items){
            this.items = [];
          }
          this.items.push({item:ap});
        }
      } else if(navParams.get('type') === Constants.POPOVER_CALENDAR){
          this.isCalendar = true;

      }else if(navParams.get('type') === Constants.POPOVER_BIRTH_ORDER){
        this.isBirthOrder = true;
        this.items = navParams.get('data');
      }

    }
    
    // this.items=[
    //   {item:Constants.LANG_ENGLISH},
    //   {item:Constants.LANG_HINDI},
    //   {item:Constants.LANG_TAMIL}
    // ]
  }

  itemClick(item){
    //alert("CLICKED " + item.item );
    this.viewCtrl.dismiss(item);
  }

  onChange($event) {
    //let date = new Date($event).getTime();
    this.viewCtrl.dismiss($event);
  }

   /**
     * sorting country list by name
     */
    sort(){
      this.descending = !this.descending;
      this.order = this.descending ? 1 : -1;
    }

}
