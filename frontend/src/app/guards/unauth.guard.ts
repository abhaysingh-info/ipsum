import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { UserService } from '../services/user.service'
import { redirectAfterLoginAuth } from '../utils/Links'

@Injectable({
	providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.userService.getIsLoggedIn()) {
			return this.router.createUrlTree([redirectAfterLoginAuth])
		}
		return true
	}
}
