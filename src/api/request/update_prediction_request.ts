export class UpdatePredictionRequest{
    private PRUSERID: string;
    private PRHID: string;
    private PRREQUESTID: string;
    private PRREQUESTIDSEQ: number;
    private PRFEEDFLAG: string;
    private PRCUSTOMERCOM: string;
    private PRHCOMMENTS: string;


  
	public get getPRUSERID(): string {
		return this.PRUSERID;
	}

   
	public get getPRHID(): string {
		return this.PRHID;
	}

	public get getPRREQUESTID(): string {
		return this.PRREQUESTID;
	}

  
	public get getPRREQUESTIDSEQ(): number {
		return this.PRREQUESTIDSEQ;
	}

 
	public get getPRFEEDFLAG(): string {
		return this.PRFEEDFLAG;
	}

   
	public get getPRCUSTOMERCOM(): string {
		return this.PRCUSTOMERCOM;
	}

  
	public get getPRHCOMMENTS(): string {
		return this.PRHCOMMENTS;
	}


	public set setPRUSERID(value: string) {
		this.PRUSERID = value;
	}

  
	public set setPRHID(value: string) {
		this.PRHID = value;
	}

 
	public set setPRREQUESTID(value: string) {
		this.PRREQUESTID = value;
	}

  
	public set setPRREQUESTIDSEQ(value: number) {
		this.PRREQUESTIDSEQ = value;
	}

 
	public set setPRFEEDFLAG(value: string) {
		this.PRFEEDFLAG = value;
	}

  
	public set setPRCUSTOMERCOM(value: string) {
		this.PRCUSTOMERCOM = value;
	}


	public set setPRHCOMMENTS(value: string) {
		this.PRHCOMMENTS = value;
	}

}