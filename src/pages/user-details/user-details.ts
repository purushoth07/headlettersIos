import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {LoadingController, NavController} from 'ionic-angular';


import { User } from '../../models/user';

import {  GithubUsers } from '../../providers/github-users/github-users';

import{SimpleProvider} from '../../providers/simple/simple'

import {DatabaseProvider} from '../../providers/database/database'


/**
 * Generated class for the UserDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
login: string;
user: User;

loader :any;


constructor(public navCtrl: NavController, private navParams: NavParams, private githubUsers:
  			GithubUsers,public loadingCtrl: LoadingController, public sesson: SimpleProvider) {
  			this.loader = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner:'ios',
      dismissOnPageChange:true

    });
    
  	this.loader.present();
  	this.login = navParams.get('login');
   // this.login=<string>(this.sesson.getEmail());
    //console.log('user login'+ this.login);
  githubUsers.loadDetails(this.login).subscribe(user => {
      this.user = user;
     // console.log(user)
    this.loader.dismiss();
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserDetailsPage');
  }

}
