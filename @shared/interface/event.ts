import { ObjectId } from 'mongoose'

export interface Event {
	image: string
	eventId: string
	eventType: 'individual' | 'team'
	name: string
	commencementDate: Date
	venue: string
	registrationClosesOn: Date
	description: string
	eventBatch: number
	moreInformationPdf: string
}

export interface IDBEvent {
	_id: ObjectId
	image: string
	eventId: string
	eventType: string
	name: string
	commencementDate: Date | string
	venue: string
	registrationClosesOn: Date | string
	description: string
	eventBatch: number
	moreInformationPdf: string
	createdAt: Date | string
	__v: number
}
