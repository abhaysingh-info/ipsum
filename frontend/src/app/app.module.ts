import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ToastComponent } from './components/toast/toast.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component'
import { NavbarComponent } from './layout/navbar/navbar.component'
import { FooterComponent } from './layout/footer/footer.component'

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		NavbarComponent,
		FooterComponent,
		HttpClientModule,
		ToastComponent,
		FontAwesomeModule,
		AlertDialogComponent,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
