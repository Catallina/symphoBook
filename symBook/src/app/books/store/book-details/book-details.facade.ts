import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as BookDetailsActions from '@syb/books/store/book-details/book-details.actions';
import {
    bookGroupState,
    busyState,
    selectedBookIdState,
} from '@syb/books/store/book-details/book-details.selectors';
import { BookDetailsState } from '@syb/books/store/book-details/book-details.state';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { BookGroupModel } from '@syb/books/models/book-group.model';

@Injectable({
    providedIn: 'root'
})
export class BookDetailsFacade {
    constructor (
        private bookStore: Store<BookDetailsState>,
    ) {}

    //ACTIONS
    public getBookGroup(): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookGroupAction());
    }

    public getBookGroupSuccess(bookGroup: BookGroupModel[]): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookGroupSuccessAction({bookGroup: bookGroup}));
    }

    public getBookListError(): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookGroupErrorAction());
    }

    public reset(): void {
        this.bookStore.dispatch(new BookDetailsActions.ResetAction());
    }

    public selectedBook(bookDetails: BookListModel): void {
        this.bookStore.dispatch(new BookDetailsActions.SelectedBookAction({bookDetails: bookDetails}));
    }

    //GETTERS
    public getStoreBusy$(): Observable<boolean> {
        return this.bookStore.select(busyState);
    }

    public getStoreBookGroup$(): Observable<BookGroupModel[]> {
        return this.bookStore.select(bookGroupState);
    }

    public getStoreBook$(): Observable<BookListModel> {
        return this.bookStore.select(selectedBookIdState);
    }
}
