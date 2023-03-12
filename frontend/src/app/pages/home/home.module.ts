import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { AboutSeminarSectionComponent } from 'src/app/components/about-seminar-section/about-seminar-section.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PartyHeroComponent } from 'src/app/components/party-hero/party-hero.component'
import { EventScheduleComponent } from 'src/app/components/event-schedule/event-schedule.component'
import { FaqComponent } from 'src/app/components/faq/faq.component'
import { SponsorsComponent } from 'src/app/components/sponsors/sponsors.component'
import { RegistrationModalComponent } from 'src/app/components/registration-modal/registration-modal.component'

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		FontAwesomeModule,
		AboutSeminarSectionComponent,
		PartyHeroComponent,
		EventScheduleComponent,
		FaqComponent,
		SponsorsComponent,
		RegistrationModalComponent,
	],
})
export class HomeModule {}
