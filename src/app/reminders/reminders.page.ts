import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Platform, AlertController} from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { ServicioService } from "./../servicio.service";
import { UserinfoService } from '../services/userinfo.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {
  risk: any;
  spf:string;
  skin:string;
  protection = false;
  mainuser: AngularFirestoreDocument
	sub

  constructor(private router: Router,
    private plt: Platform,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private userServ: ServicioService,
    private user: UserinfoService,
    private afs: AngularFirestore) {
      this.plt.ready().then(()=> {
        this.localNotifications.on('click').subscribe(res => {
          console.log('click: ',res);
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title,res.text,msg);
        })
      });
      this.plt.ready().then(()=> {
        this.localNotifications.on('trigger').subscribe(res => {
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title,res.text,msg);
        })
      })
      this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.spf = event.spf
        this.skin = event.skin
      })
    }
  returnhome(){
    this.router.navigate(['home']);
  }
  SolarProtNotifications(){
    this.userServ.serviceData.subscribe(data => (this.risk = data));
    console.log(this.spf);
    this.protection = !this.protection;
    console.log("True");
    this.localNotifications.schedule({
      id: 1,
      title: 'UV SAFETY',
      text: 'This works',
      icon:'https://pngimg.com/download/54451',
      trigger: {every: ELocalNotificationTriggerUnit.MINUTE}
    });
  }
  CuidadosPersonalesNotifications(){
    this.userServ.serviceData.subscribe(data => (this.risk = data));
    if(this.risk == 'No hay riesgo'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 2,
        title: 'UV SAFETY',
        text: 'Necesitas protección mínima',
        data: {mydata: this.risk},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Bajo'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        text: 'Necesitas usar un sombrero ',
        icon:'../assets/img/gafas.png',
        data: {mydata: this.risk},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Moderado'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        text: 'Necesitas usar:',
        icon:'../assets/img/gafas.png',
        data: {mydata: this.risk},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Alto'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        text: 'Necesitas usar:',
        icon:'../assets/img/gafas.png',
        data: {mydata: this.risk},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Muy Alto'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        text: 'Necesitas usar:',
        icon:'../assets/img/protector.png',
        data: {mydata: this.risk},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
    }else if(this.risk == 'Extremo'){
      this.protection = !this.protection;
      this.localNotifications.schedule({
        id: 3,
        title: 'UV SAFETY',
        text: 'Necesitas usar:',
        icon:'../assets/img/gorra.png',
        data: {mydata: this.risk},
        trigger: {in: 3, unit: ELocalNotificationTriggerUnit.SECOND}
      });
  }}
  async showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }
 
  ngOnInit() {
  }

}
