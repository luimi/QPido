import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = [];

  constructor(private utils: UtilsService) { }
  public async getProducts(word?) {
    let query = new Parse.Query('product').equalTo("status", true);
    if (word && word.trim() != "") {
      query.contains("nameSearch", word.trim());
    }
    this.products = await query.find();
  }
  public async getProduct(id, params) {
    const result = await new Parse.Query('product').get(id);
    return { obj: this.utils.parseObjectToObject(result, params), raw: result };
  }
  public enableDisableProduct(product) {
    product.set("enabled", !product.get("enabled")).save();
  }

  public async saveNewProduct(data, success, error) {
    try {
      let product = this.utils.parseGenericObject("product");
      product.set("name", data.name);
      product.set("price", data.price);
      product.set("detail", data.detail);
      product.set("image", data.image);
      if(data.tag.length>0){
        data.tag.forEach(tag => {
          tag = tag.toLowerCase();
        });
      }
      product.set("tag", data.tag);
      product.set("nameSearch", data.name.toLowerCase());
      product.set("discountPercentage", 0);
      product.set("enabled", false);
      product.set("isDiscount", false);
      product.set("status", true);
      product.setACL(await this.utils.getACL());
      product = await product.save();
      this.products.push(product);
      success(product);
    } catch (e) {
      error(e);
    }

  }
  public async updateProduct(product, data, fields, success, error) {
    try {
      product = this.utils.parseObjectSetParams(product, data, fields);
      await product.save();
      success();
    } catch (e) {
      error();
    }

  }
  public async deleteProduct(product, success, error) {
    try {
      await product.set("status", false).save();
      let index = this.utils.getIndexOf(this.products,product.id);
      if(index>=0){
        this.products.splice(index,1);
      }
      success();
    } catch (e) {
      error();
    }
  }
}
