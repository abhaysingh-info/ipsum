import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'makePlural',
	standalone: true,
})
export class MakePluralPipe implements PipeTransform {
	transform(value: string, ...args: number[]): string {
		let num = args[0]
		if (num) {
			if (num > 1) {
				value = value + 's'
			}
		}
		return value
	}
}
