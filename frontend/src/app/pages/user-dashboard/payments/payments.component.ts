import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import {
	faCheckCircle,
	faExclamationCircle,
	faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons'
import { IVerifyUser } from '@shared/interfaces/user'
import { UserService } from 'src/app/services/user.service'
import { CustomSubscription } from 'src/app/utils/common'

@Component({
	selector: 'app-payments',
	templateUrl: './payments.component.html',
	styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent
	extends CustomSubscription
	implements OnDestroy, OnInit
{
	constructor(private userService: UserService) {
		super()
	}

	faXMarkCircle = faXmarkCircle

	faCheckCircle = faCheckCircle
	faExclamationCircle = faExclamationCircle

	makePaymentModal: boolean = false

	@Input() user: Partial<IVerifyUser> = this.userService.getUser()

	ngOnInit(): void {
		this.subscriptions.push(
			this.userService.user.subscribe({
				next: (user) => {
					this.user = user
				},
			}) as any,
		)
	}

	userSubscription: any
	captureEmitMakePaymentModal(value: boolean) {
		if (value === true) {
			this.subscriptions.push(
				this.userService.verifyLogin().subscribe({
					next: (resp) => {
						if (!resp.success) {
							this.userService.setIsLoggedIn(false)
							this.userService.setUser({})
						} else {
							this.userService.setIsLoggedIn(resp.success ? true : false)
							this.userService.setUser(resp.user as IVerifyUser)
						}
					},
					error: () => {
						this.userService.setIsLoggedIn(false)
						this.userService.setUser({})
					},
				}) as any,
			)
		}
		this.makePaymentModal = value
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
