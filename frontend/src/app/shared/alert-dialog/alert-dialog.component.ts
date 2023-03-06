import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AlertDialogService } from 'src/app/services/alert-dialog.service'
import { CustomSubscription } from 'src/app/utils/common'

@Component({
	selector: 'app-alert-dialog',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './alert-dialog.component.html',
	styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent
	extends CustomSubscription
	implements OnInit, OnDestroy
{
	constructor(private alertDialogService: AlertDialogService) {
		super()
	}

	dialogData = this.alertDialogService.getDialogData()

	closeDialog() {
		this.alertDialogService.closeDialog()
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.alertDialogService.dialogData.subscribe((data) => {
				this.dialogData = data
			}) as any,
		)
	}

	ngOnDestroy(): void {
		this.unsubscribeAll()
	}
}
