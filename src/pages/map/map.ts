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
  pubs: Pub [] = [];
  mapData: any = 0;
  gotPubs: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mp: MapsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  getMapData(){
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

  createPubs() {
    if (!this.gotPubs) {
      this.mp.createURL();
      this.getMapData();
      this.gotPubs = true;
      console.log('createdPubs')
    }
    else console.log('Already created pubs-Array!')
  }

  createPubs2(){
    this.extractPubs();
    this.showPubs();
  }

  extractPubs(){
    if(this.mapData.elements != undefined){
      for(let i = 0; i< this.mapData.elements.length; i++){
        let tmp = new Pub(this.mapData.elements[i].tags.name,i );
        this.pubs.push(tmp);
      }
      console.log('extracted Pubs!');
    }
    else console.log('mapData.element == undefined!');
  }

  showMapData(){
    console.log(this.mapData.elements);
  }

  showPubs(){
    for(let i = 0; i< this.pubs.length; i++){
      console.log(this.pubs[i]);
    }
  }

  getLocation(){
    this.mp.getPosition();
    console.log(this.mp.currentLatitude + ' ' + this.mp.currentLongitude);
  }
  
  showLocation(){
    console.log(this.mp.currentLatitude + ' ' + this.mp.currentLongitude);
  }
  


  getLocalStorage(){
    if(localStorage.getItem("pubs")!=null){
      this.pubs = JSON.parse(localStorage.getItem("pubs"));
    }
  }

  setLocalStorage(){
    localStorage.setItem("pubs", JSON.stringify(this.pubs));
  }
  
  clearLocalStorage(){
    localStorage.clear();
  }

}
