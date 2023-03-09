import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService } from 'src/app/services/user.service'
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { SpinnerComponent } from '../spinner/spinner.component'
import { regx } from 'src/app/utils/regx'
import { IVerifyUser } from '@shared/interfaces/user'
import { redirectAfterLoginAuth } from 'src/app/utils/Links'
import { CustomSubscription } from 'src/app/utils/common'

@Component({
	selector: 'app-sign-in',
	standalone: true,
	imports: [
		CommonModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		SpinnerComponent,
		RouterModule,
	],
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	loading: boolean = false

	error = ''

	regx = regx

	faEye = faEye
	faEyeSlash = faEyeSlash
	passwordFieldType: 'password' | 'text' = 'password'

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private router: Router,
	) {
		super()
	}

	setErrorMessage(message: string) {
		this.error = message
		setTimeout(() => {
			this.error = ''
		}, 6000)
	}

	loginUser: FormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: [
			'',
			[Validators.required, Validators.minLength(6), Validators.maxLength(156)],
		],
	})

	togglePasswordType() {
		this.passwordFieldType =
			this.passwordFieldType === 'password' ? 'text' : 'password'
	}

	ngOnInit(): void {}

	onSubmit() {
		if (this.loading) return
		if (this.loginUser.invalid) return
		this.loading = true
		this.error = ''
		this.subscriptions.push(
			this.userService.login(this.loginUser.value).subscribe({
				next: (response: any) => {
					this.userService.setUser(response.user as IVerifyUser)
					this.userService.setIsLoggedIn(true)
					this.router.navigateByUrl(redirectAfterLoginAuth)
				},
				error: (error: any) => {
					console.log(error)
					if (error.error.statusCode === 401 || error.status === 401) {
						this.setErrorMessage('Email or password you entered is invalid!')
					}
					if (error.error.statusCode === 404 || error.status === 404) {
						this.setErrorMessage(
							"There's no account associated with this email!",
						)
					}
					if (error.error.statusCode === 400 || error.status === 400) {
						if (`${error.error.message}`.toLowerCase().includes('email')) {
							this.setErrorMessage('Please enter valid email!')
						}
					}
					this.setErrorMessage(
						error?.message || 'Failed to login please try again in sometime...',
					)
					this.loading = false
				},
				complete: () => {
					this.loading = false
				},
			}) as any,
		)
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
