import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ReplacePrefexPipe } from 'src/app/pipes/replace-prefex.pipe'
import { PropertySubTypes } from 'src/app/utils/property_helper_values'
import {
	faArrowLeft,
	faArrowRight,
	faCheck,
	faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { IStringKey } from '@shared/interfaces'

@Component({
	selector: 'app-generate-form-field',
	standalone: true,
	imports: [
		CommonModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		ReplacePrefexPipe,
	],
	templateUrl: './generate-form-field.component.html',
	styleUrls: ['./generate-form-field.component.scss'],
})
export class GenerateFormFieldComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {
		if (this.fieldDetail.optionalField) {
			this.setShowField(
				false ||
					this.form?.get(
						this.replacePrefixWithFormControlNameIfExists(
							this.fieldDetail.controlPath,
							this.form?.value?.property_type,
							this.form?.value?.property_sub_type,
						),
					)?.touched === true,
			)
		}
	}

	showFieldDisplayStatus?: boolean = true

	faCheck = faCheck
	faPlus = faPlus
	faArrowRight = faArrowRight
	faArrowLeft = faArrowLeft
	validators = {
		required: Validators.required,
	}

	minDate = new Date()

	setShowField(val: boolean) {
		this.showFieldDisplayStatus = val
	}

	@Input() form?: FormGroup

	@Input() fieldDetail: any
	@Input() property_profile: string[] = []

	replacePrefixWithFormControlNameIfExists(
		str: string,
		property_type: string,
		property_sub_type: string,
	) {
		if (str?.startsWith('__PREFIX__')) {
			let current_group_name = `${property_type}_${property_sub_type}`
			if (property_sub_type === PropertySubTypes.commercial_plot) {
				current_group_name = `${property_type}_plot`
			}
			if (property_sub_type === PropertySubTypes.commercial_other) {
				current_group_name = `${property_type}_other`
			}
			if (property_sub_type === PropertySubTypes.builders_floor) {
				current_group_name = `${property_type}_builders_floor`
			}
			return str.replace('__PREFIX__', current_group_name)
		}
		return str
	}

	trackByValue(index: number, item: any) {
		return `${item}_${index}`
	}

	setNumberValue(operation_type: 'add' | 'subtract') {
		const values: IStringKey<number> = {}
		const controlPath = this.replacePrefixWithFormControlNameIfExists(
			this.fieldDetail.controlPath,
			this.form?.value.property_type,
			this.form?.value.property_sub_type,
		)
		if (operation_type === 'add') {
			values[controlPath] =
				(this.form?.get(controlPath)?.value
					? this.form?.get(controlPath)?.value
					: 0) + 1
		} else {
			if (this.form?.get(controlPath)?.value > 0) {
				values[controlPath] =
					(this.form?.get(controlPath)?.value
						? this.form?.get(controlPath)?.value
						: 0) - 1
			}
		}
		this.form?.get(controlPath)?.patchValue(values[controlPath])
	}

	toggleSelectValue(
		value: any,
		fieldType: 'select' | 'select_multiple' = 'select_multiple',
	) {
		const controlPath = this.replacePrefixWithFormControlNameIfExists(
			this.fieldDetail.controlPath,
			this.form?.value.property_type,
			this.form?.value.property_sub_type,
		)
		if (fieldType === 'select_multiple') {
			let values: any = this.form?.get(controlPath)?.value || []
			const patchValue: IStringKey<any[]> = {}
			const not_values = [
				'unavailable',
				'un-available',
				'not available',
				'not-available',
				'no',
			]

			if (not_values.includes(value)) {
				values.splice(0, values.length)
				values.push(value)
			} else {
				not_values.forEach((not_value) => {
					if (values.includes(not_value)) {
						values.splice(values.indexOf(not_value), 1)
					}
				})

				if (values?.includes(value)) {
					values.splice(values.indexOf(value), 1)
				} else {
					values.push(value)
				}
			}
			patchValue[controlPath] = values
			this.form?.patchValue(patchValue)
		} else {
			this.form?.get(controlPath)?.patchValue(value)
		}
	}
}
