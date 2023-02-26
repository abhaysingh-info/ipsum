import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CreateEvent } from 'src/app/forms/event.form'
import { eventType } from 'src/app/utils/event'
import { EventService } from 'src/app/services/event.service'
import { ToastService } from 'src/app/services/toast.service'
import { SpinnerComponent } from '../spinner/spinner.component'
import { IStringKey } from '@shared/interfaces'

@Component({
	selector: 'app-create-event',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
	templateUrl: './create-event.component.html',
	styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
	constructor(
		private eventService: EventService,
		private toastService: ToastService,
	) {}

	messages: IStringKey<string | null> = {
		success: null,
		general: null,
		eventId: null,
		eventType: null,
		name: null,
		commencementDate: null,
		venue: null,
		registrationClosesOn: null,
		description: null,
		eventBatch: null,
		moreInformationPdf: null,
		image: null,
	}

	todaysDate = new Date()

	eventIdInUse: boolean = false
	eventType = eventType
	createForm: FormGroup = new FormGroup({})

	requestInProgress: boolean = false

	ngOnInit(): void {
		this.createForm = CreateEvent()
	}

	@Input() showModel: boolean = false

	@Output() showModelEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(
		false,
	)

	emitShowModel(value: boolean) {
		if (value === false) {
			this.resetForm()
		}
		this.showModelEmitter.emit(value)
	}

	setMessages(key: string, message: string) {
		this.messages[key] = message
	}

	onSubmit() {
		if (this.requestInProgress) return
		if (this.createForm.invalid) {
			this.createForm.markAllAsTouched()
			return
		}
		this.requestInProgress = true
		this.resetMessages()
		this.eventService.create(this.createForm.value).subscribe({
			next: (response: any) => {
				this.resetForm()
				this.setMessages('success', 'Event created successfully!')

				this.requestInProgress = false
				this.emitShowModel(true)
			},
			error: (error: any) => {
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

	resetForm() {
		this.createForm.reset()
		this.resetMessages()
	}
}
