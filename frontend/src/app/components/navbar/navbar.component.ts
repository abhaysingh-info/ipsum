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
		const html = document.querySelector('body')
		html?.setAttribute('data-theme', 'light')
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
