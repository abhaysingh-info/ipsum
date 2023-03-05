import { FormControl, FormGroup, Validators } from '@angular/forms'
import { oneOfFromArray } from '../validators'

export const getUserForm = () =>
	new FormGroup({
		email: new FormControl(null),
		phone: new FormControl(null),
		payment_made: new FormControl(null),
		payment_status: new FormControl(null, [
			oneOfFromArray(['pending', 'verified', 'rejected']),
		]),
	})

