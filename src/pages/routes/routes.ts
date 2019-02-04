import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoutesCreatePage } from '../routes-create/routes-create';
import { RoutesProvider } from '../../providers/routes/routes';
import { MapviewPage } from '../mapview/mapview';
import { RoutesInspectPage } from '../routes-inspect/routes-inspect';

@IonicPage()
@Component({
  selector: 'page-routes',
  templateUrl: 'routes.html',
})
export class RoutesPage {
  routes: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rp: RoutesProvider) {
  }

  ionViewDidLoad() {
    this.rp.getLocalStorage();
  }

  showRouteOnMap(index: number) {
    this.navCtrl.push(MapviewPage, { data: this.rp.routes[index].geoJSON, routeName: this.rp.routes[index].name });
  }

  inspectRoute(index: number) {
    this.navCtrl.push(RoutesInspectPage, { data: index });
  }

  deleteRoute(index: number) {
    if (confirm('Wirklich die Route "' + this.rp.routes[index].name + '" löschen?')) {
      this.rp.routes.splice(index, 1);
      this.rp.setLocalStorage();
    }
  }

  openRoutesCreatePage() {
    this.navCtrl.push(RoutesCreatePage);
  }


}
/*open routes service */