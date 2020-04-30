import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/books/store/book-details/book-details.facade';

import { AuthService } from '@syb/auth/auth.service';
import { BookListModel } from '@syb/books/models/book-list.model';
import { BookGroupModel } from '@syb/books/models/book-group.model';

@Component({
  selector: 'syb-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  public isAlive: boolean = false;

  public bookDetails: BookGroupModel[];

  constructor(
    private bookFacade: BookDetailsFacade,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAlive = true;

    this.bookFacade.getStoreBookGroup$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
      this.bookDetails = book;
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  public onSelectedBook(bookDetails: BookListModel): void {
    this.bookFacade.selectedBook(bookDetails);
  }
}
