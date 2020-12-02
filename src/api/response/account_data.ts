import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { AccountTxn } from './account_txn';
import { AccountHistoryTxn } from './account_history_txn';

export class AccountData{

	public datePipe = new DatePipe("en-US");

    private CurrentData: AccountTxn[]=[];
    private OldData: AccountHistoryTxn[]=[];
    
	
	constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
          
            for (let prop in jsonObj) {
				if(prop === 'CurrentData'){
                    try{
                        let list: AccountTxn[] = jsonObj[prop];
                        for(let item of list){
                            let d:AccountTxn = new AccountTxn(JSON.stringify(item));
                            this.CurrentData.push(d);
                        }
                    }catch(e){

                    }
                   
				}else if(prop === 'OldData'){
                    try{
                        let list: AccountHistoryTxn[] = jsonObj[prop];
                        for(let item of list){
                            let d:AccountHistoryTxn = new AccountHistoryTxn(JSON.stringify(item));
                            this.OldData.push(d);
                        }
                    }catch(e){

                    }
                }else{
                    this[prop] = jsonObj[prop];
                }
			}
        }catch(e){
            
        }
    }


    /**
     * Getter getCurrentData
     * @return {AccountTxn}
     */
	public get getCurrentData(): AccountTxn[] {
		return this.CurrentData;
	}

    /**
     * Getter getOldData
     * @return {AccountHistoryTxn}
     */
	public get getOldData(): AccountHistoryTxn[] {
		return this.OldData;
	}

    /**
     * Setter setCurrentData
     * @param {AccountTxn} value
     */
	public set setCurrentData(value: AccountTxn[]) {
		this.CurrentData = value;
	}

    /**
     * Setter setOldData
     * @param {AccountHistoryTxn} value
     */
	public set setOldData(value: AccountHistoryTxn[]) {
		this.OldData = value;
	}




}