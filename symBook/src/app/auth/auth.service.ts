import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from './interface/credentials.interface';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiEndpointsUrl } from '@syb/shared/api.constants';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = null;
  // private _token = new BehaviorSubject<string>();

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }

  constructor(
    private http: HttpClient,
  ) {}

  public login$(email: string, password: string) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${environment.firebase.apiKey}`, {
      email: email, password: password
    });
  }

  logout() {
    this._userIsAuthenticated = false;
  }

  public createAccount$(credentials: Credentials): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/vnd.api+json',
      })
    };

    const send = `${ApiEndpointsUrl.login}?Email=${credentials.Email}&Password=${credentials.Password}
      &PhoneNumber=${credentials.PhoneNumber}&DisplayName=${credentials.DisplayName}`;

    return this.http.post<any>(environment.apiUrl + send, credentials)
      .pipe(
        map((response: any) => {
         // const token = <any>response as Token;

          //this.authStore.token = token;

         // return token;
          return response;
        })
      );
  }

}
