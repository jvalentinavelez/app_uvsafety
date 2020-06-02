import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-ojos-modal',
  templateUrl: './ojos-modal.component.html',
  styleUrls: ['./ojos-modal.component.scss'],
})
export class OjosModalComponent implements OnInit {

  constructor(private ModalController: ModalController  ) { }

  dismissModal(){
    this.ModalController.dismiss();
  }
  ngOnInit() {}

}
