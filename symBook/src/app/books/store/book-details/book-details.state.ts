import { BookModel } from '@syb/books/books.model';

export interface BookDetailsState {
    busy: boolean;
    bookDetails: BookModel[];
}

export const initialBookDetailsState: BookDetailsState = {
    busy: false,
    bookDetails: null,
};
