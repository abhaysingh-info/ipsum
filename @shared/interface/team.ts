import { ObjectId } from 'mongoose'
import { IUserExtention } from './user'

export interface Team {
	_id: ObjectId | string
	teamID: string
	teamName: string
	leader: IUserExtention
	teamMembers: IUserExtention[]
	isLocked: boolean
}
