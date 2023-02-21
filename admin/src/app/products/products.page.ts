import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private productsCtrl: ProductsService) { }

  async ngOnInit() {
    await this.productsCtrl.getProducts();
  }
  async search(evt){
    await this.productsCtrl.getProducts(evt.detail.value);
  }
}
