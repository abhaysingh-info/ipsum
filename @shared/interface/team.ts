import { ObjectId } from 'mongoose'

export interface Team {
	teamID: string
	teamName: string
	leader_id: ObjectId
	teamMembersEmail: string[]
	isLocked: boolean
}
