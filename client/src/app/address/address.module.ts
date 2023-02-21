import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressPageRoutingModule } from './address-routing.module';

import { AddressPage } from './address.page';
import { UtilsComponentModule } from '../utils/utils-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressPageRoutingModule,
    UtilsComponentModule
  ],
  declarations: [AddressPage]
})
export class AddressPageModule {}
