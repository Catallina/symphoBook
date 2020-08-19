import { CoreState } from '@syb/store/core/core.state';
import { BookDetailsState } from '@syb/store/book-details/book-details.state';


export interface AppState {
  core: CoreState;
  bookDetails: BookDetailsState;
}
