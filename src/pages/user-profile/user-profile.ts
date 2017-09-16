import { UserProvider } from './../../providers/user/user';
import { User } from './../../models/user';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  currentUser:User;
  canEdit:boolean=false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authProvider: AuthProvider,
              public userService: UserProvider) {
  }

  ionViewDidLoad() {
    this.userService.currentUser
    .subscribe((user:User)=>{
      this.currentUser = user;
    });
  }
  ionViewCanEnter():Promise<boolean>{
    return this.authProvider.autenticated;
  }

}
