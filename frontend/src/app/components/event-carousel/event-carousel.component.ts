import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventCardComponent } from '../event-card/event-card.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CustomSubscription } from 'src/app/utils/common'
import { IDBEvent } from '@shared/interfaces/event'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { AskConfirmationComponent } from 'src/app/shared/ask-confirmation/ask-confirmation.component'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { SpinnerComponent } from '../spinner/spinner.component'

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
	],
	templateUrl: './event-carousel.component.html',
	styleUrls: ['./event-carousel.component.scss'],
})
export class EventsCarouselComponent
	extends CustomSubscription
	implements OnInit
{
	requestInProgress: boolean = false
	loadedAllData: boolean = false
	startFrom: number = 0
	loaderForSpinner: boolean = false

	faSpinner = faSpinner

	@Input() type: 'carousel' | 'grid' = 'carousel'

	@Input() events: IDBEvent[] = []

	constructor() {
		super()
	}

	ngOnInit(): void {}

	trackById(index: number, object: IDBEvent) {
		return object._id
	}
}
