import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Iphoto, IPhotoSizeUrls } from '@shared/interfaces/property'

@Component({
	selector: 'app-picture',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './picture.component.html',
	styleUrls: ['./picture.component.scss'],
})
export class PictureComponent {
	@Input() images: Iphoto[] = []
	@Input() defaultImage: IPhotoSizeUrls = {
		sm: '',
		md: '',
		lg: '',
		xl: '',
		xxl: '',
	}
}
