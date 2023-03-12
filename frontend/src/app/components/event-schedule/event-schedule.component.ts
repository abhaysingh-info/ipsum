import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScheduleCollapseComponent } from 'src/app/shared/schedule-collapse/schedule-collapse.component'
import { eventSchedule } from 'src/app/utils/text.config'

@Component({
	selector: 'app-event-schedule',
	standalone: true,
	imports: [CommonModule, ScheduleCollapseComponent],
	templateUrl: './event-schedule.component.html',
	styleUrls: ['./event-schedule.component.scss'],
})
export class EventScheduleComponent {
	eventSchedule = eventSchedule
}
