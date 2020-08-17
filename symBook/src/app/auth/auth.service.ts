import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import { map, tap } from 'rxjs/operators';

import { ApiEndpointsUrl } from '@syb/shared/api.constants';
import { Credentials } from '@syb/auth/interface/credentials.interface';
import { AuthResponseData } from '@syb/auth/interface/authResponseData.interface';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return !!user.token;
      } else {
        return false;
      }
    }));
  }

  get userId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    }));
  }

  constructor(
    private http: HttpClient,
  ) {}

  public login$(email: string, password: string) {
    const credentials = {
      email: email,
      password: password,
    };

    return this.http.post<AuthResponseData> (
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
      ${environment.firebase.apiKey}`,
      credentials)
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
  }

  public createAccount$(credentials: Credentials): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
      responseType: 'text' as 'json',
    };

    const send = `${ApiEndpointsUrl.login}?Email=${credentials.Email}&Password=${credentials.Password}&PhoneNumber=${credentials.PhoneNumber}&DisplayName=${credentials.DisplayName}`;

    return this.http.post<any>(environment.apiUrl + send, credentials, httpOptions)
      .pipe(
        map((response: any) => {
          const token = <any>response as AuthResponseData;
          return token;
        }
    ))
  }


  public setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() +  +userData.expiresIn
    );



    console.warn(new Date().getTime() , '-----', userData.expiresIn)

    console.warn(expirationTime);
    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );
  }

}
