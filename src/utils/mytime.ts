import { DatePipe } from '@angular/common';

export class MyTime{
    private hours : string[] = [] //= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    
    private min : string[] = [] //= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    private sec : string[] = [] //= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
    private am_pm : string[] = ['AM','PM'];
    private selectedHour:string;
    private selectedMin:string;
    private selectedSec:string="00";
    private selectedAmPm:string;
    private currentHour:string;
    private currentMin:string;
    private currentSec:string;
    private currentAmPm:string;


    constructor(){
        this.initializeHours();
        this.initializeMin();
        this.initializeSec();
    }

    initializeHours(){
        for(let i = 1;i<=12;i++){
            if(i<10){
                this.hours.push("0"+i.toString());
            }else{
                this.hours.push(i.toString());
            }
            
        }
    }

    initializeMin(){
        for(let i = 0;i<60;i++){
            if(i<10){
                this.min.push("0"+i.toString());
            }else{
                this.min.push(i.toString());
            }
            
        }
    }

    initializeSec(){
        for(let i = 0;i<60;i++){
            if(i<10){
                this.sec.push("0"+i.toString());
            }else{
                this.sec.push(i.toString());
            }
            
        }
    }


    public get getHours(): string[]  {
		return this.hours;
	}

	// public set setHours(value: string[] ) {
	// 	this.hours = value;
    // }

    public get getMin(): string[]  {
		return this.min;
	}

	// public set setMin(value: string[] ) {
	// 	this.min = value;
    // }

    public get getSec(): string[]  {
		return this.sec;
	}

	// public set setSec(value: string[] ) {
	// 	this.sec = value;
    // }


	public get getAmPm(): string[]  {
		return this.am_pm;
	}

	// public set setAmPm(value: string[] ) {
	// 	this.am_pm = value;
    // }
    
	public get getSelectedHour(): string  {
		return this.selectedHour;
	}

	public get getSelectedMin(): string  {
		return this.selectedMin;
	}

	public get getSelectedSec(): string  {
		return this.selectedSec;
	}

	public get getCurrentHour(): string {
        let hour = new Date().getHours();
        if(hour>12){
            hour = hour-12;
        }
		return hour.toString();
	}

	public get getCurrentMin(): string {
		return new Date().getMinutes().toString();
	}

	public get getCurrentSec(): string {
		return new Date().getSeconds().toString();
	}

	public set setSelectedHour(value: string ) {
		this.selectedHour = value;
	}

	public set setSelectedMin(value: string ) {
		this.selectedMin = value;
	}

	public set setSelectedSec(value: string ) {
		this.selectedSec = value;
	}

	public set setCurrentHour(value: string) {
		this.currentHour = value;
	}

	public set setCurrentMin(value: string) {
		this.currentMin = value;
	}

	public set setCurrentSec(value: string) {
		this.currentSec = value;
	}
    

	public get getSelectedAmPm(): string  {
		return this.selectedAmPm;
    }
    
	public set setSelectedAmPm(value: string ) {
		this.selectedAmPm = value;
	}


	public get getCurrentAmPm(): string {
        let hour = new Date().getHours();
        if(hour>12){
            return 'PM';
        }else{
            return 'AM';
        }
	}




}