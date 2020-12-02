import { DatePipe } from '@angular/common';
import { HoroscopeListResponse } from './horoscope_list_response';
import { HoroscopeResponseData } from './horoscope_response_data';
import * as strings from '../../utils/strings';
// import { TranslateService } from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';

export class PredictionData {

    public datePipe = new DatePipe("en-US");

    private PRUSERID: string;
    private PRHID: string;
    private PRREQUESTID: string;
    private PRREQUESTIDSEQ: number;
    private PRSIGNIFICATION: string;
    private PRDATE: string;
    private PRENDTIME: string;
    private PRDDASA: string;
    private PRDETAILS: string;
    private PRFEEDFLAG: string;
    private PRCUSTOMERCOM: string;
    private PRAGENTCOM: string;
    private PRHCOMMENTS: string;
    private PRRECDELETED: string;
    private PRSTATUS: string;
	private PRUNREAD: string;
	private HORONAME:string;
	private HORONATIVEIMAGE:string;

    private displayRequestDate:string;
    private agentCommentToDisplay:string;
	private historyCommentToDisplay:string[]=[];
    private unread:boolean;
    private horoscopeName:string;
	private horoscopeImage:string;
	private feedFlag:boolean;
	private customId:number;

    constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                this[prop] = jsonObj[prop];
            }
        }catch(e){
            
        }
    }

    /**
     * Getter $PRUSERID
     * @return {string}
     */
	public get getPRUSERID(): string {
		return this.PRUSERID;
	}

    /**
     * Getter getPRHID
     * @return {string}
     */
	public get getPRHID(): string {
		return this.PRHID;
	}

    /**
     * Getter getPRREQUESTID
     * @return {string}
     */
	public get getPRREQUESTID(): string {
		return this.PRREQUESTID;
	}

    /**
     * Getter getPRREQUESTIDSEQ
     * @return {number}
     */
	public get getPRREQUESTIDSEQ(): number {
		return this.PRREQUESTIDSEQ;
	}

    /**
     * Getter getPRSIGNIFICATION
     * @return {string}
     */
	public get getPRSIGNIFICATION(): string {
		return this.PRSIGNIFICATION;
	}

    /**
     * Getter getPRDATE
     * @return {string}
     */
	public get getPRDATE(): string {
		return this.PRDATE;
	}

    /**
     * Getter getPRENDTIME
     * @return {string}
     */
	public get getPRENDTIME(): string {
		return this.PRENDTIME;
	}

    /**
     * Getter getPRDDASA
     * @return {string}
     */
	public get getPRDDASA(): string {
		return this.PRDDASA;
	}

    /**
     * Getter getPRDETAILS
     * @return {string}
     */
	public get getPRDETAILS(): string {
		return this.PRDETAILS;
	}

    /**
     * Getter getPRFEEDFLAG
     * @return {string}
     */
	public get getPRFEEDFLAG(): string {
		return this.PRFEEDFLAG;
	}

    /**
     * Getter getPRCUSTOMERCOM
     * @return {string}
     */
	public get getPRCUSTOMERCOM(): string {
		return this.PRCUSTOMERCOM;
	}

    /**
     * Getter getPRAGENTCOM
     * @return {string}
     */
	public get getPRAGENTCOM(): string {
		return this.PRAGENTCOM;
	}

    /**
     * Getter getPRHCOMMENTS
     * @return {string}
     */
	public get getPRHCOMMENTS(): string {
		return this.PRHCOMMENTS;
	}

    /**
     * Getter getPRRECDELETED
     * @return {string}
     */
	public get getPRRECDELETED(): string {
		return this.PRRECDELETED;
	}

    /**
     * Getter getPRSTATUS
     * @return {string}
     */
	public get getPRSTATUS(): string {
		return this.PRSTATUS;
	}

    /**
     * Getter getPRUNREAD
     * @return {string}
     */
	public get getPRUNREAD(): string {
		return this.PRUNREAD;
	}

    /**
     * Setter setPRUSERID
     * @param {string} value
     */
	public set setPRUSERID(value: string) {
		this.PRUSERID = value;
	}

    /**
     * Setter setPRHID
     * @param {string} value
     */
	public set setPRHID(value: string) {
		this.PRHID = value;
	}

    /**
     * Setter setPRREQUESTID
     * @param {string} value
     */
	public set setPRREQUESTID(value: string) {
		this.PRREQUESTID = value;
	}

    /**
     * Setter setPRREQUESTIDSEQ
     * @param {number} value
     */
	public set setPRREQUESTIDSEQ(value: number) {
		this.PRREQUESTIDSEQ = value;
	}

    /**
     * Setter setPRSIGNIFICATION
     * @param {string} value
     */
	public set setPRSIGNIFICATION(value: string) {
		this.PRSIGNIFICATION = value;
	}

    /**
     * Setter setPRDATE
     * @param {string} value
     */
	public set setPRDATE(value: string) {
		this.PRDATE = value;
	}

    /**
     * Setter setPRENDTIME
     * @param {string} value
     */
	public set setPRENDTIME(value: string) {
		this.PRENDTIME = value;
	}

    /**
     * Setter setPRDDASA
     * @param {string} value
     */
	public set setPRDDASA(value: string) {
		this.PRDDASA = value;
	}

    /**
     * Setter setPRDETAILS
     * @param {string} value
     */
	public set setPRDETAILS(value: string) {
		this.PRDETAILS = value;
	}

    /**
     * Setter setPRFEEDFLAG
     * @param {string} value
     */
	public set setPRFEEDFLAG(value: string) {
		this.PRFEEDFLAG = value;
		if(this.PRFEEDFLAG === 'T'){
			this.feedFlag = true;
			//console.log("SET_FEED:TRUE");
		}else{
			this.feedFlag = false;
			//console.log("SET_FEED:FALSE");
		}
	}

    /**
     * Setter setPRCUSTOMERCOM
     * @param {string} value
     */
	public set setPRCUSTOMERCOM(value: string) {
		this.PRCUSTOMERCOM = value;
	}

    /**
     * Setter setPRAGENTCOM
     * @param {string} value
     */
	public set setPRAGENTCOM(value: string) {
		this.PRAGENTCOM = value;
	}

    /**
     * Setter setPRHCOMMENTS
     * @param {string} value
     */
	public set setPRHCOMMENTS(value: string) {
		this.PRHCOMMENTS = value;
	}

    /**
     * Setter setPRRECDELETED
     * @param {string} value
     */
	public set setPRRECDELETED(value: string) {
		this.PRRECDELETED = value;
	}

    /**
     * Setter setPRSTATUS
     * @param {string} value
     */
	public set setPRSTATUS(value: string) {
		this.PRSTATUS = value;
	}

    /**
     * Setter setPRUNREAD
     * @param {string} value
     */
	public set setPRUNREAD(value: string) {
		this.PRUNREAD = value;
    }
    
    public getAgentCommentToDisplay(translate:TranslateService):string{
		let nameTranslate = strings.no_name_found;
		translate.get(nameTranslate).subscribe(
			value => {
			  // value is our translated string
			  nameTranslate = value;
			}
		  ) 
		if(this.PRSTATUS && this.PRSTATUS.toString().trim() === '2'){ 
			if(!this.agentCommentToDisplay){
				if(!this.PRAGENTCOM){
					return ;
				}else{
					try{
						let s = this.PRAGENTCOM.split("!");
						for(let item of s){
							if(!item || item === ''){
								continue;
							}
							if(this.agentCommentToDisplay){
								try{
									let n = item.split("^")[2];
									let name = nameTranslate;
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
									let name = nameTranslate;
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
		translate.get(nameTranslate).subscribe(
			value => {
			  // value is our translated string
			  nameTranslate = value;
			}
		  ) 
		if(!this.historyCommentToDisplay || this.historyCommentToDisplay.length == 0){
			if(!this.PRHCOMMENTS){
				return this.historyCommentToDisplay;
			}else{
				try{
					
					let s = this.PRHCOMMENTS.split("!");
					
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
		if(this.PRSTATUS && this.PRSTATUS.toString().trim()==='2'
			&& this.PRUNREAD && this.PRUNREAD.toString().trim()==='y'){
				return true;
		}else{
				return false;
		} 
    }
    

    
	public get getHoroscopeName(): string {
		return this.HORONAME;
	}

    
	public set setHoroscopeName(value: string) {
		this.horoscopeName = value;
    }
    

	public get getHoroscopeImage(): string {
		return this.horoscopeImage;
	}

	public set setHoroscopeImage(value: string) {
		this.horoscopeImage = value;
	}

	

	public get getDisplayRequestDate(): string {
        if(!this.displayRequestDate && this.PRDATE){
            return this.displayRequestDate = this.datePipe.transform(new Date(this.PRDATE), 'dd/MM/yyyy').toString();
        }
		return this.displayRequestDate;
	}


	public get isFeedFlag(): boolean {
		//if(this.PRFEEDFLAG){
		//	if(this.PRFEEDFLAG === 't'){
			//console.log("FEEDS:"+this.feedFlag);
				return this.feedFlag;
		//	}else{
		//		return this.feedFlag = false;
		//	}
		//}else{
		//	return;
		//}
		
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
	

}