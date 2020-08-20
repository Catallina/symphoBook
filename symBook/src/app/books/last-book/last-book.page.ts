import { Component, OnInit } from '@angular/core';

import { BookDetailsFacade } from '@syb/store/book-details/book-details.facade';
import { AuthService } from '@syb/auth/auth.service';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { takeWhile } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'syb-last-book',
  templateUrl: './last-book.page.html',
  styleUrls: ['./last-book.page.scss'],
})
export class LastBookPage implements OnInit {
  public isAlive = false;
  public bookDetails: BookListModel;

  constructor(
    private booksFacade: BookDetailsFacade,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isAlive = true;

    this.authService.userId.subscribe((userId) => {
      this.booksFacade.getLastBook(userId);
    })

    this.booksFacade.getStoreLastBook$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookListModel) => {
      //this.bookDetails = book;

      if (book && book.id) {
        this.booksFacade.getBookDetails(book.id)
      }
    });

    this.booksFacade.getStoreBookDetails$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookListModel) => {
      this.bookDetails = book;
    });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
