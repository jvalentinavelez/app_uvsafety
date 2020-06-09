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
    ) {
      this.plt.ready().then(()=> {
        this.localNotifications.on('click').subscribe(res => {
          console.log('click: ',res);
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, msg, res.text);
        })
      });
      this.plt.ready().then(()=> {
        this.localNotifications.on('trigger').subscribe(res => {
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, msg,res.text);
        })
      })
      this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.name = event.name
        this.email = event.email
        this.skin = event.skin
        this.gender = event.gender
        this.birthdate = event.birthdate.split("T")[0]
        this.spf = event.spf
      })
    }
  returnhome(){
    this.router.navigate(['home']);
  }
  openEditProfile(){
    this.router.navigate(['edit-profile']);
  }
  SolarProtNotifications(){
    this.userServ.serviceData.subscribe(data => (this.risk= data));
    //this.getDEM.serviceData.subscribe(data => (this.DEM= data))
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
  CuidadosPersonalesNotifications(){
    this.userServ.serviceData.subscribe(data => (this.risk = data));
    if(this.risk == 'No hay riesgo'){
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
  async showAlert(header, sub, msg) {
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
