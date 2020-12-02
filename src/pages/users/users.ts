import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';


import {  GithubUsers } from '../../providers/github-users/github-users';

import {LoadingController} from 'ionic-angular';

import{SimpleProvider} from '../../providers/simple/simple'

import {DatabaseProvider} from '../../providers/database/database'
import {UserDetailsPage} from "../user-details/user-details";


/**
 * Generated class for the UsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})

export class UsersPage {

	users: User[];

originalUsers: User[];

loader :any;

 constructor(public navCtrl: NavController, private githubUsers: GithubUsers,public loadingCtrl: LoadingController,
           public session: SimpleProvider ,public dbmanger : DatabaseProvider) {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loader.present();
    githubUsers.load().subscribe(users => {
     this.users=users;
      this.originalUsers = users;
    })
    githubUsers
      .searchUsers('scotch').subscribe(users => {
        //console.log(users)
        this.loader.dismiss();
      });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UsersPage');
  }

 goToDetails(login: string) {
  debugger;
  this.session.setEmail(login);
  this.dbmanger.addUser(login,'123456');
    this.navCtrl.push(UserDetailsPage, {login});
  }

   search(searchEvent) {
    let term = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.users = this.originalUsers;
    } else {
      // Get the searched users from github
      this.githubUsers.searchUsers(term).subscribe(users => {
        this.users = users
      });
    }
  }
}
