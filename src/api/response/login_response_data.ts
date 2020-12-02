import * as Constants from '../../utils/constants'

export class LoginResponseData {
    private USERID: string;
    private USERNAME: string;
    private USEREMAIL: string;
    private USERIDD: string;
    private USERMOBILE: string;
    private USERACCOUNTNO: string;
    private UCOUNTRY: string;
    private UCURRENCY: string;
    private UCHARGE: string;
    private USERPDATE: string;
    private USERPPLANG: string;
    private USERLASTHOROID: number;
    private PASSWORD: string;
    private TOKENFACEBOOK: string;
    private TOKENGOOGLE: string;
    private TOKENYAHOO: string;
	private USERPHOTO: string;
	private MEDIUM:string;
	private TOKEN:string;
	private TOUCHID:string;
	private TCFlag:string;
	private TCCODE:string;

	private userDob:string;

	constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                this[prop] = jsonObj[prop];
            }
        }catch(e){
            
        }
    }

	// Getter and setter // 

	public get getUserId():string{ 
		return this.USERID; 
	}


	public set setUserId(value :string){ 
		this.USERID = value; 
	}


	public get getUserName():string{ 
		return this.USERNAME; 
	}


	public set setUserName(value :string){ 
		this.USERNAME = value; 
	}


	public get getUserEmail():string{ 
		return this.USEREMAIL; 
	}


	public set setUserEmail(value :string){ 
		this.USEREMAIL = value; 
	}


	public get getUserIdd():string{ 
		return this.USERIDD; 
	}


	public set setUserIdd(value :string){ 
		this.USERIDD = value; 
	}


	public get getUserMobile():string{ 
		return this.USERMOBILE; 
	}


	public set setUserMobile(value :string){ 
		this.USERMOBILE = value; 
	}


	public get getUserAccountNo():string{ 
		return this.USERACCOUNTNO; 
	}


	public set setUserAccountNo(value :string){ 
		this.USERACCOUNTNO = value; 
	}


	public get getUcountry():string{ 
		return this.UCOUNTRY; 
	}


	public set setUcountry(value :string){ 
		this.UCOUNTRY = value; 
	}


	public get getUcurrency():string{ 
		if(this.UCURRENCY && this.UCURRENCY != null && this.UCURRENCY.toString().trim() != 'null'){
			return this.UCURRENCY.toString().trim(); 
		}else{
			return Constants.INR;
		} 
	}


	public set setUcurrency(value :string){ 
		this.UCURRENCY = value; 
	}


	public get getUcharge():string{
		if(this.UCHARGE && this.UCHARGE != null && this.UCHARGE.toString().trim() != 'null'){
			return this.UCHARGE.toString().trim(); 
		}else{
			return Constants.YES;
		} 
		
	}


	public set setUcharge(value :string){ 
		this.UCHARGE = value; 
	}


	public get getUserPDate():string{ 
		return this.USERPDATE; 
	}


	public set setUserPDate(value :string){ 
		this.USERPDATE = value; 
	}


	public get getUserPpLang():string{ 
		return this.USERPPLANG; 
	}


	public set setUserPpLang(value :string){ 
		this.USERPPLANG = value; 
	}


	public get getUserLastHoroId():number{ 
		return this.USERLASTHOROID; 
	}


	public set setUserLastHoroId(value :number){ 
		this.USERLASTHOROID = value; 
	}


	public get getPassword():string{ 
		return this.PASSWORD; 
	}


	public set setPassword(value :string){ 
		this.PASSWORD = value; 
	}


	public get getTokenFacebook():string{ 
		return this.TOKENFACEBOOK; 
	}


	public set setTokenFacebook(value :string){ 
		this.TOKENFACEBOOK = value; 
	}


	public get getTokenGoogle():string{ 
		return this.TOKENGOOGLE; 
	}


	public set setTokenGoogle(value :string){ 
		this.TOKENGOOGLE = value; 
	}


	public get getTokenYahoo():string{ 
		return this.TOKENYAHOO; 
	}


	public set setTokenYahoo(value :string){ 
		this.TOKENYAHOO = value; 
	}


	public get getUserPhoto():string{ 
		return this.USERPHOTO; 
	}


	public set setUserPhoto(value :string){ 
		this.USERPHOTO = value; 
	}

	public get getMedium():string{ 
		return this.MEDIUM; 
	}


	public set setMedium(value :string){ 
		this.MEDIUM = value; 
	}


    /**
     * Getter getTOKEN
     * @return {string}
     */
	public get getTOKEN(): string {
		return this.TOKEN;
	}

    /**
     * Setter setTOKEN
     * @param {string} value
     */
	public set setTOKEN(value: string) {
		this.TOKEN = value;
	}


    /**
     * Getter getTOUCHID
     * @return {string}
     */
	public get getTOUCHID(): string {
		return this.TOUCHID;
	}

    /**
     * Setter setTOUCHID
     * @param {string} value
     */
	public set setTOUCHID(value: string) {
		this.TOUCHID = value;
	}


    /**
     * Getter getTCFlag
     * @return {string}
     */
	public get getTCFlag(): string {
		return this.TCFlag;
	}

    /**
     * Setter setTCFlag
     * @param {string} value
     */
	public set setTCFlag(value: string) {
		this.TCFlag = value;
	}

	/**
     * Getter getTCCODE
     * @return {string}
     */
	public get getTCCODE(): string {
		return this.TCCODE;
	}

    /**
     * Setter setTCCODE
     * @param {string} value
     */
	public set setTCCODE(value: string) {
		this.TCCODE = value;
	}

	/**
     * @return {string}
     */
	public get getCurrencySign(): string {
        if(this.UCURRENCY && this.UCURRENCY.toString().trim() === Constants.USD){
            return Constants.CURRENCY_USD
          }else{
            return Constants.CURRENCY_INR
          }
          
	}

}