import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { httpOptionsWithAuthToken } from './httpOptionsWithAuthToken';
import { Photo } from './types';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {

  constructor(
    private http: HttpClient,
		private auth: AngularFireAuth,
  ) { }

  loadMyPhotos(): Observable<Photo[]> {
    return this.requestWithCredentials('get', '/api/my-photos', {}, []);
  }

  loadSharedPhotos(): Observable<Photo[]> {
    return this.requestWithCredentials('get', '/api/shared', {}, []);
  }

  private requestWithCredentials<T>(method: string, url: string, payload: any, defaultReturnValue: T): Observable<T> {
    return new Observable<T>(observer => {
        this.auth.user.subscribe(user => {
            user && user.getIdToken().then((token: any) => {
                if (user && token) {
                    if (method === 'get') {
                        this.http.get<T>(url, httpOptionsWithAuthToken(token))
                            .subscribe(data => observer.next(data));
                    } else if (method === 'post') {
                        this.http.post<T>(url, payload, httpOptionsWithAuthToken(token))
                            .subscribe(data => observer.next(data));
                    } else {
                        observer.next(defaultReturnValue);
                    }
                } else {
                    observer.next(defaultReturnValue);
                }
            })
        })
    });
  }
}
