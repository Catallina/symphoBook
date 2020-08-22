
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as JournalBookDetailsActions from '@syb/books-journal/store/books-journal/books-journal.actions';
import { BooksJournalState } from '@syb/books-journal/store/books-journal/books-journal.state';
import { detailsState, busyState } from '@syb/books-journal/store/books-journal/books-journal.selectors';
import { BookListModel } from '@syb/shared/models/book-list.model';

@Injectable({
  providedIn: 'root'
})
export class JournalBookDetailsFacade {

  constructor(
    private bookDetailsStore: Store<BooksJournalState>,
  ) {}

  public getBookDetails(userId: string): void {
    this.bookDetailsStore.dispatch(
      new JournalBookDetailsActions.GetBookDetailsAction({userId: userId})
    );
  }

  public getBookDetailsError(): void {
    this.bookDetailsStore.dispatch(
      new JournalBookDetailsActions.GetBookDetailsErrorAction()
    );
  }

  public deleteBook(userId: string): void {
    this.bookDetailsStore.dispatch(
      new JournalBookDetailsActions.DeleteBookAction({userId: userId})
    );
  }

  public reset(): void {
    this.bookDetailsStore.dispatch(
      new JournalBookDetailsActions.ResetAction()
    );
  }

  //GETTER
  public getStoreBookDetails$(): Observable<BookListModel[]> {
    return this.bookDetailsStore.select(detailsState);
  }

  public getStoreBusy$(): Observable<boolean> {
    return this.bookDetailsStore.select(busyState);
  }

}
