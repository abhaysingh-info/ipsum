import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { ICreateUser, ILoginUser, IVerifyUser } from '@shared/interfaces/user'
import { BehaviorSubject, Observable, Subscribable } from 'rxjs'
import { defaultHttpPostHeader } from './helper'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private url: string = environment.serverUrl

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
		return this.http.post(`${this.url}/user/`, userDetails)
	}

	login(userDetails: ILoginUser) {
		return this.http.post(
			`${this.url}/user/login`,
			userDetails,
			defaultHttpPostHeader,
		)
	}

	logout() {
		return this.http.get(`${this.url}/user/logout`, {
			withCredentials: true,
		})
	}

	// login token is being auto-sent with help of cookies
	verifyLogin() {
		return this.http.post<any>(
			`${this.url}/user/login/verify`,
			{},
			defaultHttpPostHeader,
		)
	}
}
