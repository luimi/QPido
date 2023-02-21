import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  newProduct:any = {tag:[]};
  newProductExtraParams = []
  constructor(private productsCtrl: ProductsService, private utils: UtilsService, private navCtrl: NavController) { }

  ngOnInit() {
  }
  setImage(evt){
    this.utils.uploadImage(evt,(response)=>{
      this.newProduct.image = response.url;
    },()=>{
      console.log("error");
    });
  }
  addTag(tag) {
    this.newProduct.tag.push(tag.toLowerCase());
  }
  removeTag(index) {
    this.newProduct.tag.splice(index, 1)
  }
  save(){
    this.productsCtrl.saveNewProduct(this.newProduct,()=>{
      this.navCtrl.back();
    }, (e)=> {
      console.log("error" + e);
    });
  }
}
