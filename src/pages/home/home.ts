import { ChatProvider } from './../../providers/chat/chat';
import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { User } from './../../models/user';
import { Chat } from './../../models/chat';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: FirebaseListObservable<User[]>;
  chats: FirebaseListObservable<Chat[]>;
  view:string='chats';
  constructor(public navCtrl: NavController, 
              public UserProvider:UserProvider,
              public authProvider: AuthProvider,
              public chatProvider:ChatProvider,
              public db:AngularFireDatabase,
              public menuCtrl: MenuController) {

  }

  onSignup():void{
    this.navCtrl.push('SignupPage');
  }
  onChatCreate(recipientUser:User){

    this.UserProvider.currentUser
    .first()
    .subscribe((currentUser:User)=>{
      this.chatProvider.getDeepChat(currentUser.$key, recipientUser.$key)
      .first()
      .subscribe((chat:Chat)=>{
        console.log('chat',chat);
        if (chat.hasOwnProperty('$value')){ 
          let timestamp:object = firebase.database.ServerValue.TIMESTAMP;
          
          let chat1 = new Chat('',timestamp,recipientUser.name,'');
          this.chatProvider.create(chat1,currentUser.$key,recipientUser.$key);
          let chat2 = new Chat('',timestamp,currentUser.name,'');
          this.chatProvider.create(chat2,recipientUser.$key,currentUser.$key);

        }
      });
      ;
    });
    this.navCtrl.push('ChatPage',{
      recipientUser:recipientUser
    });
    console.log(recipientUser);
  }
  
  ionViewDidLoad():void{
    
    this.users = this.UserProvider.users;
    this.chats = this.chatProvider.chats;
    this.menuCtrl.enable(true,'user-menu');
    
    
  }
  onChatOpen(c:Chat):void{
    let recipietUserId : string= c.$key;
    this.UserProvider.get(recipietUserId)
    .first()
    .subscribe((user:User)=>{
      this.navCtrl.push('ChatPage',{
        recipientUser:user
      });
    });
    
  }
  ionViewCanEnter():Promise<boolean>{
    return this.authProvider.autenticated;
  }
  filterItems(event:any):void{
    console.log('filter');
    let searchTerm:string = event.target.value;

    this.users = this.UserProvider.users;
    this.chats = this.chatProvider.chats;
    if (searchTerm){
      console.log(searchTerm);
      switch(this.view){
        case 'chats':
        this.chats = <FirebaseListObservable<Chat[]>> this.chats.map((chats: Chat[])=>{
            return chats.filter((chat: Chat)=>{
              return chat.title.toLowerCase().indexOf(searchTerm.toLowerCase())>-1;
            })
          });
          break;
        case 'users':
        this.users = <FirebaseListObservable<User[]>> this.users.map((users: User[])=>{
          return users.filter((user: User)=>{
            return user.name.toLowerCase().indexOf(searchTerm.toLowerCase())>-1;
          })
        });
          break;

      }
    }
  }
  
}
