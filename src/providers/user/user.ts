import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { BaseProvider } from "../base/base";



@Injectable()
export class UserProvider extends BaseProvider {

  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;
  constructor(public db: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth,
    public http: Http) {
    super();
    console.log('Hello UserProvider Provider');
    //this.users = this.db.list(`/users`);
    this.listenAuthState();
    console.log(this.users);
  }

  private setUsers(uidToExclude:string){
    this.users = <FirebaseListObservable<User[]>> this.db.list(`/users`,{
      query:{
        orderByChild:'name'
      }
    }).map((users:User[])=>{
      console.log('***usuarios',users);
      return users.filter((user:User)=>user.$key !== uidToExclude);
    });

  }
  private listenAuthState():void{
    this.firebaseAuth.authState
    .subscribe((authState)=>{
      if (authState){
        this.currentUser = this.db.object(`/users/${authState.uid}`);
        
        this.setUsers(authState.uid);
      }
    });
  }
  create(user: User, uuid:string): firebase.Promise<any> {
    //return this.users.push(user);      
    return this.db.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }
  userExists(userName:string):Observable<boolean>{
     return this.db.list(`/users`,{
      query:{
        orderByChild:'username',
        equalTo: userName
      }
    }).map((users:User[])=>{
      return users.length>0;
    }).catch(this.handleObservableError);
  }

  get(userId:string):FirebaseListObservable<User>{
    return <FirebaseListObservable<User>>this.db.object(`/users/${userId}`)
    .catch(this.handleObservableError);
  }
}
