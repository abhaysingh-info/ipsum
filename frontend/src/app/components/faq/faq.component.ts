import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { faq } from 'src/app/utils/text.config'

@Component({
	selector: 'app-faq',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './faq.component.html',
	styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
	faqs = faq
}
