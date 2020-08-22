import { DeleteBookActionSuccess } from './books-journal.actions';

import { Injectable } from '@angular/core';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { JournalBookDetailsFacade } from '@syb/books-journal/store/books-journal/books-journal.facade';
import { BooksJournalService } from '@syb/books-journal/books-journal.service';
import { 
  JournalBooksActionTypes, 
  GetBookDetailsAction, 
  GetBookDetailsSuccessAction, 
  DeleteBookAction 
} from '@syb/books-journal/store/books-journal/books-journal.actions';
import { BookListModel } from '@syb/shared/models/book-list.model';


@Injectable({
  providedIn: 'root'
})
export class JournalBookDetailsEffects {

  constructor(
    private actions$: Actions,
    private bookDetailsFacade: JournalBookDetailsFacade,
    private bookDetailsService: BooksJournalService,
  ) { }

  // GET SALE BLOCKS
  @Effect()
  getBook$ = this.actions$
    .pipe(
      ofType(JournalBooksActionTypes.GET_BOOK_DETAILS),
      switchMap((action: GetBookDetailsAction) => {
        return this.bookDetailsService.getBooksJournal$(action.payload.userId).pipe(
          map((details: BookListModel[]) =>
            new GetBookDetailsSuccessAction({
              bookDetails: details
            })
          ),
          catchError((error) => of({
            type: JournalBooksActionTypes.GET_BOOK_DETAILS_ERROR,
            error
          }))
        );
      })
    );


  @Effect()
  getDeleteBook$ = this.actions$
    .pipe(
      ofType(JournalBooksActionTypes.DELETE_BOOK),
      switchMap((action: DeleteBookAction) => {
        return this.bookDetailsService.deleteAllBooks$(action.payload.userId).pipe(
          map((book:  BookListModel[]) =>
            new DeleteBookActionSuccess( { bookDetails: book })
          ),
          catchError((error) => of({
            type: JournalBooksActionTypes.DELETE_BOOK_ERROR,
            error
          }))
        );
      })
    );
}
