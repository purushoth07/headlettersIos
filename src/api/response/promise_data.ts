import * as Constants from '../../utils/constants'
import { DatePipe } from '@angular/common';
import * as strings from '../../utils/strings'
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';

export class PromiseData{
	public datePipe = new DatePipe("en-US");

	private PMUSERID: string;
	private PMHID: string;
	private PMSEQ: number;
	private PMCAT: string;
	private PMPDATE: string;
	private PMSIGNIFICATION: string;
	private PMDETAILS: string;
	private PMFEEDFLAG: string;
	private PMCUSTOMERCOM: string;
	private PMAGENTCOM: string;
	private PMHCOMMENTS: string;
	private PMRECDELETED: string;
	private PMSTATUS: string;
	private PMUNREAD: string;
	private HORONAME:string;
	private HORONATIVEIMAGE:string;
	private PMFREQUENCY:string;

	private displayDate:string;
	private displayTime:string;
	private agentCommentToDisplay:string;
	private historyCommentToDisplay:string[]=[];
    private unread:boolean;
	private feedFlag:boolean;
	private customId:number;

	constructor(jsonStr?: string) {
		try{
			let jsonObj: any = JSON.parse(jsonStr);
			for (let prop in jsonObj) {
				// if(prop === 'PMPDATE'){
                //     let d = JSON.stringify(jsonObj[prop]);
                //     this.displayDate = this.getFormattedDate(d);
                // }
				this[prop] = jsonObj[prop];
			}
		}catch(e){
			
		}
	}

		// Getter and setter // 

		public get getPmUseriId():string{ 
			return this.PMUSERID; 
		}


		public set setPmUserid(value :string){ 
			this.PMUSERID = value; 
		}


		public get getPmHId():string{ 
			return this.PMHID; 
		}


		public set setPmHId(value :string){ 
			this.PMHID = value; 
		}


		public get getPmSeq():number{ 
			return this.PMSEQ; 
		}


		public set setPmSeq(value :number){ 
			this.PMSEQ = value; 
		}


		public get getPmCat():string{ 
			return this.PMCAT; 
		}


		public set setPmCat(value :string){ 
			this.PMCAT = value; 
		}


		public get getPmPDate():string{ 
			return this.PMPDATE; 
		}


		public set setPmPDate(value :string){ 
			this.PMPDATE = value; 
			try{
				this.displayDate = this.getDisplayDate(value);
			}catch(e){

			}
		}


		public get getPmSignification():string{ 
			return this.PMSIGNIFICATION; 
		}


		public set setPmSignification(value :string){ 
			this.PMSIGNIFICATION = value; 
		}


		public get getPmDetails():string{ 
			return this.PMDETAILS; 
		}


		public set setPmDetails(value :string){ 
			this.PMDETAILS = value; 
		}


		public get getPmFeedFlag():string{ 
			return this.PMFEEDFLAG; 
		}


		public set setPmFeedFlag(value :string){ 
			this.PMFEEDFLAG = value; 
			if(this.PMFEEDFLAG === 'T'){
				this.feedFlag = true;
				//console.log("SET_FEED:TRUE");
			}else{
				this.feedFlag = false;
				//console.log("SET_FEED:FALSE");
			}
		}


		public get getPmCustomerCom():string{ 
			return this.PMCUSTOMERCOM; 
		}


		public set setPmCustomerCom(value :string){ 
			this.PMCUSTOMERCOM = value; 
		}


		public get getPmAgentCom():string{ 
			return this.PMAGENTCOM; 
		}


		public set setPmAgentCom(value :string){ 
			this.PMAGENTCOM = value; 
		}


		public get getPmHComments():string{ 
			return this.PMHCOMMENTS; 
		}


		public set setPmHComments(value :string){ 
			this.PMHCOMMENTS = value; 
		}


		public get getPmRecDeleted():string{ 
			return this.PMRECDELETED; 
		}


		public set setPmRecDeleted(value :string){ 
			this.PMRECDELETED = value; 
		}


		public get getPmStatus():string{ 
			return this.PMSTATUS; 
		}


		public set setPmStatus(value :string){ 
			this.PMSTATUS = value; 
		}


		public get getPmUnread():string{ 
			return this.PMUNREAD; 
		}


		public set setPmUnread(value :string){ 
			this.PMUNREAD = value; 
		}

	    getDisplayDate(rawDate: string,translate?:TranslateService): string {
			//if(!this.displayDate && this.TXNDATE){
				//this.displayPaidDate = this.getFormattedDate(this.PAIDDATE,translate) ;
			// }else{
				 //return this.displayPaidDate;
			// }
			// let no_date = strings.yet_to_be_paid;
			// 	translate.get(no_date).subscribe(
			// 		value => {
			// 			// value is our translated string
			// 			no_date = value;
			// 		}
			// 	);
			// 	if(this.PMPDATE && !this.PMPDATE.includes(Constants.UTC)){
			// 		if(!platform.is('ios')){
			// 			this.PMPDATE = this.PMPDATE.replace("T",Constants.UTC);
			// 		}
			// 	}
				if(!rawDate || rawDate === null || rawDate=== 'null'){
					
					return "no date";
				}
				// if(translate && translate.currentLang === 'en'){
					// this.displayDate = this.getFormattedDate(this.PMPDATE) + " at " + this.getFormattedTime(this.PMPDATE,translate);
				// }else{
					this.displayDate = this.getFormattedDate(rawDate) +" "+ this.getFormattedTime(rawDate,translate);
	             //alert(JSON.stringify(this.displayDate));
			// }
				 return this.displayDate;
		}
	
		// public getdisplayTimeToShow(translate:TranslateService): string {
		// 	this.displayTime = this.getFormattedTime(this.HTXNTIME,translate);
		// 	return this.displayTime;
			
