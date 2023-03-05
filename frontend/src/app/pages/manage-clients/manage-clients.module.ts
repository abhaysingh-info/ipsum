import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ManageClientsRoutingModule } from './manage-clients-routing.module'
import { ManageClientsComponent } from './manage-clients.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
	declarations: [ManageClientsComponent],
	imports: [
		CommonModule,
		ManageClientsRoutingModule,
		FontAwesomeModule,
		ReactiveFormsModule,
	],
})
export class ManageClientsModule {}
