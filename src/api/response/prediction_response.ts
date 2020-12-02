import { PredictionData } from "./prediction_data";

export class PredictionResponse {
    private Status: string;
    private Message: string;
    private Data: PredictionData[] = [];
    private ErrorMessage: string;

    constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				if(prop === 'Data'){
                    try{
                        let list: PredictionData[] = jsonObj[prop];
                        for(let item of list){
                            let ho:PredictionData = new PredictionData(JSON.stringify(item));
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
    
    
    public get getData():PredictionData[]{ 
        return this.Data; 
    }
    
    
    public set setData(value :PredictionData[]){ 
        this.Data = value; 
    }
    
    
    public get getErrormessage():string{ 
        return this.ErrorMessage; 
    }
    
    
    public set setErrormessage(value :string){ 
        this.ErrorMessage = value; 
    }

}