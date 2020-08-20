import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '@syb/store/app.state';
import { StoreConstants } from '@syb/shared/constants/store.constants';

export const bookStore  = createFeatureSelector<AppState>(StoreConstants.booksStore);

export const busyState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.busy
);

export const bookGroupState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.bookGroup
);

export const bookDetailsState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.bookDetails
);


export const selectedBookIdState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.selectedBookId
);

export const lastSelectedBookIdState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.lastSelectedBookId
);

export const lastSelectedBookState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.lastSelectedBook
);

export const currentFileState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.currentFile
);

export const canplayState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.canplay
);

export const loadedmetadataState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.loadedmetadata
);

export const durationState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.duration
);

export const durationSecState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.durationSec
);

export const mediaTypeState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.mediaType
);

export const playingState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.playing
);

export const timeState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.time
);

export const timeSecState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.timeSec
);

export const loadstartState = createSelector(
    bookStore,
    (state: AppState) => state.bookDetails.loadstart
);
