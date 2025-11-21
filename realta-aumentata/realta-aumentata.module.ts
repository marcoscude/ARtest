import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealtaAumentataPageRoutingModule } from './realta-aumentata-routing.module';

import { RealtaAumentataPage } from './realta-aumentata.page';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealtaAumentataPageRoutingModule,
    SharedModule
  ],
  declarations: [RealtaAumentataPage]
})
export class RealtaAumentataPageModule {}
