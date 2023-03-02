import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IVerifyUser } from '@shared/interfaces/user'
import { UserService } from './services/user.service'
import { ILink } from '@shared/interfaces/frontend'
import links, { redirectAfterLoginUnAuth } from './utils/Links'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { CustomSubscription } from './utils/common'
import { ToastService } from './services/toast.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	title = 'frontend'

	faRightFromBracket = faRightFromBracket

	constructor(
		private userService: UserService,
		private router: Router,
		private toastService: ToastService,
	) {
		super()
	}

	isLoggedIn$ = this.userService.isLoggedIn
	user$ = this.userService.user

	links: ILink[] = links

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
				this.userService.setUser({})
			},
		})

		window.addEventListener('scroll', this.navbarStyle)
	}

	navbarStyle() {
		const navbars = document.querySelectorAll('header')
		navbars.forEach((navbar) => {
			if (window.scrollY > 0) {
				navbar.classList.add('bg-base-100', 'fixed', 'border-gray-500')
			} else {
				navbar.classList.remove('bg-base-100', 'fixed', 'border-gray-500')
			}
		})
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

	ngOnDestroy() {
		this.unsubscribeAll()
	}
}
