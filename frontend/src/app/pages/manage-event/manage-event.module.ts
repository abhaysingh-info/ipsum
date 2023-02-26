import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ManageEventRoutingModule } from './manage-event-routing.module'
import { ManageEventComponent } from './manage-event.component'
import { CreateEventComponent } from 'src/app/components/create-event/create-event.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AskConfirmationComponent } from 'src/app/shared/ask-confirmation/ask-confirmation.component'
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component'
import { EventCardComponent } from 'src/app/components/event-card/event-card.component'

@NgModule({
	declarations: [ManageEventComponent],
	imports: [
		CommonModule,
		ManageEventRoutingModule,
		CreateEventComponent,
		FontAwesomeModule,
		AskConfirmationComponent,
		SpinnerComponent,
		EventCardComponent,
	],
})
export class ManageEventModule {}
