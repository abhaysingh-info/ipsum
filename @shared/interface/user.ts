// import { photo } from './common'

import { ObjectId } from 'mongoose'
import { Team } from './team'

export type ItokenTypes =
	| 'emailVerifyToken'
	| 'emailResetToken'
	| 'passwordResetToken'
	| 'token'

export type IRoles = 'NOROLE' | 'CLIENT' | 'ADMIN' | 'BROKER'

export interface IUser {
	_id: string
	name: string
	email: string
	isEmailVerified: boolean
	emailVerifyToken: string
	emailResetToken: string
	emailResetTokenExpiry: Date | null
	phoneNumber: string
	phoneOtp: string
	phoneOtpExpiry: Date | null
	isPhoneNumberVerified: boolean
	password: string
	passwordResetToken: string
	passwordResetTokenExpiry: Date | null
	passwordTries: number
	roles: string
	suspended: boolean
	isBlocked: boolean
	token: string
	tokenExpiry: Date | null
	payment_made: boolean
	payment_screenshot: string
	payment_status: payment_status
}

export interface IGeneralUser {
	_id: string
	name: string
	email: string
	isEmailVerified: boolean
	countryCode: string
	phoneNumber: string
	isPhoneNumberVerified: boolean
	roles: string
	suspended: boolean // suspended is for read-only access
	isBlocked: boolean // blocked is for no access
	payment_made: boolean
	payment_screenshot: string
	payment_transaction_id: string
	payment_status: string
}

export type payment_status = 'pending' | 'verified' | 'rejected'

export interface IVerifyUser {
	_id: string
	email: string
	isBlocked: boolean
	suspended: boolean
	isEmailVerified: boolean
	name: string
	roles: IRoles
	payment_made: boolean
	payment_screenshot: string
	payment_status: payment_status
	// team: Team
}

export interface ICreateUser {
	name: string
	email: string
	countryCode: string
	phoneNumber: string
	password: string
}
export interface ILoginUser {
	email: string
	password: string
}

export interface IUserExtention {
	_id: ObjectId | string
	name: string
	email: string
	countryCode: string
	phoneNumber: string
}
