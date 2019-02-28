import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoutesPage } from '../routes/routes';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openMapPage(){
    this.navCtrl.push(RoutesPage);
  }

}
