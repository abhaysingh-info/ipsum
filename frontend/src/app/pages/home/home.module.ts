import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { HeroComponent } from 'src/app/components/hero/hero.component'
import { AboutSeminarSectionComponent } from 'src/app/components/about-seminar-section/about-seminar-section.component'
import { EventsCarouselComponent } from 'src/app/components/events-carousel/events-carousel.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		HeroComponent,
		FontAwesomeModule,
		AboutSeminarSectionComponent,
		EventsCarouselComponent,
	],
})
export class HomeModule {}
