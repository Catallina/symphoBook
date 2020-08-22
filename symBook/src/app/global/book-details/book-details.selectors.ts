import { BookGlobalState } from '@syb/global/book.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreConstants } from '@syb/shared/constants/store.constants';

export const bookStore  = createFeatureSelector<BookGlobalState>(StoreConstants.booksStore);

export const busyState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.busy
);

export const bookGroupState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.bookGroup
);

export const searchBookState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.searchBook
);

export const bookDetailsState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.bookDetails
);


export const selectedBookIdState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.selectedBookId
);

export const selectFilterState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.selectedFilter
);


export const lastSelectedBookIdState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.lastSelectedBookId
);

export const lastSelectedBookState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.lastSelectedBook
);

export const currentFileState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.currentFile
);

export const canplayState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.canplay
);

export const loadedmetadataState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.loadedmetadata
);

export const durationState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.duration
);

export const durationSecState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.durationSec
);

export const mediaTypeState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.mediaType
);

export const playingState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.playing
);

export const timeState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.time
);

export const timeSecState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.timeSec
);

export const loadstartState = createSelector(
    bookStore,
    (state: BookGlobalState) => state.bookDetails.loadstart
);
