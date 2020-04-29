import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import {
  BookDetailsActionType,
  GetBookGroupAction,
  GetBookGroupErrorAction,
  GetBookGroupSuccessAction,
} from '@syb/books/store/book-details/book-details.actions';
import { BookDetailsFacade } from '@syb/books/store/book-details/book-details.facade';

import { BooksService } from '@syb/books/books.service';
import { BookGroupModel } from '@syb/books/models/book-group.model';

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
  getBookGroup$ = this.actions$.pipe(
    ofType(BookDetailsActionType.GET_BOOK_GROUP),
    switchMap((action: GetBookGroupAction) => {
      return this.bookService.getBook$().pipe(
          map((details: BookGroupModel[]) => {
            return new GetBookGroupSuccessAction({ bookGroup: details});
            }
          ),
          catchError(error => of(this.bookDetailsFacade.getStoreBookGroup$())
          )
        );
    })
  );

  @Effect({ dispatch: false })
  getBookGroupError$ = this.actions$.pipe(
    ofType(BookDetailsActionType.GET_BOOK_GROUP_ERROR),
    map((action: GetBookGroupErrorAction) => {
      console.log('ERROOROOROROOR');
      // this.snackbarService.open(
      //   this.translateService.instant(
      //     "book-journal.no-details-book",
      //     action.payload.articleId
      //   ),
      //   2500,
      //   SnackType.Error
      // );
    })
  );
}
