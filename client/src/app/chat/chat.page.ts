import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatService } from '../services/chat.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @Input() deliveryId;
  newMessage;
  messages = [];
  currentUser;
  constructor(private chatCtrl:ChatService, private aroute: ActivatedRoute, private utils: UtilsService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.currentUser = this.utils.getCurrentUser();
    //this.deliveryId = this.aroute.snapshot.paramMap.get('id');
    this.messages = await this.chatCtrl.getChatMessages(this.deliveryId, (message)=> {
      this.messages.push(message);
    });
  }
  ionViewWillLeave(){
    this.chatCtrl.clearCurrentChat();
  }
}
