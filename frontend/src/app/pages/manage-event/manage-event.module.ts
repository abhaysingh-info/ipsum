import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ManageEventRoutingModule } from './manage-event-routing.module'
import { ManageEventComponent } from './manage-event.component'
import { CreateEventComponent } from 'src/app/components/create-event/create-event.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
	declarations: [ManageEventComponent],
	imports: [
		CommonModule,
		ManageEventRoutingModule,
		CreateEventComponent,
		FontAwesomeModule,
	],
})
export class ManageEventModule {}
