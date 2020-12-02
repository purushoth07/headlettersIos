export class AddDailyRequest{
    private USERID: string;
    private HID: string;
    private DST: number;
    private LATITUDE: string;
	private LONGITUDE: string;
	private RQSDATE : string;
	private RQEDDATE: string;
	private REPEAT:string;
	private TIMESTAMP:string;
	private COMPLETEDATETIME:string;


   
	public get getUSERID(): string {
		return this.USERID;
	}

   
	public get getHID(): string {
		return this.HID;
	}

    
	public get getDST(): number {
		return this.DST;
	}

    
	public get getLATITUDE(): string {
		return this.LATITUDE;
	}

   
	public get getLONGITUDE(): string {
		return this.LONGITUDE;
	}

    
	public get getRQENDDATE(): string {
		return this.RQEDDATE;
	}

	public set setUSERID(value: string) {
		this.USERID = value;
	}

	public set setHID(value: string) {
		this.HID = value;
	}

	public set setDST(value: number) {
		this.DST = value;
	}

    
	public set setLATITUDE(value: string) {
		this.LATITUDE = value;
	}

    
	public set setLONGITUDE(value: string) {
		this.LONGITUDE = value;
	}

  
	public set setRQENDDATE(value: string) {
		this.RQEDDATE = value;
	}


	public get getRQSDATE(): string {
		return this.RQSDATE;
	}

	public set setRQSDATE(value: string) {
		this.RQSDATE = value;
	}


    /**
     * Getter getREPEAT
     * @return {string}
     */
	public get getREPEAT(): string {
		return this.REPEAT;
	}

    /**
     * Setter setREPEAT
     * @param {string} value
     */
	public set setREPEAT(value: string) {
		this.REPEAT = value;
	}


    /**
     * Getter getTIMESTAMP
     * @return {string}
     */
	public get getTIMESTAMP(): string {
		return this.TIMESTAMP;
	}

    /**
     * Setter setTIMESTAMP
     * @param {string} value
     */
	public set setTIMESTAMP(value: string) {
		this.TIMESTAMP = value;
	}

	public get getCOMPLETEDATETIME():string{
		return this.COMPLETEDATETIME;
	}

	public set setCOMPLETEDATETIME(value:string){
		this.COMPLETEDATETIME = value;
	}


}