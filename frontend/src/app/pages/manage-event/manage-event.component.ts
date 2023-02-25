import { Component, OnInit } from '@angular/core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IDBEvent } from '@shared/interfaces/event'
import { EventService } from 'src/app/services/event.service'
import { ToastService } from 'src/app/services/toast.service'

@Component({
	selector: 'app-manage-event',
	templateUrl: './manage-event.component.html',
	styleUrls: ['./manage-event.component.scss'],
})
export class ManageEventComponent implements OnInit {
	faSpinner = faSpinner

	startFrom: number = 0
	requestInProgress: boolean = false
	loadedAllData: boolean = false

	showCreateEventModal: boolean = false

	events: IDBEvent[] = []

	constructor(
		private eventService: EventService,
		private toastService: ToastService,
	) {}

	ngOnInit(): void {
		this.getEvents()
	}

	trackById(index: number, object: IDBEvent) {
		return object._id
	}

	toggleShowCreateEventModal() {
		this.showCreateEventModal = !this.showCreateEventModal
	}

	createEventModalEmitHandler(value: boolean) {
		if (value === true) {
			this.startFrom = 0
			this.getEvents()
		}
		this.showCreateEventModal = value
	}

	getEvents() {
		if (this.requestInProgress || this.loadedAllData) return
		this.eventService.all({}, { startFrom: this.startFrom }).subscribe({
			next: (response: any) => {
				if (
					response.data?.length === 0 ||
					response.data?.length < response.limit
				) {
					this.loadedAllData = true
				}
				this.events.push(...response.data)
				this.startFrom = response.startFrom + response.limit
			},
			error: () => {
				this.toastService.addToast({
					toastFace: 'error',
					message: 'Error occured while getting Events please try again!',
				})
			},
		})
	}
}
