import { BookDetailsState } from '@syb/store/book-details/book-details.state';
import { selectedBookIdState } from './book-details.selectors';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import {
  BookDetailsActionType,
  GetBookGroupAction,
  GetBookGroupErrorAction,
  GetBookGroupSuccessAction,
  GetBookDetailsAction,
  GetBookDetailsSuccessAction,
  GetBookDetailsErrorAction,
} from '@syb/store/book-details/book-details.actions';
import { BookDetailsFacade } from '@syb/store/book-details/book-details.facade';

import { BooksService } from '@syb/books/books.service';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsEffects {

  constructor(
    private actions$: Actions,
    private bookDetailsFacade: BookDetailsFacade,
    private bookService: BooksService,
    private salesStore: Store<BookDetailsState>,
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
      console.log('Error get group');
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

  @Effect()
  getSaleDetails$ = this.actions$
    .pipe(
      ofType(BookDetailsActionType.GET_BOOK_DETAILS),
      switchMap((action: GetBookDetailsAction) => {
        if (action.payload.bookId) {
          return this.bookService.getBookById$(action.payload.bookId).pipe(
            map((details: BookListModel ) => {
                return new GetBookDetailsSuccessAction({
                  details: details,
                })
              }
            ),
            catchError((error) => of(this.bookDetailsFacade.getBookDetailsError()))
          );
        }
      })
      
    );

  @Effect({ dispatch: false })
  getSaleDetailsError$ = this.actions$
    .pipe(
      ofType(BookDetailsActionType.GET_BOOK_DETAILS_ERROR),
      map((action: GetBookDetailsErrorAction) => {
        
      }
    )
  );
}
