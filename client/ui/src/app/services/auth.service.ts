import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APPCONFIG } from '../constants/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any[]>(null);
  public readonly $currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(APPCONFIG.API.DEV.LOGIN, { email, password })
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.user && data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          this.currentUserSubject.next(data.User);
        }
        return data.user;
      }));
  }
}
