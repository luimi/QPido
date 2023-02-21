import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { DeliveriesService } from 'src/app/services/deliveries.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @Input() id;
  @ViewChild('content') private content: any;
  delivery;
  textMessage = "";
  constructor(private chatCtrl: ChatService, private aroute: ActivatedRoute, private deliveryCtrl: DeliveriesService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.delivery = await this.deliveryCtrl.getDelivery(this.id);
    await this.chatCtrl.getChatMessages(this.delivery, (message)=>{
      this.scrollBottom();
    });
    this.scrollBottom();
  }
  async send(){
    this.chatCtrl.sendChatMessage(this.delivery,this.textMessage);
    this.textMessage = "";
  }
  private scrollBottom(){
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 500);
  }
}
