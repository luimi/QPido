import { Component, OnInit } from '@angular/core';
import { CourierService } from '../services/courier.service';

@Component({
  selector: 'app-couriers',
  templateUrl: './couriers.page.html',
  styleUrls: ['./couriers.page.scss'],
})
export class CouriersPage implements OnInit {

  constructor(private couriersCtrl: CourierService) { }

  ngOnInit() {
    this.couriersCtrl.getCouriers()
  }

}
