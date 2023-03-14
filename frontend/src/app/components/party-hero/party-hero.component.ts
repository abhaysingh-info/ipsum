import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CountDownComponent } from 'src/app/shared/count-down/count-down.component'
import { eventRegistrationLink } from 'src/app/utils/text.config'

@Component({
	selector: 'app-party-hero',
	standalone: true,
	imports: [CommonModule, CountDownComponent],
	templateUrl: './party-hero.component.html',
	styleUrls: ['./party-hero.component.scss'],
})
export class PartyHeroComponent {
	countDownTill = new Date('2023-03-20T08:30:00')

	registrationLink = eventRegistrationLink
}
