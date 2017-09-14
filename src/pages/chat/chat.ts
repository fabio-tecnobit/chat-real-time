import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
  ionViewCanEnter():Promise<boolean>{
    return this.authProvider.autenticated;
  }

}
