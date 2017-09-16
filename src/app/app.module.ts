import { ComponentsModule } from './../components/components.module';
//import { SigninPage } from './../pages/signin/signin';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from './../providers/user/user';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { HttpModule } from '@angular/http';
import { AuthProvider } from '../providers/auth/auth';
import { ChatProvider } from '../providers/chat/chat';
import { MessageProvider } from '../providers/message/message';
//import { BaseProvider } from '../providers/base/base';


const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDQSg4d1kNlOsoM6XBMLdOq9pMF1PjzJsg",
  authDomain: "app-chat-real-time.firebaseapp.com",
  databaseURL: "https://app-chat-real-time.firebaseio.com",
  projectId: "app-chat-real-time",
  storageBucket: "app-chat-real-time.appspot.com",
  messagingSenderId: "886167588850" 
};



@NgModule({
  declarations: [
    MyApp    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp//,
   // HomePage,
   // SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    UserProvider,
    AuthProvider,
    AngularFireAuth,
    ChatProvider,
    MessageProvider//,
    //BaseProvider   
  ]
})
export class AppModule {}
