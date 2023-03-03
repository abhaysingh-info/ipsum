import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService } from 'src/app/services/user.service'
import { CreateTeamComponent } from '../team/create-team/create-team.component'
import { joinTeamForm } from '../../forms/team.form'
import { ReactiveFormsModule } from '@angular/forms'
import { TeamService } from '../../services/team.service'
import { Team } from '@shared/interfaces/team'
import { CustomSubscription } from 'src/app/utils/common'
import { IStringKey } from '@shared/interfaces'
import { SpinnerComponent } from '../spinner/spinner.component'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@Component({
	selector: 'app-team-join-or-create',
	standalone: true,
	imports: [
		CommonModule,
		CreateTeamComponent,
		ReactiveFormsModule,
		SpinnerComponent,
		FontAwesomeModule,
	],
	templateUrl: './team-join-or-create.component.html',
	styleUrls: ['./team-join-or-create.component.scss'],
})
export class TeamJoinOrCreateComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	joinTeamForm = joinTeamForm()

	faLock = faLock

	requestInProgress: boolean = false

	messages: IStringKey<string | null> = {
		success: null,
		general: null,
		eventID: null,
	}

	constructor(
		private userService: UserService,
		private teamService: TeamService,
	) {
		super()
	}

	showCreateTeamModel = false

	team: Team = {
		_id: '',
		teamID: '',
		teamName: '',
		leader: {
			_id: '',
			name: '',
			email: '',
			countryCode: '',
			phoneNumber: '',
		},
		teamMembers: [],
		isLocked: false,
	}

	teamJoinRequest: any | null = null

	user$ = this.userService.user

	setCreateTeamModel(value: boolean) {
		if (value) {
			this.getTeam()
			this.joinTeamForm.reset()
		}
		this.showCreateTeamModel = value
	}

	ngOnInit(): void {
		this.getTeamJoinRequest()
	}

	getTeamJoinRequest() {
		this.requestInProgress = true
		this.subscriptions.push(
			this.teamService.getTeamJoinRequest().subscribe({
				next: (teamJoinRequest: any) => {
					this.teamJoinRequest = teamJoinRequest
					console.log(teamJoinRequest)
					this.joinTeamForm.reset()
					if (!teamJoinRequest?._id) {
						this.getTeam()
					}
					this.requestInProgress = false
				},
				error: () => {
					this.requestInProgress = false
				},
			}) as any,
		)
	}

	getTeam() {
		this.requestInProgress = true
		this.subscriptions.push(
			this.teamService.getTeam().subscribe({
				next: (team) => {
					this.team = team || {}
					this.showCreateTeamModel = team?._id
						? false
						: this.showCreateTeamModel
					this.requestInProgress = false
				},
				error: () => {
					this.requestInProgress = false
				},
			}) as any,
		)
	}

	setMessages(key: string, message: string) {
		this.messages[key] = message
	}

	onSubmit() {
		if (this.requestInProgress) return
		if (this.joinTeamForm.invalid) {
			this.joinTeamForm.markAllAsTouched()
			return
		}
		this.requestInProgress = true
		this.teamService
			.sendTeamJoinRequest(this.joinTeamForm.value.teamID!)
			.subscribe({
				next: (response) => {
					this.requestInProgress = false
					this.joinTeamForm.reset()
					this.setMessages('success', 'Request sent!')
					this.getTeamJoinRequest()
				},
				error: (error) => {
					if (error.error.statusCode === 400) {
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
				},
			})
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
