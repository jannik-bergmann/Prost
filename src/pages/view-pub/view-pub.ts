import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';
import { Pub } from '../../app/models/pub';
/**
 * Generated class for the ViewPubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-pub',
  templateUrl: 'view-pub.html',
})
export class ViewPubPage {
  pub: Pub;
  placesJSON: any;
  name: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mp: MapsProvider) {
  }

  ionViewDidLoad() {
    if(typeof(this.navParams.get('currentPub')) !== 'undefined' ){
      this.pub = this.navParams.get('currentPub');
      this.name = this.pub.name;
      this.getInfo();

    }
    
  }

  getInfo(){
    console.log(this.pub.name);
    this.mp.getPlaceData(this.pub.name)
        .subscribe(data => {
          this.placesJSON = data;
        },
        err => {
          console.log(err);
        },
        () => {
          console.log("Daten wurden von google erhalten!");
          console.log( this.placesJSON );
        }
        );
    }

}
