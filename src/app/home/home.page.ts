import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {WeatherService} from './../weather.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { ServicioService } from "./../servicio.service";
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  percent: number =0;
  outerStrokeColor:any;
  outerStrokeGradientStopColor:any;
  radius: number = 100;
  weather: any;
  icon:any;
  location: any;
  geopositon:any;
  latitude:any;
  longitude:any;
  uv:any;
  risk:string;
  riskicon:any;
  apiKey='a7b5abe134344aea83ec6f5cdaf18606';

  constructor(
    public router: Router,
    public weatherService:WeatherService, 
    public geolocation: Geolocation,
    public platform: Platform,
    private userServ: ServicioService) {}
    openprofile(){
      this.router.navigate(['profile']);
    }
    openuvinfo(){
      this.router.navigate(['uvinfo']);
    }
    openreminders(){
      this.router.navigate(['reminders']);
    }
    openginfo(){
      this.router.navigate(['ginfo']);
    }
    ngAfterViewInit(){
      this.geolocationNative();
    }
    async geolocationNative(){
      //Se hace uso de la función Geolocation para obtener la latitud y longitud del usuario
      await this.platform.ready();
      this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
        geoposition.coords.latitude;
        geoposition.coords.longitude;
      }). catch(err => console.log(err));
    }
    ionViewWillEnter(){
      let watch = this.geolocation.watchPosition(); //Para obtener los datos de la función 
      watch.subscribe((data)=>{
        this.latitude= data.coords.latitude;
        this.longitude=data.coords.longitude;
        this.weatherService.getWeather(this.latitude,this.longitude, this.apiKey) //Se introducen los datos requeridos para la API del clima: latitud, longitud y la llave
          .subscribe((weather:any) => {
          this.weather=weather['data']['0']; //Se accede dentro del arreglo que ofrecen la API al dato correspondiente al índice UV
          this.risk=this.risk;
          this.icon=weather['data']['0']['weather']; //Se accede dentro del arreglo que ofrecen la API al icono del clima actual
          if (weather['data']['0']['uv'].toFixed(0) =='0'){ //Se establecen los condicionales respectivos de acuerdo al valor del índice UV
            this.percent=100;
            this.risk='Sin riesgo';
            this.outerStrokeColor='#6AE240';
            this.outerStrokeGradientStopColor='#84fa88';
          }
          else if(weather['data']['0']['uv'].toFixed(0) =='1'){
            this.percent=9.09;
            this.risk='Bajo';
            this.outerStrokeColor='#B4FF29';
            this.outerStrokeGradientStopColor='#FBFF00';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='2'){
            this.percent=18.18;
            this.risk='Bajo';
            this.outerStrokeColor='#B4FF29';
            this.outerStrokeGradientStopColor='#FBFF00';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='3'){
            this.percent=27.27;
            this.risk='Moderado';
            this.outerStrokeColor='#fcb758';
            this.outerStrokeGradientStopColor='#fffd59';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='4'){
            this.percent=36.36;
            this.risk='Moderado';
            this.outerStrokeColor='#fcb758';
            this.outerStrokeGradientStopColor='#fffd59';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='5'){
            this.percent=45.45;
            this.risk='Moderado';
            this.outerStrokeColor='#fcb758';
            this.outerStrokeGradientStopColor='#fffd59';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='6'){
            this.percent=54.54;
            this.risk='Alto';
            this.outerStrokeColor='#FFA529';
            this.outerStrokeGradientStopColor='#ff6d38';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='7'){
            this.percent=63.63;
            this.risk='Alto';
            this.outerStrokeColor='#FFA529';
            this.outerStrokeGradientStopColor='#ff6d38';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='8'){
            this.percent=72.72;
            this.risk='Muy Alto';
            this.outerStrokeColor='#AA55F8';
            this.outerStrokeGradientStopColor='#ff3e3b';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='9'){
            this.percent=81.81;
            this.risk='Muy Alto';
            this.outerStrokeColor='#AA55F8';
            this.outerStrokeGradientStopColor='#ff3e3b';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='10'){
            this.percent=90.9;
            this.risk='Muy Alto';
            this.outerStrokeColor='#AA55F8';
            this.outerStrokeGradientStopColor='#ff3e3b';
          }
          else if (weather['data']['0']['uv'].toFixed(0) =='11'){
            this.percent=100;
            this.risk='Extremo';
            this.outerStrokeColor='#AA55F8';
            this.outerStrokeGradientStopColor='#fc2675';
          }
          else {
            this.percent=100;
            this.risk='Extremo';
            this.outerStrokeColor='#AA55F8';
            this.outerStrokeGradientStopColor='#fc2675';
          }
        this.userServ.changeData(this.risk); //Permite hacer uso de la variable this.risk definida
        });
      });
    } 
}
