import { HttpHeaders } from '@angular/common/http'
import { IStringKey } from '@shared/interfaces'

export const defaultHttpPostHeaderMultipart = {
	withCredentials: true,
}

export const defaultHttpPostHeader = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
	}),
	withCredentials: true,
}

export function getQueryString(query: IStringKey<string | number | boolean>) {
	let queryString = Object.keys(query)
		.map((key: string) => {
			return query[key] ? key + '=' + query[key] : ''
		})
		.join('&')
	return queryString
}
