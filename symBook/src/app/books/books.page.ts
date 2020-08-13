import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/books/store/book-details/book-details.facade';
import { AudioFacade } from './store/audio/audio.facade';

@Component({
  selector: 'syb-places',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit, OnDestroy {
  public isAlive: boolean = false;

  public durationSec: any;
  public duration: any;
  public playing = false;
  public time: any;

  constructor(
    private bookFacade: BookDetailsFacade,
    private audioFacade: AudioFacade,
  ) { }

  ngOnInit() {
    this.isAlive = true;
    this.bookFacade.getBookGroup();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
