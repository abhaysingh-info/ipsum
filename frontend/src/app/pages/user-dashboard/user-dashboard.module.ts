import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UserDashboardRoutingModule } from './user-dashboard-routing.module'
import { UserDashboardComponent } from './user-dashboard.component'
import { PaymentsComponent } from './payments/payments.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MakePaymentComponent } from './make-payment/make-payment.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component'
import { EventsCarouselComponent } from 'src/app/components/events-carousel/events-carousel.component'
import { TeamJoinOrCreateComponent } from 'src/app/components/team-join-or-create/team-join-or-create.component'

@NgModule({
	declarations: [
		UserDashboardComponent,
		PaymentsComponent,
		MakePaymentComponent,
	],
	imports: [
		CommonModule,
		UserDashboardRoutingModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		SpinnerComponent,
		EventsCarouselComponent,
		TeamJoinOrCreateComponent,
	],
})
export class UserDashboardModule {}
