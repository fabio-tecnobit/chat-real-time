import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { User } from './../../models/user';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users:FirebaseListObservable<User[]>;
  view:string='chats';
  constructor(public navCtrl: NavController, 
              public UserProvider:UserProvider,
              public authProvider: AuthProvider) {

  }

  onSignup():void{
    this.navCtrl.push('SignupPage');
  }
  onChatCreate(user:User){
    console.log(user);
  }
  ionViewDidLoad():void{
    this.users = this.UserProvider.users;
  }
  ionViewCanEnter():Promise<boolean>{
    return this.authProvider.autenticated;
  }
  
}
