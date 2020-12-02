export class AddTransitRequest{
    private USERID: string;
    private HID: string;
    private Type: string;
    private StartDate:string;
    private EndDate:string;
    private Detail:string;
    private LATITUDE: string;
    private LONGITUDE: string;
    private TIMESTAMP:string;
    private COMPLETEDATETIME:string;


    /**
     * Getter getUSERID
     * @return {string}
     */
	public get getUSERID(): string {
		return this.USERID;
	}

    /**
     * Getter getHID
     * @return {string}
     */
	public get getHID(): string {
		return this.HID;
	}

    /**
     * Getter getTYPE
     * @return {string}
     */
	public get getTYPE(): string {
		return this.Type;
	}

    /**
     * Setter setUSERID
     * @param {string} value
     */
	public set setUSERID(value: string) {
		this.USERID = value;
	}

    /**
     * Setter setHID
     * @param {string} value
     */
	public set setHID(value: string) {
		this.HID = value;
	}

    /**
     * Setter setTYPE
     * @param {string} value
     */
	public set setTYPE(value: string) {
		this.Type = value;
    }
    

    /**
     * Getter getStartDate
     * @return {string}
     */
	public get getStartDate(): string {
		return this.StartDate;
	}

    /**
     * Setter setStartDate
     * @param {string} value
     */
	public set setStartDate(value: string) {
		this.StartDate = value;
	}



    /**
     * Getter getEndDate
     * @return {string}
     */
	public get getEndDate(): string {
		return this.EndDate;
	}

    /**
     * Setter setEndDate
     * @param {string} value
     */
	public set setEndDate(value: string) {
		this.EndDate = value;
    }
    

    /**
     * Getter getDetail
     * @return {string}
     */
	public get getDetail(): string {
		return this.Detail;
	}

    /**
     * Setter setDetail
     * @param {string} value
     */
	public set setDetail(value: string) {
		this.Detail = value;
    }
    
    public get getLATITUDE(): string {
		return this.LATITUDE;
	}

   
	public get getLONGITUDE(): string {
		return this.LONGITUDE;
	}

    public set setLATITUDE(value: string) {
		this.LATITUDE = value;
	}

    
	public set setLONGITUDE(value: string) {
		this.LONGITUDE = value;
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