import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Storage} from '@ionic/storage';
import { LoginResponseData } from '../../api/response/login_response_data';
import * as Constants from '../../utils/constants';
import { LoginRequest } from '../../api/request/login_request';


/*
  Generated class for the SimpleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SimpleProvider {

	 public message: any = "I'm new here";
 

  constructor(public http: Http,private storage:Storage) {
    //console.log('Hello SimpleProvider Provider');
  }

  setMessage(message) {
    this.message = message;
  }
 //store the email address
    setEmail(email){
    this.storage.set('email',email);
    }

    //get the stored email
    getEmail() : string{
    	debugger;
    	let value:string;
    	 this.storage.get('email').then(email=>{
    		return email;
    	});
		return "";
    }
    	/*return this.http.get(`${this.githubApiUrl}/users/${login}`)
      .map(res => <User>(res.json()))*/

    // getUserData():LoginResponseData{
    //   this.storage.get(Constants.USER_DATA).then(data =>{
    //       return data;
    //   });
    //   return null;
    // }

    // setUserData(data:LoginResponseData){
    //    this.storage.set(Constants.USER_DATA,data); 
    // }

    getUserData():string{
      this.storage.get(Constants.USER_DATA).then(data =>{
          return data;
      });
      return null;
    }

    setUserData(data:string){
       this.storage.set(Constants.USER_DATA,data); 
    }

}


