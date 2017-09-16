import { AuthProvider } from './../../providers/auth/auth';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public authProvider:AuthProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController
            ) {
         /*     if (this.authProvider.autenticated){
                this.navCtrl.setRoot('HomePage');
              }*/
              
                let emailRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.signinForm = this.formBuilder.group({
                  email: ['',Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
                  password: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
                });
              }
  onSubmit():void{
    let loading:Loading= this.showLoading();
    console.log(this.signinForm.value);
    this.authProvider.signinWithEmail(this.signinForm.value)
    .then((isLogged:boolean)=>{
      if (isLogged){
        this.navCtrl.setRoot('HomePage');
        loading.dismiss();
      }
    })
    .catch((error: any)=>{
      loading.dismiss();
      this.showAlert(error);
    });

  }
  onSignup():void{
    this.navCtrl.push('SignupPage');
  }
  
  
  private showLoading():Loading{
    let loading:Loading = this.loadingCtrl.create({
      content:'Por favor aguarde...'
    });
    loading.present();
    return loading;
  }
  private showAlert(message:string):void{
    this.alertCtrl.create({
      message:message,
      buttons:['Ok']
    }).present();
  }
  onHomePage():void{
    this.navCtrl.push('HomePage')
    .then((hasAccess:boolean)=>{
      console.log('autorizado',hasAccess);
    })
    .catch(err=>console.log('não autorizado',err));
  }
  onLogout():void{
    this.authProvider.logout();
  }

}
