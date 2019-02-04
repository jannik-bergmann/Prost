import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { MapPage } from '../map/map';
import { RoutesCreatePage } from '../routes-create/routes-create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openMapPage(){
    this.navCtrl.push(RoutesCreatePage);
  }

}
