import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveriesPage } from './deliveries.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveriesPage
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveriesPageRoutingModule {}
