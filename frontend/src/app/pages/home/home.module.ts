import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { AboutSeminarSectionComponent } from 'src/app/components/about-seminar-section/about-seminar-section.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PartyHeroComponent } from 'src/app/components/party-hero/party-hero.component'

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		FontAwesomeModule,
		AboutSeminarSectionComponent,
		PartyHeroComponent,
	],
})
export class HomeModule {}
