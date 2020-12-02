export class HCOMResponseData{
    private HCOMUSERID: string;
    private HCOMHID: string;
    private HCOMACTION: string;
    private HCOMRLOCK: string;
    private HMAIN: string;


    constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                this[prop] = jsonObj[prop];
            }
        }catch(e){
            
        }
    }
  
	public get getHCOMUSERID(): string {
		return this.HCOMUSERID;
	}

	public get getHCOMHID(): string {
		return this.HCOMHID;
	}

	public get getHCOMACTION(): string {
		return this.HCOMACTION;
	}

	public get getHCOMRLOCK(): string {
		return this.HCOMRLOCK;
	}

	public get getHMAIN(): string {
		return this.HMAIN;
	}

	public set setHCOMUSERID(value: string) {
		this.HCOMUSERID = value;
    }
    
	public set setHCOMHID(value: string) {
		this.HCOMHID = value;
	}

  
	public set setHCOMACTION(value: string) {
		this.HCOMACTION = value;
	}

	public set setHCOMRLOCK(value: string) {
		this.HCOMRLOCK = value;
	}

	public set setHMAIN(value: string) {
		this.HMAIN = value;
	}

}