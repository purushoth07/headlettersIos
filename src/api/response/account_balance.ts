import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import * as Constants from '../../utils/constants'

export class AccountBalance{

	public datePipe = new DatePipe("en-US");

    private ACCOUNTUSERID: string;
    private ACCOUNT1: string;
    private ACCOUNTCCY: string;
    private ACCOUNTBAL: number;
    private ACCOUNTCREDIT: number;
    private ACCOUNTDEBIT: number;
    private ACCOUNTSTMTID: number;

	private displayDate:string;
	private displayTime:string;
    private isDebit:boolean;
    private currencySign:string;
    public defaultCurrencySign:string;
	
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
     * Getter getACCOUNTUSERID
     * @return {string}
     */
	public get getACCOUNTUSERID(): string {
		return this.ACCOUNTUSERID;
	}

    /**
     * Getter getACCOUNT1
     * @return {string}
     */
	public get getACCOUNT1(): string {
		return this.ACCOUNT1;
	}

    /**
     * Getter getACCOUNTCCY
     * @return {string}
     */
	public get getACCOUNTCCY(): string {
		return this.ACCOUNTCCY;
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
     * Setter setACCOUNTUSERID
     * @param {string} value
     */
	public set setACCOUNTUSERID(value: string) {
		this.ACCOUNTUSERID = value;
	}

    /**
     * Setter setACCOUNT1
     * @param {string} value
     */
	public set setACCOUNT1(value: string) {
		this.ACCOUNT1 = value;
	}

    /**
     * Setter setACCOUNTCCY
     * @param {string} value
     */
	public set setACCOUNTCCY(value: string) {
		this.ACCOUNTCCY = value;
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
        if(this.ACCOUNTCCY && this.ACCOUNTCCY.toString().trim() === Constants.USD){
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