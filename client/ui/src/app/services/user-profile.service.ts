import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { httpOptions } from './products.service';
import { catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constants/config';
import { ErrorHelper } from '../constants/error-handling';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient, private errorService: ErrorHelper) { }

  updateUserProfile(id: any, user: any): Observable<any> {
    return this.http.put<any>(APPCONFIG.API.DEV.UPDATEUSER + id, user, httpOptions)
      .pipe(
        catchError(this.errorService.handleError('user', user))
      );
  }
}
