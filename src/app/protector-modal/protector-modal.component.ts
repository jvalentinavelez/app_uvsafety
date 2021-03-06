import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-protector-modal',
  templateUrl: './protector-modal.component.html',
  styleUrls: ['./protector-modal.component.scss'],
})
export class ProtectorModalComponent implements OnInit {

  constructor(private ModalController: ModalController  ) { }

  dismissModal(){
    this.ModalController.dismiss();
  }
  ngOnInit() {}

}
