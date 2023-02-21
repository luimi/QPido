import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public promoProductQuery = new Parse.Query("product")
  .equalTo("isDiscount", true)
  .equalTo("enabled",true)
  .equalTo("status",true);
  public mainProductQuery = new Parse.Query("product")
  .equalTo("enabled",true)
  .equalTo("status",true);
  public config = {mainLimit: 6,promoLimit: 6};
  constructor() { }

  public async getProduct(id) {
    return await new Parse.Query('product').get(id);
  }
}
