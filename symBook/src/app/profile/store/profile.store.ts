import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { ProfileState, initialProfileState } from '@syb/profile/store/profile.state';
import { ProfileModel } from '@syb/profile/profile.model';

@Injectable({
  providedIn: 'root',
})

export class ProfileStore {
  private myProfileStore: ProfileState = Object.assign({}, initialProfileState);

  private profileDetailsSubject = new BehaviorSubject<ProfileModel>(initialProfileState.profileDetails);
  private profileImageSubject$ = new BehaviorSubject<string | ArrayBuffer>(initialProfileState.profileImage);

  constructor (
    private logger: NGXLogger,
  ) {}

  public set profileDetails(item: ProfileModel) {
    this.myProfileStore.profileDetails = item;
    this.logger.debug('MyProfile - Set Profile item', { item: item, store: this.myProfileStore });
    this.profileDetailsSubject.next(Object.assign({}, this.myProfileStore).profileDetails);
  }

  public get profileDetails$(): Observable<ProfileModel> {
    return this.profileDetailsSubject.asObservable();
  }

  // profile image

  public set profileImage(image: string | ArrayBuffer) {
    this.myProfileStore.profileImage = image;

    this.logger.debug('PROFILE STORE - updated profile image', { payload: image, store: this.myProfileStore });

    this.profileImageSubject$.next(Object.assign({}, this.myProfileStore).profileImage);
  }

  public get profileImage$(): Observable<string | ArrayBuffer> {
    return this.profileImageSubject$.asObservable();
  }

  public reset(): void {
    this.myProfileStore = Object.assign({}, initialProfileState);

    this.logger.debug('MyProfile -  Reset store', { store: this.myProfileStore});

    this.profileImageSubject$.next(Object.assign({}, initialProfileState).profileImage);
  }
}
