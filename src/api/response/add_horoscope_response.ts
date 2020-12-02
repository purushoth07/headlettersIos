import { HoroscopeResponseData } from "./horoscope_response_data";

export class AddHoroscopeResponse {
    public Status: string;
    public Message: string;
    public Data: HoroscopeResponseData;
    public ErrorMessage: string;

    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                if(prop === 'Data'){
                    try{
                        let ho:HoroscopeResponseData = new HoroscopeResponseData(JSON.stringify(jsonObj[prop]));
                        this.Data = ho;
                    }catch(e){
                        
                    }
                    
                }else{
                    this[prop] = jsonObj[prop];
                }
			}
        }catch(e){
            
        }
    }


     /**
     * Getter $Status
     * @return {string}
     */
	public get getStatus(): string {
		return this.Status;
	}

    /**
     * Getter $Message
     * @return {string}
     */
	public get getMessage(): string {
		return this.Message;
	}

	public get getData(): HoroscopeResponseData {
		return this.Data;
    }
    
    /**
     * Getter $ErrorMessage
     * @return {string}
     */
	public get getErrorMessage(): string {
		return this.ErrorMessage;
	}

    /**
     * Setter $Status
     * @param {string} value
     */
	public set setStatus(value: string) {
		this.Status = value;
	}

    /**
     * Setter $Message
     * @param {string} value
     */
	public set setMessage(value: string) {
		this.Message = value;
	}

    /**
     */
	public set setData(value: HoroscopeResponseData) {
		this.Data = value;
	}

    /**
     * Setter $ErrorMessage
     * @param {string} value
     */
	public set setErrorMessage(value: string) {
		this.ErrorMessage = value;
	}


}