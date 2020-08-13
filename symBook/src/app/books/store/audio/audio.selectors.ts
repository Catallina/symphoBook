import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookState } from '@syb/books/store/book.state';
import { StoreConstants } from '@syb/shared/constants/store.constants';

export const bookStore  = createFeatureSelector<BookState>(StoreConstants.booksStore);

export const canplayState = createSelector(
    bookStore,
    (state: BookState) => state.audio.canplay
);

export const loadedmetadataState = createSelector(
    bookStore,
    (state: BookState) => state.audio.loadedmetadata
);

export const durationState = createSelector(
    bookStore,
    (state: BookState) => state.audio.duration
);

export const durationSecState = createSelector(
    bookStore,
    (state: BookState) => state.audio.durationSec
);

export const mediaTypeState = createSelector(
    bookStore,
    (state: BookState) => state.audio.mediaType
);

export const playingState = createSelector(
    bookStore,
    (state: BookState) => state.audio.playing
);

export const timeState = createSelector(
    bookStore,
    (state: BookState) => state.audio.time
);

export const timeSecState = createSelector(
    bookStore,
    (state: BookState) => state.audio.timeSec
);

export const loadstartState = createSelector(
    bookStore,
    (state: BookState) => state.audio.loadstart
);
