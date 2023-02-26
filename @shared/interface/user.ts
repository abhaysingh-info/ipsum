// import { photo } from './common'

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
