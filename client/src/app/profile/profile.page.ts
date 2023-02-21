import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Parse from 'parse';
import { AddressService } from '../services/address.service';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { DeliveryService } from '../services/delivery.service';
import { MainService } from '../services/main.service';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;
  constructor(private authCtrl: AuthService, private alertCtrl: AlertController, private router: Router, private profileCtrl: ProfileService, private deliveryCtrl: DeliveryService, private mainCtrl: MainService, private chatCtrl:ChatService, private addressCtrl:AddressService) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.user= this.profileCtrl.getUser();
  }
  async logOut(){
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesíon',
      message: '¿Deseas cerrar sesíon?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sí',
          handler: async () => {
            await this.authCtrl.logOut();
            this.deliveryCtrl.clearDeliveries();
            this.mainCtrl.clearMainDeliveries();
            this.chatCtrl.exitChatServer();
            this.addressCtrl.clearAddresses();
            this.router.navigateByUrl('/tabs/login');
          }
        }
      ]
    });
    await alert.present();
  }
}
