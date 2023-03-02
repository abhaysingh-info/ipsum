import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { ToastComponent } from './components/toast/toast.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		NavbarComponent,
		HttpClientModule,
		ToastComponent,
		FontAwesomeModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
