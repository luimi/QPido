import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddressPage } from '../address/address.page';
import { CartService } from '../services/cart.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  address;
  selectConfig: any = {
    header: 'Cantidad',
    message: 'Selecciona la cantidad de este producto',
    translucent: true
  };
  constructor(private modalCtrl: ModalController, public cartCtrl: CartService, public utilsCtrl: UtilsService, private router: Router) { }

  async ngOnInit() {
  }
  async getAddress(){
    const modal = await this.modalCtrl.create({
      component: AddressPage
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    if(data.data){
      this.address = data.data.address;
    } else {
      this.address = undefined;
    }
    
  }
  public async createDelivery(){
    this.cartCtrl.createCartDelivery(this.address, (delivery)=> {
      this.address = undefined;
      this.router.navigateByUrl('/delivery/'+delivery.id);
    });
  }
}
