import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IVerifyUser } from '@shared/interfaces/user'
import { UserService } from './services/user.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'frontend'
	constructor(private userService: UserService, private router: Router) {}

	ngOnInit() {
		this.userService.verifyLogin().subscribe({
			next: (resp) => {
				if (!resp.success) {
					this.userService.setIsLoggedIn(false)
					this.userService.setUser({})
				} else {
					this.userService.setIsLoggedIn(resp.success ? true : false)
					this.userService.setUser(resp.user as IVerifyUser)
				}
			},
			error: () => {
				this.userService.setIsLoggedIn(false)
			},
		})
	}
}
