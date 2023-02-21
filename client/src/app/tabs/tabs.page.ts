import { Component } from '@angular/core';
import Parse from 'parse';
import { CartService } from '../services/cart.service';
import { UtilsService } from '../services/utils.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private cartCtrl: CartService, private utils: UtilsService) { }

}
