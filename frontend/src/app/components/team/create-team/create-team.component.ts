import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { teamForm } from 'src/app/forms/team.form'
import { ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TeamService } from 'src/app/services/team.service'
import { IStringKey } from '@shared/interfaces'

@Component({
	selector: 'app-create-team',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
	templateUrl: './create-team.component.html',
	styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent {
	constructor(private teamService: TeamService) {}

	@Input() showModel: boolean = false

	@Output() onShowModel: EventEmitter<boolean> = new EventEmitter<boolean>()

	teamForm = teamForm()
	requestInProgress = false

	messages: IStringKey<string | null> = {
		success: null,
		general: null,
		teamID: null,
		teamName: null,
	}

	setMessages(key: string, message: string) {
		this.messages[key] = message
	}

	onSubmit() {
		if (this.teamForm.invalid) {
			this.teamForm.markAllAsTouched()
			return
		}
		if (this.requestInProgress) return
		this.requestInProgress = true
		this.teamService.createTeam(this.teamForm.value).subscribe({
			next: (response) => {
				this.teamForm.reset()
				this.setMessages('success', 'Team created successfully')
				this.teamForm.disable()
				this.requestInProgress = false
				this.emitShowModel(true)
			},
			error: (error) => {
				if (error.error.statusCode) {
					if (typeof error.error.message === typeof []) {
						error.error.message.forEach((errorMessage: string) => {
							const key = errorMessage.split(' ')[0]
							this.setMessages(key, errorMessage)
						})
					} else {
						const key = error.error.message.split(' ')[0]
						this.setMessages(key, error.error.message)
					}
				}
				this.setMessages('general', error.error.message || error.message)
				this.requestInProgress = false
				console.log(error)
			},
		})
	}

	emitShowModel(value: boolean) {
		this.onShowModel.emit(value)
	}
}
