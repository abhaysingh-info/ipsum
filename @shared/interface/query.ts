import { payment_status } from './user'

export interface IGetUsersQuery {
	email?: string
	phone?: string
	payment_made?: boolean
	payment_status?: payment_status
}
