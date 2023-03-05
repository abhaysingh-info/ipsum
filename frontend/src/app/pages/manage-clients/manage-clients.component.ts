import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service'

@Component({
	selector: 'app-manage-clients',
	templateUrl: './manage-clients.component.html',
	styleUrls: ['./manage-clients.component.scss'],
})
export class ManageClientsComponent implements OnInit {
	constructor(private userService: UserService) {}

	ngOnInit(): void {
		// this.userService.getIsLoggedIn()
	}
}
