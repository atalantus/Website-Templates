import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../value-types/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public user: User;
  private usersApi = 'api/user';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /**
   * GET | Checks if an Email is already taken.
   * TODO: Returns currently full account data of matched accounts to client!
   * @param matchEmail - the email to look for
   * @return boolean - true if the Email is already taken
   */
  isEmailTaken(matchEmail: string): Observable<boolean> {
    matchEmail = matchEmail.replace('@', '%40');
    return this.http.get<any>(this.usersApi + `?email=${matchEmail}`)
      .pipe(
        map(matched => {
          return (matched.length > 0);
        }),
        catchError(() => of(false))
      );
  }

  /**
   * POST | Creates a new user in the database.
   * @param account - The HttpResponse
   */
  createAccount(account: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.usersApi, account, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
