import { Component, OnInit } from '@angular/core'
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

@Component({
	selector: 'app-events-carousel',
	standalone: true,
	imports: [
		CommonModule,
		EventCardComponent,
		FontAwesomeModule,
		InfiniteScrollModule,
	],
	templateUrl: './events-carousel.component.html',
	styleUrls: ['./events-carousel.component.scss'],
})
export class EventsCarouselComponent
	extends CustomSubscription
	implements OnInit
{
	requestInProgress: boolean = false
	loadedAllData: boolean = false
	startFrom: number = 0

	user: Partial<IVerifyUser> = {}

	events: IDBEvent[] = []

	constructor(
		private eventService: EventService,
		private toastService: ToastService,
		private userService: UserService,
	) {
		super()
	}

	ngOnInit(): void {
		this.user = this.userService.getUser()

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

	trackById(index: number, object: IDBEvent) {
		return object._id
	}
}
