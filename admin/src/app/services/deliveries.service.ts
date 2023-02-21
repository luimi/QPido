import { Injectable } from '@angular/core';
import Parse from 'parse';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {

  public deliveries = [];
  constructor(private utils: UtilsService) { }


  private deliveriesQuery = new Parse.Query("delivery").include("address").include("receipt").include("user");
  public async getDeliveries() {
    try {
      this.deliveries = await this.deliveriesQuery.find()
    } catch (e) {

    }
  }
  public async setDeliveryStatus(delivery, status) {
    let currentStatus = delivery.get('status');
    try {
      delivery.set("status", status);
      await delivery.save()
    } catch (e) {
      delivery.set("status", currentStatus);
    }
  }
  public async setDeliveryCourier(delivery, courierId) {
    if (delivery && courierId) {
      const courier = this.utils.parseGenericObject(Parse.User);
      courier.id = courierId;
      delivery.set("courier", courier);
      await delivery.save();
    }
  }
  public async removeDeliveryCourier(delivery) {
    if (delivery) {
      delivery.unset("courier");
      await delivery.save();
    }
  }
  public async getDelivery(id) {
    try {
      return await new Parse.Query('delivery').include('user').get(id);
    } catch (e) { }
  }
}
