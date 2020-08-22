import { JournalState } from '@syb/books-journal/store/books-journal.state';
import { ActionReducerMap } from '@ngrx/store';
import { journalBookDetailsReducer } from './books-journal/books-journal.reducer';


export const JournalReducers: ActionReducerMap<JournalState> = {
    journalDetails: journalBookDetailsReducer,
};