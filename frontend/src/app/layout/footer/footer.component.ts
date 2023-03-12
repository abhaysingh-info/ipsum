import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { links } from 'src/app/utils/text.config'
import { RouterModule } from '@angular/router'

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	links = links
}
