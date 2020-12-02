import { PromiseData } from "./promise_data";

export class PromiseListResponse{
    private Status: string;
	private Message: string;
	private Data: PromiseData[] = [];
	private ErrorMessage: string;

	
	constructor(jsonStr?: string) {
        try{
			let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
				if(prop === 'Data'){
					try{
						let list: PromiseData[] = jsonObj[prop];
						for(let item of list){
							let ho:PromiseData = new PromiseData(JSON.stringify(item));
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

	// Getter and setter // 

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


	public get getData():PromiseData[]{ 
		return this.Data; 
	}


	public set setData(value :PromiseData[]){ 
		this.Data = value; 
	}


	public get getErrorMessage():string{ 
		return this.ErrorMessage; 
	}


	public set setErrorMessage(value :string){ 
		this.ErrorMessage = value; 
	}



}