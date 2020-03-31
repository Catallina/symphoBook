import { initialBookDetailsState } from '@syb/books/store/book-details/book-details.state';
import { BookDetailsActions, BookDetailsActionType } from '@syb/books/store/book-details/book-details.actions';
import { newState } from '@syb/shared/helper/helper';

export function bookDetailsReducer(
  state = initialBookDetailsState,
  action: BookDetailsActions
) {
  switch (action.type) {

    case BookDetailsActionType.GET_BOOK_DETAILS: {
      return newState(state, {
          busy: true,
      });
    }

    case BookDetailsActionType.GET_BOOK_DETAILS_SUCCESS: {
      return newState(state, {
          busy: false,
          bookDetails: action.payload.bookDetails
      });
    }

    case BookDetailsActionType.GET_BOOK_DETAILS_ERROR: {
      return newState(state, {
          busy: false,
      });
    }

    case BookDetailsActionType.RESET: {
      return newState(state, {
          ...initialBookDetailsState
      });
    }
  }
}
