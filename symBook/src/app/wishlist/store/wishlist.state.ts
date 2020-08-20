import { BookListModel } from '@syb/shared/models/book-list.model';

export interface WishlistState {
  bookDetails: BookListModel[];
}

export const initialWishlistState: WishlistState = {
  bookDetails: null,
};
