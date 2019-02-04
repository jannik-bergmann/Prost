import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { RoutesProvider } from '../../providers/routes/routes';
import { MapsProvider } from '../../providers/maps/maps';
import { Pub } from '../../app/models/pub';
import { Route } from '../../app/models/route';
import { MapviewPage } from '../mapview/mapview';

declare var require: any;

@IonicPage()
@Component({
  selector: 'page-routes-create',
  templateUrl: 'routes-create.html',
})
export class RoutesCreatePage {
  osmGeoJSON: any;
  osmJSON: any;
  pubs: Pub[] = [];
  selectedPubs: Pub[] = [];

  tmpName: string;
  gotData: boolean = false;
  selectPubsStage: boolean = true;
  selectOrderStage: boolean = false;
  selectNamesStage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rp: RoutesProvider, public mp: MapsProvider) {
  }

  filterPubs(pub: Pub) {
    return pub.marked;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutesCreatePage');
    this.rp.getLocalStorage();
    this.mp.getLocation().then((resp) => {
      this.mp.currentLatitude = resp.coords.latitude;
      this.mp.currentLongitude = resp.coords.longitude;
      this.mp.gotPosition = true;
      this.mp.createURL();
      this.mp.getData()
        .subscribe(data => {
          this.osmJSON = data;
        },
          err => {
            console.log(err);
          },
          () => {
            let osmtogeojson = require('osmtogeojson');
            this.osmGeoJSON = osmtogeojson(this.osmJSON)
            this.extractPubs();
          }
        );
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  extractPubs() {
    if (this.pubs.length != 0) this.pubs = [];
    for (let i = 0; i < this.osmGeoJSON.features.length; i++) {
      if (typeof (this.osmGeoJSON.features[i].properties.name) !== 'undefined') {
        let tmp = new Pub(this.osmGeoJSON.features[i].properties.name, this.osmGeoJSON.features[i].id);
        this.pubs.push(tmp);
      }
    }
    console.log('extracted Pubs!');
    this.gotData = true;
  }

  createSelectedPubs() {
    if (this.selectedPubs.length != 0) {
      this.selectedPubs = [];
    }
    for (let i = 0; i < this.pubs.length; i++) {
      if (this.pubs[i].marked) {
        this.selectedPubs.push(this.pubs[i]);
      }
    }
  }

  selectAll() {
    for (let i = 0; i < this.pubs.length; i++) {
      this.pubs[i].marked = true;
    }
  }

  unselectAll() {
    for (let i = 0; i < this.pubs.length; i++) {
      this.pubs[i].marked = false;
    }
  }

  reorderItems(indexes: any): void {
    this.selectedPubs = reorderArray(this.selectedPubs, indexes);
  }


  addRoute() {
    let route = new Route(this.tmpName);
    let tmpGeoJSON = this.osmGeoJSON;

    for (let i = 0; i < this.pubs.length; i++) {
      if (!this.pubs[i].marked) {
        for (let j = 0; j < tmpGeoJSON.features.length; j++) {
          if (this.pubs[i].id == tmpGeoJSON.features[j].id) {
            tmpGeoJSON.features.splice(j, 1);
          }
        }
      }
    }

    route.geoJSON = tmpGeoJSON;
    route.pubs = this.pubs;
    route.selectedPubs = this.selectedPubs;
    this.rp.addRoute(route);
    this.navCtrl.pop();
  }

  printGeoJSON() {
    console.log(this.osmGeoJSON);
  }



}
