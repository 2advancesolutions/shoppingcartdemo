import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constants/config';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfile = new BehaviorSubject<any[]>(null);
  public readonly userProfile$: Observable<any[]> = this.userProfile.asObservable();

  constructor(private http: HttpClient) { }

  updateUserProfile(id: any, user: any): Observable<any> {
    const userId = String(id);
    if (user.password === null || user.password === '' || user.password === undefined) {
      delete user.password;
    }
    return this.http.patch<any>(APPCONFIG.API.DEV.UPDATEUSER + userId, user)
      .pipe(
        catchError(this.handleError('user', user))
      );
  }

  updateUserProfileCache(user) {
   this.userProfile.next(user);
  }

    public handleError<T>(operation = 'operation', result?: T) {
         return (error: any): Observable<T> => {
           console.error(error);
           console.log(`${operation} failed: ${error.message}`);
           return of(result as T);
         };
       }
}
