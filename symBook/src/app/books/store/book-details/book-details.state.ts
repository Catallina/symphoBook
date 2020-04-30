import { BookGroupModel } from '@syb/books/models/book-group.model';
import { BookListModel } from '@syb/books/models/book-list.model';

export interface BookDetailsState {
    busy: boolean;
    bookGroup: BookGroupModel[];
    selectedBook: BookListModel;
}

export const initialBookDetailsState: BookDetailsState = {
    busy: false,
    bookGroup: null,
    selectedBook: null,
};
