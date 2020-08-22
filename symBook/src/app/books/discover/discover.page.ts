import { Component, OnInit, OnDestroy, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';

import { AuthService } from '@syb/auth/auth.service';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { BookGroupModel } from '@syb/books/models/book-group.model';


import { SearchComponent } from '@syb/books/discover/search/search.component';
import { BooksService } from '@syb/books/books.service';
import { NavController, LoadingController, IonRange, IonItemSliding, ModalController } from '@ionic/angular';
import { AudioService } from '@syb/books/audio/audio.service'; 

@Component({
  selector: 'syb-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  @ViewChild('range', {static: false}) range: IonRange;

  @Output() public fileSelected = new EventEmitter<any>();

  public showSearchBar = false;

  public isAlive: boolean = false;

  public seekbar = 0;

  public bookDetails: BookGroupModel[];

  public currentFile: any = {};
  public onSeekState: boolean;
  public displayFooter: string = 'inactive';

  public durationSec: any;
  public duration: any;
  public playing = true;
  public time: any;

  public bookId: string;
  public book: BookListModel;

  state: any = {};

  constructor(
    private bookFacade: BookDetailsFacade,
    private authService: AuthService,
    private booksService: BooksService,
    public navCtrl: NavController,
    public audioService: AudioService,
    public loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  ) {
    this.isAlive = true;
  }

  ngOnInit() {
    this.bookFacade.getBookGroup();
    this.getDocuments();

    this.bookFacade.getStoreBookId$().pipe(takeWhile(() => this.isAlive)).subscribe((bookId: string) => {
      this.bookId = bookId;
      if (bookId) {
        this.bookFacade.getBookDetails(bookId);
      }
    });

    this.bookFacade.getStoreBookDetails$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookListModel) => {
      this.book = book;
    });
    

    this.bookFacade.getStoreCurrentFile$().pipe(takeWhile(() => this.isAlive)).subscribe((book) => {
      if (book) {
        this.currentFile = book;
      }
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  public onSelectedBook(bookId: string): void {
    this.bookFacade.selectedBook(bookId);
    this.authService.userId.subscribe((userId) =>{
      this.booksService.openedBooks$(bookId, userId).subscribe();
    })
  }

  public onGetTime() {
    this.bookFacade.getStoreTime$().pipe(takeWhile(() => this.isAlive))
    .subscribe((time) => {
      if (time) {
        this.time = time;
      }
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

  getDocuments() {
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

  clickedSearchIcon(event: Event) {
    //this.showSearchBar = !this.showSearchBar;

    this.modalCtrl.create({
        component: SearchComponent, 
        componentProps: { loadedBook: this.bookDetails }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
    }

  openFile(file, index, slidingEl: IonItemSliding) {
    this.currentFile = { index, file };
    this.playStream(file.url);
    this.fileSelected.emit(this.currentFile);
    this.bookFacade.setCurrentFile(this.currentFile);
    this.displayFooter = 'active';
    slidingEl.close();
  }

  resetState() {
    this.audioService.stop();
    //this.bookFacade.reset();
    this.bookFacade.setCanplay(false);
    this.bookFacade.setPlaying(false);
    this.bookFacade.setPause(false);
    this.bookFacade.setLoadStart(false);
  }

  onGetFile(currentFile) {
    this.bookFacade.setCurrentFile(currentFile);
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

}
