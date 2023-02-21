import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit {
  @Input() product;

  constructor() { }

  ngOnInit() {}

  getPrice(){
    if(this.product.get('isDiscount')){
      return this.product.get('price')-(this.product.get('price')*(this.product.get('discountPercentage')/100));
    } else {
      return this.product.get('price');
    }
  }
}
