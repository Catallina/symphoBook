import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { takeWhile, filter, distinctUntilChanged, map, delay } from 'rxjs/operators';
import { IonRange, LoadingController } from '@ionic/angular';

import { AudioService } from '@syb/books/audio/audio.service';
import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'syb-footer-player',
  templateUrl: './footer-player.page.html',
  styleUrls: ['./footer-player.page.scss'],
})
export class FooterPlayerPage implements OnInit {
  @ViewChild('range', {static: false}) range: IonRange;

  //seekbar: FormControl = new FormControl("seekbar");

  @Output() selectBook = new EventEmitter<any>();

  public isAlive: boolean = false;

  public seekbar;

  public files: any = [];
  public currentFile: any = {};
  public displayFooter: string = 'inactive';
  public onSeekState: boolean;

  public bookDetails;

  public durationSec: any;
  public duration: any;
  public playing = true;
  public time: any;

  public interval;

  constructor(
    private bookFacade: BookDetailsFacade,
    public audioService: AudioService,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.isAlive = true;
    
    this.getBooks();

    this.bookFacade.getStoreTimeSec$().pipe(
      filter(value => value !== undefined),
      map((value: any) => Number(value)),
      distinctUntilChanged()
    )
    .subscribe((value: any) => {
      this.seekbar = value;
    });

    this.bookFacade.getStorePlaying$().pipe(takeWhile(() => this.isAlive))
      .subscribe((playing) => {
          this.playing = playing;
    });


    this.bookFacade.getStoreCurrentFile$().pipe(takeWhile(() => this.isAlive)).subscribe((book) => {
      this.currentFile = book;
    });

  }

  getBooks() {
    this.loadingCtrl.create({
      message: 'Loading Content. Please Wait...'
    }).then(loadingEl => {
      loadingEl.present();

      this.bookFacade.getStoreBookGroup$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
        this.bookDetails = book;
        loadingEl.dismiss();
      });
    });
  }


  public onGetTime() {
    this.bookFacade.getStoreTime$().pipe(takeWhile(() => this.isAlive))
    .subscribe((time) => {
      this.time = time;
    });

    return this.time;
  }

  public onGetDuration() {
    this.bookFacade.getStoreDuration$().pipe(takeWhile(() => this.isAlive))
    .subscribe((duration) => {
      this.duration = duration;
    });

    return this.duration;
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.playStream(file.url);
    this.displayFooter = 'active';
  }

  resetState() {
    this.audioService.stop();
    //this.bookFacade.reset();
    this.bookFacade.setCanplay(false);
    this.bookFacade.setPlaying(false);
    this.bookFacade.setPause(false);
    this.bookFacade.setLoadStart(false);
  }

  playStream(url) {
    this.resetState();

    this.audioService.playStream(url).subscribe(event => {
      const audioObj = event.target;

      switch (event.type) {
        case 'canplay':
          return this.bookFacade.setCanplay(true);

        case 'loadedmetadata':
          const data = {
            time: this.audioService.formatTime(
              audioObj.duration * 1000,
              'HH:mm:ss'
            ),
            timeSec: audioObj.duration,
            mediaType: 'mp3'
          };
          return this.bookFacade.setLoadedMetaData(true, data);

        case 'playing':
          return this.bookFacade.setPlaying(true);

        case 'pause':
          return this.bookFacade.setPlaying(false);

        case 'timeupdate':
          const time = this.audioService.formatTime(
            audioObj.currentTime * 1000,
            'HH:mm:ss'
          );
          return this.bookFacade.setTimeUpdate(time, audioObj.currentTime);

        case 'loadstart':
          return this.bookFacade.setLoadStart(true);
      }
    });
  }

  pause() {
    this.bookFacade.getStorePlaying$().pipe(takeWhile(() => this.isAlive))
      .subscribe((playing) => {
        this.playing = playing;
    });
    this.audioService.pause();
    this.bookFacade.setPlaying(false);
  }

  play() {
    this.bookFacade.getStorePlaying$().pipe(takeWhile(() => this.isAlive))
      .subscribe((playing) => {
        this.playing = playing;
    });
    this.audioService.play();
    this.bookFacade.setPlaying(true);
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    if (this.bookDetails) {
      const file = this.bookDetails[index];
      this.openFile(file, index);
      const details = {
        file, index
      }
      this.selectBook.emit(details);
      this.range['nativeElement'].value = 0;
    }
  }

  previous() {
    const index = this.currentFile.index - 1;
    if (this.bookDetails) {
      const file = this.bookDetails[index];
      this.openFile(file, index);
      const details = {
        file, index
      }
      this.selectBook.emit(details);
      this.range['nativeElement'].value = 0;
    }
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    if (this.bookDetails) {
      return this.currentFile.index === this.bookDetails.length - 1;
    }
  }

  onSeekStart() {
    this.onSeekState = this.playing;

    if (this.onSeekState) {
      this.pause();
    }
  }

  onSeekEnd(event) {
    if (event && event.target.value) {
      if (this.onSeekState) {
        this.audioService.seekTo(event.target.value);
        this.play();
      } else {
        this.audioService.seekTo(event.target.value);
      }
    }
  }

  public onGetDurationSec() {
    this.bookFacade.getStoreDurationSec$().pipe(takeWhile(() => this.isAlive))
    .subscribe((durationSec) => {
      if (durationSec) {
        this.durationSec = durationSec;
      }
    });

    return this.durationSec;
  }

  reset() {
    this.resetState();
    this.currentFile = {};
    this.displayFooter = 'inactive';
  }

}
