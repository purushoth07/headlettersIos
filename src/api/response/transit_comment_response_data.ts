import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from "@angular/common";
import * as Utility from '../../utils/utility'
import * as Constants from '../../utils/constants'

export class TransitCommentResponsedata{

    public datePipe = new DatePipe("en-US");


    private TRPLANET: string;
    private TRSDATE: string;
    private TREDATE: string;
    private TRSTARTKEY: string;
    private TRDETAILS: string;
    private ACTIVE: string;


    private startDate:string;
    private endDate:string;

    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				// if(prop === 'Data'){
                //     try{
				// 		let obj:PredictionData = new PredictionData(JSON.stringify(jsonObj[prop]));
                //         this.Data = obj;
                //     }catch(e){
            
                //     }
				// }else{
                	this[prop] = jsonObj[prop];
				// }
			}
        }catch(e){
            
        }
    }


    /**
     * Getter getTRPLANET
     * @return {string}
     */
	public get getTRPLANET(): string {
		return this.TRPLANET;
	}

    /**
     * Getter getTRSDATE
     * @return {string}
     */
	public get getTRSDATE(): string {
		return this.TRSDATE;
	}

    /**
     * Getter getTREDATE
     * @return {string}
     */
	public get getTREDATE(): string {
		return this.TREDATE;
	}

    /**
     * Getter getTRSTARTKEY
     * @return {string}
     */
	public get getTRSTARTKEY(): string {
		return this.TRSTARTKEY;
	}

    /**
     * Getter getTRDETAILS
     * @return {string}
     */
	public get getTRDETAILS(): string {
		return this.TRDETAILS;
	}

    /**
     * Getter getACTIVE
     * @return {string}
     */
	public get getACTIVE(): string {
		return this.ACTIVE;
	}

    /**
     * Setter setTRPLANET
     * @param {string} value
     */
	public set setTRPLANET(value: string) {
		this.TRPLANET = value;
	}

    /**
     * Setter setTRSDATE
     * @param {string} value
     */
	public set setTRSDATE(value: string) {
		this.TRSDATE = value;
	}

    /**
     * Setter setTREDATE
     * @param {string} value
     */
	public set setTREDATE(value: string) {
		this.TREDATE = value;
	}

    /**
     * Setter setTRSTARTKEY
     * @param {string} value
     */
	public set setTRSTARTKEY(value: string) {
		this.TRSTARTKEY = value;
	}

    /**
     * Setter setTRDETAILS
     * @param {string} value
     */
	public set setTRDETAILS(value: string) {
		this.TRDETAILS = value;
	}

    /**
     * Setter setACTIVE
     * @param {string} value
     */
	public set setACTIVE(value: string) {
		this.ACTIVE = value;
    }

    public getStartDateToShow(translate:TranslateService):string{ 
        this.startDate = this.getFormattedDate(this.TRSDATE,translate);
        return this.startDate;
    }

    public getEndDateToShow(translate:TranslateService):string{ 
        this.endDate = this.getFormattedDate(this.TREDATE,translate);
        return this.endDate;
    }
    
    getFormattedDate(d:string,translate?:TranslateService):string{
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

    getStartDateForRequest(){
        try{
            if(this.TRSDATE && this.TRSDATE != null && this.TRSDATE != 'null'){
                let date = new Date(this.TRSDATE);
                return this.datePipe.transform(date, 'ddMMyyhhmmss').toString();
            }else{
                return "151018051025";
            }
        }catch(e){
            return "151018051025";
        }
    }

    getEndDateForRequest(){
        try{
            if(this.TREDATE && this.TREDATE != null && this.TREDATE != 'null'){
                let date = new Date(this.TREDATE);
                return this.datePipe.transform(date, 'ddMMyyhhmmss').toString();
            }else{
                return "151018051025";
            }
        }catch(e){
            return "151018051025";
        }
    }
   
}