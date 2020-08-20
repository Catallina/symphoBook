import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/store/book-details/book-details.facade';
import { BookListModel } from '@syb/shared/models/book-list.model';

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

  public bookDetails;
  public bookId: string;

  constructor(
    private bookFacade: BookDetailsFacade,
  ) { }

  ngOnInit() {
    this.isAlive = true;
    this.bookFacade.getBookGroup();

    this.bookFacade.getStoreBookId$().pipe(takeWhile(() => this.isAlive)).subscribe((bookId: string) => {
      this.bookId = bookId;
      if (bookId) {
        this.bookFacade.getBookDetails(bookId);
      }
    });

    this.bookFacade.getStoreBookDetails$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookListModel) => {
      this.bookDetails = book;
    });

  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
