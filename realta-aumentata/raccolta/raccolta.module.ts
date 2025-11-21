import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaccoltaPageRoutingModule } from './raccolta-routing.module';

import { RaccoltaPage } from './raccolta.page';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaccoltaPageRoutingModule,
    SharedModule
  ],
  declarations: [RaccoltaPage]
})
export class RaccoltaPageModule {}
