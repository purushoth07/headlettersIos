export class UpdatePromiseRequest{
    private PMUSERID: string;
    private PMHID: string;
    private PMSEQ: number;
    private PMFEEDFLAG: string;
    private PMCUSTOMERCOM: string;


    // Getter and setter // 

    public get getPmUserId():string{ 
        return this.PMUSERID; 
    }


    public set setPmUserId(value :string){ 
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


    public get getPmFeedFlag():string{ 
        return this.PMFEEDFLAG; 
    }


    public set setPmFeedFlag(value :string){ 
        this.PMFEEDFLAG = value; 
    }


    public get getPmCustomerCom():string{ 
        return this.PMCUSTOMERCOM; 
    }


    public set setPmCustomerCom(value :string){ 
        this.PMCUSTOMERCOM = value; 
    }


}
