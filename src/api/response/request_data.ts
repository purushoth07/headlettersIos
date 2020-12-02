
import { DatePipe } from '@angular/common';
import * as strings from '../../utils/strings'
import * as Constants from '../../utils/constants'


export class RequestData{

    public datePipe = new DatePipe("en-US");

    private RQUSERID: string;
    private RQHID: string;
    private RQID: string;
    private REQCAT: string;
    private RQSPECIALDETAILS: string;
    private RQSDATE: Date;
    private RQEDATE: Date;
    private RQLONGTIDUE: string;
    private RQLONGTITUDEEW: string;
    private RQLATITUDE: string;
    private RQLATITUDENS: string;
    private RQDST: string;
    private RQRECDELETED: string;
    private RQPRSTATUS: string;
    private RQUNREAD: string;
	private RQCHARGE: string;
	private HORONAME:string;
	private HORONATIVEIMAGE:string;
	private REQCREDATE:string;


	private displayRequestDate:string;
	private displayCreationDate:string;

	private horoscopeName:string;
	private horoscopeImage:string;
	private requestType:string;
	
	constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                this[prop] = jsonObj[prop];
            }
        }catch(e){
            
        }
    }


	public get getRQUSERID(): string {
		return this.RQUSERID;
	}

	public get getRQHID(): string {
		return this.RQHID;
	}

	public get getRQID(): string {
		return this.RQID;
	}

	public get getREQCAT(): string {
		return this.REQCAT;
	}

	public get getRQSPECIALDETAILS(): string {
		return this.RQSPECIALDETAILS;
	}

	public get getRQSDATE(): Date {
		return this.RQSDATE;
	}

	public get getRQEDATE(): Date {
		return this.RQEDATE;
	}

	public get getRQLONGTIDUE(): string {
		return this.RQLONGTIDUE;
	}

	public get getRQLONGTITUDEEW(): string {
		return this.RQLONGTITUDEEW;
	}

	public get getRQLATITUDE(): string {
		return this.RQLATITUDE;
	}

	public get getRQLATITUDENS(): string {
		return this.RQLATITUDENS;
	}

  
	public get getRQDST(): string {
		return this.RQDST;
	}

   
	public get getRQRECDELETED(): string {
		return this.RQRECDELETED;
	}

  
	public get getRQPRSTATUS(): string {
		return this.RQPRSTATUS;
	}

  
	public get getRQUNREAD(): string {
		return this.RQUNREAD;
	}

   
	public get getRQCHARGE(): string {
		return this.RQCHARGE;
	}

   
	public set setRQUSERID(value: string) {
		this.RQUSERID = value;
	}

  
	public set setRQHID(value: string) {
		this.RQHID = value;
	}

	public set setRQID(value: string) {
		this.RQID = value;
	}

	public set setREQCAT(value: string) {
		this.REQCAT = value;
	}

    
	public set setRQSPECIALDETAILS(value: string) {
		this.RQSPECIALDETAILS = value;
	}

    
	public set setRQSDATE(value: Date) {
		this.RQSDATE = value;
	}

   
	public set setRQEDATE(value: Date) {
		this.RQEDATE = value;
	}

   
	public set setRQLONGTIDUE(value: string) {
		this.RQLONGTIDUE = value;
	}

	public set setRQLONGTITUDEEW(value: string) {
		this.RQLONGTITUDEEW = value;
	}

  
	public set setRQLATITUDE(value: string) {
		this.RQLATITUDE = value;
	}

	public set setRQLATITUDENS(value: string) {
		this.RQLATITUDENS = value;
	}

   
	public set setRQDST(value: string) {
		this.RQDST = value;
	}

  
	public set setRQRECDELETED(value: string) {
		this.RQRECDELETED = value;
	}

  
	public set setRQPRSTATUS(value: string) {
		this.RQPRSTATUS = value;
	}

   
	public set setRQUNREAD(value: string) {
		this.RQUNREAD = value;
	}

  
	public set setRQCHARGE(value: string) {
		this.RQCHARGE = value;
    }
    

   
	public get getDisplayRequestDate(): string {
		if(!this.displayRequestDate && this.RQSDATE){
			return this.displayRequestDate = this.datePipe.transform(new Date(this.RQSDATE), 'dd/MM/yyyy').toString();
        }
		return this.displayRequestDate;
	}

	public getRequestDateToShow(translate){
		let from = strings.from;
		let to = strings.to;

		if(translate && translate.currentLang != 'en'){
			translate.get(from).subscribe(
				value => {
					// value is our translated string
					from = value;
				}
			)

			translate.get(to).subscribe(
				value => {
					// value is our translated string
					to = value;
				}
			)
		}

		// if(!this.displayRequestDate && this.REQCREDATE){
		// 	if(this.REQCAT && this.REQCAT.toString().trim() === Constants.REQ_CAT_SPECIAL){
		// 		//alert("DDDD:" + this.REQCREDATE);
		// 		return this.displayRequestDate = this.datePipe.transform(new Date(this.REQCREDATE), 'dd/MM/yyyy').toString();
		// 	}
		// }


		if(!this.displayRequestDate && this.RQSDATE){
			// if(this.REQCAT && this.REQCAT.toString().trim() === Constants.REQ_CAT_WEEKLY && this.RQSDATE && this.RQEDATE){
			if(this.REQCAT 
				&& this.REQCAT.toString().trim() != Constants.REQ_CAT_DAILY 
				&& this.REQCAT.toString().trim() != Constants.REQ_CAT_SPECIAL 
				&& this.RQSDATE 
				&& this.RQEDATE){
				if(translate && translate.currentLang === 'en'){
					return this.displayRequestDate = from + " " + this.datePipe.transform(new Date(this.RQSDATE), 'dd/MM/yyyy').toString() + " " + to + " " +  this.datePipe.transform(new Date(this.RQEDATE), 'dd/MM/yyyy').toString()
				}else{
					return this.displayRequestDate = this.datePipe.transform(new Date(this.RQSDATE), 'dd/MM/yyyy').toString() + " " + from + " " +  this.datePipe.transform(new Date(this.RQEDATE), 'dd/MM/yyyy').toString() + " " + to;
				}
				
			}else{
				return this.displayRequestDate = this.datePipe.transform(new Date(this.RQSDATE), 'dd/MM/yyyy').toString();
			}
        }
		return this.displayRequestDate;
	}

   
	public get getHoroscopeName(): string {
		return this.HORONAME;
	}

 
	public set setHoroscopeName(value: string) {
		this.HORONAME = value;
	}


	public get getHoroscopeImage(): string {
		return this.HORONATIVEIMAGE;
	}


	public set setHoroscopeImage(value: string) {
		this.HORONATIVEIMAGE = value;
	}


	public get getRequestType(): string {
		if(!this.REQCAT){
			return
		}
		switch(this.REQCAT.toString().trim()){
			case "1":
				return strings.weekly;
			case "2":
				return strings.daily;
			case "3":
				return strings.special;
			case "4":
				return strings.jupiter;
			case "5":
				return strings.saturn;
			case "6":
				return strings.rahu;
			case "7":
				return strings.ketu;
			case "8":
				return strings.mars;
			case "9":
				return strings.sun;
			case "10":
				return strings.mercury;
			// case "7":
			// 	return strings.gen_chart;
			case "11":
			 	return strings.promise;
			
		}
		
	}

	public set setRequestType(value: string) {
		this.requestType = value;
	}



    /**
     * Getter getREQCREDATE
     * @return {string}
     */
	public get getREQCREDATE(): string {
		return this.REQCREDATE;
	}

    /**
     * Setter setREQCREDATE
     * @param {string} value
     */
	public set setREQCREDATE(value: string) {
		this.REQCREDATE = value;
	}

	public getCreationDateToShow(translate){

		if(!this.displayCreationDate && this.REQCREDATE){
			return this.displayCreationDate = this.datePipe.transform(new Date(this.REQCREDATE), 'dd/MM/yyyy').toString();
		}
		return this.displayCreationDate;
	}

}