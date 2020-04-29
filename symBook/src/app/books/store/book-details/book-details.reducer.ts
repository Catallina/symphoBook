import { initialBookDetailsState } from '@syb/books/store/book-details/book-details.state';
import { BookDetailsActions, BookDetailsActionType } from '@syb/books/store/book-details/book-details.actions';
import { newState } from '@syb/shared/helper/helper';

export function bookDetailsReducer(
  state = initialBookDetailsState,
  action: BookDetailsActions
) {
  switch (action.type) {

    case BookDetailsActionType.GET_BOOK_GROUP: {
      return newState(state, {
          busy: true,
      });
    }

    case BookDetailsActionType.GET_BOOK_GROUP_SUCCESS: {
      return newState(state, {
          busy: false,
          bookGroup: action.payload.bookGroup
      });
    }

    case BookDetailsActionType.GET_BOOK_GROUP_ERROR: {
      return newState(state, {
          busy: false,
      });
    }

    case BookDetailsActionType.SELECTED_BOOK: {
      return newState(state, {
        selectedBook: action.payload.bookDetails,
      });
    }

    case BookDetailsActionType.RESET: {
      return newState(state, {
          ...initialBookDetailsState
      });
    }
  }
}
