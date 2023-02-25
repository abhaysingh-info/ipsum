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
import { redirectAfterLoginUnAuth, redirectLinks } from '../utils/Links'

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private userService: UserService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!this.userService.getIsLoggedIn()) {
			return this.router.createUrlTree([redirectAfterLoginUnAuth])
		}
		const user = this.userService.getUser()

		if (user.isBlocked) {
			return this.router.createUrlTree([redirectLinks.isBlocked])
		}
		if (user.suspended) {
			return this.router.createUrlTree([redirectLinks.isSuspended])
		}

		return true
	}
}
