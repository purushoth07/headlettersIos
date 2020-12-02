export class AddSpecialRequest{
    private HUSERID: string;
    private  HID: string;
	private RQSPECIALDETAILS: string;
	private Latitude: string;
	private Longitude: string;
	private ReqDate : string;
	// private RQLATITUDENS:String;
	// private RQLONGTITUDEEW:string;
	private TIMESTAMP:string;
	private COMPLETEDATETIME:string;

    // private RQEDDATE: string;


	public get getHUSERID(): string {
		return this.HUSERID;
	}

	public get getHID(): string {
		return this.HID;
	}

	public get getRQSPECIALDETAILS(): string {
		return this.RQSPECIALDETAILS;
	}

	public set setHUSERID(value: string) {
		this.HUSERID = value;
	}

	public set setHID(value: string) {
		this.HID = value;
	}

	public set setRQSPECIALDETAILS(value: string) {
		this.RQSPECIALDETAILS = value;
	}


	public get getLATITUDE(): string {
		return this.Latitude;
	}

   
	public set setLATITUDE(value: string) {
		this.Latitude = value;
	}

	public get getLONGITUDE(): string {
		return this.Longitude;
	}

	public set setLONGITUDE(value: string) {
		this.Longitude = value;
	}


	public get getReqDate(): string {
		return this.ReqDate;
	}

	public set setReqDate(value: string) {
		this.ReqDate = value;
	}


	public get getTIMESTAMP(): string {
		return this.TIMESTAMP;
	}

	public set setTIMESTAMP(value: string) {
		this.TIMESTAMP = value;
	}

	public get getCOMPLETEDATETIME():string{
		return this.COMPLETEDATETIME;
	}

	public set setCOMPLETEDATETIME(value:string){
		this.COMPLETEDATETIME = value;
	}


	// public get getRQEDDATE(): string {
	// 	return this.RQEDDATE;
	// }

	// public set setRQEDDATE(value: string) {
	// 	this.RQEDDATE = value;
	// }


}