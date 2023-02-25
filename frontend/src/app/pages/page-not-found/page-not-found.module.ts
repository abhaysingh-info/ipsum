import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PageNotFoundRoutingModule } from './page-not-found-routing.module'
import { PageNotFoundComponent } from './page-not-found.component'
import { FourZeroFourComponent } from 'src/app/shared/http/four-zero-four/four-zero-four.component'

@NgModule({
	declarations: [PageNotFoundComponent],
	imports: [CommonModule, PageNotFoundRoutingModule, FourZeroFourComponent],
})
export class PageNotFoundModule {}
