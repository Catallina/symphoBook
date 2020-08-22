import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { ProfileState, initialProfileState } from '@syb/profile/store/profile.state';
import { ProfileModel } from '@syb/profile/profile.model';

@Injectable({
  providedIn: 'root',
})

export class ProfileStore {
  private profileStore: ProfileState = Object.assign({}, initialProfileState);

  private profileDetailsSubject = new BehaviorSubject<ProfileModel>(initialProfileState.profileDetails);
  private profileImageSubject$ = new BehaviorSubject<string | ArrayBuffer>(initialProfileState.profileImage);
  private favoriteBookSubject$ = new BehaviorSubject<string[]>(initialProfileState.favoriteBook);

  constructor (
    private logger: NGXLogger,
  ) {}

  public set profileDetails(item: ProfileModel) {
    this.profileStore.profileDetails = item;
    this.logger.debug('PROFILE - Set Profile item', { item: item, store: this.profileStore });
    this.profileDetailsSubject.next(Object.assign({}, this.profileStore).profileDetails);
  }

  public get profileDetails$(): Observable<ProfileModel> {
    return this.profileDetailsSubject.asObservable();
  }

  // profile image

  public set profileImage(image: string | ArrayBuffer) {
    this.profileStore.profileImage = image;

    this.logger.debug('PROFILE - updated profile image', { payload: image, store: this.profileStore });

    this.profileImageSubject$.next(Object.assign({}, this.profileStore).profileImage);
  }

  public get profileImage$(): Observable<string | ArrayBuffer> {
    return this.profileImageSubject$.asObservable();
  }

  // favorite book

  public set favoriteBook(item: string[]) {
    this.profileStore.favoriteBook = item;
    this.logger.debug('PROFILE - Set Profile item', { item: item, store: this.profileStore });
    this.favoriteBookSubject$.next(Object.assign({}, this.profileStore).favoriteBook);
  }

  public get favoriteBook$(): Observable<string[]> {
    return this.favoriteBookSubject$.asObservable();
  }

  public reset(): void {
    this.profileStore = Object.assign({}, initialProfileState);

    this.logger.debug('PROFILE -  Reset store', { store: this.profileStore});

    this.profileImageSubject$.next(Object.assign({}, initialProfileState).profileImage);
    this.favoriteBookSubject$.next(Object.assign({}, initialProfileState).favoriteBook);
  }
}
