import { Component, OnDestroy, OnInit } from '@angular/core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IDBEvent } from '@shared/interfaces/event'
import { EventService } from 'src/app/services/event.service'
import { ToastService } from 'src/app/services/toast.service'
import { UserService } from 'src/app/services/user.service'
import { CustomSubscription } from 'src/app/utils/common'

@Component({
	selector: 'app-manage-event',
	templateUrl: './manage-event.component.html',
	styleUrls: ['./manage-event.component.scss'],
})
export class ManageEventComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	constructor(
		private eventService: EventService,
		private toastService: ToastService,
		private userService: UserService,
	) {
		super()
	}

	faSpinner = faSpinner

	loaderForSpinner: boolean = false

	startFrom: number = 0
	requestInProgress: boolean = false
	loadedAllData: boolean = false

	showCreateEventModal: boolean = false

	events: IDBEvent[] = []

	// related to delete event
	showDeleteConfirmation: boolean = false
	deleteEventIndex: number | undefined = undefined

	user = this.userService.getUser()

	ngOnInit(): void {
		this.getEvents()
	}

	deleteEvent(index: number) {
		this.deleteEventIndex = index
		this.showDeleteConfirmation = true
	}

	deleteEventAfterEmit(value: boolean) {
		if (value === true) {
			if (
				this.deleteEventIndex !== undefined ||
				this.deleteEventIndex !== null
			) {
				const event = this.events[this.deleteEventIndex as number]
				if (this.loaderForSpinner) return
				this.loaderForSpinner = true
				this.subscriptions.push(
					this.eventService.delete(event._id as any).subscribe({
						next: (response: any) => {
							this.toastService.addToast({
								message: `Deleted "${event.name}" Successfully!`,
								toastFace: 'warning',
							})
							this.loaderForSpinner = false

							this.refreshEvents()
						},
						error: () => {
							this.toastService.addToast({
								toastFace: 'error',
								message: 'Error occured while getting Events please try again!',
							})
							this.loaderForSpinner = false
						},
					}) as any,
				)
			}
		}
		this.deleteEventIndex = undefined
		this.showDeleteConfirmation = false
	}

	trackById(index: number, object: IDBEvent) {
		return object._id
	}

	toggleShowCreateEventModal() {
		this.showCreateEventModal = !this.showCreateEventModal
	}

	refreshEvents() {
		this.events = []
		this.startFrom = 0
		this.loadedAllData = false
		this.getEvents()
	}

	createEventModalEmitHandler(value: boolean) {
		if (value === true) {
			this.refreshEvents()
		}
		this.showCreateEventModal = value
	}

	getEvents() {
		if (this.requestInProgress || this.loadedAllData) return
		this.requestInProgress = true
		this.subscriptions.push(
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
					this.requestInProgress = false
				},
				error: () => {
					this.toastService.addToast({
						toastFace: 'error',
						message: 'Error occured while getting Events please try again!',
					})
					this.requestInProgress = false
				},
			}) as any,
		)
	}

	ngOnDestroy() {
		this.unsubscribeAll()
	}
}
