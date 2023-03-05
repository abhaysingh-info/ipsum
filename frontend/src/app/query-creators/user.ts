import { FormGroup } from '@angular/forms'
import { IGetUsersQuery } from '@shared/interfaces/query'

export const generateUserGetQuery = (form: FormGroup) => {
	const formValue: IGetUsersQuery = form.value
	const query: IGetUsersQuery = {
		email: formValue.email ? formValue.email : undefined,
		phone: formValue.phone ? formValue.phone : undefined,
		payment_made: formValue.payment_made ? formValue.payment_made : undefined,
		payment_status: formValue.payment_status
			? formValue.payment_status
			: undefined,
	}
	return query
}
