import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { Route } from '../../app/models/route';
import { RoutesProvider } from '../../providers/routes/routes';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';
import { MapviewPage } from '../mapview/mapview';

/**
 * Generated class for the RoutesInspectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-routes-inspect',
  templateUrl: 'routes-inspect.html',
})
export class RoutesInspectPage {

  passedIndex: number;
  route: Route;

  edit: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rp: RoutesProvider) {
    this.passedIndex = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutesInspectPage');
    this.rp.getLocalStorage();
  }

  showRouteOnMap() {
    this.navCtrl.push(MapviewPage, { data: this.rp.routes[this.passedIndex].geoJSON, routeName: this.rp.routes[this.passedIndex].name });
  }

  reorderItems(indexes: any): void {
    this.rp.routes[this.passedIndex].selectedPubs = reorderArray(this.rp.routes[this.passedIndex].selectedPubs, indexes);
  }

}
