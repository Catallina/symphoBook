import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as BookDetailsActions from '@syb/books/store/book-details/book-details.actions';
import {
    busyState,
    bookDetailsState,
} from '@syb/books/store/book-details/book-details.selectors';
import { BookDetailsState } from '@syb/books/store/book-details/book-details.state';
import { BookModel } from '@syb/books/books.model';

@Injectable({
    providedIn: 'root'
})
export class BookDetailsFacade {
    constructor (
        private bookStore: Store<BookDetailsState>,
    ) {}

    //ACTIONS
    public getBookDetails(): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookDetailsAction());
    }

    public getBookDetailsSuccess(bookDetails: BookModel[]): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookDetailsSuccessAction({bookDetails: bookDetails}));
    }

    public getBookDetailsError(): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookDetailsErrorAction());
    }

    public reset(): void {
        this.bookStore.dispatch(new BookDetailsActions.ResetAction());
    }

    //GETTERS
    public getStoreBusy$(): Observable<boolean> {
        return this.bookStore.select(busyState);
    }

    public getStoreBookDetails$(): Observable<BookModel[]> {
        return this.bookStore.select(bookDetailsState);
    }
}
