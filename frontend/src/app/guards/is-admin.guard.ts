import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router'
import { UserService } from '../services/user.service'
import { roles } from '../utils/common'
import { redirectLinks } from '../utils/Links'

@Injectable({
	providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Promise<boolean | UrlTree> | boolean | UrlTree {
		const user = this.userService.getUser()
		if (user.roles !== roles['admin']) {
			return this.router.createUrlTree([redirectLinks.notAdmin])
		}
		return true
	}
}
