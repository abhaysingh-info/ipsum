import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IDBEvent } from '@shared/interfaces/event'
import { environment } from 'src/environments/environment'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
	faCalendar,
	faFilePdf,
	faLocation,
	faMapMarker,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import { DateSuffixPipe } from 'src/app/pipes/date-suffix.pipe'

@Component({
	selector: 'app-event-card',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule, DateSuffixPipe],
	templateUrl: './event-card.component.html',
	styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
	Date = Date

	@Input() event: Partial<IDBEvent> = {}
	@Input() index: number | null = null

	faFilePdf = faFilePdf
	faCalendar = faCalendar
	faLocation = faMapMarkerAlt

	loaderForSpinner: boolean = false
	readMore: boolean = false

	today = Date.now()
	registrationClosed = new Date(this.event?.registrationClosesOn as any)

	toggleReadMore() {
		this.readMore = !this.readMore
	}
}
