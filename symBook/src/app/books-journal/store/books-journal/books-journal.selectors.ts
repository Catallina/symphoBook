import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreConstants } from '@syb/shared/constants/store.constants';
import { AppState } from '@syb/store/app.state';
import { JournalState } from '@syb/books-journal/store/books-journal.state';

export const journalStore = createFeatureSelector<JournalState>(StoreConstants.journalStore);

export const busyState = createSelector(
  journalStore,
  (state: JournalState) => state.journalDetails.busy
);

export const detailsState = createSelector(
  journalStore,
  (state: JournalState) => state.journalDetails.bookDetails
);
