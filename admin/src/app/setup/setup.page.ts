import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import Parse from 'parse';
import { Map, latLng, tileLayer, Layer, marker, icon, featureGroup } from 'leaflet';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
/**
 * # Instalacion de la aplicacion en el servidor.
 * ## Casos de uso
 * - Usuario registra su tienda virtual
 * - Usuario intenta registrar nuevamente la tienda
 * ## Proximamente
 * - Agregar distancia radial
 */
export class SetupPage implements OnInit {
  data: any = {};
  map: any;
  isLoading = false;
  constructor(private alertController: AlertController, private router: Router) { }
  ngOnInit() {

  }
  async ionViewDidEnter() {
    this.isLoading = true;
    let location: any = await Geolocation.getCurrentPosition();
    location = location.coords;
    this.data.location = new Parse.GeoPoint({ latitude: location.latitude, longitude: location.longitude });
    this.map = new Map('map', { zoomControl: false }).setView([location.latitude, location.longitude], 15);
    tileLayer("https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}", {
      attribution: "Q'pido",
    }).addTo(this.map);
    const m = this.addMarker(this.map, [location.latitude, location.longitude]);
    m.dragging.enable();
    m.on('dragend', (e) => {
      this.setLocation(e)
    });
    this.map.on('click', (e) => {
      this.setLocation(e);
      m.setLatLng(e.latlng);

    });
    this.isLoading = false;
  }
  private setLocation(event) {
    const l = event.latlng;
    const location = new Parse.GeoPoint({ latitude: l.lat, longitude: l.lng });
    this.data.location = location;
  }
  private addMarker(map, location, title?, iconUrl?, size?) {
    let options: any = {};
    if (title) {
      options.title = title;
    }
    if (iconUrl) {
      let i = icon({
        iconUrl: iconUrl,
        iconSize: size ? size : [23, 32],
        iconAnchor: size ? [size[0] / 2, size[1]] : [11, 32],
        popupAnchor: [0, -32]
      });
      options.icon = i;

    }
    let m = marker(location, options).addTo(map);
    return m;
  }
  private async initialize() {
    this.isLoading = true;
    let alert;
    if(!this.data.username || !this.data.email || !this.data.password || !this.data.location){
      return;
    }
    try{
      const result = await Parse.Cloud.run("setup-initialize", this.data);
      if(result.success){
        alert = await this.alertController.create({
          header: 'Felicitaciones!',
          message: 'Tu tienda se creo exitosamente!',
          buttons: [{
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.router.navigateByUrl("/");
            },
          }],
        });
      }else {
        alert = await this.alertController.create({
          header: 'Error',
          message: 'Ocurrio un error',
          buttons: ['Ok'],
        });
      }
    }catch(e){
      alert = await this.alertController.create({
        header: 'Error',
        message: 'Error desconocido: '+e.message,
        buttons: ['Ok'],
      });
    }
    await alert.present();
    this.isLoading = false;
  }
}
