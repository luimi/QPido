import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data = {};
  constructor(private authCtrl: AuthService, private router: Router, private utils: UtilsService, private alertCtrl: AlertController) { }

  async ngOnInit() {
    if(!await this.utils.isInitialized()){
      this.router.navigateByUrl("/setup");
    }
  }
  ionViewDidEnter(){
    if(this.utils.isLogedIn()){
      this.goToMain();
    }
  }
  login(){
    this.authCtrl.logIn(this.data,()=> {
      this.goToMain();
    }, async (e)=> {
      const alert = await this.alertCtrl.create({
        message: 'Usuario o contraseña invalidos.',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
  async goToMain(){
    if(await this.authCtrl.isCurrentUserInRole("Administrator")){
      this.router.navigateByUrl('/main');
    } else {
      this.authCtrl.logOut();
      console.log("Sesion cerrada");
    }
    
  }
}
