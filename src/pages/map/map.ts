import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';
import { Pub } from '../../app/models/pub';
//import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;
  pubs: Pub[] = [];
  mapData: any = 0;
  gotPubs: boolean = false;
  gotMapData: boolean = false;
  showCoor: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mp: MapsProvider) {
  }

  ionViewDidLoad() {
    this.mp.getPosition();
    this.mp.getLocation().then((resp) => {
      this.mp.currentLatitude = resp.coords.latitude;
      this.mp.currentLongitude = resp.coords.longitude;
      this.mp.gotPosition = true;
      this.mp.createURL();
      this.mp.getData()
        .subscribe(data => {
          this.mapData = data;
        },
          err => {
            console.log(err);
          },
          () => {
            this.extractPubs();
          }
        );
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getMapData() {
    if (this.mp.gotPosition && !this.gotMapData) {
      this.mp.getData()
        .subscribe(data => {
          this.mapData = data;
        },
          err => {
            console.log(err);
          },
          () => {
            this.extractPubs();
          }
        );
      return true;
    }
  }

  createPubs() {
    if (!this.gotPubs && this.mp.gotPosition) {
      this.mp.createURL();
      this.getMapData();
      this.gotPubs = true;
      console.log('createdPubs')
    }
    else if (this.gotPubs && this.mp.gotPosition) {
      alert('Kneipen wurden schon gefunden!')
    }
    else {
      if (confirm('Ihr Standort wird benötigt! Noch einmal versuchen ihren Standort aufzurufen?')) {
        this.mp.getPosition();
      }
      else { };

    }
  }

  extractPubs() {
    if (this.pubs.length != 0) this.pubs = [];
    if (this.mapData.elements != undefined) {
      for (let i = 0; i < this.mapData.elements.length; i++) {

        if (typeof(this.mapData.elements[i].tags) !== 'undefined' && typeof(this.mapData.elements[i].tags.name) !== 'undefined') {
          let tmp = new Pub(this.mapData.elements[i].tags.name, i);
          this.pubs.push(tmp);
        }
        
      }
      this.gotPubs = true;
      console.log('extracted Pubs!');
    }
    else console.log('mapData.element == undefined!');
  }



  showMapData() {
    console.log(this.mapData.elements);
  }

  showPubs() {
    for (let i = 0; i < this.pubs.length; i++) {
      console.log(this.pubs[i]);
    }
  }

  getLocation() {
    this.mp.createURL();
    console.log(this.mp.currentLatitude + ' ' + this.mp.currentLongitude);
  }

  showLocation() {
    console.log(this.mp.currentLatitude + ' ' + this.mp.currentLongitude);
    this.showCoor = true;
  }



  getLocalStorage() {
    if (localStorage.getItem("pubs") != null) {
      this.pubs = JSON.parse(localStorage.getItem("pubs"));
    }
  }

  setLocalStorage() {
    localStorage.setItem("pubs", JSON.stringify(this.pubs));
  }

  clearLocalStorage() {
    localStorage.clear();
  }

}
