import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { DeliveryService } from '../services/delivery.service';
import { MainService } from '../services/main.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data = {};
  constructor(private router: Router, private alertCtrl: AlertController,private authCtrl: AuthService, private mainCtrl: MainService, private deliveryCtrl: DeliveryService, private chatCtrl: ChatService) { }

  ngOnInit() {
  }
  login(){
    this.authCtrl.logIn(this.data, ()=> {
      this.mainCtrl.getMainDeliveries();
      this.deliveryCtrl.getDeliveries();
      this.chatCtrl.connectToChatServer();
      this.router.navigateByUrl('/tabs/profile');
    }, async ()=> {
      const alert = await this.alertCtrl.create({
        message: 'Usuario o contraseña invalidos.',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
