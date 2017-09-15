import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base/base";
import { Chat } from './../../models/chat';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatProvider extends BaseProvider{
  
  chats: FirebaseListObservable<Chat[]>;
  
  constructor(public http: Http,
              public db: AngularFireDatabase,
              public firebaseAuth: AngularFireAuth) {
    super();
    this.listenChats();
  }
  private listenChats():void{
    this.firebaseAuth.authState
    .subscribe((authState)=>{
      if (authState){
        this.setChats(authState);
      }
    });
  }
  
  private setChats(authState):void{
    console.log('set chats chamado');
            
        this.chats= <FirebaseListObservable<Chat[]>>this.db.list(`/chats/${authState.uid}`,{      
          query:{
            orderByChild:'timestamp'
          }
        }).map((chats:Chat[])=>{          
          //console.log('****chats',chats);
          return chats.reverse();
          
          //return chats;                    
        }).catch(this.handleObservableError);
       

    
  }
  create(chat: Chat, userId1:string, userId2:string):firebase.Promise<void>{
    return this.db.object(`/chats/${userId1}/${userId2}`)
    .set(chat)
    .catch(this.handlePromiseError);
  }
  getDeepChat(userId1:string, userId2:string):FirebaseObjectObservable<Chat>{
    return this.db.object(`/chats/${userId1}/${userId2}`);
  }

}
