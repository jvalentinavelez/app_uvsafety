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
  url:any;
  constructor(public http: HttpClient) {
    console.log('Hello WeatherService Service');
    this.url='https://api.weatherbit.io/v2.0/current?lat='; //Página de donde se obtienen los datos del clima
   }
  getWeather(latitude:any,longitude:any,apiKey:any){ //Requiere una latitud, longitud y una llave que se genera en el sitio
    return this.http.get(this.url+latitude+'&lon='+longitude+'&key='+apiKey);
  }
}
