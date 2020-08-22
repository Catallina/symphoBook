import { selectedBookIdState, bookGroupState } from './book-details.selectors';
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
  GetLastBookAction, GetLastBookSuccessAction, SearchBookSuccessAction, SearchBookAction
} from '@syb/global/book-details/book-details.actions';
import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';

import { BooksService } from '@syb/books/books.service';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import { Store } from '@ngrx/store';
import { BooksJournalService } from '@syb/books-journal/books-journal.service';
import { BookDetailsState } from '@syb/global/book-details/book-details.state';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsEffects {

  constructor(
    private actions$: Actions,
    private bookDetailsFacade: BookDetailsFacade,
    private bookService: BooksService,
    private bookJournalService: BooksJournalService,
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
  getBookDetails$ = this.actions$
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
            catchError((error) => of({
              type: BookDetailsActionType.GET_BOOK_DETAILS_ERROR,
              error
            }))
          );
        }
      })
      
    );

  @Effect()
  getLastVideo$ = this.actions$
    .pipe(
      ofType(BookDetailsActionType.GET_LAST_BOOK),
      switchMap((action: GetLastBookAction) => {
        return this.bookJournalService.getBooksJournal$(action.payload.userId).pipe(
          map((details: BookListModel[]) => {
              return new GetLastBookSuccessAction({
                details: details[0],
              })
            }
          ),
          catchError((error) => of({
            type: BookDetailsActionType.GET_LAST_BOOK_ERROR,
            error
          }))
        );
      })
      
    );

  @Effect()
  searchBook$ = this.actions$
    .pipe(
      ofType(BookDetailsActionType.SEARCH_BOOK),
      switchMap((action: SearchBookAction) => {
        const query = action.payload.query;
        const filterType = action.payload.filterType;

        return this.bookService.searchBook$(filterType, query).pipe(
          map((response: any) => {
            if (response && response.length > 0) {
              return new SearchBookSuccessAction({ bookList: response });
            }
          },
          catchError((error) => of({
            type: BookDetailsActionType.SEARCH_BOOK_ERROR
          }))
        ));
      })
    );

    // @Effect({ dispatch: false })
    // searchBookSuccess$ = this.actions$
    //   .pipe(
    //     ofType(BookDetailsActionType.SEARCH_BOOK_SUCCESS),
    //     withLatestFrom(
    //       this.salesStore.select(bookGroupState),
    //     ),
    //     map((
    //       [action, bookGroup]: [SearchBookSuccessAction, BookGroupModel[]]
    //     ) => {
    //       this.bookDetailsFacade.getBookGroupSuccess(action.payload.bookList)
    //     })
    //   );
}
