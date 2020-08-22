
import { ActionReducerMap } from '@ngrx/store';


import { bookDetailsReducer } from '@syb/global/book-details/book-details.reducer';
import { BookGlobalState } from '@syb/global/book.state';

export const bookReducers: ActionReducerMap<BookGlobalState> = {
    bookDetails: bookDetailsReducer,
};
