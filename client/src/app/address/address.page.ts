import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import Parse from 'parse';
import { AddressService } from '../services/address.service';
import { MapService } from '../services/map.service';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  segment = 'list';
  data: any = {type:'home'};
  loading = true;
  constructor(private modalCtrl: ModalController, private addressCtrl: AddressService, private mapCtrl: MapService) { }
  onMapEvent = (location) => {
    this.data.location = location;
  }
  ngOnInit() {
    this.addressCtrl.getAdresses();
  }
  async ionViewDidEnter(){
    let location: any = await Geolocation.getCurrentPosition();
    location = location.coords;
    this.data.location = new Parse.GeoPoint({latitude: location.latitude, longitude: location.longitude});
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    
  }
  segmentChanged(event){
    if(event.target.value === "new" && !this.mapCtrl.isInitialized('address')){
      this.mapCtrl.initAddressMap('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', this.data.location, this.onMapEvent, this.onMapEvent);
    }
  }
  async saveAddress(){
    let address = await this.addressCtrl.saveAdress(this.data);
    this.addressCtrl.addresses.push(address);
    this.segment = 'list';
    delete this.data.address;
    delete this.data.extra;
  }
}
