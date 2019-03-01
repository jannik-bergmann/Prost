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
    console.log('');
    }
    
  }

  


