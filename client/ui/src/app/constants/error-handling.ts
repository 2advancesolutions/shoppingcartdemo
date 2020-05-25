import { Observable, of } from 'rxjs';


export class ErrorHelper {
   public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          console.log(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
      }
}
