import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LoginRoutingModule } from './login-routing.module'
import { LoginComponent } from './login.component'
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component'

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, LoginRoutingModule, SignInComponent],
})
export class LoginModule {}
