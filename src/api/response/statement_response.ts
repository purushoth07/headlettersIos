import { StatementData } from "./statement_data";
import { BalanceData } from "./balance";

export class StatementResponse {
    public Status: string;
    public Message: string;
    public Data: StatementData[] = [];
    public ErrorMessage: string;
    public Balance:BalanceData ;

    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                if(prop === 'Balance'){
                    try{
                        let ho:BalanceData = new BalanceData(JSON.stringify(jsonObj[prop]));
                        this.Balance = ho;
                    }catch(e){

                    }
                    
                }
				if(prop === 'Data'){
                    try{
                        let list: StatementData[] = jsonObj[prop];
                        for(let item of list){
                            let ho:StatementData = new StatementData(JSON.stringify(item));
                            this.Data.push(ho);
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
     * @return {StatementData[]}
     */
	public get getData(): StatementData[] {
		return this.Data;
    }
    
    /**
     * @return {BalanceData}
     */
	public get getBalance(): BalanceData {
		return this.Balance;
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
     * @param {StatementData[]} value
     */
	public set setData(value: StatementData[]) {
		this.Data = value;
	}

    /**
     * Setter $ErrorMessage
     * @param {string} value
     */
	public set setErrorMessage(value: string) {
		this.ErrorMessage = value;
	}

    /**
     * @param {BalanceData} value
     */
	public set setBalance(value: BalanceData) {
		this.Balance = value;
	}
    
}