import { Component, OnDestroy, OnInit } from '@angular/core'
import { IVerifyUser } from '@shared/interfaces/user'
import { UserService } from 'src/app/services/user.service'
import { CustomSubscription } from 'src/app/utils/common'

@Component({
	selector: 'app-user-dashboard',
	templateUrl: './user-dashboard.component.html',
	styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	constructor(private userService: UserService) {
		super()
	}

	user: IVerifyUser = this.userService.getUser()

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
