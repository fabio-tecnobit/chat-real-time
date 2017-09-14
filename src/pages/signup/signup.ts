import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { User } from './../../models/user';
import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public userProvider:UserProvider,
              public authProvider:AuthProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController
            ) {

  let emailRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.signupForm = this.formBuilder.group({
        name: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        username: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        email: ['',Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
      });
  }
  onSubmit():void{
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;  
    let username:string  = formUser.username;
    this.userProvider.userExists(username)
      .first()
      .subscribe((userExist:boolean)=>{
          if (!userExist){

            this.authProvider.createAuthUser({
              email: formUser.email,
              password: formUser.password
              }).then((authState) => {
                  console.log('usuario criado no auth');
                  delete formUser.password;
                  let uuid: string = authState.uid;
                  //formUser.uid = authState.uid;
                  this.userProvider.create(formUser,uuid)
                  .then(()=> {
                    //this.navCtrl.pop();      
                    console.log('inserido na base');
                    this.navCtrl.setRoot('HomePage')
                    loading.dismiss();
                  })
                  .catch((error:any)=>{
                    console.log(error);
                    loading.dismiss();
                    this.showAlert(error);
                  });      
              })
              .catch((error:any)=>{
                console.log(error);
                loading.dismiss();
                this.showAlert(error);
              });

          }else{
            this.showAlert(`O usuário ${username} já está sendo usado em outra conta`);
            loading.dismiss();
          }
      });
   
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
  

}
