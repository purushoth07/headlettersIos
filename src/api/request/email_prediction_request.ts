export class EmailPredictionRequest{
    private UserId:string;
    private HId:string;
	private StatementDate:string;
	private RequestId:string;

   
	public get getRequestId(): string {
		return this.RequestId;
	}
	public set setRequestId(value: string) {
		this.RequestId = value;
	}
	
	public get getUserId(): string {
		return this.UserId;
	}

	public get getHId(): string {
		return this.HId;
	}

  
	public set setUserId(value: string) {
		this.UserId = value;
	}

	public set setHId(value: string) {
		this.HId = value;
	}

	public get getStatementDate(): string {
		return this.StatementDate;
	}

  
	public set setStatementDate(value: string) {
		this.StatementDate = value;
	}

}