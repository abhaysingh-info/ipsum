import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SignupRoutingModule } from './signup-routing.module'
import { SignupPageComponent } from './signup.component'
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component'

@NgModule({
	declarations: [SignupPageComponent],
	imports: [CommonModule, SignupRoutingModule, SignUpComponent],
})
export class SignupModule {}
