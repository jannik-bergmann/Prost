import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapsProvider {

  GEO: string = '52.27376411857,8.033344745636,52.283452792497,8.0522060394287';

  constructor(public http: HttpClient) {
    console.log('Hello MapsProvider Provider');
  }

  getData(){
      return this.http.get('https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="pub"]('+this.GEO+');way["amenity"="pub"]('+this.GEO+');relation["amenity"="pub"]('+this.GEO+'););out;>;out skel qt;');
  }

}
