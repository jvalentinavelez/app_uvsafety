import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-aplicacion-modal',
  templateUrl: './aplicacion-modal.component.html',
  styleUrls: ['./aplicacion-modal.component.scss'],
})
export class AplicacionModalComponent implements OnInit {

  constructor(private ModalController: ModalController  ) { }

  dismissModal(){
    this.ModalController.dismiss();
  }

  ngOnInit() {}

}
