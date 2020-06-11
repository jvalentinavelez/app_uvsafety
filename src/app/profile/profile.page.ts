import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import { UserinfoService } from '../services/userinfo.service';
import { ThrowStmt } from '@angular/compiler';
import { ServicioService } from "./../servicio.service";
import { GetDEMService } from './../get-dem.service';
import {Platform, AlertController} from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
   
  mainuser: AngularFirestoreDocument
  sub
  name: string
  skin:string
  gender:string
  email:string
  birthdate:string
  risk: any;
  spf:string;
  DEM="1";
  protection = false;
  public isToggled: boolean;

  constructor(
    private afAuth : AngularFireAuth, 
    private router: Router,  
    public user: UserinfoService,
    public afs: AngularFirestore,
    private userServ: ServicioService,
    private plt: Platform,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private getDEM: GetDEMService,
    ) { //Permite que la notificación pueda ser visualizada en el centro de notificaciones y que al dar click pueda ser redirigida a la app
      this.plt.ready().then(()=> {
        this.localNotifications.on('click').subscribe(res => { 
          console.log('click: ',res);
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, msg, res.text);
        })
      }); //Permite visualizar la notificación como una alerta en la app
      this.plt.ready().then(()=> {
        this.localNotifications.on('trigger').subscribe(res => {
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, msg,res.text);
        })
      }) //Se accede a los datos del usuario almacenados en la base de datos
      this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.name = event.name
        this.email = event.email
        this.skin = event.skin
        this.gender = event.gender
        this.birthdate = event.birthdate.split("T")[0] //con el fin de visualizar la fecha de nacimiento sin el formato de tiempo UTC de Firebase
        this.spf = event.spf
      })
    }
  returnhome(){
    this.router.navigate(['home']);
  }
  openEditProfile(){
    this.router.navigate(['edit-profile']);
  }
  SolarProtNotifications(){ //Despliega la notificación del protector solar, haciendo uso de la variable this.DEM, que depende de la piel y el spf que ingrese el usuario
    this.userServ.serviceData.subscribe(data => (this.risk= data));
    //this.getDEM.serviceData.subscribe(data => (this.DEM= data))
    this.isToggled= !this.isToggled;
    console.log(this.DEM);
    this.protection = !this.protection;
    this.localNotifications.schedule({
      id: 1,
      title: 'UV SAFETY',
      data: {mydata:"Es hora de usar tu protector solar"},
      led:'FF0000',
      icon:'platforms/android/app/src/main/res/protectorsolar.png',
      trigger: {in: Number(this.DEM), unit: ELocalNotificationTriggerUnit.MINUTE}
    });
  }
  CuidadosPersonalesNotifications(){ //Despliega la notificación que alerta sobre el índice UV presente y sugiere las prendas recomendadas respectivamente
    this.userServ.serviceData.subscribe(data => (this.risk = data)); //this. risk se obtiene de la página Home, para obtener dicho valor se usa el servicio ServicioService
    if(this.risk == 'No hay riesgo'){ //La notificación depende del riesgo presente, this.risk 
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 2,
        title: 'UV SAFETY',
        data: {mydata: "El índice UV se encuentra: "+ this.risk + ". Necesitas protección mínima"},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Bajo'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        icon:'protectorsolar.png',
        data: {mydata: "El índice UV se encuentra: "+ this.risk+". Te recomendamos usar: gafas y tu protector solar"},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Moderado'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        icon:'protectorsolar.png',
        data: {mydata: "El índice UV se encuentra: "+ this.risk+". Te recomendamos usar: gafas, una gorra con visera y tu protector solar"},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Alto'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        icon:'protectorsolar.png',
        data: {mydata: "El índice UV se encuentra: "+ this.risk + ". Te recomendamos usar: gafas, una gorra con visera, una camisa y tu protector solar"},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Muy Alto'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        icon:'protectorsolar.png',
        data: {mydata: "El índice UV se encuentra: "+ this.risk+". Te recomendamos usar: gafas, una gorra con visera, sombrilla, una camisa y tu protector solar"},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Extremo'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        icon:'protectorsolar.png',
        data: {mydata: "El índice UV se encuentra: "+ this.risk + ". Te recomendamos quedarte en casa"},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
  }}
  async showAlert(header, sub, msg) { //Creación de la alerta que se desplegará como notificación
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      cssClass: 'custom-alertDanger',
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }
  Onlogout(){
    this.user.logout();
  }

  ngOnInit(){

    }

}
