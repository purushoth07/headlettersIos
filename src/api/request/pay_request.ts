export class PayRequest{
    private Currency: string;
    private Amount: number;
    private UserId: string;
    private Email: string;
	private HId: string;



    /**
     * Getter getCurrency
     * @return {string}
     */
	public get getCurrency(): string {
		return this.Currency;
	}

    /**
     * Getter getAmount
     * @return {number}
     */
	public get getAmount(): number {
		return this.Amount;
	}

    /**
     * Getter getUserId
     * @return {number}
     */
	public get getUserId(): string {
		return this.UserId;
	}

    /**
     * Getter getEmail
     * @return {string}
     */
	public get getEmail(): string {
		return this.Email;
	}

    /**
     * Getter getHId
     * @return {string}
     */
	public get getHId(): string {
		return this.HId;
	}

    /**
     * Setter setCurrency
     * @param {string} value
     */
	public set setCurrency(value: string) {
		this.Currency = value;
	}

    /**
     * Setter setAmount
     * @param {number} value
     */
	public set setAmount(value: number) {
		this.Amount = value;
	}

    /**
     * Setter setUserId
     * @param {string} value
     */
	public set setUserId(value: string) {
		this.UserId = value;
	}

    /**
     * Setter setEmail
     * @param {string} value
     */
	public set setEmail(value: string) {
		this.Email = value;
	}

    /**
     * Setter setHId
     * @param {string} value
     */
	public set setHId(value: string) {
		this.HId = value;
	}



}