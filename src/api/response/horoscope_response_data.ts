import * as Utility from '../../utils/utility'
import * as Constants from '../../utils/constants'
import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';

//import myFunc = require('../../utils/utility');

//myFunc.someFunction();

export class HoroscopeResponseData {

    public datePipe = new DatePipe("en-US");

    private HUSERID: string;
    private HID: string;
    private HNAME: string;
    private HNATIVEPHOTO: string;
    private HHORSCOPEPHOTO: string;
    private HGENDER: string;
    private HDOBNATIVE: string;
    private HHOURS: number;
    private HMIN: number;
    private HSS: number;
    private HAMPM: string;
    private HPLACE: string;
    private HLANDMARK: string;
    private HMARRIAGEDATE: string;
    private HMARRIAGEPLACE: string;
    private HMARRIAGETIME: string;
    private HMARRIAGEAMPM: string;
    private HFIRSTCHILDDATE: string;
    private HFIRSTCHILDPLACE: string;
    private HFIRSTCHILDTIME: string;
    private HFIRSTCHILDTIMEAMPM: string;
    private HATDATE: string;
    private HATPLACE: string;
    private HATTIME: string;
    private HATTAMPM: string;
    private HAFLIGHTNO: string;
    private HCRDATE: string;
    private HCRTIME: string;
    private HCRPLACE: string;
    private HCRTAMPM: string;
    private HDRR: string;
    private HDRRD: string;
    private HDRRT: string;
    private HDRRP: string;
    private HDRRTAMPM: string;
    private RECTIFIEDDST: number;
    private RECTIFIEDDATE: string;
    private RECTIFIEDTIME: string;
    private RECTIFIEDPLACE: string;
    private RECTIFIEDLONGTITUDE: string;
    private RECTIFIEDLONGTITUDEEW: string;
    private RECTIFIEDLATITUDE: string;
    private RECTIFIEDLATITUDENS: string;
    private HPDF: string;
    private LASTREQUESTID: number;
    private LASTMESSAGEID: number;
    private LASTWPDATE: string;
    private LASTDPDATE: string;
    private HLOCKED: string;
    private HRECDELETED: string;
    private HCREATIONDATE: string;
    private HRECDELETEDD: string;
    private HTOTALTRUE: number;
    private HTOTALFALSE: number;
    private HTOTALPARTIAL: number;
    private HUNIQUE: number;
    private HSTATUS: string;
    private REPEATREQUEST:string;
    private HBIRTHORDER:string;

    private ownerDob:string;
    
    public ownerDobDate:string;
    public ownerDobMonth:string;
    public ownerDobYear:string;
    public ownerDobTimeAmPm:string;
    public ownerDobTimeHour:string;
    public ownerDobTimeMin:string;
    public ownerDobTimeSec:string;

    public marriageDay:string;
    public marriageMonth:string;
    public marriageYear:string;
    public marriageAmPm:string;
    public marriageHour:string;
    public marriageMin:string;
    public marriageSec:string;

    public childBirthDay:string;
    public childBirthMonth:string;
    public childBirthYear:string;
    public childBirthAmPm:string;
    public childBirthHour:string;
    public childBirthMin:string;
    public childBirthSec:string;

    public travelDay:string;
    public travelMonth:string;
    public travelYear:string;
    public travelAmPm:string;
    public travelHour:string;
    public travelMin:string;
    public travelSec:string;

    public lastCallDay:string;
    public lastCallMonth:string;
    public lastCallYear:string;
    public lastCallAmPm:string;
    public lastCallHour:string;
    public lastCallMin:string;
    public lastCallSec:string;

    public demiseDay:string;
    public demiseMonth:string;
    public demiseYear:string;
    public demiseAmPm:string;
    public demiseHour:string;
    public demiseMin:string;
    public demiseSec:string;

    public filePath:Blob;
    public fileName:string;

    constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                this[prop] = jsonObj[prop];
                // try{
                //     if(prop === "HDOBNATIVE"){
                //         //this.setHDobNative(JSON.stringify(jsonObj[prop]));
                //         //let d = JSON.stringify(jsonObj[prop]);
                //         this.ownerDob = this.getFormattedDate(JSON.stringify(jsonObj[prop]));
                //     }else{
                //         this[prop] = jsonObj[prop];
                //     }
                // }catch(e){
                    
