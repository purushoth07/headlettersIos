export class UpdateTermsCondition{
    private UserId: string;
    private IsCheck: string;



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