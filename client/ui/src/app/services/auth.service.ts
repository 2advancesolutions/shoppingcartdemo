import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`http://localhost:3000/user/login`, { email, password })
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.user && data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          //  this.currentUserSubject.next(user);
        }

        return data.user;
      }));
  }
}
