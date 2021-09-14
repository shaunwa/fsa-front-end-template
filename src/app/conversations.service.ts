import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Conversation } from './types';
import { httpOptionsWithAuthToken } from './httpOptionsWithAuthToken';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

	constructor(
		private http: HttpClient,
		private auth: AngularFireAuth,
	) { }

  loadUserConversations(): Observable<Conversation[]> {
		return new Observable<Conversation[]>(observer => {
			this.auth.user.subscribe(user => {
				user && user.getIdToken().then(token => {
					if (user && token) {
							this.http.get<Conversation[]>(`/api/users/${user.uid}/conversations`, httpOptionsWithAuthToken(token))
								.subscribe(data => observer.next(data));
          }
				})
			})
		});
  }
  

}