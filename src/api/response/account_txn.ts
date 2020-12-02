import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import * as Constants from '../../utils/constants'
import { Platform } from 'ionic-angular';

export class AccountTxn{
    
	public datePipe = new DatePipe("en-US");
    private TXNACCOUNTUSERID: string;
    private TXNACCOUNT: string;
    private TXNACCOUNTCCY: string;
    private TXNTYPE: string;
    private TAXCODE: number;
    private TXNCODE: string;
    private TXNDATE: string;
    private TXNTIME: string;
    private TXNAMOUNT: number;
    private TXNIREF: string;
    private TXNEREF: string;
    private TXNACCOUNTSTMTSEQ: number;
    private TXNTAXCODE: string;
    private TXNHID: string;
    private TXNRQID: string;
    private TXNREVERSED: string;
    private EXTREF: string;
    private ID: number;
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
     * Getter getTXNACCOUNTUSERID
     * @return {string}
     */
	public get getTXNACCOUNTUSERID(): string {
		return this.TXNACCOUNTUSERID;
	}

    /**
     * Getter getTXNACCOUNT
     * @return {string}
     */
	public get getTXNACCOUNT(): string {
		return this.TXNACCOUNT;
	}

    /**
     * Getter getTXNACCOUNTCCY
     * @return {string}
     */
	public get getTXNACCOUNTCCY(): string {
		return this.TXNACCOUNTCCY;
	}

    /**
     * Getter getTXNTYPE
     * @return {string}
     */
	public get getTXNTYPE(): string {
		return this.TXNTYPE;
	}

    /**
     * Getter getTAXCODE
     * @return {number}
     */
	public get getTAXCODE(): number {
		return this.TAXCODE;
	}

    /**
     * Getter getTXNCODE
     * @return {string}
     */
	public get getTXNCODE(): string {
		return this.TXNCODE;
	}

    /**
     * Getter getTXNDATE
     * @return {string}
     */
	public get getTXNDATE(): string {
		return this.TXNDATE;
	}

    /**
     * Getter getTXNTIME
     * @return {string}
     */
	public get getTXNTIME(): string {
		return this.TXNTIME;
	}

    /**
     * Getter getTXNAMOUNT
     * @return {number}
     */
	public get getTXNAMOUNT(): number {
		return this.TXNAMOUNT;
	}

    /**
     * Getter getTXNIREF
     * @return {string}
     */
	public get getTXNIREF(): string {
		return this.TXNIREF;
	}

    /**
     * Getter getTXNEREF
     * @return {string}
     */
	public get getTXNEREF(): string {
		return this.TXNEREF;
	}

    /**
     * Getter getTXNACCOUNTSTMTSEQ
     * @return {number}
     */
	public get getTXNACCOUNTSTMTSEQ(): number {
		return this.TXNACCOUNTSTMTSEQ;
	}

    /**
     * Getter getTXNTAXCODE
     * @return {string}
     */
	public get getTXNTAXCODE(): string {
		return this.TXNTAXCODE;
	}

    /**
     * Getter getTXNHID
     * @return {string}
     */
	public get getTXNHID(): string {
		return this.TXNHID;
	}

    /**
     * Getter getTXNRQID
     * @return {string}
     */
	public get getTXNRQID(): string {
		return this.TXNRQID;
	}

    /**
     * Getter getTXNREVERSED
     * @return {string}
     */
	public get getTXNREVERSED(): string {
		return this.TXNREVERSED;
	}

    /**
     * Getter getEXTREF
     * @return {string}
     */
	public get getEXTREF(): string {
		return this.EXTREF;
	}

