import { Component, OnInit } from '@angular/core'
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
				this.userService.setUser({})
			},
		})

		window.addEventListener('scroll', this.navbarStyle)
	}

	navbarStyle() {
		const navbars = document.querySelectorAll('header')
		navbars.forEach((navbar) => {
			if (window.scrollY > 0) {
				navbar.classList.add(
					'bg-base-100',
					'fixed',
					'border-gray-500',
					// 'rounded-full',
					// 'border-2',
					// 'py-3',
					// 'px-4',
					// 'right-0',
					// 'left-0',
					// 'top-2',
					// 'max-w-[98%]',
				)
			} else {
				navbar.classList.remove(
					'bg-base-100',
					'fixed',
					'border-gray-500',
					// 'rounded-full',
					// 'border-2',
					// 'py-3',
					// 'px-4',
					// 'right-0',
					// 'left-0',
					// 'top-2',
					// 'max-w-[98%]',
				)
			}
		})
	}
}
