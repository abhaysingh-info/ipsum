import { FormControl, FormGroup, Validators } from '@angular/forms'
import { oneOfFromArray } from '../validators'

export const getUserForm = () =>
	new FormGroup({
		email: new FormControl(null),
		phone: new FormControl(null),
		payment_made: new FormControl(null),
		payment_status: new FormControl(null),
	})

export const updatePaymentStatusForm = () =>
	new FormGroup({
		payment_status: new FormControl(null, [
			Validators.required,
			oneOfFromArray(['pending', 'verified', 'rejected']),
		]),
		userId: new FormControl(null, [Validators.required]),
	})
