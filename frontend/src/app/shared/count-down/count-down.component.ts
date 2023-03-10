import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-count-down',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './count-down.component.html',
	styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnInit, OnDestroy {
	@Input() countDownTill: Date = new Date()

	days: number = 0
	hours: number = 0
	minutes: number = 0
	seconds: number = 0

	interval: any

	ngOnInit(): void {
		this.interval = setInterval(() => {
			this.countDown()
		}, 1000)
	}

	countDown(): void {
		const now = new Date()
		const difference = this.countDownTill.getTime() - now.getTime()
		if (difference > 0) {
			this.days = Math.floor(difference / (1000 * 60 * 60 * 24))
			this.hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
			this.minutes = Math.floor((difference / 1000 / 60) % 60)
			this.seconds = Math.floor((difference / 1000) % 60)
		}
	}

	ngOnDestroy(): void {
		clearInterval(this.interval)
	}
}
