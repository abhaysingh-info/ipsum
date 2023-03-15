import { ObjectId } from 'mongoose'

export type eventType = 'individual' | 'team' | 'both'

export type IrequirementFieldType = 'text' | 'file'

export interface Event {
	image: string
	eventId: string
	eventType: eventType
	name: string
	commencementDate: Date
	venue: string
	registrationClosesOn: Date
	description: string
	eventBatch: number
	moreInformationPdf: string
	eventRequirementField: {
		question: string
		fieldType: string
	}[]
}

export interface IDBEvent {
	_id: ObjectId
	image: string
	eventId: string
	eventType: eventType
	name: string
	commencementDate: Date | string
	venue: string
	registrationClosesOn: Date | string
	description: string
	eventBatch: number
	moreInformationPdf: string
	createdAt: Date | string
	prizePool: number
	hasGiftPrize:boolean
	eventRequirementField: {
		question: string
		fieldType: string
	}[]
	__v: number
}
