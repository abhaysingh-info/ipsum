import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

@Component({
	selector: 'app-spinner',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule],
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
	faSpinner = faSpinner
}
