import { BookDetailsFacade } from '@syb/books/store/book-details/book-details.facade';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { takeWhile, filter, distinctUntilChanged, map } from 'rxjs/operators';
import { AudioService } from '@syb/books/audio/audio.service';
import { IonRange } from '@ionic/angular';
import { BookGroupModel } from '@syb/books/models/book-group.model';

@Component({
  selector: 'syb-footer-player',
  templateUrl: './footer-player.page.html',
  styleUrls: ['./footer-player.page.scss'],
})
export class FooterPlayerPage implements OnInit {
  @ViewChild('range', {static: false}) range: IonRange;

  @Input() public currentFile: any;

  public isAlive: boolean = false;

  public seekbar = 0;

  public files: any = [];
  //public currentFile: any = {};
  public displayFooter: string = 'inactive';
  public onSeekState: boolean;

  public bookDetails;

  public durationSec: any;
  public duration: any;
  public playing = true;
  public time: any;

  constructor(
    private bookFacade: BookDetailsFacade,
    public audioService: AudioService,
  ) { }

  ngOnInit() {
    this.isAlive = true;

    this.bookFacade.getStoreBookGroup$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
      this.bookDetails = book;
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
    //this.getTimeSec();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    if (this.bookDetails) {
      const file = this.bookDetails[0].bookList[index];
      this.openFile(file, index);
    }
  }

  previous() {
    const index = this.currentFile.index - 1;
    if (this.bookDetails) {
      const file = this.bookDetails[0].bookList[index];
      this.openFile(file, index);
    }
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    if (this.bookDetails) {
      return this.currentFile.index === this.bookDetails[0].bookList.length - 1;
    }
  }

  onSeekStart() {
    this.bookFacade.getStorePlaying$().pipe(takeWhile(() => this.isAlive))
    .subscribe((playing) => {
        this.playing = playing;
    });

    this.onSeekState = this.playing;

    if (this.onSeekState) {
      //this.getTimeSec();
      this.pause();
    }

  }

  onSeekEnd(event) {
    const newValue = +this.range.value;
    event.value = this.getTimeSec();
    if (event && event.value) {
      if (this.onSeekState) {
        this.audioService.seekTo(event.value * (newValue / 100));
        this.play();
      } else {
        this.audioService.seekTo(event.value);
      }
    }
  }

  public getTimeSec() {
    let valueTime = null;
    //Updating the Seekbar based on currentTime
    this.bookFacade.getStoreTimeSec$().pipe(
      filter(value => value !== undefined),
      map((value: any) => Number(value)),
      distinctUntilChanged()
    )
    .subscribe((value: any) => {
      //this.seekbar.setValue(value);

      valueTime = value;
      this.seekbar = value;
    });

    return valueTime;
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
