import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService } from 'src/app/services/user.service'
import { CreateTeamComponent } from '../team/create-team/create-team.component'

@Component({
	selector: 'app-team-join-or-create',
	standalone: true,
	imports: [CommonModule, CreateTeamComponent],
	templateUrl: './team-join-or-create.component.html',
	styleUrls: ['./team-join-or-create.component.scss'],
})
export class TeamJoinOrCreateComponent {
	constructor(private userService: UserService) {}

	showCreateTeamModel = false

	user$ = this.userService.user

	setCreateTeamModel(value: boolean) {
		this.showCreateTeamModel = value
	}
}
