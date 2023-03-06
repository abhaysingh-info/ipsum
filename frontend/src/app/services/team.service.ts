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

	deleteTeam() {
		return this.http.delete(`${this.url}/`, defaultHttpPostHeader)
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

	acceptTeamJoinRequest(request_id: string, accept: boolean) {
		return this.http.post(
			`${this.url}/accept-join-request`,
			{ accept, request_id },
			defaultHttpPostHeader,
		)
	}

	getTeamJoinRequest() {
		return this.http.get(`${this.url}/join`, defaultHttpPostHeader)
	}

	getAllTeamJoinRequests(startFrom: number = 0) {
		return this.http.get(
			`${this.url}/all-join-requests?startFrom=${startFrom}`,
			defaultHttpPostHeader,
		)
	}

	removeMemberFromTeam(member_id: string) {
		return this.http.delete(
			`${this.url}/member/${member_id}`,
			defaultHttpPostHeader,
		)
	}

	lockTeam() {
		return this.http.post(`${this.url}/lock`, {}, defaultHttpPostHeader)
	}
}
