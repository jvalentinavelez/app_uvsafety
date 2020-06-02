import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.scss'],
})
export class GeneralModalComponent implements OnInit {

  constructor(private ModalController: ModalController  ) { }

  dismissModal(){
    this.ModalController.dismiss();
  }

  ngOnInit() {}

}
