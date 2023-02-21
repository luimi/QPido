import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouriersPageRoutingModule } from './couriers-routing.module';

import { CouriersPage } from './couriers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouriersPageRoutingModule
  ],
  declarations: [CouriersPage]
})
export class CouriersPageModule {}
