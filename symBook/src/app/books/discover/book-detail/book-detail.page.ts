import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, filter, map, distinctUntilChanged } from 'rxjs/operators';

import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
  IonItemSliding,
  IonRange
} from '@ionic/angular';

import { BookDetailsFacade } from '@syb/store/book-details/book-details.facade';

import { WishlistService } from '@syb/wishlist/wishlist.service';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { BooksService } from '@syb/books/books.service';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import { CreateWishlistComponent } from '@syb/wishlist/create-wishlist/create-wishlist.component';
import { AudioService } from '@syb/books/audio/audio.service';
import { AuthService } from '@syb/auth/auth.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss']
})
export class BookDetailPage implements OnInit, OnDestroy {
  @Output() public fileSelected = new EventEmitter<any>();
  @ViewChild('range', {static: false}) range: IonRange;

  public isAlive: boolean = false;

  public bookId: string;

  public seekbar = 0;

  public bookDetails: BookListModel;

  public currentFile: any = {};
  public onSeekState: boolean;
  public displayFooter: string = 'inactive';

  public durationSec: any;
  public duration: any;
  public playing = true;
  public time: any;


  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private audioService: AudioService,
    private bookService: BooksService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private bookFacade: BookDetailsFacade,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.isAlive = true;

    this.bookFacade.getStoreBook$().pipe(takeWhile(() => this.isAlive)).subscribe((bookId: string) => {
      this.bookId = bookId;
      if (bookId) {
        this.bookFacade.getBookDetails(bookId);
      }
    });

    this.bookFacade.getStoreBookDetails$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookListModel) => {
      this.bookDetails = book;
    });
    
    this.bookFacade.getStoreCurrentFile$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookListModel) => {
      this.currentFile = book;

      console.warn(book);
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  public onWishBook(event: Event) {
    event.stopPropagation();

   // this.modalCtrl.dismiss(
      this.loadingCtrl
      .create({ message: 'Book added...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.userId.subscribe((userId) => {
          this.bookService.storeWishBook$(this.bookDetails, userId)
            .subscribe(() => {
              loadingEl.dismiss();
            });
        })
      })
   // );
  }

  public onAddFavorite(event: Event) {
    event.stopPropagation();

    //this.modalCtrl.dismiss(
      this.loadingCtrl
      .create({ message: 'Book added...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.userId.subscribe((userId) => {
          this.bookService.storeFavoriteBook$(this.bookDetails, userId)
            .subscribe(() => {
              loadingEl.dismiss();
            });
        })
      })
    //);
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

  public getArray(details) {
    let obj = [];
      details.forEach((value, index) => {
        obj.push({index, value})
    });

    return obj;
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.playStream(file.value);
    this.fileSelected.emit(this.currentFile);
    this.bookFacade.setCurrentFile(this.currentFile);
    this.displayFooter = 'active';
  }

  onGetFile(currentFile) {
    this.bookFacade.setCurrentFile(currentFile);
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

  next() {
    const index = this.currentFile.index + 1;
    if (this.getArray(this.bookDetails.urls)) {
      const file = this.getArray(this.bookDetails.urls)[index];

      this.openFile(file, index);
      const details = {
        file, index
      }
      //this.selectBook.emit(details);
      //this.range['nativeElement'].value = 0;
    }
  }

  previous() {
    const index = this.currentFile.index - 1;
    if (this.getArray(this.bookDetails.urls)) {
      const file = this.getArray(this.bookDetails.urls)[index];
      this.openFile(file, index);
      const details = {
        file, index
      }
      //this.selectBook.emit(details);
      //this.range['nativeElement'].value = 0;
    }
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    if (this.getArray(this.bookDetails.urls)) {
      return this.currentFile.index === this.getArray(this.bookDetails.urls).length - 1;
    }
  }

  onSeekStart() {
    this.bookFacade.getStorePlaying$().pipe(takeWhile(() => this.isAlive))
    .subscribe((playing) => {
        this.playing = playing;
    });

    this.onSeekState = this.playing;

    if (this.onSeekState) {
      this.getTimeSec();
      this.pause();
    }

  }

  onSeekEnd(event) {
    // this.seekbar = this.getTimeSec();
    // console.warn(this.seekbar);

    if (event && event.detail.value) {
      if (this.onSeekState) {
        this.audioService.seekTo(event.detail.value);
        this.play();
      } else {
        this.audioService.seekTo(event.detail.value);
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
      //this.seekbar = value;
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
}
