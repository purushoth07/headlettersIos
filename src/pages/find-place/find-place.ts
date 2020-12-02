import { Component , ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertProvider} from '../../providers/alert/alert';
import { ApiProvider } from '../../providers/api/api';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
// import { ActivatedRoute } from '@angular/router';
declare const google;

/**
 * Generated class for the FindPlacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-find-place',
  templateUrl: 'find-place.html',
})
export class FindPlacePage implements OnInit, AfterViewInit {

  public folder: string;
  public map;
  public geocoder;
  marker;
  @ViewChild('mapElement',) mapElement;
  public formattedAddress;

  latitude: any;
  longitude: any;
  addressDate: any;
  addressTime: any;
  timeZone: any;
  dst: any;
  myloader:any;
  today =new Date;
  getDate : any;
  getTime : any;
  timestamp : any;
  utc_timeoffset: any = '-00.00';
  DaylightSavigTime: any = '0';
  latD: any = '00';
  latM: any = '00';
  latS: any = '00';
  latDirection: any = 'n';
  lngD: any = '00';
  lngM: any = '00';
  lngS: any = '00';
  lngDirection: any = 'n'

  constructor(public datePipe: DatePipe, public http:Http ,public apiService:ApiProvider,  public loadingControll: LoadingController, private alertProvider: AlertProvider, public navCtrl: NavController, public navParams: NavParams, private nativeGeocoder: NativeGeocoder) {
    this.getDate = this.today.toISOString();
    this.getTime = this.today.toISOString();
    console.log('todat date is' , this.getDate);
    this.getTimeStamp();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPlacePage');
  }
  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }


  ngAfterViewInit(): void {
    this.getLocationUsingLatLng(-25.363882, 131.044922);
  }

  addlat(){
    console.log('it works');
  }


  getTimeZone(lat, lng){
    var timeZoneId;
    this.http.get('https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+lng+'&timestamp='+this.timestamp+'&key=AIzaSyDu4c48aSoAK3T9B2DJmb4gh8M9xy1s-fo').subscribe((res:any) => {
    console.log('the sending url is', res.url);
    const body = JSON.parse(res._body);
    this.getTimeZoneandDst(res._body);
    timeZoneId = body.timeZoneId;
    console.log('time zone id is', timeZoneId);
    console.log('the value of response', JSON.parse(res._body));
    this.http.get('http://worldtimeapi.org/api/timezone/'+timeZoneId).subscribe((utc:any) => {
      console.log('the full utc data', JSON.parse(utc._body));
      const data = JSON.parse(utc._body);
      // this.utc_timeoffset = data.utc_offset;
    })
    });

  }


  toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + " " + minutes + " " + seconds;
}

convertDMS(lat, lng) {
    var latitude = this.toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    var longitude = this.toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? "E" : "W";

    console.log('the value of coordinates', latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal);
    var latarray = latitude.split(' ');
    this.latD = latarray[0];
    this.latM = latarray[1];
    this.latS = latarray[2];
    this.latDirection = latitudeCardinal;
    var lngarray = longitude.split(' ');
    this.lngD = lngarray[0];
    this.lngM = lngarray[1];
    this.lngS = lngarray[2];
    this.lngDirection = longitudeCardinal;

    return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
}


  getTimeZoneandDst(response:string) {
    let toAddModel: { dstOffset: number, rawOffset: number, status: string, timeZoneId: string, timeZoneName: string } = JSON.parse(response);
    let TOReturn:any = { T_DST: String, T_TzB: String };
    console.log('toAddModel is', toAddModel , );
    if (toAddModel.dstOffset === 0) {
      TOReturn.T_DST = toAddModel.dstOffset.toString();
    } else {
      TOReturn.T_DST = (toAddModel.dstOffset / 3600).toString();
    }
  
    let timezoneChanged = toAddModel.rawOffset / 3600;

    console.log('the value of timeZone Changed ', timezoneChanged);
  
    if (timezoneChanged.toString().includes(".")) {
      let covertedTime = "." + timezoneChanged.toString().split(".")[1]
      let firstdigit = timezoneChanged.toString().split(".")[0]
      let toIntConverted = parseFloat(covertedTime) * 60
      if (timezoneChanged > 0) {
        if (timezoneChanged < 10) {
          TOReturn.T_TzB = "+0" + firstdigit.toString() + ":" + toIntConverted.toString().substr(0, 2).toString()
        } else {
          TOReturn.T_TzB = "+" + firstdigit + ":" + toIntConverted.toString().substr(0, 2)
        }
      } else {
        if (timezoneChanged >= -9) {
          let updaedtz = Math.abs(parseInt(firstdigit))
          TOReturn.T_TzB = "-0" + updaedtz.toString + ":" + toIntConverted.toString().substr(0, 2)
        } else {
  
          TOReturn.T_TzB = "" + firstdigit.toString() + ":" + toIntConverted.toString().substr(0, 2)
        }
  
      }
  
    } else {
      if (timezoneChanged > 0) {
  
        if (timezoneChanged <= 9) {
        TOReturn.T_TzB = "+0" + timezoneChanged.toString() + ":" + "00"
      } else {
        TOReturn.T_TzB = "+" + timezoneChanged.toString() + ":" + "00"
      }
  
    }else {
  
      if (timezoneChanged >= -9) {
        let updaedtz = Math.abs(timezoneChanged)
        TOReturn.T_TzB = "-0" + updaedtz.toString() + ":" + "00"
      } else {
  
        TOReturn.T_TzB = "" + timezoneChanged.toString() + ":" + "00"
      }
    }
  
  }
  TOReturn.T_TzB = (TOReturn.T_TzB);
  console.log('the value of return ', TOReturn);
  this.utc_timeoffset = TOReturn.T_TzB;
  this.DaylightSavigTime = TOReturn.T_DST;
  return TOReturn;
  }

  getDMS(Degrees:string){
    let Coordinates = Math.abs(parseFloat(Degrees))
		let D = Math.floor(Coordinates)
		let M = Math.floor((Coordinates - D) * 60)
		let mm = (parseFloat("." + Degrees.split(".")[1]) * 60).toString().split(".")[1]
		let S = (parseFloat("." + mm) * 60).toString().split(".")[0]
		console.log(D.toString() + "^" + M.toString() + "^" + S)
	}

  getTimeStamp(){
    const value = new Date(this.getDate);
    var date:any = this.datePipe.transform(value, 'dd-MM-yyyy');
    date = date.split("-");
    console.log(date, date[2], date[1] - 1, date[0]);
    var newDate = new Date( date[2], date[1] - 1, date[0]);
    console.log('the date is ', newDate);
    let strValue = (newDate.getTime()).toString();
    var timeStamp = strValue.slice(0,10);
    console.log('the parsing timestamp ', timeStamp);
    this.timestamp = timeStamp;
  }

  getLocationUsingAddress(){
    let loading = this.loadingControll.create({
      spinner: 'hide',
      content: 'Please Wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
   
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.formattedAddress+'&key=AIzaSyDu4c48aSoAK3T9B2DJmb4gh8M9xy1s-fo')
    .subscribe((res:any) => {
      console.log('The coordinates are latitude= ', JSON.parse(res._body));
      var address = JSON.parse(res._body);
     if(address.status == "ZERO_RESULTS"){
      this.alertProvider.presentToast('Address Not Found');
     }else{
      let geometry = address.results[0].geometry;
      let lat = geometry.location.lat;
      let lng = geometry.location.lng;
      console.log('the geometry is', geometry , lat , lng);
      loading.dismiss();
      this.getLocationUsingLatLng(lat, lng);
     }
    });
  }


  loadingCtrl(){
    this.myloader = this.loadingControll.create({
      content: 'Please Wait...'
    });
    this.myloader.present();
    setTimeout(() => {
      this.myloader.dismiss();
    }, 3000);
  }


  getLocationUsingLatLng(lat , lng){
    this.latitude = lat.toFixed(6);
    this.longitude = lng.toFixed(6);
    this.getTimeZone(lat, lng);
    this.convertDMS(lat, lng);
    const myLatlng = new google.maps.LatLng(lat, lng);
    this.geocoder = new google.maps.Geocoder();
    const mapOptions = {
      zoom: 10,
      center: myLatlng
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      draggable: true,
      title: 'Drag me!'
    });
    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.geocodePosition(this.marker.getPosition());
    });
  }


  geocodePosition(pos) {
    this.loadingCtrl();
    this.geocoder.geocode({
      latLng: pos
    }, (responses) => {
      if (responses && responses.length > 0) {
        this.myloader.dismiss();
        this.formattedAddress = responses[0].formatted_address;
        this.latitude = (responses[0].geometry.location.lat()).toFixed(6);
        this.longitude = (responses[0].geometry.location.lng()).toFixed(6);
        this.getTimeZone(this.latitude, this.longitude);
        this.convertDMS(this.latitude, this.longitude);
      } else {
        console.log('no response');
      }
    });
  }

}
