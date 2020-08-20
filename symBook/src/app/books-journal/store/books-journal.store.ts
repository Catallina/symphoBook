import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { BooksJournalState, initialBooksJournalState } from '@syb/books-journal/store/books-journal.state';
import { BookListModel } from '@syb/shared/models/book-list.model';

@Injectable({
  providedIn: 'root',
})

export class BooksJournalStore {
  private booksJournalStore: BooksJournalState = Object.assign({}, initialBooksJournalState);

  private bookDetailsSubject = new BehaviorSubject<BookListModel[]>(initialBooksJournalState.bookDetails);

  constructor (
    private logger: NGXLogger,
  ) {}

  public set booksJournalDetails(item: BookListModel[]) {
    this.booksJournalStore.bookDetails = item;
    this.logger.debug('MyProfile - Set Profile item', { item: item, store: this.booksJournalStore });
    this.bookDetailsSubject.next(Object.assign({}, this.booksJournalStore).bookDetails);
  }

  public get booksJournalDetails$(): Observable<BookListModel[]> {
    return this.bookDetailsSubject.asObservable();
  }

  public reset(): void {
    this.booksJournalStore = Object.assign({}, initialBooksJournalState);

    this.logger.debug('MyProfile -  Reset store', { store: this.booksJournalStore});

    this.bookDetailsSubject.next(Object.assign({}, initialBooksJournalState).bookDetails);
  }
}
