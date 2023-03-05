import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service'
import { getUserForm, updatePaymentStatusForm } from 'src/app/forms/user.form'
import { IGeneralUser } from '@shared/interfaces/user'
import {
	faCheckCircle,
	faExclamationCircle,
	faSpinner,
	faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons'
import { environment } from 'src/environments/environment'
import { FormGroup } from '@angular/forms'
import { IGetUsersQuery } from '@shared/interfaces/query'

@Component({
	selector: 'app-manage-clients',
	templateUrl: './manage-clients.component.html',
	styleUrls: ['./manage-clients.component.scss'],
})
export class ManageClientsComponent implements OnInit {
	assetBaseUrl: string = environment.assets_base_url

	updateUserForm: FormGroup = updatePaymentStatusForm()
	filterForm = getUserForm()

	// modal view values
	showPreviewImageModal: boolean = false
	showUpdateUserDetailModal: boolean = false
	showFilterModal: boolean = false

	selectedUser: Partial<IGeneralUser> = {}
	previewImageUrl: string = ''

	constructor(private userService: UserService) {}

	faCheckCircle = faCheckCircle
	faXmarkCircle = faXmarkCircle
	faSpinner = faSpinner
	faExclamationCircle = faExclamationCircle

	startFrom: number = 0
	requestInProgress: boolean = false
	requestSecondaryInProgress: boolean = false
	loadedAllUsers: boolean = false
	error: string = ''

	users: IGeneralUser[] = []

	ngOnInit(): void {
		this.getUsers()
	}

	refreshUsers() {
		this.startFrom = 0
		this.loadedAllUsers = false
		this.users = []
		this.filterForm.reset()
		this.getUsers()
	}

	getUsers() {
		if (this.requestInProgress || this.loadedAllUsers) return
		if (this.filterForm.invalid) {
			this.filterForm.markAllAsTouched()
			return
		}
		this.requestInProgress = true
		let query: IGetUsersQuery = {
			email: this.filterForm.value.email || undefined,
			phone: this.filterForm.value.phone || undefined,
			payment_made: this.filterForm.value.payment_made || undefined,
			payment_status: this.filterForm.value.payment_status || undefined,
		}

		if (!query.email?.length) {
			query.email = undefined
		}

		if (!query.phone) {
			query.phone = undefined
		} else {
			query.phone = `${query.phone}`
		}

		if (
			(query.payment_made as any) == 'null' ||
			(query.payment_made as any) == null
		) {
			query['payment_made'] = undefined
		} else {
			query['payment_made'] = (query.payment_made as any) === 'true'
		}

		if (
			(query.payment_status as any) == 'null' ||
			(query.payment_status as any) == null
		) {
			query['payment_status'] = undefined
		} else {
			query['payment_status'] = query.payment_status
		}
		this.userService.getAllUsers(query, this.startFrom).subscribe({
			next: (response: any) => {
				if (response.success) {
					this.users.push(...response.data)
					this.startFrom += response.limit
					this.loadedAllUsers = response.data.length < response.limit
					this.requestInProgress = false
				}
			},
			error: (error: any) => {
				this.error = error.error.message || error.message
				this.requestInProgress = false
			},
		})
	}

	onFilter() {
		this.error = ''
		this.loadedAllUsers = false
		this.users = []
		this.startFrom = 0
		this.getUsers()
	}

	trackById(index: number, user: IGeneralUser) {
		return user._id
	}

	setCurrentUser(index: number) {
		this.selectedUser = this.users[index]
	}

	showPreviewImage(imageUrl: string, userIndex: number) {
		this.setCurrentUser(userIndex)
		this.previewImageUrl = imageUrl
		this.showPreviewImageModal = true
	}
	hidePreviewImage() {
		this.showPreviewImageModal = false
		this.previewImageUrl = ''
		this.selectedUser = {}
	}

	updateUserError: string = ''
	updateUserSuccess: string = ''
	showUpdateUserModal(userIndex: number) {
		this.setCurrentUser(userIndex)
		this.updateUserForm.patchValue({
			userId: this.selectedUser._id,
			payment_status: this.selectedUser.payment_status,
		})
		this.showUpdateUserDetailModal = true
	}
	hideUpdateUserModal() {
		this.showUpdateUserDetailModal = false
		this.selectedUser = {}
		this.updateUserError = ''
		this.updateUserSuccess = ''
	}
	onUpdatePaymentSubmit() {
		if (this.updateUserForm.invalid) return
		if (this.requestSecondaryInProgress) return
		const { userId, payment_status } = this.updateUserForm.value
		this.requestSecondaryInProgress = true
		this.userService.updatePaymetnStatus(userId, payment_status).subscribe({
			next: (response: any) => {
				if (response.success) {
					this.updateUserSuccess = 'Updated Successfully!'
					this.refreshUsers()
				}
				this.requestSecondaryInProgress = false
			},
			error: (error: any) => {
				this.updateUserError = error.error.message || error.message
				this.requestSecondaryInProgress = false
			},
		})
	}
}
