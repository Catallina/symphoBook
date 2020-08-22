import { BookListModel } from '@syb/shared/models/book-list.model';

export interface BooksJournalState {
  bookDetails: BookListModel[];
  busy: boolean;
}

export const initialBooksJournalState: BooksJournalState = {
  bookDetails: null,
  busy: false,
};
