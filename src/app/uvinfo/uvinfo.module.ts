import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UvinfoPageRoutingModule } from './uvinfo-routing.module';

import { UvinfoPage } from './uvinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UvinfoPageRoutingModule
  ],
  declarations: [UvinfoPage]
})
export class UvinfoPageModule {}
