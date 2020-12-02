import { Component, ElementRef , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the OrganisationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;

 
@IonicPage()
@Component({
  selector: 'page-organisations',
  templateUrl: 'organisations.html',
})
export class OrganisationsPage {

@ViewChild('map') mapElement: ElementRef;
  map: any;
  latLng :any;
   marker : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrganisationsPage');
    this.loadMap();
  }

 loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
       this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      //console.log(err);
    });
 
  }
  addMarker(){
 
  	if (this.marker!=null) {
  		this.marker.setMap(null);
  	}
  this.marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.latLng,
     title:"Current position",

  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(this.marker, content);
 
}

addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
     content: content,
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}

}
