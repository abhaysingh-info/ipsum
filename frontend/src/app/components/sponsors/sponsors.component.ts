import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { sponsors } from 'src/app/utils/text.config'

@Component({
	selector: 'app-sponsors',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './sponsors.component.html',
	styleUrls: ['./sponsors.component.scss'],
})
export class SponsorsComponent {
	sponsors = sponsors
}
