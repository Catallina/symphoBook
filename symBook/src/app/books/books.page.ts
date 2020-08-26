import { BooksService } from '@syb/books/books.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { BookGroupModel } from './models/book-group.model';
import { pipe } from 'rxjs';

@Component({
  selector: 'syb-places',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit, OnDestroy {
  public isAlive: boolean = false;

  public currentFile: any = {};
  public durationSec: any;
  public duration: any;
  public playing = false;
  public time: any;

  public bookGroup: BookGroupModel[];
  public bookId: string;

  constructor(
    private bookFacade: BookDetailsFacade,
    private bookService: BooksService,
  ) { }

  ngOnInit() {
    this.isAlive = true;
    //his.bookFacade.getBookGroup();

    this.bookService.getNotification$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
      this.bookGroup = book;
    })
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
