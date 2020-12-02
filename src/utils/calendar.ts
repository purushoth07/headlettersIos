import * as Constants from './constants'
import * as strings from './strings';

export class MyCalendar{
  date31 : number[] = []//[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  date30 : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  date29 : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
  date28 : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
  month : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  monthNames : string[] = [strings.month_jan,
    strings.month_feb,
    strings.month_mar,
    strings.month_apr,
    strings.month_may,
    strings.month_jun,
    strings.month_jul,
    strings.month_aug,
    strings.month_sep,
    strings.month_oct,
    strings.month_nov,
    strings.month_dec];
  year : number[] = [];
  selectedDate:string;
  selectedMonth:string;
  selectedMonthName:string;
  selectedYear:string;
  selectedYearShort:string;
  public currentYear:number;
  public currentMonth:number;
  public currentDate:number;
  public calendarFor:number = 0;

  constructor (calendarFor?:number){
    this.calendarFor = calendarFor;
    for(let i = 1;i<=31;i++){
      this.date31.push(Number(i));
    }
  }

  // MyCalendar():MyCalendar{
  //   //this.calendarFor = calendarFor;
  //   return this;
  // }

  isLeapYear(year:number){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  set previousYears(currentYear:number){
      this.currentYear = currentYear;
      this.year.push(currentYear);
      for(let i=1;i<=100;i++){
          this.year.push(currentYear-i);
      }
  }

  set previousYearsForStatement(currentYear:number){
    this.currentYear = currentYear;
      this.year.push(currentYear);
      for(let i=1;i<=10;i++){
          this.year.push(currentYear-i);
      }
  }

  set setCurrentMonth(currentMonth:number){
    this.currentMonth = currentMonth+1;
  }

  set setCurrentDate(currentDate:number){
    this.currentDate = currentDate;
  }

   get dates(): number[]{
     if(this.selectedYear 
      && this.selectedMonth
      && Number(this.selectedYear) == this.currentYear 
      && Number(this.selectedMonth) == this.currentMonth){

        if(this.calendarFor == Constants.CALENDAR_FOR_OWNER_DOB
          || this.calendarFor == Constants.CALENDAR_FOR_MARRIAGE
          || this.calendarFor == Constants.CALENDAR_FOR_DEMISE){
          const d = this.date31.filter(item => item < this.currentDate);
          return d;    
        }else{
          const d = this.date31.filter(item => item <= this.currentDate);
          return d;    
        }
     }
      if(this.selectedMonth){
        if(this.selectedMonth == "2"){
          if(this.selectedYear && this.isLeapYear(Number(this.selectedYear))){
            return this.date29;
          }else{
            return this.date28;
          }
        }else if(this.selectedMonth == "4"
          || this.selectedMonth == "6"
          || this.selectedMonth == "9"
          || this.selectedMonth == "11"){
          return this.date30;
       }else{
         return this.date31;
       }
     }else{
       return this.date31;
     }
   }

   get months():number[]{
     if(this.selectedYear && (this.currentYear == Number(this.selectedYear))){
      const m = this.month.filter(item => item <= this.currentMonth);
      return m;
      //alert(m.toString());
     }else{
      return this.month;
     }
   }

   get years():number[]{
     return this.year;
   }

   set setSelectedDate(date:string){
        this.selectedDate = date;
    }

    get getSelectedDate():string{
         return this.selectedDate;
     }

    set setSelectedMonth(month:string){
         this.selectedMonth = month;
         this.selectedMonthName = this.monthNames[Number(this.selectedMonth)-1];
    }

    get getSelectedMonth():string{
         return this.selectedMonth;
     }

    get getSelectedMonthName():string{
      if(this.selectedMonthName){
        return this.selectedMonthName;
      }else if(this.selectedMonth){
        return this.selectedMonthName = this.monthNames[Number(this.selectedMonth)-1];
      }else{
        return;
      }
    }

    public getMonthNumberFromName(name:string){
        for(let i=0;i<12;i++){
            if(this.monthNames[i] === name){
                return this.months[i].toString();
            }
        }
    }

     set setSelectedYear(year:string){
          this.selectedYear = year;
          try{
            if(year.toString().length >2){
              this.selectedYearShort = year.toString().substring(2,4);
            }else{
              this.selectedYearShort = year;
            }
          }catch(e){
            
          }
     }

     get getSelectedYear():string{
          return this.selectedYear;
    }

    get getSelectedYearShort():string{
      return this.selectedYearShort;
    }

    get getCurrentDate():string{
      return this.currentDate.toString();
    }

    get getCurrentMonth():string{
      return this.currentMonth.toString();
    }

    get getCurrentYearShort():string{
      return this.currentYear.toString().substring(2,4);
    }

    get getCurrentYear():string{
      return this.currentYear.toString();
    }


}
