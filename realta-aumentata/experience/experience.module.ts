import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExperiencePageRoutingModule } from './experience-routing.module';

import { ExperiencePage } from './experience.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExperiencePageRoutingModule
  ],
  declarations: [ExperiencePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]   // 👈 AGGIUNGI QUESTO
})
export class ExperiencePageModule {}
