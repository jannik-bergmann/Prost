import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapsProvider } from '../maps/maps';
import { Route } from '../../app/models/route';

@Injectable()
export class RoutesProvider {

  routes: Route[] = [];

  constructor(public http: HttpClient, public mp: MapsProvider) {
    console.log('Hello RoutesProvider Provider');
  }

  addRoute(route: Route){
    this.routes.push(route);
    this.setLocalStorage();
  }
  getLocalStorage() {
    if (localStorage.getItem("routes") != null) {
      this.routes = JSON.parse(localStorage.getItem("routes"));
    }
  }
  setLocalStorage() {
    localStorage.setItem("routes", JSON.stringify(this.routes));
  }
  clearLocalStorage() {
    localStorage.clear();
  }

}
