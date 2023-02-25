export function matchRegx(valueToMatch: string, regxr: RegExp): boolean {
	const output = valueToMatch.match(regxr)
	return output ? output[0].length === output.input?.length : false
}

export const regx = {
	name: '[A-z 0-9]*',
	email: `[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,}`,
	phoneNumberWithCode: `^(\\+\\d{1,3}\\s?)?1?\\-?\\.?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$`,
	phoneNumber: `\\(?\\d{1,6}\\)?[\\s.-]?\\d{1,6}[\\s.-]?\\d{1,6}$`,
	sha512: `\\b([a-fA-F0-9]{128})\\b`,
	sha256: `([a-f0-9]{64})`,
	number: `[0-9]*`,
	countryCode: `(\\+?( |-|\\.)?\\d{1,3})`,
}
