import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  data:any = {};
  params = ['username','password','email','name','phone']
  constructor(private authCtrl: AuthService, private router: Router, private alertCtrl: AlertController, private chatCtrl: ChatService) { }

  ngOnInit() {
  }
  signup(){
    this.data.email = this.data.username;
    this.authCtrl.signUp(this.data, this.params, ()=> {
      this.chatCtrl.connectToChatServer();
      this.router.navigateByUrl('/tabs/profile');
    }, async ()=> {
      const alert = await this.alertCtrl.create({
        message: 'Usuario ya registrado con ese correo.',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
