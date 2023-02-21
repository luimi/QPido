import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  qty = "1";
  product;
  selectConfig: any = {
    header: 'Cantidad',
    message: 'Selecciona la cantidad de este producto',
    translucent: true
  };
  constructor(private productCtrl: ProductService, private route: ActivatedRoute, public cartCtrl: CartService) { }

  ngOnInit() {
  }
  async ionViewDidEnter(){
    const id = this.route.snapshot.paramMap.get('id');
    this.product = await this.productCtrl.getProduct(id);
    if(this.cartCtrl.isCartProduct(id)){
      this.qty = this.cartCtrl.getCartProductQty(id);
    }
  }
  setQuantity(){
    if(this.cartCtrl.isCartProduct(this.product.id)){
      this.cartCtrl.setCartProductQuantity(this.product.id,this.qty);
    }
  }
}
