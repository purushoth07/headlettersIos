import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Renderer } from '@angular/core';

/**
 * Generated class for the ModalDatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-date',
  templateUrl: 'modal-date.html',
})
export class ModalDatePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public renderer: Renderer,
    public translate:TranslateService,
    public viewCtrl: ViewController) {
     // this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ModalDatePage');
  }

}
