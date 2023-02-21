import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveriesPageRoutingModule } from './deliveries-routing.module';

import { DeliveriesPage } from './deliveries.page';
import { UtilsComponentModule } from '../utils/utils-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveriesPageRoutingModule,
    UtilsComponentModule
  ],
  declarations: [DeliveriesPage]
})
export class DeliveriesPageModule {}
