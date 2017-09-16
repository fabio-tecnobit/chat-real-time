import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from './../providers/user/user';
import { AuthProvider } from './../providers/auth/auth';
import { User } from './../models/user';
//import { SigninPage } from './../pages/signin/signin';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'SigninPage';
  currentUser:User;
  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              authProvider: AuthProvider,
              userProvider: UserProvider,
              public firebaseAuth: AngularFireAuth) {

                this.firebaseAuth.authState
                .subscribe((authState)=>{
                  if (authState){
                    userProvider.currentUser
                    .subscribe((user:User)=>{
                      this.currentUser = user;
                    })
                  }
                });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

