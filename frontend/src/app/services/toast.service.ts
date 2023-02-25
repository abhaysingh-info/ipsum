import { Injectable } from '@angular/core'
import { IToastStyle } from '@shared/interfaces/common'
import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private toastBehaviour: BehaviorSubject<IToastStyle[]> = new BehaviorSubject<
		IToastStyle[]
	>([])

	toast = this.toastBehaviour.asObservable()

	constructor() {}

	getToasts() {
		return this.toastBehaviour.value
	}

	addToast(toast: IToastStyle) {
		let current = this.toastBehaviour.value
		if (this.toastBehaviour.value.length > 4) {
			current.shift()
		}
		current.push(toast)
		this.toastBehaviour.next(current)
		setTimeout(() => {
			current.shift()
			this.toastBehaviour.next(current)
		}, 3000)
	}
}
