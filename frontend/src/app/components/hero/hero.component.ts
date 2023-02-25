import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { UserService } from 'src/app/services/user.service'
import { IVerifyUser } from '@shared/interfaces/user'
import { CustomSubscription } from 'src/app/utils/common'

@Component({
	selector: 'app-hero',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule],
	templateUrl: './hero.component.html',
	styleUrls: ['./hero.component.scss'],
})
export class HeroComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	constructor(private userService: UserService) {
		super()
	}

	isLoggedIn: boolean = false
	user: Partial<IVerifyUser> = {}

	ipsum: string[] = ['I', 'P', 'S', 'U', 'M', ' ', '2', 'K', '2', '3']

	alphanum: string = 'abcdefghijklmnopqrstuvwxyz1234567890'
	private alphanumLength = this.alphanum.length

	changeTextMouseOverInterval: any

	ngOnInit(): void {
		this.subscriptions.push(
			this.userService.isLoggedIn.subscribe({
				next: (value: boolean) => {
					this.isLoggedIn = value
				},
			}),
			this.userService.user.subscribe({
				next: (value) => {
					this.user = value
				},
			}),
		)
	}

	startChangingLettersOfTitle() {
		this.changeTextMouseOverInterval = setInterval(() => {
			for (let index = 0; index < this.ipsum.length; index++) {
				if (this.ipsum[index] === ' ') continue
				this.ipsum[index] =
					this.alphanum[Math.floor(Math.random() * this.alphanumLength)]
			}
		}, 75)
	}

	clearChangeTextMouseOverInterval() {
		clearInterval(this.changeTextMouseOverInterval)
		this.ipsum = ['I', 'P', 'S', 'U', 'M', ' ', '2', 'K', '2', '3']
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
