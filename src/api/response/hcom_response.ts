import { HCOMResponseData } from "./hcom_response_data";

export class HCOMResponse {
    private Status: string;
    private Message: string;
    private Data: HCOMResponseData;
    private ErrorMessage: string;


    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				if(prop === 'Data'){
						let ho:HCOMResponseData = new HCOMResponseData(JSON.stringify(jsonObj[prop]));
                        this.Data = ho;
				}else{
                	this[prop] = jsonObj[prop];
				}
			}
        }catch(e){
            
        }
    }

    public get getStatus():string{ 
        return this.Status; 
    }
    
    
    public set setStatus(value :string){ 
        this.Status = value; 
    }
    
    
    public get getMessage():string{ 
        return this.Message; 
    }
    
    
    public set setMessage(value :string){ 
        this.Message = value; 
    }
    
    
    public get getData():HCOMResponseData{ 
        return this.Data; 
    }
    
    
    public set setData(value :HCOMResponseData){ 
        this.Data = value; 
    }
    
    
    public get getErrormessage():string{ 
        return this.ErrorMessage; 
    }
    
    
    public set setErrormessage(value :string){ 
        this.ErrorMessage = value; 
    }

}