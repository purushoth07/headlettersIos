import { Injectable } from '@angular/core';
import { Http, Connection } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '../../../node_modules/@ionic-native/network';
import { Platform } from 'ionic-angular';
/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NetworkProvider {

  status:boolean;
  currentPlatform:string;

  constructor(public http: Http,private network:Network,private platform: Platform) {
    //console.log('Hello NetworkProvider Provider');
    this.initializeNetworkEvents();
    
  }

  public initializeNetworkEvents(): void {

    if( !this.platform.is('mobile') || this.platform.is('mobileweb')){
      this.status = true;
      return;
    }
//    console.log("TYPEEEE:"+this.network.type);
  
    if(!this.network.type || this.network.type.toString() === "none"){
      this.status = false;
    }else{
      this.status = true;
    }

    /* OFFLINE */
    this.network.onDisconnect().subscribe(() => {
        // if (this.status === true) {
          this.status=false; 
        // }
    });

    /* ONLINE */
    this.network.onConnect().subscribe(() => {
        // if (this.status === false) {
           this.status=true; 
        // }
    });


  }

  public getNetworkType(): string {
    return this.network.type
  }

  public isInternetConnected():boolean{
       
    return this.status;
  }
  


}
