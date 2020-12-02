export class MyLocation{
    private latitude:string;
    private longnitude:string;
    private countryCode:string;
    private countryName:string;
    private postalCode:string;
    private administrativeArea:string;
    private subAdministrativeArea:string;
    private locality:string;
    private subLocality:string;
    private thoroughfare:string;


    constructor(jsonStr?: string) {
		try{
			let jsonObj: any = JSON.parse(jsonStr);
			for (let prop in jsonObj) {
				this[prop] = jsonObj[prop];
			}
		}catch(e){
			
		}
	}

   
	public get getLatitude(): string {
		return this.latitude;
	}

  
	public get getLongnitude(): string {
		return this.longnitude;
	}

 
	public get getCountryCode(): string {
		return this.countryCode;
	}

  
	public get getCountryName(): string {
		return this.countryName;
	}

 
	public get getPostalCode(): string {
		return this.postalCode;
	}

  
	public get getAdministrativeArea(): string {
		return this.administrativeArea;
	}

 
	public get getSubAdministrativeArea(): string {
		return this.subAdministrativeArea;
	}

  
	public get getLocality(): string {
		return this.locality;
	}

	public get getSubLocality(): string {
		return this.subLocality;
	}


	public get getThoroughfare(): string {
		return this.thoroughfare;
	}

  
	public set setLatitude(value: string) {
		this.latitude = value;
	}

 
	public set setLongnitude(value: string) {
		this.longnitude = value;
	}

 
	public set setCountryCode(value: string) {
		this.countryCode = value;
	}

 
	public set setCountryName(value: string) {
		this.countryName = value;
	}

  
	public set setPostalCode(value: string) {
		this.postalCode = value;
	}

  
	public set setAdministrativeArea(value: string) {
		this.administrativeArea = value;
	}

	public set setSubAdministrativeArea(value: string) {
		this.subAdministrativeArea = value;
	}


	public set setLocality(value: string) {
		this.locality = value;
	}

	public set setSubLocality(value: string) {
		this.subLocality = value;
	}

    
	public set setThoroughfare(value: string) {
		this.thoroughfare = value;
	}


}