export class AddMessageRequest{
	private MSGUSERID: string;
	private MSGHID: string;
	private MSGMESSAGEID: string;
	private MSGCUSTOMERCOM: string;
	private MSGHCOMMENTS: string;
	private MSGSTATUS: string;
	private MSGUNREAD: string;


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


	public get getMsgHComments():string{ 
		return this.MSGHCOMMENTS; 
	}


	public set setMsgHComments(value :string){ 
		this.MSGHCOMMENTS = value; 
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
}
