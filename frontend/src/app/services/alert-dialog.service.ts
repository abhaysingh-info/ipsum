import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface AlertDialog {
	title: string
	message: string
	cancelText: string
	dialogType: 'success' | 'error' | 'warning' | 'info'
	show: boolean
}

@Injectable({
	providedIn: 'root',
})
export class AlertDialogService {
	private dialogDataBehaviour: BehaviorSubject<AlertDialog> =
		new BehaviorSubject<AlertDialog>({
			title: '',
			message: '',
			cancelText: '',
			dialogType: 'success',
			show: false,
		})
	dialogData = this.dialogDataBehaviour.asObservable()

	constructor() {}

	closeDialog() {
		this.dialogDataBehaviour.next({
			title: '',
			message: '',
			cancelText: '',
			dialogType: 'success',
			show: false,
		})
	}

	showDialog(
		title: string,
		message: string,
		cancelText: string,
		dialogType: 'success' | 'error' | 'warning' | 'info',
	) {
		this.dialogDataBehaviour.next({
			title,
			message,
			cancelText,
			dialogType,
			show: true,
		})
	}

	getDialogData() {
		return this.dialogDataBehaviour.value
	}
}
