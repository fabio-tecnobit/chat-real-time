import { OnInit, ViewChild } from '@angular/core';
import { AuthProvider } from './../../providers/auth/auth';
import { App, AlertController, MenuController, NavController,Nav } from 'ionic-angular';
import { Component, Input } from '@angular/core';
//import { Component } from '@angular/core';

//@Component({})
export abstract class BaseComponent implements OnInit {

  protected navCtrl:NavController;
  //@ViewChild(Nav) nav: Nav;

  constructor(public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              public app:App,
              public menuCtrl: MenuController) {
    
  }
  ngOnInit():void{
    //this.navCtrl = this.app.getActiveNavs()[0];
  }
  onLogout():void{
    console.log('on Logout');
    this.alertCtrl.create({
      message: 'Você deseja sair?',
      buttons:[{
        text:'Sim',
        handler:()=>{
          this.authProvider.logout()
          .then(()=>{
            this.navCtrl.setRoot('SigninPage');
            this.menuCtrl.enable(false,'user-menu');
          });
        }
      },{
        text:'Não'
      }]
    }).present();
  }
  onProfile():void{
    this.navCtrl.push('UserProfilePage');
  }
}
