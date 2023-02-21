import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  public courierRole;
  public couriers: any = [];
  constructor() { }

  public async getCouriers() {
    const courierRole = await this.getCourierRole();
    this.couriers = await courierRole.getUsers().query().find()
  }

  public async setCourierRole(username) {
    //this.authCompact.createUser(newUser, (courierPassword)=> {
    try {
      const user = await new Parse.Query(Parse.User).equalTo("username", username).first();
      const courierRole = await this.getCourierRole();
      courierRole.getUsers().add(user);
      await courierRole.save();
      this.getCouriers();
    } catch (e) {
      
    }
  }
  public async removeCourier(courier) {
    const courierRole = await this.getCourierRole();
    courierRole.getUsers().remove(courier);
    await courierRole.save()
    this.getCouriers();
  }
  public async getCourier(id) {
    try{
      return await new Parse.Query(Parse.User).get(id)
    }catch(e){

    }
  }
  public async getCourierRole() {
    if (this.courierRole) {
      return this.courierRole;
    } else {
      return await new Parse.Query(Parse.Role).equalTo("name", "Courrier").first();
    }
  }
}
