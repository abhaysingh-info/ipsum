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
import {
	faBell,
	faCheck,
	faLock,
	faSpinner,
	faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AskConfirmationComponent } from 'src/app/shared/ask-confirmation/ask-confirmation.component'
import { IVerifyUser } from '@shared/interfaces/user'

@Component({
	selector: 'app-team-join-or-create',
	standalone: true,
	imports: [
		CommonModule,
		CreateTeamComponent,
		ReactiveFormsModule,
		SpinnerComponent,
		FontAwesomeModule,
		AskConfirmationComponent,
	],
	templateUrl: './team-join-or-create.component.html',
	styleUrls: ['./team-join-or-create.component.scss'],
})
export class TeamJoinOrCreateComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	faSpinner = faSpinner
	faLock = faLock
	faBell = faBell
	faCheck = faCheck
	faXmark = faXmark

	joinTeamForm = joinTeamForm()

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

	user = this.userService.getUser()

	setCreateTeamModel(value: boolean) {
		if (value) {
			this.getTeam()
			this.joinTeamForm.reset()
		}
		this.showCreateTeamModel = value
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.userService.user.subscribe((user) => {
				this.user = user as any
				if (user._id) {
					this.getTeamJoinRequest()
					this.refreshGetAllTeamJoinRequests()
				}
			}) as any,
			this.teamService.team.subscribe((team) => {
				this.team = team || {}
			}) as any,
		)
	}

	getTeamJoinRequest() {
		this.requestInProgress = true
		this.subscriptions.push(
			this.teamService.getTeamJoinRequest().subscribe({
				next: (teamJoinRequest: any) => {
					this.teamJoinRequest = teamJoinRequest
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
					this.teamService.setTeam(team)
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
	resetAndGetTeam() {
		this.requestInProgress = false
		this.resetMessages()
		this.getTeam()
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
		this.resetMessages()
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

	deleteTeam() {
		if (this.user._id !== this.team.leader._id) return
		if (this.requestInProgress) return
		this.resetMessages()
		this.requestInProgress = true
		this.teamService.deleteTeam().subscribe({
			next: (response) => {
				this.requestInProgress = false
				this.resetMessages()
				this.getTeam()
			},
			error: (error) => {
				this.setMessages('general', error.error.message || error.message)
				this.requestInProgress = false
			},
		})
	}

	resetMessages() {
		Object.keys(this.messages).forEach((key) => {
			this.messages[key] = ''
		})
	}

	withdrawTeamJoinRequest() {
		if (this.requestInProgress) return
		this.resetMessages()
		this.requestInProgress = true
		this.teamService.withdrawTeamJoinRequest().subscribe({
			next: (response) => {
				this.requestInProgress = false
				this.resetMessages()
				this.getTeamJoinRequest()
			},
			error: (error) => {
				this.setMessages('general', error.error.message || error.message)
				this.requestInProgress = false
			},
		})
	}

	acceptTeamJoinRequest(request_id: string, accept: boolean) {
		if (this.user._id === this.team.leader._id) {
			if (this.requestInProgress) return
			this.resetMessages()
			this.requestInProgress = true
			this.teamService.acceptTeamJoinRequest(request_id, accept).subscribe({
				next: (response) => {
					this.requestInProgress = false
					this.resetMessages()
					this.getTeamJoinRequest()
				},
				error: (error) => {
					this.setMessages('general', error.error.message || error.message)
					this.requestInProgress = false
				},
			})
		}
	}

	allTeamJoinRequests: any[] = []
	allTeamJoinRequestsStartFrom: number = 0
	allTeamJoinRequestsInProgress: boolean = false
	loadedAllTeamJoinRequests: boolean = false
	getAllTeamJoinRequests() {
		if (this.allTeamJoinRequestsInProgress) return
		this.allTeamJoinRequestsInProgress = true
		this.subscriptions.push(
			this.teamService
				.getAllTeamJoinRequests(this.allTeamJoinRequestsStartFrom)
				.subscribe({
					next: (response: any) => {
						this.allTeamJoinRequests.push(...response.data)
						this.allTeamJoinRequestsStartFrom +=
							response.startFrom + response.limit
						this.allTeamJoinRequestsInProgress = false
						if (response.data.length < response.limit) {
							this.loadedAllTeamJoinRequests = true
						}
					},
					error: (error) => {
						this.setMessages('general', error.error.message || error.message)
						this.allTeamJoinRequestsInProgress = false
					},
				}) as any,
		)
	}
	refreshGetAllTeamJoinRequests() {
		this.allTeamJoinRequests = []
		this.allTeamJoinRequestsStartFrom = 0
		this.allTeamJoinRequestsInProgress = false
		this.loadedAllTeamJoinRequests = false
		this.getAllTeamJoinRequests()
	}

	removeMember(member_id: string) {
		if (this.user._id === this.team.leader._id) {
			if (this.requestInProgress) return
			this.resetMessages()
			this.requestInProgress = true
			this.teamService.removeMemberFromTeam(member_id).subscribe({
				next: (response) => {
					this.requestInProgress = false
					this.resetMessages()
					this.resetAndGetTeam()
				},
				error: (error) => {
					this.setMessages('general', error.error.message || error.message)
					this.requestInProgress = false
				},
			})
		}
	}

	showLockTeamConfirmation: boolean = false

	showLockTeamConfirmationDialog() {
		this.showLockTeamConfirmation = true
	}

	hasUnAcceptedOrRejectedRequest() {
		return this.allTeamJoinRequests.filter((request) => {
			return request.accepted === null
		})?.length
	}

	lockTeam($event: boolean) {
		if ($event) {
			if (this.user._id === this.team.leader._id) {
				if (this.requestInProgress) return
				this.resetMessages()
				this.requestInProgress = true
				this.teamService.lockTeam().subscribe({
					next: (response) => {
						this.requestInProgress = false
						this.resetMessages()
						this.resetAndGetTeam()
					},
					error: (error) => {
						this.setMessages('general', error.error.message || error.message)
						this.requestInProgress = false
					},
				})
			}
		}
		this.showLockTeamConfirmation = false
	}
}
