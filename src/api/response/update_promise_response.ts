import { PromiseData } from "./promise_data";

export class UpdatePromiseResponse{
    private Status: string;
		private Message: string;
		private Data: PromiseData;
		private ErrorMessage: string;


		// constructor(jsonStr?: string) {
		// 	try{
		// 		let jsonObj: any = JSON.parse(jsonStr);
		// 		for (let prop in jsonObj) {
		// 			this[prop] = jsonObj[prop];
		// 		}
		// 	}catch(e){
				
		// 	}
		// }

		constructor(jsonStr?: string) {
			try{
				let jsonObj: any = JSON.parse(jsonStr);
				for (let prop in jsonObj) {
					if(prop === 'Data'){
							let ho:PromiseData = new PromiseData(JSON.stringify(jsonObj[prop]));
							this.Data = ho;
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


		public get getData():PromiseData{ 
			return this.Data; 
		}


		public set setData(value :PromiseData){ 
			this.Data = value; 
		}


		public get getErrorMessage():string{ 
			return this.ErrorMessage; 
		}


		public set setErrorMessage(value :string){ 
			this.ErrorMessage = value; 
		}



}