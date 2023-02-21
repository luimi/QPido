import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  product: any = {};
  productRaw;
  params = ['image', 'detail', 'price', 'tag', 'discountPercentage', 'isDiscount'];
  constructor(private aroute: ActivatedRoute, private productsCtrl: ProductsService, private utils: UtilsService, private navCtrl:NavController) { }

  async ngOnInit() {
    const id = this.aroute.snapshot.paramMap.get('id');
    let result = await this.productsCtrl.getProduct(id, this.params);
    this.product = result.obj;
    this.productRaw = result.raw;
  }
  setImage(evt) {
    this.utils.uploadImage(evt, (response) => {
      this.product.image = response.url;
    }, () => {
      console.log("error");
    });
  }
  addTag(tag) {
    this.product.tag.push(tag.toLowerCase());
  }
  removeTag(index) {
    this.product.tag.splice(index, 1)
  }
  save(){
    this.productsCtrl.updateProduct(this.productRaw,this.product, this.params,()=>{
      console.log('success');
    },()=>{
      console.log('error');
    });
  }
  delete(){
    this.productsCtrl.deleteProduct(this.productRaw, ()=> {
      this.navCtrl.back();
    }, ()=> {

    });
  }
}
