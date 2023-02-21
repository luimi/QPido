import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ChatService } from '../services/chat.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private mainCtrl: MainService, private cartCtrl: CartService) { }

  ngOnInit() {
    this.mainCtrl.getMainLists();
  }
  getMore(e){
    this.mainCtrl.getMoreProducts( ()=> {
      e.target.complete();
    });
  }
}
