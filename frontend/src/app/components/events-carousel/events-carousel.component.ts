import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventCardComponent } from '../event-card/event-card.component'
import { EventService } from 'src/app/services/event.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CustomSubscription } from 'src/app/utils/common'
import { IDBEvent } from '@shared/interfaces/event'
import { ToastService } from 'src/app/services/toast.service'
import { UserService } from 'src/app/services/user.service'
import { IVerifyUser } from '@shared/interfaces/user'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { AskConfirmationComponent } from 'src/app/shared/ask-confirmation/ask-confirmation.component'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { SpinnerComponent } from '../spinner/spinner.component'
import { TeamService } from 'src/app/services/team.service'
import { EventParticipateComponent } from '../event-participate/event-participate.component'

@Component({
	selector: 'app-events-carousel',
	standalone: true,
	imports: [
		CommonModule,
		EventCardComponent,
		FontAwesomeModule,
		InfiniteScrollModule,
		AskConfirmationComponent,
		SpinnerComponent,
		EventParticipateComponent,
	],
	templateUrl: './events-carousel.component.html',
	styleUrls: ['./events-carousel.component.scss'],
})
export class EventsCarouselComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	requestInProgress: boolean = false
	loadedAllData: boolean = false
	startFrom: number = 0
	loaderForSpinner: boolean = false

	faSpinner = faSpinner

	@Input() type: 'carousel' | 'grid' = 'carousel'

	events: IDBEvent[] = []

	constructor(
		private eventService: EventService,
		private toastService: ToastService,
		private userService: UserService,
		private teamService: TeamService,
	) {
		super()
	}

	user$ = this.userService.user
	team$ = this.teamService.team

	// related to delete event
	showDeleteConfirmation: boolean = false
	deleteEventIndex: number | undefined = undefined
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

	ngOnInit(): void {
		this.getEvents()
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

	participateInEvent: IDBEvent | undefined = undefined
	captureEmitOnParticipate(index: number | undefined) {
		if (index !== undefined) {
			this.participateInEvent = this.events[index]
		} else {
			this.participateInEvent = undefined
		}
	}

	trackById(index: number, object: IDBEvent) {
		return object._id
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}

	refreshEvents() {
		this.events = []
		this.startFrom = 0
		this.loadedAllData = false
		this.getEvents()
	}
}
