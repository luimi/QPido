import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../services/delivery.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss'],
})
export class DeliveriesPage implements OnInit {

  constructor(public deliveryCtrl: DeliveryService, public utils: UtilsService) { }

  ngOnInit() {
    this.deliveryCtrl.getDeliveries();
  }

}
