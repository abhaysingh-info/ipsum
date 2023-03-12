import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { links } from 'src/app/utils/text.config'


@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	links = links
}
