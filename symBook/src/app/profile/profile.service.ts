import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProfileModel } from '@syb/profile/profile.model';
import { environment } from '@env/environment';
import { ProfileStore } from '@syb/profile/store/profile.store';
import { map } from 'rxjs/operators';

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
        name: profileDetails.name,
        aboutMe: profileDetails.aboutMe,
        jobTitle: profileDetails.jobTitle,
        email: profileDetails.email,
        birthday: profileDetails.birthday,
        phoneNumber: profileDetails.phoneNumber,
        description: profileDetails.description,
        favoriteBook: profileDetails.favoriteBook,
      });
    }

    return mappedList;
  }

  public getProfileDetails$(employeeId: number): Observable<ProfileModel> {
    return this.http.get<ProfileModel>('https://symphobook.firebaseio.com/profile.json')
    .pipe(
      map(response => {
        return this.mapToProfileDetails(response);
      })
    );
  }

  public fetchProfileDetails(employeeId: number): void {
    this.getProfileDetails$(employeeId)
    .subscribe((profile: ProfileModel) => {
      if (profile) {
        this.profileStore.profileDetails = profile;
      }
    });
  }
}
