import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginRequest } from '../../api/request/login_request';
import { Observable } from 'rxjs';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { LoginResponse } from '../../api/response/login_response';
import { CountryResponse } from '../../api/response/country_response';
import { AddProfileRequest } from '../../api/request/add_profile_request';
import { FileUploadOptions, FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { HoroscopeListResponse } from '../../api/response/horoscope_list_response';
import { StatementResponse } from '../../api/response/statement_response';
import { UpdatePromiseRequest } from '../../api/request/update_promise_request';
import { UpdatePromiseResponse } from '../../api/response/update_promise_response';
import { AddMessageRequest } from '../../api/request/add_message_request';
import { EmailPredictionRequest } from '../../api/request/email_prediction_request';
import {  UpdatePredictionRequest } from '../../api/request/update_prediction_request';
import { DSTResponse } from '../../api/response/dst_response';
import { AddDailyRequest } from '../../api/request/add_daily_request';
import { AddSpecialRequest } from '../../api/request/add_special_request';
import * as Constants from '../../utils/constants'
import { LoginResponseData } from '../../api/response/login_response_data';
import { Storage } from '@ionic/storage';
import { Header } from 'ionic-angular';
import { PayRequest } from '../../api/request/pay_request';
import { AddTransitRequest } from '../../api/request/add_transit_request';
import { UpdateTermsConditionRequest } from '../../api/request/update_terms_condition_request';
import { UpdateLocation } from '../../api/request/update_location';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiProvider {

  stagingUrl = "https://staging.headletters.com/headlettersAPI/";
  startingUrl = 'https://49.50.103.132/LetterHead/';
  baseUrl = Constants.BASE_URL;

    data:Observable<any>;
    
    headersJsonForLogin = new Headers();
    optionsJsonForLogin :any;
    headerFormDataForAddProfile = new Headers();
    optionsFormDataForAddProfile :any;
    headersJson = new Headers();
    optionsJson :any;
    headerModel = new Headers();
    optionsModel:any;
    headerFormData = new Headers();
    optionsFormData:any;
    headerGetApi = new Headers();
    optionsGetApi:any;
    timeOut = 90000;
    userData:LoginResponseData = new LoginResponseData();
   serverToken: {
        name: string;
        value: string
       };// = {
      //   from: new Date(Date.now()),
      //   to: new Date(Date.now()+ 24 * 60 * 60 * 1000 * 5)
      // };

  constructor(public http: Http,
    private transfer: FileTransfer,
    private session:Storage) {

    //console.log('Hello ApiProvider Provider');
    this.setJsonHeaderForLogin();

    session.get(Constants.USER_DATA).then(val=>{
      this.userData  = new LoginResponseData(JSON.stringify(val));
      //alert("USER DATA:" + JSON.stringify(this.userData));
      this.setHeaderForGet();
      this.setJsonHeader();
      this.setFormHeader();
    });
  }

  reloadUserSessionToken(){
    //if(!this.userData || !this.userData.getTOKEN){
      this.session.get(Constants.USER_DATA).then(val=>{
        this.userData  = new LoginResponseData(JSON.stringify(val));
        // alert("USER_DATA_TOKEN:" + JSON.stringify(this.userData));
        this.setHeaderForGet();
        this.setJsonHeader();
        this.setFormHeader();
      });
   // }
  }

  updateTokenForAPI(userData){
      this.userData = userData;
      this.setHeaderForGet();
      this.setJsonHeader();
      this.setFormHeader();
  }

  setHeaderForGet(){
    if(this.userData && this.userData.getTOKEN){
      this.headerGetApi = new Headers();
      this.headerGetApi.append('TOKEN',this.userData.getTOKEN.toString().trim());
      this.optionsGetApi = new RequestOptions({headers:this.headerGetApi}); 
    }

    // this.headerGetApi = new Headers();
    //   this.headerGetApi.append('TOKEN',"eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyICI6ImVudWtlLnNvZnR3YXJlMzhAZ21haWwuY29tIiwicGFzc3dvcmQgIjoiSGVhZExldHRlcnNAIyExMjM0NTYiLCJzY29wZSI6Imh0dHA6Ly9kdW1teS5jb20vIn0.-2RLhMaTEQiGpuUGMUY_DIeA9F5Uuk6zMHKuTKv9cuk");
    //   this.optionsGetApi = new RequestOptions({headers:this.headerGetApi}); 
    
    //this.optionsJson.headers[0].append(this.serverToken);
  }

  setJsonHeaderForLogin(){
    this.headersJsonForLogin.append('Accept','application/json');
    this.headersJsonForLogin.append('Content-Type','application/json');
  
    this.optionsJsonForLogin = new RequestOptions({headers:this.headersJsonForLogin});
    console.log("this.optionsJsonForLogin",this.optionsJsonForLogin)
  }


  // setJsonHeaderForAddProfile(){
  //   this.headersJsonForAddProfile = new Headers();
  //   this.headersJsonForAddProfile.append('Accept','application/json');
  //   this.headersJsonForAddProfile.append('Content-Type','application/json');
  //   this.optionsJsonForAddProfile = new RequestOptions({headers:this.headersJsonForAddProfile});
  
  // }

  setJsonHeader(){
      this.headersJson = new Headers();
      this.headersJson.append('Accept','application/json');
      this.headersJson.append('Content-Type','application/json');
      if(this.userData && this.userData.getTOKEN){
        this.headersJson.append('TOKEN',this.userData.getTOKEN.toString().trim());
      }
      this.optionsJson = new RequestOptions({headers:this.headersJson});
    
  }

  // setModelHeader(){
  //   this.headerModel.append('Accept','application/json');
  //   this.headerModel.append('Content-Type','application/x-www-form-urlencoded');
  //   if(this.userData && this.userData.getTOKEN){
  //     this.headerModel.append('TOKEN',this.userData.getTOKEN.toString().trim());
  //   }
  //   this.optionsModel = new RequestOptions({headers:this.headerModel});
  // }

  setFormHeader(){
    //this.headerFormData.append('Accept','application/json');
   // this.headerFormData.append('Content-Type','multipart/form-data');
    if(this.userData && this.userData.getTOKEN){
      this.headerFormData = new Headers();
      this.headerFormData.append('TOKEN',this.userData.getTOKEN.toString().trim());
      this.optionsFormData = new RequestOptions({headers:this.headerFormData});
    }
   
  }

  login(req:LoginRequest):Observable<LoginResponse>{
    console.log("testing login =============11111")
    console.log("testing login =============11111",req)
    console.log("testing login =============11111",this.optionsJsonForLogin)

    let headers = new Headers();
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    //let options = new RequestOptions({headers:headers});
    // this.headersJsonForLogin.append('Accept','application/json');
    // this.headersJsonForLogin.append('Content-Type','application/json');
  console.log("Header:-- "+headers);
  console.log("baseurl:-- "+this.baseUrl);
    
  this.optionsJsonForLogin = new RequestOptions({headers:headers});
    //this.optionsJsonForLogin = new RequestOptions({headers:this.headersJsonForLogin});
    //console.log("Header:-- "+this.optionsJsonForLogin.toString);
    //console.log("this.baseUrl",this.baseUrl)
    // return this.http.post(this.baseUrl+'api/profile/login',req)
    return this.http.post(this.baseUrl+'api/profile/login',req,this.optionsJsonForLogin)
    .timeout(this.timeOut)
    .map(res => <LoginResponse>(res.json()))
    .catch((err:Error)=>{
      console.log("err",err)
        return Observable.throw(err);
    });
  }

  // login(req:LoginRequest):Observable<LoginResponse>{
  //   // let headers = new Headers();
  //   // headers.append('Accept','application/json');
  //   // headers.append('Content-Type','application/json');
  //   //let options = new RequestOptions({headers:headers});
    
  //   return this.http.post(this.baseUrl+'api/profile/login',req,this.optionsJsonForLogin)
  //   .timeout(this.timeOut)
  //   .map(res => <LoginResponse>(res.json()))
  //   .catch((err:Error)=>{
  //       return Observable.throw(err);
  //   });
  // }

  getCountries():Observable<CountryResponse>{
    return this.http.get(this.baseUrl+'api/profile/GetCountry')
    .timeout(this.timeOut)
    .map(res => <CountryResponse>(res.json()))
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  addProfile(req:FormData):Observable<any>{
    return this.http.post(this.baseUrl+'api/profile/addProfile',req,this.optionsFormDataForAddProfile)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  // addProfile(image:any,req:FileUploadOptions):Observable<any>{
  //   // return this.http.post(this.baseUrl+'api/profile/addProfile',JSON.stringify(req),this.optionsFormData)
  //   // .map(res => res.json())
  //   // .catch((err:Error)=>{
  //   //     return Observable.throw(err);
  //   // });

  //   const fileTransfer:FileTransferObject = this.transfer.create();

  //   fileTransfer.upload(image, this.baseUrl+'api/profile/addProfile', req)
  //       .then((data) => {
  //         console.log(data+" Uploaded Successfully");
  //         let res = JSON.parse(data.response);
  //         alert(JSON.stringify(res));
  //         return res;
  //       }, (err) => {
  //         console.log(err);
  //         //this.presentToast(JSON.stringify(err));
  //         alert(JSON.stringify(err));
  //         return Observable.throw(err);
  //     });
  // }

  updateProfile(req:FormData):Observable<any>{
    return this.http.post(this.baseUrl+'api/profile/updateProfile',req,this.optionsFormData)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  updateHoroscope(req:FormData):Observable<any>{

    //alert("FORM TOKEN:"+this.userData.getTOKEN);
    return this.http.post(this.baseUrl+'api/horoscope/updateHoroscope',req,this.optionsFormData)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }
  
  addNewHoroscope(req:FormData):Observable<any>{

    //alert("FORM TOKEN:"+this.userData.getTOKEN);
    return this.http.post(this.baseUrl+'api/horoscope/addNew',req,this.optionsFormData)
    .map(res => res.json()
    )
    .catch((err:Error)=>{
        alert(err);
        return Observable.throw(err);
    });
  }

  getHoroscopeList(userId:string):Observable<any>{
    //alert("URL:"+this.baseUrl+'api/horoscope/get?userId=');
    return this.http.get(this.baseUrl+`api/horoscope/get?userId=${userId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getTimeZone(lat:any , lng:any, timeStamp:any):Observable<any>{
    return this.http.get('https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+lng+'&timestamp='+timeStamp+'&key=AIzaSyDu4c48aSoAK3T9B2DJmb4gh8M9xy1s-fo',this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  deleteHoroscope(userId:string,hId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/horoscope/deleteHoroscope?userId=${userId}&hId=${hId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getStatementList(userId:string,month:string):Observable<StatementResponse>{
    return this.http.get(this.baseUrl+`api/account/getStatements?UserId=${userId}&StatementSEQ=${month}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => <StatementResponse>(res.json()))
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getStatementList2(userId:string,month:string):Observable<StatementResponse>{
    return this.http.get(this.baseUrl+`api/account/getStatements?UserId=${userId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => <StatementResponse>(res.json()))
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getPromiseList(userId:string,hId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/promise/getPromises?userId=${userId}&hId=${hId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  updatePromise(req:UpdatePromiseRequest):Observable<UpdatePromiseResponse>{
    return this.http.post(this.baseUrl+'api/promise/updatePromise',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => <UpdatePromiseResponse>(res.json()))
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getMessageList(userId:string):Observable<any>{
    return this.http.get(this.baseUrl+'api/messages/getMessages?userId='+userId,this.optionsGetApi)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }
  
  addMessage(req:AddMessageRequest):Observable<any>{
    return this.http.post(this.baseUrl+'api/messages/addMessages',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  updateMessage(req:AddMessageRequest):Observable<any>{
    return this.http.post(this.baseUrl+'api/messages/updateMessages',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  deleteMessage(userId:string,hId:string,messageId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/messages/deleteMessages?userId=${userId}&hId=${hId}&messageId=${messageId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getAllRequestList(userId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/request/getRequests?userId=${userId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  emailHoroPDF(req:EmailPredictionRequest):Observable<any>{
    return this.http.post(this.baseUrl+`api/hcom/requestHoroPDF`,req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  emailRequestPrediction(req:EmailPredictionRequest):Observable<any>{
    return this.http.post(this.baseUrl+`api/hcom/emailRequestPrediction`,req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  emailSendStatement(req:EmailPredictionRequest):Observable<any>{
    return this.http.post(this.baseUrl+`api/hcom/emailRequestStatement`,req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }


  // getAllPredictionList(userId:string):Observable<any>{
  //   return this.http.get(this.baseUrl+`api/prediction/GetPredictions?userId=${userId}`)
  //   .timeout(this.timeOut)
  //   .map(res => res.json())
  //   .catch((err:Error)=>{
  //       return Observable.throw(null);
  //   });
  // }


  getPredictionList(userId:string,hId:string,requestId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/prediction/GetPredictions?userId=${userId}&hId=${hId}&requestId=${requestId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  updatePrediction(req:UpdatePredictionRequest):Observable<any>{
    return this.http.post(this.baseUrl+'api/prediction/updatePrediction',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getDST(countryCode:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/request/GetDst?countryCode=${countryCode}`,this.optionsGetApi)
    .map(res => <DSTResponse>(res.json()))
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  checkDuplicateRequest(userId:string,hId:string,reqStartDate:string,reqEndDate:string,reqCat:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/request/ChekckDuplicateRequest?USERID=${userId}&HID=${hId}&RSQDATE=${reqStartDate}&REQDATE=${reqEndDate}&RQCAT=${reqCat}`,this.optionsGetApi)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  addDailyRequest(req:AddDailyRequest):Observable<any>{
    return this.http.post(this.baseUrl+'api/request/addDailyRequest',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  addWeeklyRequest(req:AddDailyRequest):Observable<any>{
    return this.http.post(this.baseUrl+'api/request/addWeeklyRequest',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  addSpecialRequest(req:AddSpecialRequest):Observable<any>{
    return this.http.post(this.baseUrl+'api/request/addRequest',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  logout(userId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/profile/Logout?UserId=${userId}`)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getCharges(reqType:string,currency:string):Observable<any>{
     //return this.http.get(this.baseUrl+`api/termCondition/ChargesLink`,this.optionsGetApi)
    return this.http.get(this.baseUrl+`api/Charge/GetDailyChargeHTMLink?TypeRequest=${reqType}&Currency=${currency}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  
  // getTermsAndConditionsUrl():Observable<any>{
  //   return this.http.get(this.baseUrl+`api/termCondition/TCLink`)
  //   .timeout(this.timeOut)
  //   .map(res => res.json())
  //   .catch((err:Error)=>{
  //       return Observable.throw(err);
  //   });
  // }
  getTermsAndConditionsUrl(userId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/termCondition/TCLinkandCharCharges?userId=${userId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{ 
        return Observable.throw(err);
    });
  }

  cancelRepeatRequest(userId:string,hId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/request/CancelRepeat?UserId=${userId}&Hid=${hId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getPaymentRecords(userId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/Invoice/GetInvoiceLists?userId=${userId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }


  addPaymentRequest(req:PayRequest):Observable<any>{
    return this.http.post(this.baseUrl+'api/Invoice/Pay',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }
  
  getTransitComment(transitName:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/transit/GetComment?planet=${transitName}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  addTransitRequest(req:AddTransitRequest):Observable<any>{
    return this.http.post(this.baseUrl+'api/transit/AddTransitRequest',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  deleteRequest(userId:string,hId:string,rQID:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/request/deleteRequest?userId=${userId}&hId=${hId}&rQID=${rQID}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getTermsConditionStatus(userId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/profile/GetTermCondition?userId=${userId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  updateTermsConditionStatus(req:UpdateTermsConditionRequest):Observable<any>{
    return this.http.post(this.baseUrl+'api/profile/TermCondition',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getHoroscopeChart(userId:string,hid:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/horoscope/GetPDFChart?UserId=${userId}&Hid=${hid}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  getPredictionRequestStatus(userId:string,hid:string,reqId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/request/GetRequestStatus?userId=${userId}&Hid=${hid}&ReqId=${reqId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  //update user location to the server

  updateLocation(req:UpdateLocation):Observable<any>{
    return this.http.post(this.baseUrl+'api/profile/UpdateLocation',req,this.optionsJson)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  deleteUserProfile(userId:string):Observable<any>{
    return this.http.get(this.baseUrl+`api/profile/deleteAppUser?UserId=${userId}`,this.optionsGetApi)
    .timeout(this.timeOut)
    .map(res => res.json())
    .catch((err:Error)=>{
        return Observable.throw(err);
    });
  }

  // getTimeZone(googleBaseUrl:string,lat:number,lon:number,timestamp:number,APIKEY:string){
  //   return this.http.get(googleBaseUrl+`?location=${lat},${lon}&timestamp=${timestamp}&key=${APIKEY}`)
  //   .map(res => res.json())
  //   .catch((err:Error)=>{
  //       return Observable.throw(null);
  //   });
  // }

}
