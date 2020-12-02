import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BasicPage } from '../basic/basic';
import { Platform, ActionSheetController } from 'ionic-angular';
import {UsersPage } from '../users/users';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  go_to_another_page(){
   //console.log('on page clicked')
   this.navCtrl.push(BasicPage, {
    platform:Platform,
  	actionsheetCtrl:ActionSheetController
    });
  }
}