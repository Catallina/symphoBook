import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/books/store/book-details/book-details.facade';

@Component({
  selector: 'syb-places',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  public isAlive: boolean = false;

  constructor(
    private bookFacade: BookDetailsFacade,
  ) { }

  ngOnInit() {
    this.isAlive = true;
    this.bookFacade.getBookGroup();
  }

}
