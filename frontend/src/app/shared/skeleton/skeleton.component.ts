import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

type skeleton_type =
	| 'text-line'
	| 'description'
	| 'image'
	| 'stats'
	| 'short-title'
	| 'single-line'

@Component({
	selector: 'app-skeleton',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './skeleton.component.html',
	styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
	@Input() type: skeleton_type = 'text-line'
}
