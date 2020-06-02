import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GinfoPageRoutingModule } from './ginfo-routing.module';

import { GinfoPage } from './ginfo.page';
import { FormeModalComponent } from '../forme-modal/forme-modal.component';
import { GeneralModalComponent } from '../general-modal/general-modal.component';
import { OjosModalComponent } from '../ojos-modal/ojos-modal.component';
import { RopaModalComponent } from '../ropa-modal/ropa-modal.component';
import { ProtectorModalComponent } from '../protector-modal/protector-modal.component';
import { AplicacionModalComponent } from '../aplicacion-modal/aplicacion-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GinfoPageRoutingModule
  ],
  declarations: [GinfoPage, FormeModalComponent, GeneralModalComponent, OjosModalComponent, RopaModalComponent, ProtectorModalComponent, AplicacionModalComponent],
  entryComponents:[FormeModalComponent, GeneralModalComponent, OjosModalComponent, RopaModalComponent, ProtectorModalComponent, AplicacionModalComponent]
})
export class GinfoPageModule {}
