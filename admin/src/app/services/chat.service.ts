import { Injectable } from '@angular/core';
import Parse from 'parse';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private utils: UtilsService) { }
  public messages = [];
  public messagesSubscription;
  public messagesUnread = {};
  public messagesUnreadSubscription;

  public async getChatMessages(delivery, update?) {
    const user = Parse.User.current();
    const queryMessages = new Parse.Query('chatMessage').equalTo('delivery', delivery).include('from');
    this.messages = await queryMessages.find();
    this.messagesSubscription = await queryMessages.subscribe();
    this.messagesSubscription.on('create', (message) => {
      message.relation('readedBy').add(user).save();
      this.messages.push(message);
      if (update) {
        update(message);
      }
    });

    const queryUnreadMessages = new Parse.Query('chatMessage').select('delivery').notEqualTo('readedBy', user).notEqualTo('from', user).equalTo('delivery', delivery);
    const unread = await queryUnreadMessages.find();
    unread.forEach(message => {
      message.relation('readedBy').add(user);
    });
    await Parse.Object.saveAll(unread);
  }
  public async getUnreadMessages() {
    const user = Parse.User.current();
    const query = new Parse.Query('chatMessage').select('delivery').notEqualTo('readedBy', user).notEqualTo('from', user);
    let unread = await query.find();
    unread.forEach(message => {
      this.addUnreadMessage(message);
    });
    this.messagesUnreadSubscription = await query.subscribe();
    this.messagesUnreadSubscription.on('create', (message) => {
      this.addUnreadMessage(message);
    });
    this.messagesUnreadSubscription.on('update', (message) => {
      this.removeUnreadMessage(message);
    });
  }
  private addUnreadMessage(message) {
    let id = message.get('delivery').id;
    if (!this.messagesUnread[id]) {
      this.messagesUnread[id] = [];
    }
    this.messagesUnread[id].push(message);
  }
  private removeUnreadMessage(message) {
    let id = message.get('delivery').id;
    if (this.messagesUnread[id]) {
      let index = this.messagesUnread[id].findIndex(m => m.id === message.id);
      this.messagesUnread[id].splice(index, 1);
    }
  }
  public leaveChatMessages() {
    this.messages = [];
    this.messagesSubscription.unsubscribe();
  }
  public async sendChatMessage(delivery, text) {
    let message = this.utils.parseGenericObject('chatMessage');
    message.set('delivery', delivery);
    message.set('from', Parse.User.current());
    message.set('message', text);
    let ACL = await this.utils.getACL();
    ACL.setWriteAccess(delivery.get('user'), true);
    message.setACL(ACL);
    await message.save();
  }
}
