import { OnInit } from '@angular/core';
import { AuthProvider } from './../../providers/auth/auth';
import { NavController, AlertController, MenuController, App } from 'ionic-angular';
//import { Component } from '@angular/core';

//@Component({})
export abstract class BaseComponent implements OnInit {

  protected navCtrl:NavController;

  constructor(public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              public app:App,
              public menuCtrl: MenuController) {
    
  }
  ngOnInit():void{
    this.navCtrl = this.app.getActiveNav();
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
          });
        }
      },{
        text:'Não'
      }]
    }).present();
  }

}
