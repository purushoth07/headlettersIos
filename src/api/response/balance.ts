export class BalanceData{
    private ACCOUNTUSERID: string;
    private ACCOUNT1: string;
    private ACCOUNTCCY: string;
    private ACCOUNTBAL: number = 0;
    private ACCOUNTCREDIT: number;
    private ACCOUNTDEBIT: number;
    private ACCOUNTSTMTID: number;


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

}