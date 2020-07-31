import { ProfileService } from './profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProfileStore } from '@syb/profile/store/profile.store';
import { ProfileModel } from './profile.model';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'syb-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  private isAlive = false;

  public profileDetails: ProfileModel;

  constructor(
    private profileStore: ProfileStore,
    private profileService: ProfileService,
  ) {
    this.isAlive = true;
  }

  ngOnInit() {
    this.profileService.fetchProfileDetails(1);

    this.profileStore.profileDetails$.pipe(takeWhile(() => this.isAlive))
      .subscribe((profile: ProfileModel) => {
        this.profileDetails = profile;
    });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
