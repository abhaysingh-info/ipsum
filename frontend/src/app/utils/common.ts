import {
	faBoxOpen,
	faBroom,
	faBuildingShield,
	faCouch,
	faDoorOpen,
	faEye,
	faFan,
	faFireExtinguisher,
	faGopuram,
	faGraduationCap,
	faMaskVentilator,
	faPersonDigging,
	faPlugCircleCheck,
	faRestroom,
	faShower,
	faTent,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { IStringKey } from '@shared/interfaces'
import { IRoles } from '@shared/interfaces/user'
import { Subscription } from 'rxjs'

// Subscription

export enum MaxScreenSize {
	sm = 640,
	md = 768,
	lg = 1024,
	xl = 1280,
	xxl = 1536,
}

export const roles: {
	[key: string]: IRoles
} = {
	admin: 'ADMIN',
	client: 'CLIENT',
}

export class CustomSubscription {
	subscriptions: Subscription[] = []

	unsubscribeAll() {
		for (let subscription of this.subscriptions) {
			subscription.unsubscribe()
		}
	}
}
