import { TransitCommentResponsedata } from "./transit_comment_response_data";

export class TransitCommentResponse{
    private Status: string;
    private Message: string;
    private Data: TransitCommentResponsedata;
    private ErrorMessage: string;


    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				if(prop === 'Data'){
                    try{
						let obj:TransitCommentResponsedata = new TransitCommentResponsedata(JSON.stringify(jsonObj[prop]));
                        this.Data = obj;
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
    
    
    public get getData():TransitCommentResponsedata{ 
        return this.Data; 
    }
    
    
    public set setData(value :TransitCommentResponsedata){ 
        this.Data = value; 
    }
    
    
    public get getErrormessage():string{ 
        return this.ErrorMessage; 
    }
    
    
    public set setErrormessage(value :string){ 
        this.ErrorMessage = value; 
    }
}