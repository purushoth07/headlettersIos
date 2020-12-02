import { MessageData } from "./message_data";


export class MessageListResponse{

private Status: string;
private Message: string;
private Data: MessageData[]=[]
private ErrorMessage: string;

constructor(jsonStr?: string) {
	try{
		let jsonObj: any = JSON.parse(jsonStr);
		for (let prop in jsonObj) {
			if(prop === 'Data'){
				try{
					let list: MessageData[] = jsonObj[prop];
					for(let item of list){
						let obj:MessageData = new MessageData(JSON.stringify(item));
						this.Data.push(obj);
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


public get getData():MessageData[]{ 
	return this.Data; 
}


public set setData(value :MessageData[]){ 
	this.Data = value; 
}


public get getErrormessage():string{ 
	return this.ErrorMessage; 
}


public set setErrormessage(value :string){ 
	this.ErrorMessage = value; 
}

}
