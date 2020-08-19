import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonRange, ModalController } from '@ionic/angular';
import { takeWhile } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/store/book-details/book-details.facade';
import { ProfileStore } from '@syb/profile/store/profile.store';

import { AudioService } from '@syb/books/audio/audio.service';
import { AuthService } from '@syb/auth/auth.service';
import { EditProfileComponent } from '@syb/profile/edit-profile/edit-profile.component';
import { ProfileModel } from '@syb/profile/profile.model';
import { ProfileService } from '@syb/profile/profile.service';

@Component({
  selector: 'syb-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  @ViewChild('range', {static: false}) range: IonRange;

  private isAlive = false;

  public currentFile: any;
  public bookList: any;

  public profileDetails: ProfileModel;
  public userId: string;


  constructor(
    private profileStore: ProfileStore,
    private profileService: ProfileService,
    private bookFacade: BookDetailsFacade,
    private audioService: AudioService,
    private authService: AuthService,
    private modalCtrl: ModalController,
  ) {
    this.isAlive = true;
  }

  ngOnInit() {
    this.bookFacade.getBookGroup();

    this.authService.userId.pipe(takeWhile(() => this.isAlive))
      .subscribe((userId) => {
        this.userId = userId;
        this.profileService.fetchProfileDetails(userId);
    });

    this.profileStore.profileDetails$.pipe(takeWhile(() => this.isAlive))
      .subscribe((profile: ProfileModel) => {
        if (profile) {
          this.profileDetails = profile;

          if (profile && profile.favoriteBook) {
            profile.favoriteBook = profile.favoriteBook.filter(function (el) {
              return el != null;
            });
          }
        }
    });

    this.bookFacade.getStoreCurrentFile$().pipe(takeWhile(() => this.isAlive))
      .subscribe((book: any) => {
        if (book) {
          this.currentFile = book;
        }
    });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  onEditProfile() {
    this.modalCtrl.create({
        component: EditProfileComponent, 
        componentProps: { profileDetails: this.profileDetails, userId: this.userId }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('Saved!');
        }
      });
  }
}
