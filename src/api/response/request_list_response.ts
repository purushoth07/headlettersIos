import { RequestData } from "./request_data";

export class RequestListResponse{

    private Status: string;
    private Message: string;
    private Data: RequestData[] = [];
    private ErrorMessage: string;


    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				if(prop === 'Data'){
                    try{
                        let list: RequestData[] = jsonObj[prop];
                        for(let item of list){
                            let ho:RequestData = new RequestData(JSON.stringify(item));
                            this.Data.push(ho);
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
    
    
    public get getData():RequestData[]{ 
        return this.Data; 
    }
    
    
    public set setData(value :RequestData[]){ 
        this.Data = value; 
    }
    
    
    public get getErrormessage():string{ 
        return this.ErrorMessage; 
    }
    
    
    public set setErrormessage(value :string){ 
        this.ErrorMessage = value; 
    }

}