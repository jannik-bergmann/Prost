import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps'
import { analyzeAndValidateNgModules } from '@angular/compiler';
//import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  mapData: any =0;
  elements: any;
  gotPubs: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private mp: MapsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  getPubs(){
    this.mp.getData()
    .subscribe(data => {
      this.mapData = data;
    });
    console.log('gotPubs! (:');
    this.gotPubs = true;
  }

  showMapData(){
    console.log(this.mapData.elements);
  }

}
