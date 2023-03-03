import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { defaultHttpPostHeader } from './helper'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Team } from '@shared/interfaces/team'

@Injectable({
	providedIn: 'root',
})
export class TeamService {
	private url = `${environment.serverUrl}/team`

	constructor(private http: HttpClient) {}

	getTeam() {
		return this.http.get<Team>(`${this.url}/`, defaultHttpPostHeader)
	}

	createTeam(team: any) {
		return this.http.post(`${this.url}/`, team, defaultHttpPostHeader)
	}

	sendTeamJoinRequest(teamCode: string) {
		return this.http.post(
			`${this.url}/${teamCode}/join`,
			{},
			defaultHttpPostHeader,
		)
	}

	withdrawTeamJoinRequest() {
		return this.http.post(
			`${this.url}/withdraw-join-request`,
			{},
			defaultHttpPostHeader,
		)
	}
}
