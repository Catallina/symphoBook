import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookState } from '@syb/books/store/book.state';
import { StoreConstants } from '@syb/shared/constants/store.constants';

export const bookStore  = createFeatureSelector<BookState>(StoreConstants.booksStore);

export const busyState = createSelector(
    bookStore,
    (state: BookState) => state.bookDetails.busy
);

export const bookGroupState = createSelector(
    bookStore,
    (state: BookState) => state.bookDetails.bookGroup
);

export const selectedBookIdState = createSelector(
    bookStore,
    (state: BookState) => state.bookDetails.selectedBook
);
