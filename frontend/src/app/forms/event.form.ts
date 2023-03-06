import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { eventType } from '../utils/event'
import { oneOfFromArray } from '../validators'

export const EventRegistrationRequirementFieldForm = (question: string) =>
	new FormGroup({
		question: new FormControl(
			question,
			Validators.compose([Validators.required]),
		),
		answer: new FormControl(
			'',
			Validators.compose([Validators.required, Validators.maxLength(512)]),
		),
	})

export const EventRegistrationRequirementsForm = () =>
	new FormGroup({
		eventId: new FormControl('', Validators.compose([Validators.required, ,])),
		eventRequirementField: new FormArray(
			[],
			Validators.compose([Validators.maxLength(5)]),
		),
	})

export const EventRequirementFieldForm = () =>
	new FormGroup({
		question: new FormControl(
			'',
			Validators.compose([Validators.required, Validators.maxLength(512)]),
		),
		requirementFieldType: new FormControl(
			'text',
			Validators.compose([
				Validators.required,
				oneOfFromArray(['text', 'file']),
			]),
		),
	})

export const CreateEvent = () =>
	new FormGroup({
		eventId: new FormControl(
			'',
			Validators.compose([
				Validators.required,
				Validators.pattern('[A-z0-9_]*'),
			]),
		), // done
		eventType: new FormControl(
			'',
			Validators.compose([Validators.required, oneOfFromArray(eventType)]),
		), // done
		name: new FormControl(
			'',
			Validators.compose([
				Validators.required,
				Validators.pattern('[A-z 0-9_]*'),
			]),
		), // done
		commencementDate: new FormControl(
			'',
			Validators.compose([Validators.required]),
		), // done
		venue: new FormControl(
			'',
			Validators.compose([Validators.required, Validators.maxLength(256)]),
		), // done
		registrationClosesOn: new FormControl(
			'',
			Validators.compose([Validators.required]),
		), // done
		description: new FormControl(
			'',
			Validators.compose([Validators.required, Validators.maxLength(2500)]),
		), // done
		eventBatch: new FormControl(
			null,
			Validators.compose([Validators.required, Validators.min(0)]),
		), // done
		moreInformationPdf: new FormControl(
			'',
			Validators.compose([Validators.required]),
		), // done
		eventRequirementField: new FormArray(
			[],
			Validators.compose([Validators.maxLength(5)]),
		),
	})
