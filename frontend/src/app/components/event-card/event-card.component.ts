import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IDBEvent } from '@shared/interfaces/event'
import { IVerifyUser } from '@shared/interfaces/user'
import { environment } from 'src/environments/environment'
import { roles } from 'src/app/utils/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
	faCalendar,
	faFilePdf,
	faLocation,
	faMapMarker,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Team } from '@shared/interfaces/team'

@Component({
	selector: 'app-event-card',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule],
	templateUrl: './event-card.component.html',
	styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
	Date = Date

	@Input() event: Partial<IDBEvent> = {}
	@Input() user: Partial<IVerifyUser> | undefined = {}
	@Input() team: Team | null = {
		_id: '',
		isLocked: false,
		leader: {
			_id: '',
			name: '',
			email: '',
			countryCode: '',
			phoneNumber: '',
		},
		teamID: '',
		teamName: '',
		teamMembers: [],
	}
	@Input() index: number | null = null

	@Output() onDelete: EventEmitter<number> = new EventEmitter<number>(false)
	@Output() onParticipate: EventEmitter<number> = new EventEmitter<number>(
		false,
	)

	faFilePdf = faFilePdf
	faCalendar = faCalendar
	faLocation = faMapMarkerAlt

	loaderForSpinner: boolean = false
	readMore: boolean = false

	roles = roles

	imageBaseUrl: string = environment.assets_base_url

	today = Date.now()
	registrationClosed = new Date(this.event?.registrationClosesOn as any)

	emitOnDelete() {
		this.onDelete.emit(this.index as number)
	}

	toggleReadMore() {
		this.readMore = !this.readMore
	}

	emitOnParticipate() {
		this.onParticipate.emit(this.index as number)
	}
}
