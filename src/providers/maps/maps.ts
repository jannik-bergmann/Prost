import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the MapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapsProvider {

  GEO: string = '52.27376411857,8.033344745636,52.283452792497,8.0522060394287';
  url: string = 'https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="pub"]('+this.GEO+');way["amenity"="pub"]('+this.GEO+');relation["amenity"="pub"]('+this.GEO+'););out;>;out skel qt;';
  
  radius: number = 0.1;
  currentLatitude: number=0;
  currentLongitude: number=0;
  gotPosition: boolean =false;
  constructor(public http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello MapsProvider Provider');
  }

  getData(){
    return this.http.get(this.url); 
    // return this.http.get('https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="pub"]('+this.GEO+');way["amenity"="pub"]('+this.GEO+');relation["amenity"="pub"]('+this.GEO+'););out;>;out skel qt;');
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLatitude = resp.coords.latitude;
      this.currentLongitude = resp.coords.longitude;
      this.gotPosition = true;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  createURL(){
    this.getPosition();
    let geo ='';
    geo = ''+(this.currentLongitude - this.radius) +','+(this.currentLatitude + this.radius)+','
          +(this.currentLongitude + this.radius) +',' +(this.currentLatitude - this.radius)+'';
    this.url = 'https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="pub"]('+geo+');way["amenity"="pub"]('+geo+');relation["amenity"="pub"]('+geo+'););out;>;out skel qt;';
    //https://gis.stackexchange.com/questions/80809/calculating-bounding-box-coordinates-based-on-center-and-radius
  }


}
