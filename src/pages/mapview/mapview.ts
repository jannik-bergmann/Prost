import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ShowWhen } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';
import leaflet from 'leaflet';
import { Route } from '../../app/models/route';

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
  route: Route;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mp: MapsProvider) {
    
      this.route = navParams.get('route');
      if(this.route.name !== 'geo'){
      this.passedGeoJSON = this.route.geoJSON;
      this.passedName = this.route.name;
    }
  }

  ionViewDidLoad() {
    if (this.route.name !== 'geo') {
      this.displayMap();
    }
    else this.showOnlyPoints();
  }

  onEachFeature(feature, layer) {
    if (typeof (feature.properties.name) !== 'undefined') {
      layer.bindPopup(feature.properties.name);
    }
  }

  

  style(feature) {
    return { color: "orange" };
  }

  pointToLayer(feature, latlng) {
    return leaflet.circleMarker(latlng, {
      radius: 9,
    });
  }

  displayMap() {
    this.map = leaflet.map("bigmap").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    leaflet.geoJSON(this.route.geoJSON, {
      style: this.style,
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer
    }).addTo(this.map);

    let layer = leaflet.geoJSON(this.route.geoJSON);
    let group = new leaflet.FeatureGroup();
    group.addLayer(layer);

    this.map.fitBounds(group.getBounds());

    if (typeof (this.route) !== 'undefined') {
      this.displayRoute();
      this.addStartEnd();
    }
  }

  showOnlyPoints(){
    this.map = leaflet.map("bigmap").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    leaflet.geoJSON(this.route.geoJSON, {
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
    let layer = leaflet.geoJSON(this.route.geoJSON);
    let group = new leaflet.FeatureGroup();
    group.addLayer(layer);
    this.map.fitBounds(group.getBounds());
  }

  displayRoute() {

    var pointList = [];

    for (let i = 0; i < this.route.selectedPubs.length; i++) {
      var lat = this.route.selectedPubs[i].latitude;
      var lon = this.route.selectedPubs[i].longitude;
      pointList.push([lat, lon]);
    }


    var firstpolyline = new leaflet.polyline(pointList, {
      color: 'brown',
      weight: 3,
      opacity: 1,
      smoothFactor: 1
    });
    firstpolyline.addTo(this.map);
  }

  addStartEnd() {
    new leaflet.Marker([this.route.selectedPubs[0].latitude, this.route.selectedPubs[0].longitude],
      {
        icon: new leaflet.divIcon({
          className: 'my-div-icon-start',
          html: ''
        })
      })
      .bindPopup(this.route.selectedPubs[0].name)
      .addTo(this.map);

      new leaflet.Marker([this.route.selectedPubs[this.route.selectedPubs.length-1].latitude, this.route.selectedPubs[this.route.selectedPubs.length-1].longitude],
        {
          icon: new leaflet.divIcon({
            className: 'my-div-icon-end',
            html: ''
          })
        })
        .bindPopup(this.route.selectedPubs[this.route.selectedPubs.length-1].name)
        .addTo(this.map);
    
  }



}
