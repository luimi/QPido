import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DeliveryComponent } from './delivery/delivery.component';
import { EmptyComponent } from './empty/empty.component';
import { PriceComponent } from './price/price.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule
    ],
    declarations: [DeliveryComponent, PriceComponent, EmptyComponent],
    exports: [DeliveryComponent, PriceComponent, EmptyComponent ]
  })
  export class UtilsComponentModule {}