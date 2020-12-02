export class UpdateTermsConditionRequest{
    private UserId: string;
    private IsCheck: string;
    private TCCODE: string;
    

    public get getTCCODE(): string {
        return this.TCCODE;
    }
    public set setTCCODE(value: string) {
        this.TCCODE = value;
    }
    
    /**
     * Getter getUserId
     * @return {string}
     */
	public get getUserId(): string {
		return this.UserId;
	}

    /**
     * Getter getIsCheck
     * @return {string}
     */
	public get getIsCheck(): string {
		return this.IsCheck;
	}

    /**
     * Setter setUserId
     * @param {string} value
     */
	public set setUserId(value: string) {
		this.UserId = value;
	}

    /**
     * Setter setIsCheck
     * @param {string} value
     */
	public set setIsCheck(value: string) {
		this.IsCheck = value;
	}

    
}