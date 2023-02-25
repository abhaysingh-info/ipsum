import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageClientsRoutingModule } from './manage-clients-routing.module';
import { ManageClientsComponent } from './manage-clients.component';


@NgModule({
  declarations: [
    ManageClientsComponent
  ],
  imports: [
    CommonModule,
    ManageClientsRoutingModule
  ]
})
export class ManageClientsModule { }
