import { ActionReducerMap } from '@ngrx/store';

import { BookState } from '@syb/books/store/book.state';
import { mediaStateReducer } from '@syb/books/store/audio/audio.reducer';
import { bookDetailsReducer } from '@syb/books/store/book-details/book-details.reducer';

export const BookReducers: ActionReducerMap<BookState> = {
    bookDetails: bookDetailsReducer,
    audio: mediaStateReducer,
};
