import { AbstractControl, ValidatorFn } from '@angular/forms'
import { IStringKey } from '@shared/interfaces'

export function oneOfFromArray(word_list: any[]): ValidatorFn {
	return (control: AbstractControl) => {
		if (
			control.value !== null ||
			control.value !== undefined ||
			control.value !== 0 ||
			control.value?.length > 0
		) {
			if (!word_list?.includes(control.value)) {
				return {
					invalid_value: {
						message: `Allowed values are '${word_list?.join(', ')}' but got ' ${
							control.value
						} '`,
					},
				}
			}
		}
		return null
	}
}

export function oneOfFromArrayIf({
	compareFrom,
	compareWith,
	compareFromValueArray,
}: {
	compareFrom: string
	compareWith: string
	compareFromValueArray: IStringKey<any[]>
}): ValidatorFn {
	return (control: AbstractControl) => {
		if (
			control.value[compareWith] !== null ||
			control.value[compareWith] !== undefined ||
			control.value[compareWith] !== 0 ||
			control.value[compareWith]?.length > 0
		) {
			const compareFromValue = control.value[compareFrom]
			const compareWithValue = control.value[compareWith]
			if (
				!compareFromValueArray[compareFromValue]?.includes(compareWithValue)
			) {
				const output: IStringKey<any> = {}
				output[compareWith] = {
					message: `Allowed values are '${compareFromValueArray[
						compareFromValue
					]?.join(', ')}' but got ' ${compareWithValue} '`,
				}
				return output
			}
		}
		return null
	}
}

export function requiredIf({
	compareFrom,
	expectedCompareFromValue,
	requiredField,
	compareFromIsDefined,
}: {
	compareFrom: string
	expectedCompareFromValue: any
	requiredField: string[]
	compareFromIsDefined?: boolean
}): ValidatorFn {
	return (control: AbstractControl) => {
		const compareFromValue = control.value[compareFrom]
		if (
			compareFromValue === expectedCompareFromValue ||
			(compareFromIsDefined && compareFromValue)
		) {
			const output: IStringKey<any> = {}
			requiredField.forEach((obj) => {
				const requiredFieldValue = control.get(obj)?.value
				if (
					requiredFieldValue === null ||
					requiredFieldValue === undefined ||
					requiredFieldValue?.length === 0
				) {
					output[obj] = {
						message: `Field is required!`,
					}
				}
			})
			return output
		}
		return null
	}
}
