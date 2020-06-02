import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormeModalComponent } from '../forme-modal/forme-modal.component';
import { GeneralModalComponent } from '../general-modal/general-modal.component';
import { OjosModalComponent } from '../ojos-modal/ojos-modal.component';
import { RopaModalComponent } from '../ropa-modal/ropa-modal.component';
import { ProtectorModalComponent } from '../protector-modal/protector-modal.component';
import { AplicacionModalComponent } from '../aplicacion-modal/aplicacion-modal.component';

@Component({
  selector: 'app-ginfo',
  templateUrl: './ginfo.page.html',
  styleUrls: ['./ginfo.page.scss'],
})
export class GinfoPage implements OnInit {

  constructor(private router: Router, public modalController: ModalController) { }
  returnhome(){
    this.router.navigate(['home']);
  }
  ngOnInit() {
  }
  async openforme(){
    const modal = await this.modalController.create({
      component: FormeModalComponent
    });
    await modal.present();
  }
  async opengeneral(){
    const modal = await this.modalController.create({
      component: GeneralModalComponent
    });
    await modal.present();
  }
  async openojos(){
    const modal = await this.modalController.create({
      component: OjosModalComponent
    });
    await modal.present();
  }
  async openropa(){
    const modal = await this.modalController.create({
      component: RopaModalComponent
    });
    await modal.present();
  }
  async openprotector(){
    const modal = await this.modalController.create({
      component: ProtectorModalComponent
    });
    await modal.present();
  }
  async openaplicacion(){
    const modal = await this.modalController.create({
      component: AplicacionModalComponent
    });
    await modal.present();
  }
}
