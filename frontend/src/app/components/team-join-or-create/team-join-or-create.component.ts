import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService } from 'src/app/services/user.service'
import { CreateTeamComponent } from '../team/create-team/create-team.component'
import { joinTeamForm } from '../../forms/team.form'
import { ReactiveFormsModule } from '@angular/forms'
import { TeamService } from '../../services/team.service'
import { Team } from '@shared/interfaces/team'
import { Observable } from 'rxjs'
import { CustomSubscription } from 'src/app/utils/common'

@Component({
	selector: 'app-team-join-or-create',
	standalone: true,
	imports: [CommonModule, CreateTeamComponent, ReactiveFormsModule],
	templateUrl: './team-join-or-create.component.html',
	styleUrls: ['./team-join-or-create.component.scss'],
})
export class TeamJoinOrCreateComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	joinTeamForm = joinTeamForm()

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
	user$ = this.userService.user

	setCreateTeamModel(value: boolean) {
		if (value) {
			this.getTeam()
			this.joinTeamForm.reset()
		}
		this.showCreateTeamModel = value
	}

	ngOnInit(): void {
		this.getTeam()
	}

	getTeam() {
		this.subscriptions.push(
			this.teamService.getTeam().subscribe((team) => {
				this.team = team || {}
				this.showCreateTeamModel = team._id ? false : this.showCreateTeamModel
			}) as any,
		)
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
