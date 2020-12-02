import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { AccountTxn } from './account_txn';
import { AccountHistoryTxn } from './account_history_txn';
import * as Constants from '../../utils/constants';
import * as strings from '../../utils/strings';;

export class PaymentRecordSecondary{

	public datePipe = new DatePipe("en-US");

    private UID:string;
    private HID:string;
    private PAYMENTREQUEST:string;
    private INVOICE:string;
    private INVOICEDATE:string;
    private PAYMENTLINKREFNUMBER:string;
    private TOTALINVOICEAMOUNT:string;
    private PPREFNUMBER:string;
    private CURRENCY:string;
    private PAIDDATE:string;
    private PAIDAMOUNT:string;
    private PAIDSTATUS:string;
    private TYPE:string;
    
    private displayInvoiceDate:string;
    private displayPaidDate:string;
    private currencySign:string;
    public isCollapsed:boolean=true;
	
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
     * Getter getUID
     * @return {string}
     */
	public get getUID(): string {
		return this.UID;
	}

    /**
     * Getter getHID
     * @return {string}
     */
	public get getHID(): string {
		return this.HID;
	}

    /**
     * Getter getPAYMENTREQUEST
     * @return {string}
     */
	public get getPAYMENTREQUEST(): string {
		return this.PAYMENTREQUEST;
	}

    /**
     * Getter getINVOICE
     * @return {string}
     */
	public get getINVOICE(): string {
		return this.INVOICE;
	}

    /**
     * Getter getINVOICEDATE
     * @return {string}
     */
	public get getINVOICEDATE(): string {
		return this.INVOICEDATE;
	}

    /**
     * Getter getPAYMENTLINKREFNUMBER
     * @return {string}
     */
	public get getPAYMENTLINKREFNUMBER(): string {
		return this.PAYMENTLINKREFNUMBER;
	}

    /**
     * Getter getTOTALINVOICEAMOUNT
     * @return {string}
     */
	public get getTOTALINVOICEAMOUNT(): string {
		return this.TOTALINVOICEAMOUNT;
	}

    /**
     * Getter getPPREFNUMBER
     * @return {string}
     */
	public get getPPREFNUMBER(): string {
		return this.PPREFNUMBER;
	}

    /**
     * Getter getCURRENCY
     * @return {string}
     */
	public get getCURRENCY(): string {
		return this.CURRENCY;
	}

    /**
     * Getter getPAIDDATE
     * @return {string}
     */
	public get getPAIDDATE(): string {
		return this.PAIDDATE;
	}

    /**
     * Getter getPAIDAMOUNT
     * @return {string}
     */
	public get getPAIDAMOUNT(): string {
		return this.PAIDAMOUNT;
    }
    

    /**
     * Getter getTYPE
     * @return {gettring}
     */
	public get getTYPE(): string {
		return this.TYPE;
	}

    /**
     * Setter setTYPE
     * @param {string} value
     */
	public set setTYPE(value: string) {
		this.TYPE = value;
	}


    /**
     * Getter getPAIDSTATUS
     * @return {string}
     */
	public get getPAIDSTATUS(): string {
        if(this.PAIDSTATUS){
            if(this.PAIDSTATUS === Constants.PAYMENT_STATUS.YES){
                return strings.yes;
            }else if(this.PAIDSTATUS === Constants.PAYMENT_STATUS.NO){
                return strings.no;
            }else if(this.PAIDSTATUS === Constants.PAYMENT_STATUS.CANCEL){
                return strings.cancel;
            }else{
                "";
            }
        }else{
            return ""
        }
	}

    /**
     * Setter setUID
     * @param {string} value
     */
	public set setUID(value: string) {
		this.UID = value;
	}

    /**
     * Setter setHID
     * @param {string} value
     */
	public set setHID(value: string) {
		this.HID = value;
	}

    /**
     * Setter setPAYMENTREQUEST
     * @param {string} value
     */
	public set setPAYMENTREQUEST(value: string) {
		this.PAYMENTREQUEST = value;
	}

    /**
     * Setter setINVOICE
     * @param {string} value
     */
	public set setINVOICE(value: string) {
		this.INVOICE = value;
	}

    /**
     * Setter setINVOICEDATE
     * @param {string} value
     */
	public set setINVOICEDATE(value: string) {
		this.INVOICEDATE = value;
	}

    /**
     * Setter setPAYMENTLINKREFNUMBER
     * @param {string} value
     */
	public set setPAYMENTLINKREFNUMBER(value: string) {
		this.PAYMENTLINKREFNUMBER = value;
	}

    /**
     * Setter setTOTALINVOICEAMOUNT
     * @param {string} value
     */
	public set setTOTALINVOICEAMOUNT(value: string) {
		this.TOTALINVOICEAMOUNT = value;
	}

    /**
     * Setter setPPREFNUMBER
     * @param {string} value
     */
	public set setPPREFNUMBER(value: string) {
		this.PPREFNUMBER = value;
	}

    /**
     * Setter setCURRENCY
     * @param {string} value
     */
	public set setCURRENCY(value: string) {
		this.CURRENCY = value;
	}

    /**
     * Setter setPAIDDATE
     * @param {string} value
     */
	public set setPAIDDATE(value: string) {
		this.PAIDDATE = value;
	}

    /**
     * Setter setPAIDAMOUNT
     * @param {string} value
     */
	public set setPAIDAMOUNT(value: string) {
		this.PAIDAMOUNT = value;
	}

    /**
     * Setter setPAIDSTATUS
     * @param {string} value
     */
	public set setPAIDSTATUS(value: string) {
		this.PAIDSTATUS = value;
    }

    /**
     * Getter $currencySign
     * @return {string}
     */
	public get getCurrencySign(): string {
        if(this.CURRENCY && this.CURRENCY.toString().trim() === Constants.USD){
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
    
    getdisplayInvoiceDateToShow(translate:TranslateService): string {
		//if(!this.displayDate && this.TXNDATE){
            if(translate && translate.currentLang === 'en'){
                this.displayInvoiceDate = this.getFormattedDate(this.INVOICEDATE,translate) + " at " + this.getFormattedTime(this.INVOICEDATE,translate);
            }else{
                this.displayInvoiceDate = this.getFormattedDate(this.INVOICEDATE,translate) +" "+ this.getFormattedTime(this.INVOICEDATE,translate);

            }
		 	return this.displayInvoiceDate;
		// }
		
    }

    getdisplayPaidDateToShow(translate:TranslateService): string {
		//if(!this.displayDate && this.TXNDATE){
			this.displayPaidDate = this.getFormattedDate(this.PAIDDATE,translate) ;
		// }else{
		 	return this.displayPaidDate;
		// }
		
    }

    // public getdisplayTimeToShow(translate:TranslateService): string {
	// 	this.displayTime = this.getFormattedTime(this.HTXNTIME,translate);
	// 	return this.displayTime;
		
	// }
    
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