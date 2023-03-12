import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { EventsCarouselComponent } from 'src/app/components/event-carousel/event-carousel.component'

@Component({
	selector: 'app-schedule-collapse',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule, EventsCarouselComponent],
	templateUrl: './schedule-collapse.component.html',
	styleUrls: ['./schedule-collapse.component.scss'],
})
export class ScheduleCollapseComponent {
	@Input() events: any = {}
}
// C1j8srzlPKEaUN8T*JUX
// admin NotY0UrBusin#SS2
