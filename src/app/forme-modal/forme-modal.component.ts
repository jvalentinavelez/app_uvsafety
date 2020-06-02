import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from "./../servicio.service";

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
  constructor(
    private ModalController: ModalController,
    private activeRoute: ActivatedRoute,
    private userServ: ServicioService   ) { }

  dismissModal(){
    this.ModalController.dismiss();
  }

  ngOnInit() {
    this.userServ.serviceData.subscribe(data => (this.risk = data));
    console.log("sent data from home page", this.risk);
    if(this.risk == 'No hay riesgo'){
      this.noRiesgo = true;
    }else if(this.risk == 'Bajo'){
      this.bajo = true;
    }else if(this.risk == 'Moderado'){
      this.moderado = true;
    }else if(this.risk == 'Alto'){
      this.alto = true;
    }else if(this.risk == 'Muy alto'){
      this.muyAlto = true;
    }else if(this.risk == 'Extremo'){
      this.extremo = true;
    }
  }

}
