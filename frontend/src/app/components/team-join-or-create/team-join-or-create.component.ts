import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService } from 'src/app/services/user.service'

@Component({
	selector: 'app-team-join-or-create',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './team-join-or-create.component.html',
	styleUrls: ['./team-join-or-create.component.scss'],
})
export class TeamJoinOrCreateComponent {
	constructor(private userService: UserService) {}

	user$ = this.userService.user
}
