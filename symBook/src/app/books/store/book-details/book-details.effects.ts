import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import {
  BookDetailsActionType,
  GetBookDetailsAction,
  GetBookDetailsErrorAction,
  GetBookDetailsSuccessAction,
} from '@syb/books/store/book-details/book-details.actions';
import { BookDetailsFacade } from '@syb/books/store/book-details/book-details.facade';

import { BooksService } from '@syb/books/books.service';
import { BookModel } from '@syb/books/books.model';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsEffects {

  constructor(
    private actions$: Actions,
    private bookDetailsFacade: BookDetailsFacade,
    private bookService: BooksService,
  ) {}

  @Effect()
  getBookDetails$ = this.actions$.pipe(
    ofType(BookDetailsActionType.GET_BOOK_DETAILS),
    switchMap((action: GetBookDetailsAction) => {
      return this.bookService.getBook$().pipe(
          map((details: BookModel[]) => new GetBookDetailsSuccessAction({ bookDetails: details})
          ),
          catchError(error => of(this.bookDetailsFacade.getBookDetailsError())
          )
        );
    })
  );

  @Effect({ dispatch: false })
  getBookDetailsError$ = this.actions$.pipe(
    ofType(BookDetailsActionType.GET_BOOK_DETAILS_ERROR),
    map((action: GetBookDetailsErrorAction) => {
      console.log('ERROOROOROROOR');
      // this.snackbarService.open(
      //   this.translateService.instant(
      //     "daily-journal.journal-article-details.no-details-for-this-article",
      //     action.payload.articleId
      //   ),
      //   2500,
      //   SnackType.Error
      // );
    })
  );
}
