import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IIconCard } from '@shared/interfaces/frontend'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@Component({
	selector: 'app-icon-card',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule],
	templateUrl: './icon-card.component.html',
	styleUrls: ['./icon-card.component.scss'],
})
export class IconCardComponent {
	@Input() data: IIconCard = {
		description: '',
		title: '',
		icon: faCheck,
	}
}
