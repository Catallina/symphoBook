import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { environment } from '@env/environment';
import { map, tap } from 'rxjs/operators';

import { ApiEndpointsUrl } from '@syb/shared/api.constants';
import { Credentials } from '@syb/auth/interface/credentials.interface';
import { AuthResponseData } from '@syb/auth/interface/authResponseData.interface';
import { User } from './model/user.model';

import { Plugins } from '@capacitor/core';

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
      returnSecureToken: true,
    };

    return this.http.post<AuthResponseData> (
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=
      ${environment.firebase.apiKey}`,
      credentials)
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
    Plugins.Storage.remove({key: 'authData'});
  }

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
        }
      }),
      map(user => {
        return !!user;
      })
    );
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
      new Date().getTime() +  +userData.expiresIn * 1000
    );

    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    );
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email
    });
    Plugins.Storage.set({ key: 'authData', value: data });
  }

}
