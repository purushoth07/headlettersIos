export class AddRequestData{
    private RQUSERID: string;
    private RQHID: string;
    private RQID: string;
    private REQCAT: string;
    private RQSPECIALDETAILS: string;
    private RQSDATE: Date;
    private RQEDATE: Date;
    private RQLONGTIDUE: string;
    private RQLONGTITUDEEW: string;
    private RQLATITUDE: string;
    private RQLATITUDENS: string;
    private RQDST: string;
    private RQRECDELETED: string;
    private RQPRSTATUS: string;
    private RQUNREAD: string;
    private RQCHARGE: string;

    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                this[prop] = jsonObj[prop];
			}
        }catch(e){
            
        }
    }


    
	public get getRQUSERID(): string {
		return this.RQUSERID;
	}

    
	public get getRQHID(): string {
		return this.RQHID;
	}

	public get getRQID(): string {
		return this.RQID;
	}

   
	public get getREQCAT(): string {
		return this.REQCAT;
	}

    
	public get getRQSPECIALDETAILS(): string {
		return this.RQSPECIALDETAILS;
	}

	public get getRQSDATE(): Date {
		return this.RQSDATE;
	}

    
	public get getRQEDATE(): Date {
		return this.RQEDATE;
	}

	public get getRQLONGTIDUE(): string {
		return this.RQLONGTIDUE;
	}

	public get getRQLONGTITUDEEW(): string {
		return this.RQLONGTITUDEEW;
	}

	public get getRQLATITUDE(): string {
		return this.RQLATITUDE;
	}

	public get getRQLATITUDENS(): string {
		return this.RQLATITUDENS;
	}

	public get getRQDST(): string {
		return this.RQDST;
	}

	public get getRQRECDELETED(): string {
		return this.RQRECDELETED;
	}

	public get getRQPRSTATUS(): string {
		return this.RQPRSTATUS;
	}

	public get getRQUNREAD(): string {
		return this.RQUNREAD;
	}

	public get getRQCHARGE(): string {
		return this.RQCHARGE;
	}

	public set setRQUSERID(value: string) {
		this.RQUSERID = value;
	}

    
	public set setRQHID(value: string) {
		this.RQHID = value;
	}

	public set setRQID(value: string) {
		this.RQID = value;
	}

	public set setREQCAT(value: string) {
		this.REQCAT = value;
	}

	public set setRQSPECIALDETAILS(value: string) {
		this.RQSPECIALDETAILS = value;
	}

	public set setRQSDATE(value: Date) {
		this.RQSDATE = value;
	}

	public set setRQEDATE(value: Date) {
		this.RQEDATE = value;
	}

	public set setRQLONGTIDUE(value: string) {
		this.RQLONGTIDUE = value;
	}

	public set setRQLONGTITUDEEW(value: string) {
		this.RQLONGTITUDEEW = value;
	}

	public set setRQLATITUDE(value: string) {
		this.RQLATITUDE = value;
	}

	public set setRQLATITUDENS(value: string) {
		this.RQLATITUDENS = value;
	}

	public set setRQDST(value: string) {
		this.RQDST = value;
	}

	public set setRQRECDELETED(value: string) {
		this.RQRECDELETED = value;
	}

	public set setRQPRSTATUS(value: string) {
		this.RQPRSTATUS = value;
	}

	public set setRQUNREAD(value: string) {
		this.RQUNREAD = value;
	}

	public set setRQCHARGE(value: string) {
		this.RQCHARGE = value;
	}
    
}