import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import country_code_with_flag from 'src/app/utils/country_code_with_flag'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { UserService } from 'src/app/services/user.service'
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms'
import { regx } from 'src/app/utils/regx'
import { SpinnerComponent } from '../spinner/spinner.component'
import { Router, RouterModule } from '@angular/router'

@Component({
	selector: 'app-sign-up',
	standalone: true,
	imports: [
		CommonModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		SpinnerComponent,
		RouterModule,
	],
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
	loading: boolean = false

	error = {
		general: '',
		email: '',
		phoneNumber: '',
		name: '',
	}

	regx = regx

	faEye = faEye
	faEyeSlash = faEyeSlash
	passwordFieldType: 'password' | 'text' = 'password'

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private router: Router,
	) {}

	setErrorMessage(
		key: 'general' | 'email' | 'phoneNumber' | 'name',
		message: string,
	) {
		this.error[key] = message

		setTimeout(() => {
			this.error[key] = ''
		}, 6000)
	}

	setLoading(value: boolean) {
		this.loading = value
	}

	createUser: FormGroup = this.formBuilder.group({
		name: [
			'Om Namaha',
			[
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(64),
				Validators.pattern(regx.name),
			],
		],
		email: ['om@om.om', [Validators.required, Validators.email]],
		countryCode: ['+91', [Validators.required, Validators.minLength(2)]],
		phoneNumber: [
			'1234567898',
			[
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(18),
				Validators.pattern(regx.phoneNumber),
			],
		],
		password: [
			'om@om.om',
			[Validators.required, Validators.minLength(6), Validators.maxLength(156)],
		],
	})

	countryCodeWithFlag = country_code_with_flag

	ngOnInit(): void {}

	togglePasswordType() {
		this.passwordFieldType =
			this.passwordFieldType === 'password' ? 'text' : 'password'
	}

	onSubmit() {
		if (this.loading) return
		if (this.createUser.invalid) return
		this.setLoading(true)
		this.error = {
			general: '',
			email: '',
			name: '',
			phoneNumber: '',
		}
		this.userService.create(this.createUser.value).subscribe({
			next: (response: any) => {
				if (response.success) {
					this.router.navigateByUrl('/log-in')
				}
			},
			error: (error: any) => {
				if (error.error.statusCode === 409) {
					if (`${error.error.message}`.toLowerCase().includes('email')) {
						this.setErrorMessage('email', 'Email alreay exists!')
					}
					if (`${error.error.message}`.toLowerCase().includes('phone number')) {
						this.setErrorMessage('phoneNumber', 'Phone Number alreay exists!')
					}
				}
				if (error.error.statusCode === 400) {
					if (`${error.error.message}`.toLowerCase().includes('email')) {
						this.setErrorMessage('email', 'Please enter valid email!')
					}
					if (`${error.error.message}`.toLowerCase().includes('name')) {
						this.setErrorMessage('name', 'Please enter valid Name!')
					}
					if (`${error.error.message}`.toLowerCase().includes('phone number')) {
						this.setErrorMessage(
							'phoneNumber',
							'Please enter valid Phone Number!',
						)
					}
				}
				this.setErrorMessage(
					'general',
					error?.message ||
						'Failed to create account Please try again in sometime, if this issue persists please contact support',
				)
				this.setLoading(false)
			},
			complete: () => {
				this.setLoading(false)
			},
		})
	}
}
