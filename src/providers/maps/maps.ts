import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class MapsProvider {

  GEO: string = '52.27376411857,8.033344745636,52.283452792497,8.0522060394287';
  url: string = 'https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="pub"]('+this.GEO+');way["amenity"="pub"]('+this.GEO+');relation["amenity"="pub"]('+this.GEO+'););out;>;out skel qt;';
  
  placesUrl: string= 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY';

  radius: number = 0.01;
  currentLatitude: number=0;
  currentLongitude: number=0;
  gotPosition: boolean =false;
  
  constructor(public http: HttpClient, private geolocation: Geolocation) {
  }

  getData(){
    return this.http.get(this.url); 
  }

  getPosition(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.currentLatitude = resp.coords.latitude;
      this.currentLongitude = resp.coords.longitude;
      console.log('this.longitude : ' + this.currentLongitude);
      this.gotPosition = true;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     return true;
  }

  getLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    return this.geolocation.getCurrentPosition(options);
  }

  createURL(){
    let geo ='';
    geo = (this.currentLatitude - this.radius) +','+(this.currentLongitude - this.radius)+','
          +(this.currentLatitude + this.radius) +',' +(this.currentLongitude + this.radius);
    this.url = 'https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="pub"]('+geo
    +');way["amenity"="pub"]('+geo+');relation["amenity"="pub"]('+geo+'););out;>;out skel qt;';
  }

  getPlaceData(name: string){
    name.replace(" ","%20");
    this.placesUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+name+'&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:1000@'+this.currentLatitude+','+this.currentLongitude+'&key=AIzaSyA8s7RSD-VS0JaJpyjumtfiu28a0W-fVQ4';
    return this.http.get(this.placesUrl);
  }


}
