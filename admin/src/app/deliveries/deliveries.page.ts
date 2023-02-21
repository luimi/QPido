import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatService } from '../services/chat.service';
import { DeliveriesService } from '../services/deliveries.service';
import { ChatPage } from './chat/chat.page';
@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss'],
})
export class DeliveriesPage implements OnInit {
  currentList = 1;
  constructor(public deliveryCtrl: DeliveriesService, public chatCtrl: ChatService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.deliveryCtrl.getDeliveries();
    this.chatCtrl.getUnreadMessages();
  }
  changeStatus(delivery,status){
    this.deliveryCtrl.setDeliveryStatus(delivery,status);
  }
  async openChat(id){
    const modal = await this.modalCtrl.create({
      component: ChatPage,
      componentProps: {
        id:id
      }
    });
    await modal.present();
  }
}
