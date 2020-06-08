import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from "./../servicio.service";
import { UserinfoService } from '../services/userinfo.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-forme-modal',
  templateUrl: './forme-modal.component.html',
  styleUrls: ['./forme-modal.component.scss'],
})
export class FormeModalComponent implements OnInit {
  noRiesgo: any;
  bajo:any;
  moderado: any;
  alto: any;
  muyAlto:any;
  extremo:any;
  risk: any;
  n: number;
  DEM: number;
  spf: string;
  skin:string;
  mainuser: AngularFirestoreDocument
	sub

  constructor(
    private ModalController: ModalController,
    private activeRoute: ActivatedRoute,
    private userServ: ServicioService,
    private user: UserinfoService, 
    private afs: AngularFirestore ) {
      this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.spf = event.spf
        this.skin = event.skin
     })
    }

  dismissModal(){
    this.ModalController.dismiss();
  }

  timeConvert(n){
    var num = n;
    var hours = (num/60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours)*60;
    var rminutes = Math.round(minutes);
    return rhours + " hora(s) y " + rminutes + " minutos"
  }

  Protection() {
    this.userServ.serviceData.subscribe(data => (this.risk = data));
    if (this.skin == 'uno'){
      if(this.risk == 'Sin riesgo'){
        this.noRiesgo = true;
        this.DEM = (40*Number(this.spf)/15)
      }else if(this.risk == 'Bajo'){
        this.bajo = true;
        this.DEM = (40*Number(this.spf)/15)
      }else if(this.risk == 'Moderado'){
        this.moderado = true;
        this.DEM = (20*Number(this.spf)/30)
      }else if(this.risk == 'Alto'){
        this.alto = true;
        this.DEM = (15*Number(this.spf)/50)
      }else if(this.risk == 'Muy alto'){
        this.muyAlto = true;
        this.DEM = (15*Number(this.spf)/50)
      }else if(this.risk == 'Extremo'){
        this.extremo = true;
        this.DEM = (10*Number(this.spf)/60)
      }
    }
    else if (this.skin == 'dos'){
      if(this.risk == 'Sin riesgo'){
        this.noRiesgo = true;
        this.DEM = (50*Number(this.spf)/12)
      }else if(this.risk == 'Bajo'){
        this.bajo = true;
        this.DEM = (50*Number(this.spf)/12)
      }else if(this.risk == 'Moderado'){
        this.moderado = true;
        this.DEM = (30*Number(this.spf)/25)
      }else if(this.risk == 'Alto'){
        this.alto = true;
        this.DEM = (20*Number(this.spf)/40)
      }else if(this.risk == 'Muy alto'){
        this.muyAlto = true;
        this.DEM = (20*Number(this.spf)/40)
      }else if(this.risk == 'Extremo'){
        this.extremo = true;
        this.DEM = (15*Number(this.spf)/50)
      }
    }
    else if (this.skin == 'tres'){
      if(this.risk == 'Sin riesgo'){
        this.noRiesgo = true;
        this.DEM = (80*Number(this.spf)/9)
      }else if(this.risk == 'Bajo'){
        this.bajo = true;
        this.DEM = (80*Number(this.spf)/9)
      }else if(this.risk == 'Moderado'){
        this.moderado = true;
        this.DEM = (40*Number(this.spf)/15)
      }else if(this.risk == 'Alto'){
        this.alto = true;
        this.DEM = (25*Number(this.spf)/30)
      }else if(this.risk == 'Muy alto'){
        this.muyAlto = true;
        this.DEM = (25*Number(this.spf)/30)
      }else if(this.risk == 'Extremo'){
        this.extremo = true;
        this.DEM = (20*Number(this.spf)/40)
      }
    }
    else if (this.skin == 'cuatro', this.skin == 'cinco',this.skin == 'seis'){
      if(this.risk == 'Sin riesgo'){
        this.noRiesgo = true;
        this.DEM = (100*Number(this.spf)/6)
      }else if(this.risk == 'Bajo'){
        this.bajo = true;
        this.DEM = (100*Number(this.spf)/6)
      }else if(this.risk == 'Moderado'){
        this.moderado = true;
        this.DEM = (50*Number(this.spf)/12)
      }else if(this.risk == 'Alto'){
        this.alto = true;
        this.DEM = (35*Number(this.spf)/20)
      }else if(this.risk == 'Muy alto'){
        this.muyAlto = true;
        this.DEM = (25*Number(this.spf)/20)
      }else if(this.risk == 'Extremo'){
        this.extremo = true;
        this.DEM = (25*Number(this.spf)/30)
      }
    }
  }
  ngOnInit(){
  }

}
