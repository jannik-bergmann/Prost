import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';
import { RoutesProvider } from '../../providers/routes/routes';


@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mp: MapsProvider, public rp: RoutesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  deleteAllRoutes(){
   if(confirm('wirklich alle routen löschen?')){
     this.rp.clearLocalStorage();
   }
  }

}
