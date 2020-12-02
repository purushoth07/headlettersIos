import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import * as Constants from '../../utils/constants'

export class AccountHistoryTxn{

	public datePipe = new DatePipe("en-US");

    private HTXNACCOUNTUSERID: string;
    private HTXNACCOUNT: string;
    private HTXNACCOUNTCCY: string;
    private HTXNTYPE: string;
    private HTAXCODE: number;
    private HTXNCODE: string;
    private HTXNDATE: string;
    private HTXNTIME: string;
    private HTXNAMOUNT: number;
    private HTXNIREF: string;
    private HTXNEREF: string;
    private HTXNACCOUNTSTMTSEQ: number;
    private HTXNTAXCODE: string;
    private NARRATION:string;
    private BATCHID : number;
    private TRANSACTIONID:number;

	private displayDate:string;
	private displayTime:string;
    private isDebit:boolean;
    private currencySign:string;
	
	constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
			
                this[prop] = jsonObj[prop];
            }
        }catch(e){
            
        }
    }


    /**
     * Getter getHTXNACCOUNTUSERID
     * @return {string}
     */
	public get getHTXNACCOUNTUSERID(): string {
		return this.HTXNACCOUNTUSERID;
	}

    /**
     * Getter getHTXNACCOUNT
     * @return {string}
     */
	public get getHTXNACCOUNT(): string {
		return this.HTXNACCOUNT;
	}

    /**
     * Getter getHTXNACCOUNTCCY
     * @return {string}
     */
	public get getHTXNACCOUNTCCY(): string {
		return this.HTXNACCOUNTCCY;
	}

    /**
     * Getter getHTXNTYPE
     * @return {string}
     */
	public get getHTXNTYPE(): string {
		return this.HTXNTYPE;
	}

    /**
     * Getter getHTAXCODE
     * @return {number}
     */
	public get getHTAXCODE(): number {
		return this.HTAXCODE;
	}

    /**
     * Getter getHTXNCODE
     * @return {string}
     */
	public get getHTXNCODE(): string {
		return this.HTXNCODE;
	}

    /**
     * Getter getHTXNDATE
     * @return {string}
     */
	public get getHTXNDATE(): string {
		return this.HTXNDATE;
	}

    /**
     * Getter getHTXNTIME
     * @return {string}
     */
	public get getHTXNTIME(): string {
		return this.HTXNTIME;
	}

    /**
     * Getter getHTXNAMOUNT
     * @return {number}
     */
	public get getHTXNAMOUNT(): number {
		return this.HTXNAMOUNT;
	}

    /**
     * Getter getHTXNIREF
     * @return {string}
     */
	public get getHTXNIREF(): string {
		return this.HTXNIREF;
	}

    /**
     * Getter getHTXNEREF
     * @return {string}
     */
	public get getHTXNEREF(): string {
		return this.HTXNEREF;
	}

    /**
     * Getter getHTXNACCOUNTSTMTSEQ
     * @return {number}
     */
	public get getHTXNACCOUNTSTMTSEQ(): number {
		return this.HTXNACCOUNTSTMTSEQ;
	}

    /**
     * Getter getHTXNTAXCODE
     * @return {string}
     */
	public get getHTXNTAXCODE(): string {
		return this.HTXNTAXCODE;
    }
    
     /**
     * Getter getNARRATION
     * @return {string}
     */
	public get getNARRATION(): string {
		return this.NARRATION;
	}

    /**
     * Setter setNARRATION
     * @param {string} value
     */
	public set setNARRATION(value: string) {
		this.NARRATION = value;
	}


    /**
     * Getter getBATCHID
     * @return {number}
     */
	public get getBATCHID(): number {
		return this.BATCHID;
	}

    /**
     * Setter setBATCHID
     * @param {number} value
     */
	public set setBATCHID(value: number) {
		this.BATCHID = value;
	}
    

    /**
     * Getter getTRANSACTIONID
     * @return {number}
     */
	public get getTRANSACTIONID(): number {
		return this.TRANSACTIONID;
	}

    /**
     * Setter setTRANSACTIONID
     * @param {number} value
     */
	public set setTRANSACTIONID(value: number) {
		this.TRANSACTIONID = value;
	}


    /**
     * Getter getdisplayDate
     * @return {string}
     */
	public get getdisplayDate(): string {
		if(!this.displayDate && this.HTXNDATE){
			this.displayDate = this.getFormattedDate(this.HTXNDATE);
		}else{
			return this.displayDate;
		}
	}

    /**
     * Getter getdisplayTime
     * @return {string}
     */
	public get getdisplayTime(): string {
		if(!this.displayTime && this.HTXNDATE){
			this.displayTime = this.getFormattedTime(this.HTXNDATE);
		}else{
			return this.displayTime;
		}
	}

    /**
     * Getter getisDebit
     * @return {boolean}
     */
	public get getisDebit(): boolean {
		if(this.HTXNTYPE){
			if(this.HTXNTYPE === 'D' || this.HTXNTYPE === "1"){
				return this.isDebit = true;
			}else{
				return this.isDebit = false;
			}
		}else{
			return this.isDebit;
		}
	}

    /**
     * Setter setHTXNACCOUNTUSERID
     * @param {string} value
     */
	public set setHTXNACCOUNTUSERID(value: string) {
		this.HTXNACCOUNTUSERID = value;
	}

    /**
     * Setter setHTXNACCOUNT
     * @param {string} value
     */
	public set setHTXNACCOUNT(value: string) {
		this.HTXNACCOUNT = value;
	}

    /**
     * Setter setHTXNACCOUNTCCY
     * @param {string} value
     */
	public set setHTXNACCOUNTCCY(value: string) {
		this.HTXNACCOUNTCCY = value;
	}

    /**
     * Setter setHTXNTYPE
     * @param {string} value
     */
	public set setHTXNTYPE(value: string) {
        this.HTXNTYPE = value;
		if(value === 'D' || value === "1"){
			this.isDebit = true;
		}else{
			this.isDebit = false;
		}
	}

    /**
     * Setter setHTAXCODE
     * @param {number} value
     */
	public set setHTAXCODE(value: number) {
		this.HTAXCODE = value;
	}

    /**
     * Setter setHTXNCODE
     * @param {string} value
     */
	public set setHTXNCODE(value: string) {
		this.HTXNCODE = value;
	}

    /**
     * Setter setHTXNDATE
     * @param {string} value
     */
	public set setHTXNDATE(value: string) {
        this.HTXNDATE = value;
        this.displayDate = this.getFormattedDate(value);
	}

    /**
     * Setter setHTXNTIME
     * @param {string} value
     */
	public set setHTXNTIME(value: string) {
		this.HTXNTIME = value;
	}

    /**
     * Setter setHTXNAMOUNT
     * @param {number} value
     */
	public set setHTXNAMOUNT(value: number) {
		this.HTXNAMOUNT = value;
	}

    /**
     * Setter setHTXNIREF
     * @param {string} value
     */
	public set setHTXNIREF(value: string) {
		this.HTXNIREF = value;
	}

    /**
     * Setter setHTXNEREF
     * @param {string} value
     */
	public set setHTXNEREF(value: string) {
		this.HTXNEREF = value;
	}

    /**
     * Setter setHTXNACCOUNTSTMTSEQ
     * @param {number} value
     */
	public set setHTXNACCOUNTSTMTSEQ(value: number) {
		this.HTXNACCOUNTSTMTSEQ = value;
	}

    /**
     * Setter setHTXNTAXCODE
     * @param {string} value
     */
	public set setHTXNTAXCODE(value: string) {
		this.HTXNTAXCODE = value;
	}

    /**
     * Setter setdisplayDate
     * @param {string} value
     */
	public set setdisplayDate(value: string) {
		this.displayDate = value;
	}

    /**
     * Setter setdisplayTime
     * @param {string} value
     */
	public set setdisplayTime(value: string) {
		this.displayTime = value;
	}

    /**
     * Setter setisDebit
     * @param {boolean} value
     */
	public set setisDebit(value: boolean) {
		this.isDebit = value;
    }
    
     /**
     * Getter $currencySign
     * @return {string}
     */
	public get getCurrencySign(): string {
        if(this.HTXNACCOUNTCCY && this.HTXNACCOUNTCCY.toString().trim() === Constants.USD){
            this.currencySign = Constants.CURRENCY_USD
          }else{
            this.currencySign = Constants.CURRENCY_INR
          }
          return this.currencySign;
	}

    /**
     * Setter $currencySign
     * @param {string} value
     */
	public set setCurrencySign(value: string) {
		this.currencySign = value;
	}

    getdisplayDateToShow(translate:TranslateService): string {
		//if(!this.displayDate && this.TXNDATE){
			this.displayDate = this.getFormattedDate(this.HTXNDATE,translate);
		// }else{
		 	return this.displayDate;
		// }
		
    }

    public getdisplayTimeToShow(translate:TranslateService): string {
		this.displayTime = this.getFormattedTime(this.HTXNDATE,translate);
		return this.displayTime;
		
	}
    
    getFormattedDate(d:string,translate?:TranslateService):string{
		let date = new Date(d);
		if(translate){
			this.datePipe = new DatePipe(translate.currentLang);
		}

		if(translate && translate.currentLang === 'hi'){
			return this.datePipe.transform(date, 'dd MMMM yyyy');
		}else{
			return this.datePipe.transform(date, 'dd MMM yyyy');
		}
        
	}
	
	getFormattedTime(d:string,translate?:TranslateService):string{
		let date = new Date(d);
		const time = this.datePipe.transform(date, 'hh:mm');
		let h =  this.datePipe.transform(date, 'HH');
		let ampm:string;
          if(Number(h)>12){
            ampm = 'PM';
          }else{
            ampm = 'AM';
		  }
		  
		  if(translate){
			translate.get(ampm).subscribe(
				value => {
				  // value is our translated string
				  ampm = value;
				}
			  )
		  }
		  

        return time + ' ' + ampm;
    }


}