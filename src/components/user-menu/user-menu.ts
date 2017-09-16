import { User } from './../../models/user';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertController, App, MenuController, NavController } from 'ionic-angular';
import { Component, Input, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base';
import { Nav } from 'ionic-angular';
@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User;
  //@ViewChild(Nav) nav:Nav;
  //protected navCtrl2:NavController;
  constructor( public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public app:App,
    public menuCtrl: MenuController    

  ) {
    super(alertCtrl,authProvider,app,menuCtrl);
    
  }
 /* onProfile():void{
    //this.nav.push('UserProfilePage');
    this.openUserProfile();
  }*/

}