                // }
            }
            
        }catch(e){
            
        }

       
    }
    
    public get getOwnerDob():string{ 
        if(!this.ownerDob){
            return this.ownerDob = this.getFormattedDob(this.HDOBNATIVE);
        }else{
            return this.ownerDob;
        } 
    }
    
    public getOwnerDobToShow(translate:TranslateService):string{ 
        this.ownerDob = this.getFormattedDob(this.HDOBNATIVE,translate);
        return this.ownerDob;
    }
    
    public get getHUserId():string{ 
        return this.HUSERID; 
    }
    
    
    public set setHUserId(value :string){ 
        this.HUSERID = value; 
    }
    
    
    public get getHId():string{ 
        return this.HID; 
    }
    
    
    public set setHId(value :string){ 
        this.HID = value; 
    }
    
    
    public get getHName():string{ 
        return this.HNAME; 
    }
    
    
    public set setHName(value :string){ 
        this.HNAME = value; 
    }
    
    
    public get getHNativePhoto():string{ 
        // if(!this.HNATIVEPHOTO){
        //     this.HNATIVEPHOTO = "assets/images/upload-profile.svg";
        // }
        return this.HNATIVEPHOTO; 
    }
    
    
    public set setHNativePhoto(value :string){ 
        this.HNATIVEPHOTO = value; 
    }
    
    
    public get getHHorscopePhoto():string{ 
        return this.HHORSCOPEPHOTO; 
    }
    
    
    public set setHHorscopePhoto(value :string){ 
        this.HHORSCOPEPHOTO = value; 
    }
    
    
    public get getHGender():string{ 
        return this.HGENDER; 
    }
    
    
    public set setHGender(value :string){ 
        this.HGENDER = value; 
    }
    
    
    public get getHDobNative():string{ 
        return this.HDOBNATIVE; 
    }
    
    
    public set setHDobNative(value :string){ 
        this.HDOBNATIVE = value; 
        try{
            this.ownerDob = this.getFormattedDate(value);
        }catch(e){
            //console.log("DOB ERROR" + value + JSON.stringify(e));
        }
        
    }
    
    
    public get getHHours():number{ 
        return this.HHOURS; 
    }
    
    
    public set setHHours(value :number){ 
        this.HHOURS = value; 
    }
    
    
    public get getHMin():number{ 
        return this.HMIN; 
    }
    
    
    public set setHMin(value :number){ 
        this.HMIN = value; 
    }
    
    
    public get getHSs():number{ 
        return this.HSS; 
    }
    
    
    public set setHSs(value :number){ 
        this.HSS = value; 
    }
    
    
    public get getHAmpm():string{ 
        return this.HAMPM; 
    }
    
    
    public set setHAmpm(value :string){ 
        this.HAMPM = value; 
    }
    
    
    public get getHPlace():string{ 
        return this.HPLACE; 
    }
    
    
    public set setHPlace(value :string){ 
        this.HPLACE = value; 
    }
    
    
    
    public get getHLandmark():string{ 
        return this.HLANDMARK; 
    }
    
    
    public set setHLandmark(value :string){ 
        this.HLANDMARK = value; 
    }
    
    
    public get getHMarriageDate():string{ 
        return this.HMARRIAGEDATE; 
    }
    
    
    public set setHMarriageDate(value :string){ 
        this.HMARRIAGEDATE = value; 
    }
    
    
    public get getHMarriagePlace():string{ 
        return this.HMARRIAGEPLACE; 
    }
    
    
    public set setHMarriagePlace(value :string){ 
        this.HMARRIAGEPLACE = value; 
    }
    
    
    public get getHMarriageTime():string{ 
        return this.HMARRIAGETIME; 
    }
    
    
    public set setHMarriageTime(value :string){ 
        this.HMARRIAGETIME = value; 
    }
    
    
    public get getHMarriageAmpm():string{ 
        return this.HMARRIAGEAMPM; 
    }
    
    
    public set setHMarriageAmpm(value :string){ 
        this.HMARRIAGEAMPM = value; 
    }
    
    
    public get getHFirstChildDate():string{ 
        return this.HFIRSTCHILDDATE; 
    }
    
    
    public set setHFirstChildDate(value :string){ 
        this.HFIRSTCHILDDATE = value; 
    }
    
    
    public get getHFirstChildPlace():string{ 
        return this.HFIRSTCHILDPLACE; 
    }
    
    
    public set setHFirstChildPlace(value :string){ 
        this.HFIRSTCHILDPLACE = value; 
    }
    
    
    public get getHFirstChildTime():string{ 
        return this.HFIRSTCHILDTIME; 
    }
    
    
    public set setHFirstChildTime(value :string){ 
        this.HFIRSTCHILDTIME = value; 
    }
    
    
    public get getHFirstChildTimeAmpm():string{ 
        return this.HFIRSTCHILDTIMEAMPM; 
    }
    
    
    public set setHFirstChildTimeAmpm(value :string){ 
        this.HFIRSTCHILDTIMEAMPM = value; 
    }
    
    
    public get getHAtDate():string{ 
        return this.HATDATE; 
    }
    
    
    public set setHAtDate(value :string){ 
        this.HATDATE = value; 
    }
    
    
    public get getHAtPlace():string{ 
        return this.HATPLACE; 
    }
    
    
    public set setHAtPlace(value :string){ 
        this.HATPLACE = value; 
    }
    
    
    public get getHAtTime():string{ 
        return this.HATTIME; 
    }
    
    
    public set setHAtTime(value :string){ 
        this.HATTIME = value; 
    }
    
    
    public get getHAtTAmpm():string{ 
        return this.HATTAMPM; 
    }
    
    
    public set setHAtTAmpm(value :string){ 
        this.HATTAMPM = value; 
    }
    
    
    public get getHAFlightNo():string{ 
        return this.HAFLIGHTNO; 
    }
    
    
    public set setHAFlightNo(value :string){ 
        this.HAFLIGHTNO = value; 
    }
    
    
    public get getHCrDate():string{ 
        return this.HCRDATE; 
    }
    
    
    public set setHCrDate(value :string){ 
        this.HCRDATE = value; 
    }
    
    
    public get getHCrTime():string{ 
        return this.HCRTIME; 
    }
    
    
    public set setHCrTime(value :string){ 
        this.HCRTIME = value; 
    }
    
    
    public get getHCrPlace():string{ 
        return this.HCRPLACE; 
    }
    
    
    public set setHCrPlace(value :string){ 
        this.HCRPLACE = value; 
    }
    
    
    public get getHCrTAmpm():string{ 
        return this.HCRTAMPM; 
    }
    
    
    public set setHCrTAmpm(value :string){ 
        this.HCRTAMPM = value; 
    }
    
    
    public get getHDrr():string{ 
        return this.HDRR; 
    }
    
    
    public set setHDrr(value :string){ 
        this.HDRR = value; 
    }
    
    
    public get getHDrrD():string{ 
        return this.HDRRD; 
    }
    
    
    public set setHDrrD(value :string){ 
        this.HDRRD = value; 
    }
    
    
    public get getHDrrT():string{ 
        return this.HDRRT; 
    }
    
    
    public set setHDrrT(value :string){ 
        this.HDRRT = value; 
    }
    
    
    public get getHDrrP():string{ 
        return this.HDRRP; 
    }
    
    
    public set setHDrrP(value :string){ 
        this.HDRRP = value; 
    }
    
    
    public get getHDrrTAmpm():string{ 
        return this.HDRRTAMPM; 
    }
    
    
    public set setHDrrTAmpm(value :string){ 
        this.HDRRTAMPM = value; 
    }
    
    
    public get getRectifiedDst():number{ 
        return this.RECTIFIEDDST; 
    }
    
    
    public set setRectifieDdst(value :number){ 
        this.RECTIFIEDDST = value; 
    }
    
    
    public get getRectifiedDate():string{ 
        return this.RECTIFIEDDATE; 
    }
    
    
    public set setRectifiedDate(value :string){ 
        this.RECTIFIEDDATE = value; 
    }
    
    
    public get getRectifiedTime():string{ 
        return this.RECTIFIEDTIME; 
    }
    
    
    public set setRectifiedTime(value :string){ 
        this.RECTIFIEDTIME = value; 
    }
    
    
    public get getRectifiedPlace():string{ 
        return this.RECTIFIEDPLACE; 
    }
    
    
    public set setRectifiedPlace(value :string){ 
        this.RECTIFIEDPLACE = value; 
    }
    
    
    public get getRectifiedLongtitude():string{ 
        return this.RECTIFIEDLONGTITUDE; 
    }
    
    
    public set setRectifiedLongtitude(value :string){ 
        this.RECTIFIEDLONGTITUDE = value; 
    }
    
    
    public get getRectifiedLongtitudeEw():string{ 
        return this.RECTIFIEDLONGTITUDEEW; 
    }
    
    
    public set setRectifiedLongtitudeEw(value :string){ 
        this.RECTIFIEDLONGTITUDEEW = value; 
    }
    
    
    public get getRectifiedLatitude():string{ 
        return this.RECTIFIEDLATITUDE; 
    }
    
    
    public set setRectifiedLatitude(value :string){ 
        this.RECTIFIEDLATITUDE = value; 
    }
    
    
    public get getRectifiedLatitudeNs():string{ 
        return this.RECTIFIEDLATITUDENS; 
    }
    
    
    public set setRectifiedLatitudeNs(value :string){ 
        this.RECTIFIEDLATITUDENS = value; 
    }
    
    
    public get getHPdf():string{ 
        return this.HPDF; 
    }
    
    
    public set setHPdf(value :string){ 
        this.HPDF = value; 
    }
    
    
    public get getLastRequestId():number{ 
        return this.LASTREQUESTID; 
    }
    
    
    public set setLastRequestId(value :number){ 
        this.LASTREQUESTID = value; 
    }
    
    
    public get getLastMessageId():number{ 
        return this.LASTMESSAGEID; 
    }
    
    
    public set setLastmessageId(value :number){ 
        this.LASTMESSAGEID = value; 
    }
    
    
    public get getLastWpDate():string{ 
        return this.LASTWPDATE; 
    }
    
    
    public set setLastWpDate(value :string){ 
        this.LASTWPDATE = value; 
    }
    
    
    public get getLastDpDate():string{ 
        return this.LASTDPDATE; 
    }
    
    
    public set setLastDpDate(value :string){ 
        this.LASTDPDATE = value; 
    }
    
    
    public get getHLocked():string{ 
        return this.HLOCKED; 
    }
    
    
    public set setHLocked(value :string){ 
        this.HLOCKED = value; 
    }
    
    
    public get getHRecDeleted():string{ 
        return this.HRECDELETED; 
    }
    
    
    public set setHRecDeleted(value :string){ 
        this.HRECDELETED = value; 
    }
    
    
    public get getHCreationDate():string{ 
        return this.HCREATIONDATE; 
    }
    
    
    public set setHCreationDate(value :string){ 
        this.HCREATIONDATE = value; 
    }
    
    
    public get getHRecDeletedD():string{ 
        return this.HRECDELETEDD; 
    }
    
    
    public set setHRecDeletedD(value :string){ 
        this.HRECDELETEDD = value; 
    }
    
    
    public get getHTotalTrue():number{ 
        return this.HTOTALTRUE; 
    }
    
    
    public set setHTotalTrue(value :number){ 
        this.HTOTALTRUE = value; 
    }
    
    
    public get getHTotalFalse():number{ 
        return this.HTOTALFALSE; 
    }
    
    
    public set setHTotalFalse(value :number){ 
        this.HTOTALFALSE = value; 
    }
    
    
    public get getHTotalPartial():number{ 
        return this.HTOTALPARTIAL; 
    }
    
    
    public set setHTotalPartial(value :number){ 
        this.HTOTALPARTIAL = value; 
    }
    
    
    public get getHUnique():number{ 
        return this.HUNIQUE; 
    }
    
    
    public set setHUnique(value :number){ 
        this.HUNIQUE = value; 
    }
    
    
    public get getHStatus():string{ 
        return this.HSTATUS; 
    }
    
    
    public set setHStatus(value :string){ 
        this.HSTATUS = value; 
    }


	public get getHBIRTHORDER(): string {
		return this.HBIRTHORDER;
	}   

    /**
     * Setter setHBIRTHORDER
     * @param {string} value
     */
	public set setHBIRTHORDER(value: string) {
		this.HBIRTHORDER = value;
	}


    /**
     * Getter getREPEATREQUEST
     * @return {string}
     */
	public get getREPEATREQUEST(): string {
		return this.REPEATREQUEST;
	}

    /**
     * Setter setREPEATREQUEST
     * @param {string} value
     */
	public set setREPEATREQUEST(value: string) {
		this.REPEATREQUEST = value;
	}




    getFormattedDate(d:string):string{
        try{
            let date = new Date(d);
            return this.datePipe.transform(date, 'dd/MM/yyyy').toString();
        }catch(e){
            return;
        }
    }

    getFormattedDob(d:string,translate?:TranslateService):string{
        try{
            let date = new Date(d);
            if(translate){
                this.datePipe = new DatePipe(translate.currentLang);
            }
    
            if(translate && translate.currentLang === 'hi'){
                return this.datePipe.transform(date, 'dd MMMM yyyy').toString();
            }else{
                return this.datePipe.transform(date, 'dd MMM yyyy').toString();
            }
            //return this.datePipe.transform(date, 'dd MMM yyyy').toString();
        }catch(e){
            return;
        }
    }


    getDateFromComplete(d:string,type:number):string{
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
    
    getTimeFromComplete(d:string,type:number):string{
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

    public set setFilePath(value :Blob){ 
        this.filePath = value; 
    }
    
    
    public get getFilePath():Blob{ 
        return this.filePath; 
    }

    public set setFileName(value :string){ 
        this.fileName = value; 
    }
    
    
    public get getFileName():string{ 
        return this.fileName; 
    }
    
}



export class Serializable {

    fromJSON(json) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}