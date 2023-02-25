import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { defaultHttpPostHeader, getQueryString } from './helper'
import { Event } from '@shared/interfaces/event'

@Injectable({
	providedIn: 'root',
})
export class EventService {
	private url: string = `${environment.serverUrl}/event`

	constructor(private http: HttpClient) {}

	create(data: Event) {
		return this.http.post(`${this.url}`, data, defaultHttpPostHeader)
	}

	all(filter: {} = {}, query: { startFrom: number } = { startFrom: 0 }) {
		const query_string = getQueryString(query)

		return this.http.get(`${this.url}?${query_string}`, defaultHttpPostHeader)
	}
}
