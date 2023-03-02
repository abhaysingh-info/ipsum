import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { defaultHttpPostHeader } from './helper'
import { HttpClient } from '@angular/common/http'

@Injectable({
	providedIn: 'root',
})
export class TeamService {
	private url = `${environment.serverUrl}/team`

	constructor(private http: HttpClient) {}

	createTeam(team: any) {
		return this.http.post(`${this.url}/`, team, defaultHttpPostHeader)
	}
}
