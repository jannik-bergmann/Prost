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
  gotMapData: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mp: MapsProvider) {
  }

  ionViewDidLoad() {
    this.mp.getPosition();
    console.log('ionViewDidLoad MapPage');
  }

  getMapData() {
    if (this.mp.gotPosition && !this.gotMapData) {
      this.gotMapData = true;
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
      this.gotMapData = false;
      return true;
    }
    else if(!this.gotMapData){
      return 0;
    }
    else{
      if(confirm('Ihr Standort wird benötigt! Noch einmal versuchen ihren Standort aufzurufen?')){
        console.log('Standort Aufrufen Platzhalter');
      }
      else console.log('StandortNicht Aufrufen Platzhalter');

    }
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
    this.mp.createURL();
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
