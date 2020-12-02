import { HoroscopeResponseData } from "./horoscope_response_data";

export class HoroscopeListResponse {
	private Status: string;
    private Message: string;
    private Data: HoroscopeResponseData[] = [];
    private ErrorMessage: string;

	constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				if(prop === 'Data'){
					// if(!jsonObj[prop] || jsonObj[prop] === null || jsonObj[prop] === 'null'){
					// 	return;
					// }
					try{
						let list: HoroscopeResponseData[] = jsonObj[prop];
						for(let item of list){
							try{
								//let foo: HoroscopeResponseData = Object.assign(new HoroscopeResponseData(), list);
								let ho:HoroscopeResponseData = new HoroscopeResponseData(JSON.stringify(item));
								this.Data.push(ho);
							}catch(e){

							}
						}
					}catch(e){

					}
				}else{
                	this[prop] = jsonObj[prop];
				}
			}
        }catch(e){
            
        }
    }

	public get getStatus(): string {
		return this.Status;
	}

	public get getMessage(): string {
		return this.Message;
	}

	public get getData(): HoroscopeResponseData[] {
		return this.Data;
	}

	public get getErrorMessage(): string {
		return this.ErrorMessage;
	}

	public set setStatus(value: string) {
		this.Status = value;
	}

	public set setMessage(value: string) {
		this.Message = value;
	}

	public set setData(value: HoroscopeResponseData[]) {
		this.Data = value;
	}

	public set setErrorMessage(value: string) {
		this.ErrorMessage = value;
	}

}