import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';
import { ChatService } from '../services/chat.service';
import { DeliveryService } from '../services/delivery.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  delivery;
  updateSubscription;
  showMap = false;
  constructor(public deliveryCtrl: DeliveryService, private route: ActivatedRoute, public chatCtrl: ChatService, private mapCtrl: MapService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.delivery = await this.deliveryCtrl.getDelivery(id);
    
    this.updateSubscription = await this.deliveryCtrl.subscribeDeliveryUpdates(id, ()=> {
      this.validateStatus();
    });
    setTimeout(() => {
      this.validateStatus();
    }, 1000);
    
  }
  ionViewWillLeave(){
    this.deliveryCtrl.unsubscribeDeliveryUpdates(this.updateSubscription);
  }
  validateStatus(){
    this.showMap = this.delivery && this.delivery.get('status')> 1 && this.delivery.get('status')< 4;
    if(this.showMap){
      this.mapCtrl.initDeliveryMap('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',this.delivery);
    }
  }
  async openChat(){
    const modal = await this.modalCtrl.create({
      component: ChatPage,
      componentProps: {
        deliveryId:this.delivery.id
      }
    });
    await modal.present();
  }
}
