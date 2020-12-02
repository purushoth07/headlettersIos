import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

/**
 * Generated class for the LiveChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-live-chat',
  templateUrl: 'live-chat.html',
})
export class LiveChatPage {

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;
  mytask : any;
 
  ref;
	name;
	newmessage;
	messagesList;
	pageSize = 3;

  constructor(public alert: AlertController , public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
	this.ref = firebase.database().ref('chat');
	
	  // Presenting popup
	  this.addData();
  	
  }

  addData(){
	this.alert.create({
		title:'Username',
		inputs:[{
			name:'username',
			placeholder: 'username'
		}],
		buttons:[{
			text: 'Continue',
			handler: username =>{
				this.name = username
			}
		}]
	}).present();
	//reading data from firebase
	this.ref.on('value',data => {
		let tmp = [];
		data.forEach( data => {
			tmp.push({
				key: data.key,
				name: data.val().name,
				message: data.val().message
			})
		});
		this.messagesList = tmp;
	});
  }

  send(){
  	// add new data to firebase
  	this.ref.push({
  		name: this.name.username,
  		message: this.newmessage
    });
    this.newmessage = '';
  }
}
