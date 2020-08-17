import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProfileModel } from '@syb/profile/profile.model';
import { environment } from '@env/environment';
import { ProfileStore } from '@syb/profile/store/profile.store';
import { map } from 'rxjs/operators';
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
        id: profileDetails.id,
        name: profileDetails.DisplayName,
        aboutMe: profileDetails.Love,
        jobTitle: profileDetails.jobTitle,
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
    return this.http.get<ProfileModel>(environment.apiUrl + ApiEndpointsUrl.user + userId)
    .pipe(
      map(response => {
        console.warn(response);
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
}
