import { LoginResponseData } from "./login_response_data";

export class LoginResponse {
    private Status: string;
    private Message: string;
    private Data: LoginResponseData;
    private ErrorMessage: string;

    // constructor(jsonStr?: string) {
    //     try{
    //         let jsonObj: any = JSON.parse(jsonStr);
    //         for (let prop in jsonObj) {
    //             this[prop] = jsonObj[prop];
    //         }
    //     }catch(e){
            
    //     }
    // }

    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				if(prop === 'Data'){
						let ho:LoginResponseData = new LoginResponseData(JSON.stringify(jsonObj[prop]));
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
    
    
    public get getData():LoginResponseData{ 
        return this.Data; 
    }
    
    
    public set setData(value :LoginResponseData){ 
        this.Data = value; 
    }
    
    
    public get getErrormessage():string{ 
        return this.ErrorMessage; 
    }
    
    
    public set setErrormessage(value :string){ 
        this.ErrorMessage = value; 
    }

}