export class UpdateLocation {
    private USERID: string;
    private LATITUDE: string;
    private LONGITUDE: string;
    public get getUSERID(): string {
        return this.USERID;
    }
    public get getLATITUDE(): string {
        return this.LATITUDE;
    }
    public get getLONGITUDE(): string {
        return this.LONGITUDE;
    }
    public set setUSERID(value: string) {
        this.USERID = value;
    }
    public set setLATITUDE(value: string) {
        this.LATITUDE = value;
    }
    public set setLONGITUDE(value: string) {
        this.LONGITUDE = value;
    }
}