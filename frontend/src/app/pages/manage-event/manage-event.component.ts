import { Component } from '@angular/core'

@Component({
	selector: 'app-manage-event',
	templateUrl: './manage-event.component.html',
	styleUrls: ['./manage-event.component.scss'],
})
export class ManageEventComponent {
	refresher: number[] = [0]
	constructor() {}

	showCreateEventModal: boolean = false

	toggleShowCreateEventModal() {
		this.showCreateEventModal = !this.showCreateEventModal
	}

	createEventModalEmitHandler(value: boolean) {
		if (value === true) {
			this.refreshEvents()
		}
		this.showCreateEventModal = value
	}

	refreshEvents() {
		this.refresher[0]++
	}
}