    /**
     * Getter getID
     * @return {number}
     */
	public get getID(): number {
		return this.ID;
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
     * Getter $currencySign
     * @return {string}
     */
	public get getCurrencySign(): string {
        if(this.TXNACCOUNTCCY && this.TXNACCOUNTCCY.toString().trim() === Constants.USD){
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


    /**
     * Getter getdisplayDate
     * @return {string}
     */
	public get getdisplayDate(): string {
		if(!this.displayDate && this.TXNDATE){
			this.displayDate = this.getFormattedDate(this.TXNDATE);
		}else{
			return this.displayDate;
		}
	}

    /**
     * Getter getdisplayTime
     * @return {string}
     */
	public get getdisplayTime(): string {
		if(!this.displayTime && this.TXNDATE){
			this.displayTime = this.getFormattedTime(this.TXNDATE);
		}else{
			return this.displayTime;
		}
	}

    /**
     * Getter getisDebit
     * @return {boolean}
     */
	public get getisDebit(): boolean {
		if(this.TXNTYPE){
			if(this.TXNTYPE === 'D' || this.TXNTYPE === "1"){
				return this.isDebit = true;
			}else{
				return this.isDebit = false;
			}
		}else{
			return this.isDebit;
		}
	}

    /**
     * Setter setTXNACCOUNTUSERID
     * @param {string} value
     */
	public set setTXNACCOUNTUSERID(value: string) {
		this.TXNACCOUNTUSERID = value;
	}

    /**
     * Setter setTXNACCOUNT
     * @param {string} value
     */
	public set setTXNACCOUNT(value: string) {
		this.TXNACCOUNT = value;
	}

    /**
     * Setter setTXNACCOUNTCCY
     * @param {string} value
     */
	public set setTXNACCOUNTCCY(value: string) {
		this.TXNACCOUNTCCY = value;
	}

    /**
     * Setter setTXNTYPE
     * @param {string} value
     */
	public set setTXNTYPE(value: string) {
        this.TXNTYPE = value;
		if(value === 'D'){
			this.isDebit = true;
		}else{
			this.isDebit = false;
		}
	}

    /**
     * Setter setTAXCODE
     * @param {number} value
     */
	public set setTAXCODE(value: number) {
		this.TAXCODE = value;
	}

    /**
     * Setter setTXNCODE
     * @param {string} value
     */
	public set setTXNCODE(value: string) {
		this.TXNCODE = value;
	}

    /**
     * Setter setTXNDATE
     * @param {string} value
     */
	public set setTXNDATE(value: string) {
        this.TXNDATE = value;
        this.displayDate = this.getFormattedDate(value);
	}

    /**
     * Setter setTXNTIME
     * @param {string} value
     */
	public set setTXNTIME(value: string) {
		this.TXNTIME = value;
	}

    /**
     * Setter setTXNAMOUNT
     * @param {number} value
     */
	public set setTXNAMOUNT(value: number) {
		this.TXNAMOUNT = value;
	}

    /**
     * Setter setTXNIREF
     * @param {string} value
     */
	public set setTXNIREF(value: string) {
		this.TXNIREF = value;
	}

    /**
     * Setter setTXNEREF
     * @param {string} value
     */
	public set setTXNEREF(value: string) {
		this.TXNEREF = value;
	}

    /**
     * Setter setTXNACCOUNTSTMTSEQ
     * @param {number} value
     */
	public set setTXNACCOUNTSTMTSEQ(value: number) {
		this.TXNACCOUNTSTMTSEQ = value;
	}

    /**
     * Setter setTXNTAXCODE
     * @param {string} value
     */
	public set setTXNTAXCODE(value: string) {
		this.TXNTAXCODE = value;
	}

    /**
     * Setter setTXNHID
     * @param {string} value
     */
	public set setTXNHID(value: string) {
		this.TXNHID = value;
	}

    /**
     * Setter setTXNRQID
     * @param {string} value
     */
	public set setTXNRQID(value: string) {
		this.TXNRQID = value;
	}

    /**
     * Setter setTXNREVERSED
     * @param {string} value
     */
	public set setTXNREVERSED(value: string) {
		this.TXNREVERSED = value;
	}

    /**
     * Setter setEXTREF
     * @param {string} value
     */
	public set setEXTREF(value: string) {
		this.EXTREF = value;
	}

    /**
     * Setter setID
     * @param {number} value
     */
	public set setID(value: number) {
		this.ID = value;
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


    getdisplayDateToShow(translate:TranslateService,platform:Platform): string {
        if(this.TXNDATE && !this.TXNDATE.includes(Constants.UTC)){
            if(!platform.is('ios')){
                this.TXNDATE = this.TXNDATE.replace("T",Constants.UTC);
            }
        }
		//if(!this.displayDate && this.TXNDATE){
            // if(!this.TXNDATE.includes(Constants.UTC)){
            //     this.TXNDATE = this.TXNDATE.replace("T", Constants.UTC);
            // }
			this.displayDate = this.getFormattedDate(this.TXNDATE,translate);
		// }else{
		 	return this.displayDate;
		// }
		
    }

    public getdisplayTimeToShow(translate:TranslateService,platform:Platform): string {
        if(this.TXNDATE && !this.TXNDATE.includes(Constants.UTC)){
            if(!platform.is('ios')){
                this.TXNDATE = this.TXNDATE.replace("T",Constants.UTC);
            }
        }
        
        this.displayTime = this.getFormattedTime(this.TXNDATE,translate);
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