import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-ask-confirmation',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ask-confirmation.component.html',
	styleUrls: ['./ask-confirmation.component.scss'],
})
export class AskConfirmationComponent {
	@Input() showConfirmation: boolean = false
	@Input() title: string = 'Have you ate my pizza?'
	@Input() btnActionType:
		| 'error'
		| 'primary'
		| 'warning'
		| 'secondary'
		| 'success' = 'primary'

	@Output() confirmationByUser: EventEmitter<boolean> =
		new EventEmitter<boolean>(false)

	emitConfirmationByUser(value: boolean) {
		this.confirmationByUser.emit(value)
	}
}
