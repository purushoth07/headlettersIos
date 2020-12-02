import { StatementData } from "./statement_data";
import { AccountHistoryBalance } from "./account_history_balance";
import { AccountBalance } from "./account_balance";
import { AccountData } from "./account_data";

export class AccountStatementResponse {
    public Status: string;
    public Message: string;
    public Data: AccountData;
    public ErrorMessage: string;
    //public Balance:BalanceData ;
    public OpeningCurrentBalance: AccountHistoryBalance;
    public CloseCurrentBalance : AccountBalance;
    public OpeningOldBalance : AccountHistoryBalance;
    public ClosingOldBalance : AccountHistoryBalance;

    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                if(prop === 'OpeningCurrentBalance'){
                    try{
                        let d:AccountHistoryBalance = new AccountHistoryBalance(JSON.stringify(jsonObj[prop]));
                        this.OpeningCurrentBalance = d;
                    }catch(e){

                    }
                    
                }
                else if(prop === 'CloseCurrentBalance'){
                    try{
                        let d:AccountBalance = new AccountBalance(JSON.stringify(jsonObj[prop]));
                        this.CloseCurrentBalance = d;
                    }catch(e){
                        
                    }
                    
                }
                else if(prop === 'OpeningOldBalance'){
                    try{
                        let d:AccountHistoryBalance = new AccountHistoryBalance(JSON.stringify(jsonObj[prop]));
                        this.OpeningOldBalance = d;
                    }catch(e){
                        
                    }
                    
                }
                else if(prop === 'ClosingOldBalance'){
                    try{
                        let d:AccountHistoryBalance = new AccountHistoryBalance(JSON.stringify(jsonObj[prop]));
                        this.ClosingOldBalance = d;
                    }catch(e){
                        
                    }
                    
                }
				else if(prop === 'Data'){
                    try{
                        let d:AccountData = new AccountData(JSON.stringify(jsonObj[prop]));
                        this.Data = d;
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
     * Getter $Status
     * @return {string}
     */
	public get getStatus(): string {
		return this.Status;
	}

    /**
     * Getter $Message
     * @return {string}
     */
	public get getMessage(): string {
		return this.Message;
	}

    /**
     * Getter $Data
     * @return {AccountData}
     */
	public get getData(): AccountData {
		return this.Data;
    }

    /**
     * @return {AccountHistoryBalance}
     */
	public get getOpeningCurrentBalance(): AccountHistoryBalance {
		return this.OpeningCurrentBalance;
    }

    /**
     * @return {AccountBalance}
     */
	public get getCloseCurrentBalance(): AccountBalance {
		return this.CloseCurrentBalance;
    }

    /**
     * @return {AccountHistoryBalance}
     */
	public get getOpeningOldBalance(): AccountHistoryBalance {
		return this.OpeningOldBalance;
    }

    /**
     * @return {AccountHistoryBalance}
     */
	public get getClosingOldBalance(): AccountHistoryBalance {
		return this.ClosingOldBalance;
    }
    

    /**
     * Getter $ErrorMessage
     * @return {string}
     */
	public get getErrorMessage(): string {
		return this.ErrorMessage;
	}

    /**
     * Setter $Status
     * @param {string} value
     */
	public set setStatus(value: string) {
		this.Status = value;
	}

    /**
     * Setter $Message
     * @param {string} value
     */
	public set setMessage(value: string) {
		this.Message = value;
	}

    /**
     * Setter $Data
     * @param {AccountData} value
     */
	public set setData(value: AccountData) {
		this.Data = value;
    }
    

     /**
     * @return {AccountHistoryBalance}
     */
	public set setOpeningCurrentBalance(value:AccountHistoryBalance) {
		this.OpeningCurrentBalance = value;
    }

    /**
     * @return {AccountBalance}
     */
	public set setCloseCurrentBalance(value:AccountBalance) {
		this.CloseCurrentBalance = value;
    }

    /**
     * @return {AccountHistoryBalance}
     */
	public set setOpeningOldBalance(value:AccountHistoryBalance) {
		this.OpeningOldBalance = value;
    }

    /**
     * @return {AccountHistoryBalance}
     */
	public set setClosingOldBalance(value:AccountHistoryBalance) {
		this.ClosingOldBalance = value;
    }

    /**
     * Setter $ErrorMessage
     * @param {string} value
     */
	public set setErrorMessage(value: string) {
		this.ErrorMessage = value;
	}

   
    
}