import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
	EventRegistrationRequirementFieldForm,
	EventRegistrationRequirementsForm,
} from 'src/app/forms/event.form'
import { IDBEvent } from '@shared/interfaces/event'
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { IStringKey } from '@shared/interfaces'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { EventService } from 'src/app/services/event.service'

@Component({
	selector: 'app-event-participate',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, FormsModule],
	templateUrl: './event-participate.component.html',
	styleUrls: ['./event-participate.component.scss'],
})
export class EventParticipateComponent implements OnInit, OnChanges {
	constructor(private eventService: EventService) {}

	faSpinner = faSpinner

	allowMajorityRegistration: boolean = false

	@Input() event: IDBEvent | undefined = undefined
	@Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>(false)

	requestInProgress: boolean = false

	messages: IStringKey<string | null> = {}

	eventRegistrationRequirementsForm = EventRegistrationRequirementsForm()

	ngOnInit(): void {
		this.addAllFieldsAndPatchValue()
	}

	ngOnChanges(): void {
		this.addAllFieldsAndPatchValue()
	}

	private addAllFieldsAndPatchValue() {
		this.allowMajorityRegistration = false
		this.eventRegistrationRequirementsForm = EventRegistrationRequirementsForm()
		this.eventRegistrationRequirementsForm.patchValue({
			eventId: this.event?._id as any,
		})

		this.event?.eventRequirementField?.forEach((obj) => {
			this.addEventRegistrationRequirementField(obj.question)
		})
	}

	private addEventRegistrationRequirementField(question: string) {
		;(
			this.eventRegistrationRequirementsForm?.get(
				'eventRequirementField',
			) as FormArray
		)?.push(EventRegistrationRequirementFieldForm(question))
	}

	setMessages(key: string, value: string) {
		this.messages[key] = value
	}

	resetMessages() {
		this.messages = {}
	}

	emitOnClose() {
		this.onClose.emit(true)
	}

	onSubmit() {
		if (this.requestInProgress) return
		if (this.eventRegistrationRequirementsForm.invalid) {
			this.eventRegistrationRequirementsForm.markAllAsTouched()
			this.setMessages('general', 'All fields are required.')
			return
		}
		this.requestInProgress = true
		this.resetMessages()

		this.eventService
			.participate(
				this.eventRegistrationRequirementsForm.value,
				this.allowMajorityRegistration,
			)
			.subscribe({
				next: (res) => {
					this.requestInProgress = false
					this.setMessages('success', 'Registered for the event successfully.')
				},
				error: (err) => {
					this.requestInProgress = false
					this.setMessages('general', err?.error?.message || err?.message)
				},
			})
	}
}
