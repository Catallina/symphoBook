import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController
} from '@ionic/angular';

import { BookDetailsFacade } from '@syb/books/store/book-details/book-details.facade';

import { WishlistService } from '@syb/wishlist/wishlist.service';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { BooksService } from '@syb/books/books.service';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import { CreateWishlistComponent } from '@syb/wishlist/create-wishlist/create-wishlist.component';
import { AudioService } from '@syb/books/audio/audio.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss']
})
export class BookDetailPage implements OnInit, OnDestroy {
  public isAlive: boolean = false;

  public bookDetails: BookListModel;

  public playing;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private audioService: AudioService,
    private bookService: BooksService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private bookFacade: BookDetailsFacade,
  ) {}

  ngOnInit() {
    this.isAlive = true;

    this.bookFacade.getStoreBook$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookListModel) => {
      this.bookDetails = book;
      console.warn(book);
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  public onWishBook(event: Event) {
    event.stopPropagation();

    this.modalCtrl.dismiss(
      this.loadingCtrl
      .create({ message: 'Book added...' })
      .then(loadingEl => {
        loadingEl.present();
        this.bookService.storeWishBook$(this.bookDetails)
          .subscribe(() => {
            loadingEl.dismiss();
          });
      })
    );
  }

  play() {
    this.playStream(this.bookDetails.url);
    this.audioService.play();

    this.bookFacade.selectedBook(this.bookDetails);
  }

  resetState() {
    this.audioService.stop();
    //this.bookFacade.reset();
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
