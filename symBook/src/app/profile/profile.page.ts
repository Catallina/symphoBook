import { AuthService } from '@syb/auth/auth.service';
import { BookDetailsFacade } from './../books/store/book-details/book-details.facade';
import { ProfileService } from './profile.service';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';

import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { ProfileStore } from '@syb/profile/store/profile.store';
import { ProfileModel } from './profile.model';
import { takeWhile } from 'rxjs/operators';
import { AudioService } from '@syb/books/audio/audio.service';
import { IonRange } from '@ionic/angular';
import { BookGroupModel } from '@syb/books/models/book-group.model';

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

  constructor(
    private profileStore: ProfileStore,
    private profileService: ProfileService,
    private bookFacade: BookDetailsFacade,
    private audioService: AudioService,
    private authService: AuthService,
  ) {
    this.isAlive = true;
  }

  ngOnInit() {
    this.authService.userId.pipe(takeWhile(() => this.isAlive))
    .subscribe((userId) => {
      console.warn(userId)
      this.profileService.fetchProfileDetails(userId);
  });

    this.profileStore.profileDetails$.pipe(takeWhile(() => this.isAlive))
      .subscribe((profile: ProfileModel) => {
        this.profileDetails = profile;
    });

    this.bookFacade.getStoreCurrentFile$().pipe(takeWhile(() => this.isAlive))
      .subscribe((book: any) => {
        this.currentFile = book;
    });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  // resetState() {
  //   this.audioService.stop();
  //   //this.bookFacade.reset();
  //   this.bookFacade.setCanplay(false);
  //   this.bookFacade.setPlaying(false);
  //   this.bookFacade.setPause(false);
  //   this.bookFacade.setLoadStart(false);
  // }

  
  // openFile(file, index) {
  //   this.currentFile = { index, file };
  //   this.playStream(file.url);
  //   this.displayFooter = 'active';
  // }

  // playStream(url) {
  //   this.resetState();

  //   this.audioService.playStream(url).subscribe(event => {
  //     const audioObj = event.target;

  //     switch (event.type) {
  //       case 'canplay':
  //         return this.bookFacade.setCanplay(true);

  //       case 'loadedmetadata':
  //         const data = {
  //           time: this.audioService.formatTime(
  //             audioObj.duration * 1000,
  //             'HH:mm:ss'
  //           ),
  //           timeSec: audioObj.duration,
  //           mediaType: 'mp3'
  //         };
  //         return this.bookFacade.setLoadedMetaData(true, data);

  //       case 'playing':
  //         return this.bookFacade.setPlaying(true);

  //       case 'pause':
  //         return this.bookFacade.setPlaying(false);

  //       case 'timeupdate':
  //         const time = this.audioService.formatTime(
  //           audioObj.currentTime * 1000,
  //           'HH:mm:ss'
  //         );
  //         return this.bookFacade.setTimeUpdate(time, audioObj.currentTime);

  //       case 'loadstart':
  //         return this.bookFacade.setLoadStart(true);
  //     }
  //   });
  // }

  // pause() {
  //   this.bookFacade.getStorePlaying$().pipe(takeWhile(() => this.isAlive))
  //     .subscribe((playing) => {
  //       this.playing = playing;
  //   });
  //   this.audioService.pause();
  //   this.bookFacade.setPlaying(false);
  // }

  // play() {
  //   this.bookFacade.getStorePlaying$().pipe(takeWhile(() => this.isAlive))
  //     .subscribe((playing) => {
  //       this.playing = playing;
  //   });
  //   this.audioService.play();
  //   this.bookFacade.setPlaying(true);
  //   //this.getTimeSec();
  // }

  // stop() {
  //   this.audioService.stop();
  // }

  // next() {
  //   const index = this.currentFile.index + 1;
  //   const file = this.bookDetails[0].bookList[index];
  //   this.openFile(file, index);
  // }

  // previous() {
  //   const index = this.currentFile.index - 1;
  //   const file = this.bookDetails[0].bookList[index];
  //   this.openFile(file, index);
  // }

  // isFirstPlaying() {
  //   return this.currentFile.index === 0;
  // }

  // isLastPlaying() {
  //   return this.currentFile.index === this.bookDetails[0].bookList.length - 1;
  // }

  // onSeekStart() {
  //   this.bookFacade.getStorePlaying$().pipe(takeWhile(() => this.isAlive))
  //   .subscribe((playing) => {
  //       this.playing = playing;
  //   });

  //   this.onSeekState = this.playing;

  //   if (this.onSeekState) {
  //     //this.getTimeSec();
  //     this.pause();
  //   }

  // }

  // onSeekEnd(event) {
  //   const newValue = +this.range.value;
  //   event.value = this.getTimeSec();
  //   if (event && event.value) {
  //     if (this.onSeekState) {
  //       this.audioService.seekTo(event.value * (newValue / 100));
  //       this.play();
  //     } else {
  //       this.audioService.seekTo(event.value);
  //     }
  //   }
  // }

  // public getTimeSec() {
  //   let valueTime = null;
  //   //Updating the Seekbar based on currentTime
  //   this.bookFacade.getStoreTimeSec$().pipe(
  //     filter(value => value !== undefined),
  //     map((value: any) => Number(value)),
  //     distinctUntilChanged()
  //   )
  //   .subscribe((value: any) => {
  //     //this.seekbar.setValue(value);

  //     valueTime = value;
  //     this.seekbar = value;
  //   });

  //   return valueTime;
  // }

  // public onGetDurationSec() {
  //   this.bookFacade.getStoreDurationSec$().pipe(takeWhile(() => this.isAlive))
  //   .subscribe((durationSec) => {
  //     if (durationSec) {
  //       this.durationSec = durationSec;
  //     }
  //   });
  //   return this.durationSec;
  // }

}
