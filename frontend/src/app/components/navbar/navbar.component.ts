import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ILink } from '@shared/interfaces/frontend'
import links, { redirectAfterLoginUnAuth } from 'src/app/utils/Links'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Router, RouterModule } from '@angular/router'
import { UserService } from 'src/app/services/user.service'
import { IVerifyUser } from '@shared/interfaces/user'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { ToastService } from 'src/app/services/toast.service'
import { messages } from 'src/app/utils/CommonMessages'
import { CustomSubscription } from 'src/app/utils/common'

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule, RouterModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	appName: string = 'Ipsum'

	user: Partial<IVerifyUser> = {
		roles: 'NOROLE',
	}

	faRightFromBracket = faRightFromBracket

	isLoggedIn: boolean = false

	links: ILink[] = links

	constructor(
		private userService: UserService,
		private router: Router,
		private toastService: ToastService,
	) {
		super()
	}

	ngOnInit(): void {
		// const html = document.querySelector('body')
		// html?.setAttribute('data-theme', 'light')

		this.subscriptions.push(
			this.userService.isLoggedIn.subscribe({
				next: (value: boolean) => {
					this.isLoggedIn = value
					if (value) {
						this.toastService.addToast({
							message: messages.loginSuccess,
							toastFace: 'success',
						})
					} else {
						this.userService.setUser({})
						this.router.navigateByUrl('/')
					}
				},
			}),
			this.userService.user.subscribe({
				next: (value) => {
					this.user = value
				},
			}),
		)
	}

	logOut() {
		this.subscriptions.push(
			this.userService.logout().subscribe({
				next: (response) => {
					this.userService.setIsLoggedIn(false)
					this.userService.setUser({})
					this.toastService.addToast({
						toastFace: 'success',
						message: 'Logged-out successfully!',
					})
					this.router.navigateByUrl(redirectAfterLoginUnAuth)
				},
				error: (error) => {
					this.toastService.addToast({
						toastFace: 'error',
						message: 'Failed to log-out...',
					})
				},
			}) as any,
		)
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
