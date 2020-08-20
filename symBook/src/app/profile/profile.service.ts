import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProfileModel } from '@syb/profile/profile.model';
import { environment } from '@env/environment';
import { ProfileStore } from '@syb/profile/store/profile.store';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpointsUrl } from '@syb/shared/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private profileStore: ProfileStore,
  ) { }

  public mapToProfileDetails(profileDetails: any): ProfileModel {
    let mappedList: ProfileModel;

    if (profileDetails) {
      mappedList = new ProfileModel({
        name: profileDetails.DisplayName,
        love: profileDetails.Love,
        email: profileDetails.Email,
        birthday: profileDetails.Birthday,
        phoneNumber: profileDetails.PhoneNumber,
        description: profileDetails.Description,
        favoriteBook: profileDetails.Favorites,
      });
    }

    return mappedList;
  }

  public getProfileDetails$(userId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(environment.apiUrl + ApiEndpointsUrl.user + '?uid=' + userId)
    .pipe(
      map(response => {
        return this.mapToProfileDetails(response);
      })
    );
  }

  public fetchProfileDetails(userId: string): void {
    this.getProfileDetails$(userId)
    .subscribe((profile: ProfileModel) => {
      if (profile) {
        this.profileStore.profileDetails = profile;
      }
    });
  }

  public updateProfile$(userId: string, updatedProfile: ProfileModel): void {
    const sendData = `?Description=${updatedProfile.description}&Love=${updatedProfile.love}&DisplayName=${updatedProfile.name}&Birthday=${updatedProfile.birthday}&uid=${userId}`
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const data = {
      description: updatedProfile.description,
      love: updatedProfile.love,
      name: updatedProfile.name,
      birthday: updatedProfile.birthday,
      userId: userId,
    }
    this.http.put(
      environment.apiUrl + ApiEndpointsUrl.userProfile + sendData, data, httpOptions)
      .pipe(catchError(error => [error]))
      .subscribe((response: ProfileModel) => this.profileStore.profileDetails = response);
  }
}