		// }
		
		getFormattedDate(d:string):string{
			   if(d){
				   
						let date = new Date(d);
					
						return this.datePipe.transform(date, 'dd/MM/yyyy');
					}else{
						return;
					}	
			
			
			// let date = new Date(d);
			// if(translate){
			// 	this.datePipe = new DatePipe(translate.currentLang);
			// }
			// if(translate && translate.currentLang === 'hi'){
			// 	return this.datePipe.transform(date, 'dd MMMM yyyy');
			// }else{
			// 	return this.datePipe.transform(date, 'dd MMM yyyy');
			// }
		}
		
		
		getFormattedTime(d:string,translate?:TranslateService):string{
			if(d){
				let date = new Date(d);
				const time = this.datePipe.transform(date, 'hh:mm');
				let h =  this.datePipe.transform(date, 'HH');
				let ampm:string;
				  if(Number(h)>12){
					ampm = 'PM';
				  }else{
					ampm = 'AM';
				  }

				  if(translate){
					translate.get(ampm).subscribe(
						value => {
						  // value is our translated string
						  ampm = value;
						}
					  )
				  }
				  	return time + ' ' + ampm;	
			}else{
				return ;
			}
		}




		/**
		 */
		// public get getDisplayDate(): string {
		// 	if(!this.displayDate && this.PMPDATE){
		// 		return this.displayDate = this.getFormattedDate(this.PMPDATE);
		// 	}else{
		// 		return this.displayDate;
		// 	}
		// }

		// getFormattedDate(d:string):string{
		// 	if(d){
		// 		let date = new Date(d);
		// 		return this.datePipe.transform(date, 'dd/MM/yyyy');
		// 	}else{
		// 		return;
		// 	}	
		// }
		
		public get getAgentCommentToDisplay():string{
			if(this.PMSTATUS && this.PMSTATUS.toString().trim() === '2'){ 
				if(!this.agentCommentToDisplay){
					if(!this.PMAGENTCOM){
						return ;
					}else{
						try{
							let s = this.PMAGENTCOM.split("!");
							for(let item of s){
								if(!item || item === ''){
									continue;
								}
								if(this.agentCommentToDisplay){
									try{
										let n = item.split("^")[2];
										let name = "No Name Found";
										if(n){
											name = n.toString().trim();
											this.agentCommentToDisplay = name+ ' \n';
										}else{
											this.agentCommentToDisplay = name+ ' \n';
										}
									}catch(e){
										this.agentCommentToDisplay = name+' \n';
									}
									let d = new Date(item.split("^")[1]);
									this.agentCommentToDisplay += this.datePipe.transform(d, 'dd MMM yyyy').toString() + " : "
									this.agentCommentToDisplay += item.split("^")[0] + '\n';
								}else{
									try{
										let n = item.split("^")[2];
										let name = "No Name Found";
										if(n){
											name = n.toString().trim();
											this.agentCommentToDisplay = name+ ' \n';
										}else{
											this.agentCommentToDisplay = name+ ' \n';
										}
									}catch(e){
										this.agentCommentToDisplay = name+' \n';
									}
									let d = new Date(item.split("^")[1]);
									this.agentCommentToDisplay += this.datePipe.transform(d, 'dd MMM yyyy').toString() + " : "
									this.agentCommentToDisplay += item.split("^")[0] + '\n';
								}
			                              
							}
							return this.agentCommentToDisplay;
						}catch(e){
	
						}
					}
				}else{
					return this.agentCommentToDisplay;
				} 
			}else{
				return null;
			}
		}
	
		public getHistoryCommentToDisplay(translate?:TranslateService):string[]{ 
			let nameTranslate = strings.no_name_found;
			if(translate){
				translate.get(nameTranslate).subscribe(
					value => {
					// value is our translated string
					nameTranslate = value;
					}
				) 
			}
			
			if(!this.historyCommentToDisplay || this.historyCommentToDisplay.length == 0){
				if(!this.PMHCOMMENTS){
					return this.historyCommentToDisplay;
				}else{
					try{
						
						let s = this.PMHCOMMENTS.split("!");
						
						for(let item of s){
							if(item){
								let message;
								let name = nameTranslate;
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
							
								this.historyCommentToDisplay.push(message);
							}
						}
						return this.historyCommentToDisplay;
					}catch(e){
					}
				}
			}else{
				return this.historyCommentToDisplay;
			} 
		}
	
	
		public get isUnread(){ 
			if(this.PMSTATUS && this.PMSTATUS.toString().trim()==='2'
				&& this.PMUNREAD && this.PMUNREAD.toString().trim()===Constants.YES){
					return true;
			}else{
					return false;
			} 
		}

		public get isFeedFlag(): boolean {
			// if(this.PMFEEDFLAG){
			// 	if(this.PMFEEDFLAG === Constants.TRUE){
					return this.feedFlag;
			// 	}else{
			// 		return this.feedFlag = false;
			// 	}
			// }else{
			// 	return;
			// }
			
		}


	public get getRequestType(): string {
		if(!this.PMCAT){
			return
		}
		switch(this.PMCAT.toString().trim()){
			case "1":
				return strings.weekly;
			case "2":
				return strings.daily;
			case "3":
				return strings.special;
			case "7":
				return strings.gen_chart;
			case "9":
				return strings.promise;
			
		}
		
	}

   
	public get getCustomId(): number {
		return this.customId;
	}

   
	public set setCustomId(value: number) {
		this.customId = value;
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

	public get getPMFREQUENCY(): string {
		return this.PMFREQUENCY;
	}

	public set setPMFREQUENCY(value: string) {
		this.PMFREQUENCY = value;
	}

}
