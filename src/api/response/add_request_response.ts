import { AddRequestData } from "./add_request_data";

export class AddRequestResponse{
    private Status: string;
    private Message: string;
    private Data: AddRequestData;
    private ErrorMessage: string;

    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				if(prop === 'Data'){
						let obj:AddRequestData = new AddRequestData(JSON.stringify(jsonObj[prop]));
                        this.Data = obj;
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
    
    
    public get getData():AddRequestData{ 
        return this.Data; 
    }
    
    
    public set setData(value :AddRequestData){ 
        this.Data = value; 
    }
    
    
    public get getErrormessage():string{ 
        return this.ErrorMessage; 
    }
    
    
    public set setErrormessage(value :string){ 
        this.ErrorMessage = value; 
    }

}