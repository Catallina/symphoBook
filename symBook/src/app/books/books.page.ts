import { BooksService } from '@syb/books/books.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';
import { BookGroupModel } from './models/book-group.model';
import { AuthService } from '@syb/auth/auth.service';

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
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isAlive = true;
    this.authService.userId.subscribe((userId) => {
      if (userId) {
        this.bookFacade.getBookGroup(userId);
      }
    })

    this.bookService.getNotification$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
      this.bookGroup = book;
    })
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
