export class TimeZone{
    private dstOffset: number;
    private rawOffset: number;
    private status: string;
    private timeZoneId: string;
    private timeZoneName: string;


    constructor(jsonStr?: string) {
        try{
            let jsonObj: any = JSON.parse(jsonStr);
            for (let prop in jsonObj) {
                this[prop] = jsonObj[prop];
            }
        }catch(e){
            
        }
    }
    
    public get getDstOffset(): number {
        return this.dstOffset;
    }

    public set setDstOffset(value: number) {
        this.dstOffset = value;
    }
   
    public get getRawOffset(): number {
        return this.rawOffset;
    }
    public set setRawOffset(value: number) {
        this.rawOffset = value;
    }
   
    public get getStatus(): string {
        return this.status;
    }
    public set setStatus(value: string) {
        this.status = value;
    }
 
    public get getTimeZoneId(): string {
        return this.timeZoneId;
    }

    public set setTimeZoneId(value: string) {
        this.timeZoneId = value;
    }
 
    public get getTimeZoneName(): string {
        return this.timeZoneName;
    }
    public set setTimeZoneName(value: string) {
        this.timeZoneName = value;
    }

}