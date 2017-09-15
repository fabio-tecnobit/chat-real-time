import { Message } from './../../models/message';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base/base";

@Injectable()
export class MessageProvider extends BaseProvider {

  constructor(public http: Http,
    public db: AngularFireDatabase) {
    super();
  }

  getMessages(userId1:string, userId2:string):FirebaseListObservable<Message[]>{
    return <FirebaseListObservable<Message[]>> this.db.list(`/messages/${userId1}-${userId2}`,{
      query:{
        orderByChild: 'timestamp',
        limitToLast: 30
      }
    })
    .catch(this.handleObservableError)
  }
  create(message: Message,listMessages:FirebaseListObservable<Message[]>):firebase.Promise<void>{
    return listMessages.push(message)
    .catch(this.handlePromiseError);
  }

}
