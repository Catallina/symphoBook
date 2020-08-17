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

    case BookDetailsActionType.CURRENT_FILE: {
      return newState(state, {
        currentFile: action.payload.currentFile,
      });
    }

    case BookDetailsActionType.AUDIO: {
      return newState(state, {
        loading: false
      });
    }

    case BookDetailsActionType.CANPLAY: {
      return newState(state, {
        canplay: action.payload.value
      });
    }

    case BookDetailsActionType.LOADEDMETADATA: {
      return newState(state, {
        loadedmetadata: action.payload.value,
        duration: action.payload.data.time,
        durationSec: action.payload.data.timeSec,
        mediaType: action.payload.data.mediaType,
      });
    }

    case BookDetailsActionType.PLAYING: {
      return newState(state, {
        playing: action.payload.value
      });
    }

    case BookDetailsActionType.TIMEUPDATE: {
      return newState(state, {
        time: action.payload.time,
        timeSec: action.payload.timeSec
      });
    }

    case BookDetailsActionType.LOADSTART: {
      return newState(state, {
        loadstart: action.payload.value,
      });
    }

    case BookDetailsActionType.RESET: {
      return newState(state, {
          ...initialBookDetailsState
      });
    }
  }
}
