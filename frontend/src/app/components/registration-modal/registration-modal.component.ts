import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { eventRegistrationLinks } from 'src/app/utils/text.config'

@Component({
	selector: 'app-registration-modal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './registration-modal.component.html',
	styleUrls: ['./registration-modal.component.scss'],
})
export class RegistrationModalComponent {
	eventRegistrationLinks = eventRegistrationLinks
}
