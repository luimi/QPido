import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouriersPage } from './couriers.page';

const routes: Routes = [
  {
    path: '',
    component: CouriersPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouriersPageRoutingModule {}
