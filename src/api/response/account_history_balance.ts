import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import * as Constants from '../../utils/constants'

export class AccountHistoryBalance{0

	public datePipe = new DatePipe("en-US");

    private HISACCOUNTUSERID: string;
    private HISACCOUNT: string;
    private HISACCOUNTCCY: string;
    private HISACCTSTMTDATE: string;
    private ACCOUNTBAL: number;
    private ACCOUNTCREDIT: number;
    private ACCOUNTDEBIT: number;
    private ACCOUNTSTMTID: number;
    private TRANSACTIONID: number;
    private EXTREF: number;

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
     * Getter getHISACCOUNTUSERID
     * @return {string}
     */
	public get getHISACCOUNTUSERID(): string {
		return this.HISACCOUNTUSERID;
	}

    /**
     * Getter getHISACCOUNT
     * @return {string}
     */
	public get getHISACCOUNT(): string {
		return this.HISACCOUNT;
	}

    /**
     * Getter getHISACCOUNTCCY
     * @return {string}
     */
	public get getHISACCOUNTCCY(): string {
		return this.HISACCOUNTCCY;
	}

    /**
     * Getter getHISACCTSTMTDATE
     * @return {string}
     */
	public get getHISACCTSTMTDATE(): string {
		return this.HISACCTSTMTDATE;
	}

    /**
     * Getter getACCOUNTBAL
     * @return {number}
     */
	public get getACCOUNTBAL(): number {
		return this.ACCOUNTBAL;
	}

    /**
     * Getter getACCOUNTCREDIT
     * @return {number}
     */
	public get getACCOUNTCREDIT(): number {
		return this.ACCOUNTCREDIT;
	}

    /**
     * Getter getACCOUNTDEBIT
     * @return {number}
     */
	public get getACCOUNTDEBIT(): number {
		return this.ACCOUNTDEBIT;
	}

    /**
     * Getter getACCOUNTSTMTID
     * @return {number}
     */
	public get getACCOUNTSTMTID(): number {
		return this.ACCOUNTSTMTID;
	}

    /**
     * Getter getTRANSACTIONID
     * @return {number}
     */
	public get getTRANSACTIONID(): number {
		return this.TRANSACTIONID;
	}

    /**
     * Getter getEXTREF
     * @return {number}
     */
	public get getEXTREF(): number {
		return this.EXTREF;
	}

    /**
     * Getter getdisplayDate
     * @return {string}
     */
	public get getdisplayDate(): string {
		return this.displayDate;
	}

    /**
     * Getter getdisplayTime
     * @return {string}
     */
	public get getdisplayTime(): string {
		return this.displayTime;
	}

    /**
     * Getter getisDebit
     * @return {boolean}
     */
	public get getisDebit(): boolean {
		return this.isDebit;
	}

    /**
     * Setter setHISACCOUNTUSERID
     * @param {string} value
     */
	public set setHISACCOUNTUSERID(value: string) {
		this.HISACCOUNTUSERID = value;
	}

    /**
     * Setter setHISACCOUNT
     * @param {string} value
     */
	public set setHISACCOUNT(value: string) {
		this.HISACCOUNT = value;
	}

    /**
     * Setter setHISACCOUNTCCY
     * @param {string} value
     */
	public set setHISACCOUNTCCY(value: string) {
		this.HISACCOUNTCCY = value;
	}

    /**
     * Setter setHISACCTSTMTDATE
     * @param {string} value
     */
	public set setHISACCTSTMTDATE(value: string) {
		this.HISACCTSTMTDATE = value;
	}

    /**
     * Setter setACCOUNTBAL
     * @param {number} value
     */
	public set setACCOUNTBAL(value: number) {
		this.ACCOUNTBAL = value;
	}

    /**
     * Setter setACCOUNTCREDIT
     * @param {number} value
     */
	public set setACCOUNTCREDIT(value: number) {
		this.ACCOUNTCREDIT = value;
	}

    /**
     * Setter setACCOUNTDEBIT
     * @param {number} value
     */
	public set setACCOUNTDEBIT(value: number) {
		this.ACCOUNTDEBIT = value;
	}

    /**
     * Setter setACCOUNTSTMTID
     * @param {number} value
     */
	public set setACCOUNTSTMTID(value: number) {
		this.ACCOUNTSTMTID = value;
	}

    /**
     * Setter setTRANSACTIONID
     * @param {number} value
     */
	public set setTRANSACTIONID(value: number) {
		this.TRANSACTIONID = value;
	}

    /**
     * Setter setEXTREF
     * @param {number} value
     */
	public set setEXTREF(value: number) {
		this.EXTREF = value;
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
        if(this.HISACCOUNTCCY && this.HISACCOUNTCCY.toString().trim() === Constants.USD){
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


}