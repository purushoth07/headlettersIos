import { Component } from '@angular/core';
import * as Constants from '../../utils/constants'
import { ViewController, NavParams, PopoverController } from 'ionic-angular';
import { CountryResponseData } from '../../api/response/country_response_data';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { MyCalendar } from '../../utils/calendar';
import { PopoverComponent } from '../popover/popover';
import { AlertProvider } from '../../providers/alert/alert';
import * as strings from '../../utils/strings'
import { BalanceStatementPage } from '../../pages/balance-statement/balance-statement';

/**
 * Generated class for the DatePopoverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'date-popover',
  templateUrl: 'date-popover.html'
})
export class DatePopoverComponent {

  statementCalendar: MyCalendar = new MyCalendar(Constants.CALENDAR_FOR_STATEMENT);
  mainPopOver:any;

  constructor(public viewCtrl:ViewController,
    public navParams:NavParams,
    public translate:TranslateService,
    public alertProvider: AlertProvider,
    private popOverController: PopoverController) {
    //console.log('Hello DatePopoverComponent Component');

    if(navParams.get('data')){
      this.statementCalendar = navParams.get('data');
    }

    viewCtrl.onWillDismiss(data=>{
      if(this.mainPopOver){
        this.mainPopOver.dismiss();
        this.mainPopOver = null;
      }
    });

  }


  showStatmentCalendarList(type: number) {
    let popover: any;
    if (type == Constants.CALENDAR_DATE) {
      popover = this.popOverController.create(PopoverComponent, { type: Constants.POPOVER_DATE, data: this.statementCalendar.dates });
      this.mainPopOver = popover;
      popover.present({
        //ev:myEvent
      });


    } else if (type == Constants.CALENDAR_MONTH) {
      let monthNames: string[] = [];
      if (this.statementCalendar.selectedYear
        && Number(this.statementCalendar.getSelectedYear) == this.statementCalendar.currentYear) {
        for (let i = 0; i < this.statementCalendar.monthNames.length; i++) {
          if (i < this.statementCalendar.currentMonth) {
            monthNames.push(this.statementCalendar.monthNames[i])
          }

        }
      } else {
        monthNames = this.statementCalendar.monthNames;
      }
      popover = this.popOverController.create(PopoverComponent, { type: Constants.POPOVER_MONTH, data: monthNames });
      this.mainPopOver = popover;
      popover.present({
        // ev:myEvent
      });
    } else if (type == Constants.CALENDAR_YEAR) {
      popover = this.popOverController.create(PopoverComponent, { type: Constants.POPOVER_YEAR, data: this.statementCalendar.year });
      this.mainPopOver = popover;
      popover.present({
        //ev:myEvent
      });
    }


    popover.onDidDismiss(popOverData => {
      this.mainPopOver = null;
      if (!popOverData) {
        return;
      }

      if (type == Constants.CALENDAR_DATE) {
        //this.ownerDOBCalendar.setSelectedDate = popOverData.item;
      } else if (type == Constants.CALENDAR_MONTH) {
        //get month nummber from name
        this.statementCalendar.setSelectedMonth = this.statementCalendar.getMonthNumberFromName(popOverData.item);
        //this.ownerDOBCalendar.setSelectedMonth=popOverData.item;

      } else if (type == Constants.CALENDAR_YEAR) {
        this.statementCalendar.setSelectedYear = popOverData.item;

        if (this.statementCalendar.getSelectedMonth) {

          if (Number(this.statementCalendar.getSelectedYear) == this.statementCalendar.currentYear) {
            if (Number(this.statementCalendar.getSelectedMonth) > this.statementCalendar.currentMonth) {
              this.statementCalendar.setSelectedMonth = null
            } else if (Number(this.statementCalendar.getSelectedMonth) == this.statementCalendar.currentMonth) {
              if (this.statementCalendar.getSelectedDate
                && (Number(this.statementCalendar.getSelectedDate) >= this.statementCalendar.currentDate)) {
                this.statementCalendar.setSelectedDate = null
              }
            }
          }
          else if (this.statementCalendar.getSelectedMonth == "2") {
            if (this.statementCalendar.getSelectedDate) {
              if (this.statementCalendar.getSelectedYear
                && this.statementCalendar.isLeapYear(Number(this.statementCalendar.getSelectedYear))) {
                if (Number(this.statementCalendar.getSelectedDate) > 29) {
                  this.statementCalendar.setSelectedDate = null//"29";
                }
              }
              else if (Number(this.statementCalendar.getSelectedDate) > 28) {
                this.statementCalendar.setSelectedDate = null//"28";
              }
            }
          } else if (this.statementCalendar.getSelectedMonth == "4"
            || this.statementCalendar.getSelectedMonth == "6"
            || this.statementCalendar.getSelectedMonth == "9"
            || this.statementCalendar.getSelectedMonth == "11") {
            if (this.statementCalendar.getSelectedDate && Number(this.statementCalendar.getSelectedDate) > 30) {
              this.statementCalendar.setSelectedDate = null//"30";
            }
          }
        }
      }

      //console.log("Month:" + this.statementCalendar.getSelectedMonth + " Year:" + this.statementCalendar.getSelectedYear);
    });
  }

  okClick(){
    //alert("CLICKED " + item.item );
    if(!this.validate){
      return;
    }
    this.viewCtrl.dismiss(this.statementCalendar);
  }

  cancelClick(){
    //alert("CLICKED " + item.item );
    this.viewCtrl.dismiss();
  }

  public dismissDatesPopOver(){

  }

  validate(): boolean {

    let valid = true;
    if (!this.statementCalendar.getSelectedMonth) {
      valid = false;
      this.alertProvider.basicAlertOnPage(BalanceStatementPage, null, strings.please_select_month, null);
    }
    else if (!this.statementCalendar.getSelectedYear) {
      this.alertProvider.basicAlertOnPage(BalanceStatementPage,null, strings.please_select_year, null);
      valid = false;
    }

    return valid;

  }

}
