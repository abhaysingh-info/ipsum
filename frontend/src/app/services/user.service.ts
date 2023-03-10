import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { ICreateUser, ILoginUser, IVerifyUser } from '@shared/interfaces/user'
import { BehaviorSubject, Observable } from 'rxjs'
import { defaultHttpPostHeader, getQueryString } from './helper'
import { IGetUsersQuery } from '@shared/interfaces/query'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private url: string = `${environment.serverUrl}/user`

	private userBehaviour: BehaviorSubject<Partial<IVerifyUser>> =
		new BehaviorSubject<Partial<IVerifyUser>>({})
	user: Observable<Partial<IVerifyUser>> = this.userBehaviour.asObservable()

	private isLoggedInBehaviour: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') === 'true')
	isLoggedIn = this.isLoggedInBehaviour.asObservable()

	constructor(private http: HttpClient) {}

	getIsLoggedIn() {
		const value = localStorage.getItem('isLoggedIn') === 'true'
		if (value !== this.isLoggedInBehaviour.value) {
			this.setIsLoggedIn(value)
		}
		return value
	}
	setIsLoggedIn(loggin: boolean) {
		localStorage.setItem('isLoggedIn', `${loggin}`)
		this.isLoggedInBehaviour.next(loggin)
	}

	setVisitedUrl(url: string) {
		localStorage.setItem('lastVisitedUrl', url)
	}
	getVisitedUrl() {
		return localStorage.getItem('lastVisitedUrl')
	}

	getUser(): IVerifyUser {
		return this.userBehaviour.value as IVerifyUser
	}
	setUser(user: Partial<IVerifyUser>) {
		this.userBehaviour.next(user)
	}

	create(userDetails: ICreateUser) {
		return this.http.post(`${this.url}/`, userDetails)
	}

	login(userDetails: ILoginUser) {
		return this.http.post(
			`${this.url}/login`,
			userDetails,
			defaultHttpPostHeader,
		)
	}

	logout() {
		return this.http.get(`${this.url}/logout`, {
			withCredentials: true,
		})
	}

	// login token is being auto-sent with help of cookies
	verifyLogin() {
		return this.http.post<any>(
			`${this.url}/login/verify`,
			{},
			defaultHttpPostHeader,
		)
	}

	capturePayment(transaction_id: string, file: File) {
		const formData = new FormData()
		formData.append('transaction_image', file, file.name)

		return this.http.post(`${this.url}/payment/${transaction_id}`, formData, {
			withCredentials: true,
		})
	}

	getAllUsers(filter: IGetUsersQuery, startFrom: number) {
		const query = getQueryString({
			startFrom: startFrom,
		})
		return this.http.post(
			`${this.url}/get?${query}`,
			filter,
			defaultHttpPostHeader,
		)
	}

	updatePaymetnStatus(userId: string, payment_status: string) {
		return this.http.put(
			`${this.url}/payment/update-status`,
			{
				userId,
				payment_status,
			},
			defaultHttpPostHeader,
		)
	}
}
