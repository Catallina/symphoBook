import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { BookGroupModel } from './models/book-group.model';

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

  public bookDetails;
  public bookGroup;
  public bookId: string;

  constructor(
    private bookFacade: BookDetailsFacade,
  ) { }

  ngOnInit() {
    this.isAlive = true;
    this.bookFacade.getBookGroup();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
