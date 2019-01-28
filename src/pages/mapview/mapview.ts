import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';
import leaflet from 'leaflet';
import osmtogeojson from 'osmtogeojson';

declare var require: any;

@IonicPage()
@Component({
  selector: 'page-mapview',
  templateUrl: 'mapview.html',
})
export class MapviewPage {
  map: any;
  mapData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mp: MapsProvider) {
  }

  ionViewDidLoad() {
    this.mp.getLocation().then((resp) => {
      this.mp.currentLatitude = resp.coords.latitude;
      this.mp.currentLongitude = resp.coords.longitude;
      this.mp.gotPosition = true;
      this.mp.createURL();
      this.getMapData();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }
    
  

  showMap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      console.log('found you');
      });
      let osmtogeojson = require('osmtogeojson');
      
      console.log('typeof: '+typeof(this.mapData));
      leaflet.geoJSON(osmtogeojson(this.mapData)).addTo(this.map);
 
  }

  getMapData() {
    if (this.mp.gotPosition) {
      this.mp.getData()
        .subscribe(data => {
          this.mapData = data;
        },
          err => {
            console.log(err);
          },
          () => {
            this.showMap();
          }
        );
      return true;
    }
  }

}

/*
showMap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      console.log('found you');
      });
      //leaflet.geoJSON(geojsonFeature).addTo(map);
 
  }
  */
