
import { newState } from '@syb/shared/helper/helper';
import { initialBooksJournalState } from '@syb/books-journal/store/books-journal/books-journal.state';
import { JournalBookDetailsActions, JournalBooksActionTypes } from '@syb/books-journal/store/books-journal/books-journal.actions';


export function journalBookDetailsReducer(
  state = initialBooksJournalState,
  action: JournalBookDetailsActions
) {
  switch (action.type) {

    case JournalBooksActionTypes.GET_BOOK_DETAILS: {
      return newState(state, {
        busy: true,
      });
    }

    case JournalBooksActionTypes.GET_BOOK_DETAILS_SUCCESS: {
      return newState(state, {
        busy: false,
        bookDetails: action.payload.bookDetails
      });
    }

    case JournalBooksActionTypes.GET_BOOK_DETAILS_ERROR: {
      return newState(state, {
        busy: false,
      });
    }

    case JournalBooksActionTypes.RESET: {
      return newState(state, {
        ...initialBooksJournalState
      });
    }

    default:
      return state;
  }
}
