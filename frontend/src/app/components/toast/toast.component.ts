import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToastService } from 'src/app/services/toast.service'
import { IToastStyle } from '@shared/interfaces/common'
import { CustomSubscription } from 'src/app/utils/common'

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
})
export class ToastComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	toasts: IToastStyle[] = []

	constructor(private toastService: ToastService) {
		super()
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.toastService.toast.subscribe({
				next: (value) => {
					this.toasts = value
				},
			}),
		)
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
