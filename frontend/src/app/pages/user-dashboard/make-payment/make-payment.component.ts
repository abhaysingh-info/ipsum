import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IStringKey } from '@shared/interfaces'
import { UserService } from 'src/app/services/user.service'
import { paymentDetails } from 'src/app/utils/text.config'

@Component({
	selector: 'app-make-payment',
	templateUrl: './make-payment.component.html',
	styleUrls: ['./make-payment.component.scss'],
})
export class MakePaymentComponent implements OnInit {
	paymentForm: FormGroup = new FormGroup({})

	requestInProgress: boolean = false

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
	) {}

	messages: IStringKey<string | null> = {
		transaction_id: null,
		transaction_image: null,
		success: null,
		general: null,
	}

	onFileChange(event: any) {
		const files = (event.target as HTMLInputElement).files
		if (files?.length) {
			const file = files[0]
			this.paymentForm.patchValue({
				transaction_image: file,
			})
		} else {
			this.paymentForm.patchValue({
				transaction_image: null,
			})
			this.paymentForm.markAllAsTouched()
		}
	}

	ngOnInit(): void {
		this.paymentForm = this.formBuilder.group({
			transaction_id: [
				'',
				Validators.compose([Validators.required, Validators.minLength(1)]),
			],
			transaction_image: [null, [Validators.required]],
		})
	}

	@Input() show: boolean = false

	paymentDetails = paymentDetails

	@Output() onShow: EventEmitter<boolean> = new EventEmitter<boolean>(false)

	emitConfirmationByUser(value: boolean) {
		this.onShow.emit(value)
	}

	setMessages(key: string, message: string) {
		this.messages[key] = message
	}

	onSubmit() {
		if (this.requestInProgress) return
		if (this.paymentForm.invalid) {
			this.paymentForm.markAllAsTouched()
			return
		}
		this.requestInProgress = true
		this.resetMessages()
		this.userService
			.capturePayment(
				this.paymentForm.value.transaction_id,
				this.paymentForm.value.transaction_image,
			)
			.subscribe({
				next: (response) => {
					this.setMessages('success', 'Payment Made Successfully!')
					this.paymentForm.reset()
					this.emitConfirmationByUser(true)
					this.requestInProgress = false
				},
				error: (error) => {
					if (error.error.statusCode === 400) {
						if (typeof error.error.message === typeof []) {
							error.error.message.forEach((errorMessage: string) => {
								const key = errorMessage.split(' ')[0]
								this.setMessages(key, errorMessage)
							})
						} else {
							const key = error.error.message.split(' ')[0]
							this.setMessages(key, error.error.message)
						}
					}
					this.setMessages('general', 'An error occured!')
					this.requestInProgress = false
				},
			})
	}

	resetMessages() {
		Object.keys(this.messages).forEach((key: string) => {
			this.messages[key] = null
		})
	}
}
