import { BookListModel } from '@syb/shared/models/book-list.model';

export interface BooksJournalState {
  bookDetails: BookListModel[];
}

export const initialBooksJournalState: BooksJournalState = {
  bookDetails: null,
};
