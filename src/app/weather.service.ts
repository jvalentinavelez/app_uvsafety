import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  //apiKey = 'c0d847632c4d6d82f0862729581b4514';
  url:any;
  constructor(public http: HttpClient) {
    console.log('Hello WeatherService Service');
    this.url='https://api.weatherbit.io/v2.0/current?lat=';
   }
  getWeather(latitude:any,longitude:any,apiKey:any){
    return this.http.get(this.url+latitude+'&lon='+longitude+'&key='+apiKey);
  }
}
