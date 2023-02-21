import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  user;
  userNewPassword;
  constructor(private aroute: ActivatedRoute, private courierCtrl: CourierService, private authCtrl: AuthService, private navCtrl: NavController) { }

  async ngOnInit() {
    const id = this.aroute.snapshot.paramMap.get('id');
    this.user = await this.courierCtrl.getCourier(id);
  }
  async resetPassword(){
    let result = await this.authCtrl.resetPassword(this.user.get('username'));
    this.userNewPassword = result.password;
  }
  async deleteUser(){
    await this.courierCtrl.removeCourier(this.user);
    this.navCtrl.back();
  }
}
