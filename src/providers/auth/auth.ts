import { Observable } from 'rxjs/Observable';
//import { AngularFireAuth,AngularFireAuthModule, FirebaseAuthStateObservable } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
/*import * as firebase from 'firebase/app';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
*/
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BaseProvider } from "../base/base";



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
  
@Injectable()
export class AuthProvider extends BaseProvider{
  user: Observable<firebase.User>;
  constructor(public http: Http,
              private firebaseAuth: AngularFireAuth
             ) {
              super();
   this.user = firebaseAuth.authState;
    console.log('Hello AuthProvider Provider');
    
  }
  createAuthUser(user:{email:string, password:string}):  firebase.Promise<firebase.User>
  {    
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .catch(this.handlePromiseError);
  }

  signinWithEmail(user:{email:string, password:string}):firebase.Promise<boolean>{
    return this.firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then((authState)=>{
        return authState!=null;
    })
    .catch(this.handlePromiseError);
  }

  logout():firebase.Promise<any>{
     return this.firebaseAuth.auth.signOut();
  }

  get autenticated(): Promise<boolean>{
    return new Promise((resolve,reject)=>{
      this.firebaseAuth.authState
      .first()
      .subscribe((authState)=>{
        (authState) ? resolve(true) : reject(false);
        
      })
    });
  }

}
