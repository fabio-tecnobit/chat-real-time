import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { BaseProvider } from "../base/base";



@Injectable()
export class UserProvider extends BaseProvider {

  users: FirebaseListObservable<User[]>;
  constructor(public db: AngularFireDatabase,
    public http: Http) {
    super();
    console.log('Hello UserProvider Provider');
    this.users = this.db.list(`/users`);
    console.log(this.users);
  }
  //create(user:User):firebase.Promise<void>{
  //create(user:User,fcallback:Function):void{


  /*this.users.push(user)
  .then(_ => {
    console.log('success');
    fcallback();
  })
  .catch(err => console.log(err, 'You do not have access!'));
  */
  /* create(user:User):firebase.Promise<any>{
       return this.users.push(user);      
   }
 */
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
}
