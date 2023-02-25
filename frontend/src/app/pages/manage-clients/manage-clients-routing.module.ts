import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageClientsComponent } from './manage-clients.component';

const routes: Routes = [{ path: '', component: ManageClientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageClientsRoutingModule { }
