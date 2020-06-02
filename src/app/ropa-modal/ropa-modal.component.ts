import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ropa-modal',
  templateUrl: './ropa-modal.component.html',
  styleUrls: ['./ropa-modal.component.scss'],
})
export class RopaModalComponent implements OnInit {

  constructor(private ModalController: ModalController  ) { }

  dismissModal(){
    this.ModalController.dismiss();
  }
  ngOnInit() {}

}
