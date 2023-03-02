import { FormControl, FormGroup, Validators } from '@angular/forms'

export const teamForm = () =>
	new FormGroup({
		teamID: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			Validators.pattern(/^[a-zA-Z0-9]+$/),
			Validators.maxLength(10),
		]),
		teamName: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(50),
			Validators.pattern(/^[a-zA-Z0-9 ]+$/),
		]),
	})
