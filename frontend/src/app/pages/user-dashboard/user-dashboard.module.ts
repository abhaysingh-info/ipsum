import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UserDashboardRoutingModule } from './user-dashboard-routing.module'
import { UserDashboardComponent } from './user-dashboard.component'
import { PaymentsComponent } from './payments/payments.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MakePaymentComponent } from './make-payment/make-payment.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component'

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
	],
})
export class UserDashboardModule {}
