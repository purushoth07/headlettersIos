import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { AccountTxn } from './account_txn';
import { AccountHistoryTxn } from './account_history_txn';
import * as Constants from '../../utils/constants';
import * as strings from '../../utils/strings';import { PaymentRecordPrimary } from './payment_record_primary';
import { PaymentRecordSecondary } from './payment_record_secondary';
;

export class PaymentRecordResponseData{

    public datePipe = new DatePipe("en-US");
    
    private PrimaryList:PaymentRecordPrimary[]=[];
    private SecondaryList:PaymentRecordSecondary[]=[]; 

   
    public isCollapsed:boolean=true;
	
	constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                if(prop === 'PrimaryList'){
                    try{
                        let list: PaymentRecordPrimary[] = jsonObj[prop];
                        for(let item of list){
                            let ho:PaymentRecordPrimary = new PaymentRecordPrimary(JSON.stringify(item));
                            this.PrimaryList.push(ho);
                        }
                    }catch(e){

                    }
					
				}else if(prop === 'SecondaryList'){
                    try{
                        let list: PaymentRecordSecondary[] = jsonObj[prop];
                        for(let item of list){
                            let ho:PaymentRecordSecondary = new PaymentRecordSecondary(JSON.stringify(item));
                            this.SecondaryList.push(ho);
                        }
                    }catch(e){
                        
                    }
					
				}
            }
            //console.log("PRIMARY:"+JSON.stringify(this.PrimaryList));
        }catch(e){
            
        }
    }


    /**
     * Getter getPrimaryList
     * @return {PaymentRecordPrimary[]}
     */
	public get getPrimaryList(): PaymentRecordPrimary[] {
		return this.PrimaryList;
	}

    /**
     * Getter getSecondaryList
     * @return {PaymentRecordSecondary[]}
     */
	public get getSecondaryList(): PaymentRecordSecondary[] {
		return this.SecondaryList;
	}

    /**
     * Setter setPrimaryList
     * @param {PaymentRecordPrimary[]} value
     */
	public set setPrimaryList(value: PaymentRecordPrimary[]) {
		this.PrimaryList = value;
	}

    /**
     * Setter setSecondaryList
     * @param {PaymentRecordSecondary[]} value
     */
	public set setSecondaryList(value: PaymentRecordSecondary[]) {
		this.SecondaryList = value;
	}


   
}