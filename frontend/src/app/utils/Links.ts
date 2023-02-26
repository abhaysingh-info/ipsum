import {
	faCalendarDays,
	faHouseChimney,
	faRightToBracket,
	faUser,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { ILink } from '@shared/interfaces/frontend'
import { roles } from './common'

export const redirectAfterLoginAuth = '/manage-event'
export const redirectAfterLoginUnAuth = '/'

export const redirectLinks = {
	isBlocked: '/unauthorized/blocked',
	isSuspended: '/unauthorized/suspended',
	notAdmin: '/home',
}

const links: ILink[] = [
	{
		forLoggedIn: 'both',
		link: '/',
		title: 'Home',
		icon: faHouseChimney,
		forRoles: [],
	},
	{
		forLoggedIn: true,
		link: '/dashboard',
		title: 'Dashboard',
		icon: faUser,
		forRoles: [roles['admin'], roles['client']],
	},
	{
		forLoggedIn: true,
		link: '/manage-user',
		title: 'Manage Users',
		icon: faUser,
		forRoles: ['ADMIN'],
	},
	{
		forLoggedIn: true,
		link: '/manage-event',
		title: 'Manage Events',
		icon: faCalendarDays,
		forRoles: ['ADMIN'],
	},

	{
		forLoggedIn: false,
		link: '/log-in',
		title: 'Log-in',
		icon: faRightToBracket,
		isBtn: true,
		forRoles: [],
	},
	{
		forLoggedIn: false,
		link: '/sign-up',
		title: 'Sign-up',
		icon: faUserPlus,
		isBtn: true,
		isBtnHighlight: true,
		forRoles: [],
		// hidden: true,
	},
]

export default links
