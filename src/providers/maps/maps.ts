import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class MapsProvider {

  url: string = '';

  radius: number = 0.01;
  currentLatitude: number = 0;
  currentLongitude: number = 0;
  gotPosition: boolean = false;

  constructor(public http: HttpClient, private geolocation: Geolocation) {
  }

  getData() {
    return this.http.get(this.url);
  }

  getLocation() {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    return this.geolocation.getCurrentPosition(options);
  }

  createURL() {
    let geo = '';
    geo = (this.currentLatitude - this.radius) + ',' + (this.currentLongitude - this.radius) + ','
      + (this.currentLatitude + this.radius) + ',' + (this.currentLongitude + this.radius);
    this.url = 'https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="pub"](' + geo + ');way["amenity"="pub"](' + geo + ');relation["amenity"="pub"](' + geo + '););out;>;out skel qt;';
  }

  getPosition() {
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


}
