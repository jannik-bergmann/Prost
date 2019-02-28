import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { Route } from '../../app/models/route';
import { RoutesProvider } from '../../providers/routes/routes';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';
import { MapviewPage } from '../mapview/mapview';
import leaflet from 'leaflet';
import { style } from '@angular/core/src/animation/dsl';

/**
 * Generated class for the RoutesInspectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-routes-inspect',
  templateUrl: 'routes-inspect.html',
})
export class RoutesInspectPage {

  passedIndex: number;
  route: Route;
  map: any;

  selectedRoutesEdit: any;
  edit: boolean = false;
  styleNum: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rp: RoutesProvider) {
    this.passedIndex = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutesInspectPage');
    this.rp.getLocalStorage();
    if (this.map != undefined) { this.map.remove(); }
    if (typeof (this.rp.routes[this.passedIndex].geoJSON) !== 'undefined') {
      this.displayMap(this.rp.routes[this.passedIndex].geoJSON);
    }
  }

  showRouteOnMap() {
    this.navCtrl.push(MapviewPage, { route: this.rp.routes[this.passedIndex] });
  }

  enableEdit() {
    this.edit = true;
    this.selectedRoutesEdit = this.rp.routes[this.passedIndex].selectedPubs;
  }

  disableEdit() {
    this.edit = false;
    this.rp.routes[this.passedIndex].selectedPubs = this.selectedRoutesEdit;
    this.rp.setLocalStorage();
    this.ionViewDidLoad();
  }

  reorderItems(indexes: any): void {
    this.selectedRoutesEdit = reorderArray(this.selectedRoutesEdit, indexes);
  }

  onEachFeature(feature, layer) {
    //let numIcon = leaflet.divIcon({className: 'my-div-icon'});
    if (typeof (feature.properties.name) !== 'undefined') {
      layer.bindPopup(feature.properties.name);
    }
  }

  style(feature){
    return { color: "orange" };
  }

  pointToLayer(feature, latlng){
    return leaflet.circleMarker(latlng, {
      radius: 5,
    });
  }

  displayMap(passedGeoJSON: any) {
    //Link für Nummern: https://dotscrapbook.wordpress.com/2014/11/28/simple-numbered-markers-with-leaflet-js/
    this.map = leaflet.map("map").fitWorld();

    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    leaflet.geoJSON(passedGeoJSON, { 
      style: this.style,
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer
    }).addTo(this.map);

    let layer = leaflet.geoJSON(this.rp.routes[this.passedIndex].geoJSON);
    let group = new leaflet.FeatureGroup();
    group.addLayer(layer);
    this.map.fitBounds(group.getBounds());
    this.displayRoute();
  }

  displayRoute(){
    var pointList = [];

    for(let i=0; i<this.rp.routes[this.passedIndex].selectedPubs.length; i++){
      var lat = this.rp.routes[this.passedIndex].selectedPubs[i].latitude;
      var lon = this.rp.routes[this.passedIndex].selectedPubs[i].longitude;
      pointList.push([lat, lon]);
    }
    

    var firstpolyline = new leaflet.polyline(pointList, {
      color: 'brown',
      weight: 3,
      opacity: 1,
      smoothFactor: 1
    });
    firstpolyline.addTo(this.map);
    this.addStartEnd();
  }

  addStartEnd(){
    new leaflet.Marker([this.rp.routes[this.passedIndex].selectedPubs[0].latitude,this.rp.routes[this.passedIndex].selectedPubs[0].longitude], {
      icon: new leaflet.divIcon({
        className: 'my-div-icon-start',
        html: ''
      })
    }).bindPopup(this.rp.routes[this.passedIndex].selectedPubs[0].name)
    .addTo(this.map);

    new leaflet.Marker([this.rp.routes[this.passedIndex].selectedPubs[this.rp.routes[this.passedIndex].selectedPubs.length-1].latitude,this.rp.routes[this.passedIndex].selectedPubs[this.rp.routes[this.passedIndex].selectedPubs.length-1].longitude], {
      icon: new leaflet.divIcon({
        className: 'my-div-icon-end',
        html: ''
      })
    }).bindPopup(this.rp.routes[this.passedIndex].selectedPubs[this.rp.routes[this.passedIndex].selectedPubs.length-1].name)
    .addTo(this.map);
  }

}
