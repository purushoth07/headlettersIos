import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';

export class StatementData{

	public datePipe = new DatePipe("en-US");

    private TXNACCOUNTUSERID: string;
    private TXNACCOUNT: string;
    private TXNACCOUNTCCY: string;
    private TXNTYPE: string;
    private TAXCODE: string;
    private TXNCODE: number;
    private TXNDATE: string;
    private TXNTIME: string;
    private TXNAMOUNT: number;
    private TXNIREF: number;
    private TXNEREF: string;
    private TXNACCOUNTSTMTSEQ: string;
	private TXNTAXCODE: string;

	private displayDate:string;
	private displayTime:string;
	private isDebit:boolean;
	
	constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				// if(prop === 'TXNDATE'){
                //     let d = JSON.stringify(jsonObj[prop]);
                //     this.displayDate = this.getFormattedDate(d);
				// }
				// if(prop === 'TXNTIME'){
                //     this.displayTime = this.getFormattedTime(JSON.stringify(jsonObj[prop]));
				// }

				// if(prop === 'TXNTYPE'){
				// 	if(JSON.stringify(jsonObj[prop]) === 'D'){
				// 		this.isDebit = true;
				// 	}else{
				// 		this.isDebit = false;
				// 	}
				// }
                this[prop] = jsonObj[prop];
            }
        }catch(e){
            
        }
    }


	public get getTXNACCOUNTUSERID(): string {
		return this.TXNACCOUNTUSERID;
	}

	public get getTXNACCOUNT(): string {
		return this.TXNACCOUNT;
	}

	public get getTXNACCOUNTCCY(): string {
		return this.TXNACCOUNTCCY;
	}

	public get getTXNTYPE(): string {
		return this.TXNTYPE;
	}

   
	public get getTAXCODE(): string {
		return this.TAXCODE;
	}

    
	public get getTXNCODE(): number {
		return this.TXNCODE;
	}

   
	public get getTXNDATE(): string {
		return this.TXNDATE;
	}

    
	public get getTXNTIME(): string {
		return this.TXNTIME;
	}

    
	public get getTXNAMOUNT(): number {
		return this.TXNAMOUNT;
	}

	public get getTXNIREF(): number {
		return this.TXNIREF;
	}

    
	public get getTXNEREF(): string {
		return this.TXNEREF;
	}

	public get getTXNACCOUNTSTMTSEQ(): string {
		return this.TXNACCOUNTSTMTSEQ;
	}

    
	public get getTXNTAXCODE(): string {
		return this.TXNTAXCODE;
	}

	public set setTXNACCOUNTUSERID(value: string) {
		this.TXNACCOUNTUSERID = value;
	}

	public set setTXNACCOUNT(value: string) {
		this.TXNACCOUNT = value;
	}

	public set setTXNACCOUNTCCY(value: string) {
		this.TXNACCOUNTCCY = value;
	}

    
	public set setTXNTYPE(value: string) {
		this.TXNTYPE = value;
		if(value === 'D'){
			this.isDebit = true;
		}else{
			this.isDebit = false;
		}
	}

   
	public set setTAXCODE(value: string) {
		this.TAXCODE = value;
	}

	public set setTXNCODE(value: number) {
		this.TXNCODE = value;
	}

	public set setTXNDATE(value: string) {
		this.TXNDATE = value;
		this.displayDate = this.getFormattedDate(value);
	}

   
	public set setTXNTIME(value: string) {
		this.TXNTIME = value;
		this.displayTime = this.getFormattedTime(value);
	}

	public set setTXNAMOUNT(value: number) {
		this.TXNAMOUNT = value;
	}

	public set setTXNIREF(value: number) {
		this.TXNIREF = value;
	}

	public set setTXNEREF(value: string) {
		this.TXNEREF = value;
	}

	public set setTXNACCOUNTSTMTSEQ(value: string) {
		this.TXNACCOUNTSTMTSEQ = value;
	}

	public set setTXNTAXCODE(value: string) {
		this.TXNTAXCODE = value;
	}


    /**
     * @return {string}
     */
	public get getdisplayDate(): string {
		if(!this.displayDate && this.TXNDATE){
			this.displayDate = this.getFormattedDate(this.TXNDATE);
		}else{
			return this.displayDate;
		}
		
	}

	getdisplayDateToShow(translate:TranslateService): string {
		//if(!this.displayDate && this.TXNDATE){
			this.displayDate = this.getFormattedDate(this.TXNDATE,translate);
		// }else{
		 	return this.displayDate;
		// }
		
	}

    /**
     * @param {string} value
     */
	public set setdisplayDate(value: string) {
		this.displayDate = value;
	}

	 /**
     * @return {string}
     */
	public get getdisplayTime(): string {
		if(!this.displayTime && this.TXNTIME){
			this.displayTime = this.getFormattedTime(this.TXNTIME);
		}else{
			return this.displayTime;
		}
		
	}

	public getdisplayTimeToShow(translate:TranslateService): string {
		this.displayTime = this.getFormattedTime(this.TXNTIME,translate);
		return this.displayTime;
		
	}

    /**
     * @param {string} value
     */
	public set setdisplayTime(value: string) {
		this.displayTime = value;
	}


	public get getIsDebit(): boolean {
		if(this.TXNTYPE){
			if(this.TXNTYPE === 'D'){
				return this.isDebit = true;
			}else{
				return this.isDebit = false;
			}
		}else{
			return this.isDebit;
		}
	}
	
	public set setIsDebit(value: boolean) {
		this.isDebit = value;
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