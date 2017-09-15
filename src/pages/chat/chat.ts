import { ChatProvider } from './../../providers/chat/chat';
import { Chat } from './../../models/chat';
import { MessageProvider } from './../../providers/message/message';
import { Message } from './../../models/message';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { UserProvider } from './../../providers/user/user';
import { User } from './../../models/user';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
//import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  messages: FirebaseListObservable<Message[]>
  pageTitle: string;
  sender: User;
  recipient: User;
  private chat1: FirebaseObjectObservable<Chat>;
  private chat2: FirebaseObjectObservable<Chat>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public userProvider: UserProvider,
    public messageProvider: MessageProvider,
    public chatProvider: ChatProvider) {
  }

  sendMenssage(newMessage: string): void {
    //this.messages.push(newMessage);
    if (newMessage) {
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      this.messageProvider.create(
        new Message(
          this.sender.$key,
          newMessage,
          currentTimestamp
        ),
        this.messages
      )
        .then(() => {
          this.chat1.
            update({
              lastMessage: newMessage,
              timestamp: currentTimestamp
            });
          this.chat2.
            update({
              lastMessage: newMessage,
              timestamp: currentTimestamp
            });
        });
    }

  }
  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.autenticated;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.recipient = this.navParams.get('recipientUser');
    if (this.recipient) {
      this.pageTitle = this.recipient.name;
      this.userProvider.currentUser
        .first()
        .subscribe((currentUser: User) => {
          this.sender = currentUser;
          this.chat1 = this.chatProvider.getDeepChat(this.sender.$key, this.recipient.$key);
          this.chat2 = this.chatProvider.getDeepChat(this.recipient.$key, this.sender.$key);
          let doSubscription = () => {
            this.messages.subscribe((messages: Message[]) => {
              this.scrollToBottom();
            })
          }
          this.messages = this.messageProvider.getMessages(this.sender.$key, this.recipient.$key);
          this.messages
            .first()
            .subscribe((messages: Message[]) => {
              if (messages.length == 0) {
                this.messages = this.messageProvider.getMessages(this.recipient.$key, this.sender.$key);
                doSubscription();
              } else {
                doSubscription();
              }
            });
        });
    }
  }
  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content) {
         //if (this.content.scrollToBottom){
            this.content.scrollToBottom(duration || 300);
         //}
      }
    }, 50);



  }

}
