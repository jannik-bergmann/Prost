import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ShowWhen } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';
import leaflet from 'leaflet';

declare var require: any;

@IonicPage()
@Component({
  selector: 'page-mapview',
  templateUrl: 'mapview.html',
})
export class MapviewPage {
  map: any;
  mapData: any;
  passedGeoJSON: any;
  passedName: string = 'Karte';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public mp: MapsProvider) {
    this.passedGeoJSON = navParams.get('data');
    this.passedName = navParams.get('routeName');
  }

  ionViewDidLoad() {
    if(typeof(this.passedGeoJSON) !== 'undefined'){
      this.displayMap(this.passedGeoJSON);
    }
    /*
    this.mp.getLocation().then((resp) => {
      this.mp.currentLatitude = resp.coords.latitude;
      this.mp.currentLongitude = resp.coords.longitude;
      this.mp.gotPosition = true;
      this.mp.createURL();
      this.getMapData();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     */
     
  }
    
  onEachFeature(feature, layer) {
    if (typeof(feature.properties.name) !== 'undefined') {
        layer.bindPopup(feature.properties.name);
    }
  }

  displayMap(passedGeoJSON: any) {
    
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    leaflet.geoJSON(passedGeoJSON, {
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
    
    let layer = leaflet.geoJSON(this.passedGeoJSON);
    let group = new leaflet.FeatureGroup();
    group.addLayer(layer);
    
    this.map.fitBounds(group.getBounds());
  }


  showMap() {
    let osmtogeojson = require('osmtogeojson');
    let myGeoJson = osmtogeojson(this.mapData);
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    leaflet.geoJSON(myGeoJson, {
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    });
      
      
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
