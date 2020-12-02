import { DatePipe } from '@angular/common';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import * as strings from '../../utils/strings';

export class MessageData{

	public datePipe = new DatePipe("en-US");

	private MSGUSERID: string;
	private MSGHID: string;
	private MSGMESSAGEID: string;
	private MSGCUSTOMERCOM: string;
	private MSGAGENTCOM: string;
	private MSGHCOMMENTS: string;
	private MSGSTATUS: string;
	private MSGUNREAD: string;
	private MSGDELETED: string;
	private HORONAME:string;
	private HORONATIVEIMAGE:string;

	private agentMessageToDisplay:string;
	private historyMessageToDisplay:string[]=[];
	private unread:boolean;

	constructor(jsonStr?: string) {
		try{
			let jsonObj: any = JSON.parse(jsonStr);
			for (let prop in jsonObj) {
				this[prop] = jsonObj[prop];
			}
		}catch(e){
			
		}
	}

	// Getter and setter // 

	public get getMsgUserId():string{ 
		return this.MSGUSERID; 
	}


	public set setMsgUserId(value :string){ 
		this.MSGUSERID = value; 
	}


	public get getMsgHId():string{ 
		return this.MSGHID; 
	}


	public set setMsgHId(value :string){ 
		this.MSGHID = value; 
	}


	public get getMsgMessageId():string{ 
		return this.MSGMESSAGEID; 
	}


	public set setMsgMessageId(value :string){ 
		this.MSGMESSAGEID = value; 
	}


	public get getMsgCustomerCom():string{ 
		return this.MSGCUSTOMERCOM; 
	}


	public set setMsgCustomerCom(value :string){ 
		this.MSGCUSTOMERCOM = value; 
	}


	public get getMsgAgentCom():string{ 
		return this.MSGAGENTCOM; 
	}


	public set setMsgAgentCom(value :string){ 
		this.MSGAGENTCOM = value; 
		// try{
		// 	let s = value.split("!");
		// 	for(let item of s){
		// 	this.agentMessageToDisplay += item.split("^")[0] + '\n';
		// 	}
		// }catch(e){
			
		// }
	}


	public get getMsgHComments():string{ 
		return this.MSGHCOMMENTS; 
	}


	public set setMsgHComments(value :string){ 
		this.MSGHCOMMENTS = value; 
		// try{
		// 	let s = value.split("!");
		// 	for(let item of s){
		// 		this.historyMessageToDisplay += item.split("^")[0] + '\n';
		// 	}
		// }catch(e){
			
		// }
	}


	public get getMsgStatus():string{ 
		return this.MSGSTATUS; 
	}


	public set setMsgStatus(value :string){ 
		this.MSGSTATUS = value; 
	}


	public get getMsgUnread():string{ 
		return this.MSGUNREAD; 
	}


	public set setMsgUnread(value :string){ 
		this.MSGUNREAD = value; 
	}


	public get getMsgDeleted():string{ 
		return this.MSGDELETED; 
	}


	public set setMsgDeleted(value :string){ 
		this.MSGDELETED = value; 
	}


	public getAgentMessageToDisplay(no_name?:string):string{
		// if(translate){
		// 	translate.get(nameTranslate).subscribe(
		// 		value => {
		// 			// value is our translated string
		// 			nameTranslate = value;
		// 			console.log("TRANS1:"+nameTranslate);
		// 		}
		// 	) 
		// }

		if(!no_name){
			no_name = strings.no_name_found;
		}

		
		if(this.MSGSTATUS && this.MSGSTATUS.toString().trim() === '2'){ 
			if(!this.agentMessageToDisplay){
				if(!this.MSGAGENTCOM){
					return '';
				}else{
					try{
						let s = this.MSGAGENTCOM.split("!");
						for(let item of s){
							if(!item || item === ''){
								continue;
							}
							if(this.agentMessageToDisplay){
								let name =  no_name;
								try{
									let n = item.split("^")[2];
									if(n){
										name = n.toString().trim();
										this.agentMessageToDisplay = name+ ' \n';
									}else{
										this.agentMessageToDisplay = name+ ' \n';
									}
								}catch(e){
									this.agentMessageToDisplay = name+' \n';
								}
								let d = new Date(item.split("^")[1]);
								// this.agentMessageToDisplay += this.datePipe.transform(d, 'dd/MM/yyyy').toString() + " : "
								this.agentMessageToDisplay += this.datePipe.transform(d, 'dd/MM/yyyy').toString() + " : "
								this.agentMessageToDisplay += item.split("^")[0] + '\n';
							}else{
								let name =  no_name;
								
								try{
									let n = item.split("^")[2];
									if(n){
										name = n.toString().trim();
										this.agentMessageToDisplay = name+ ' \n';
									}else{
										this.agentMessageToDisplay = name+ ' \n';
									}
								}catch(e){
									this.agentMessageToDisplay = name+' \n';
								}
								let d = new Date(item.split("^")[1]);
								this.agentMessageToDisplay += this.datePipe.transform(d, 'dd/MM/yyyy').toString() + " : "
								this.agentMessageToDisplay += item.split("^")[0] + '\n';
							}
							
						}
						return this.agentMessageToDisplay;
					}catch(e){
						return '';
					}
				}
			}else{
				return this.agentMessageToDisplay;
			} 
		}else{
			return '';
		}
	}

	public getHistoryMessageToDisplay(noName:string):string[]{ 
		// let nameTranslate = strings.no_name_found;
		// translate.get(nameTranslate).subscribe(
		// 	value => {
		// 	  // value is our translated string
		// 	  nameTranslate = value;
		// 	}
		//   ) 
		if(!this.historyMessageToDisplay || this.historyMessageToDisplay.length == 0){
			if(!this.MSGHCOMMENTS){
				return this.historyMessageToDisplay;
			}else{
				try{
					let s = this.MSGHCOMMENTS.split("!");
					for(let item of s){
						if(item === ""){
							continue;
						}
						let message;
						let name = noName;
						try{
							let n = item.split("^")[2];
							if(n){
								name = n.toString().trim();
								message = name+ ' \n';
							}else{
								message = name+ ' \n';
							}
						}catch(e){
							message = name+' \n';
						}

						let d = new Date(item.split("^")[1]);
						message += this.datePipe.transform(d, 'dd/MM/yyyy').toString() + " : "
						message += item.split("^")[0] + '\n';
					
						// console.log("MSG:" + message);
						this.historyMessageToDisplay.push(message);
					}
					//console.log("MSG DATA "+ JSON.stringify(this.historyMessageToDisplay));
					return this.historyMessageToDisplay;
				}catch(e){
					//console.log("ERROR:",e.message);
				}
			}
		}else{
			return this.historyMessageToDisplay;
		} 
	}


	public get isUnread(){ 
		if(this.MSGSTATUS && this.MSGSTATUS.toString().trim()==='2'
			&& this.MSGUNREAD && this.MSGUNREAD.toString().trim()==='y'){
				return true;
		}else{
				return false;
		} 
	}


    
	public get getHORONAME(): string {
		return this.HORONAME;
	}

	public set setHORONAME(value: string) {
		this.HORONAME = value;
	}


	public get getHORONATIVEIMAGE(): string {
		return this.HORONATIVEIMAGE;
	}

	public set setHORONATIVEIMAGE(value: string) {
		this.HORONATIVEIMAGE = value;
	}



}
