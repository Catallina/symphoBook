import { BookGroupModel } from '@syb/books/models/book-group.model';
import { BookListModel } from '@syb/shared/models/book-list.model';

export interface BookDetailsState {
    busy: boolean;
    bookGroup: BookGroupModel[];
    selectedBook: BookListModel;

    canplay: boolean;
    loadedmetadata: any;
    duration: string;
    durationSec: string;
    mediaType: string;
    playing: boolean;
    time: string;
    timeSec: string;
    loadstart: boolean;
    loading: boolean;
}

export const initialBookDetailsState: BookDetailsState = {
    busy: false,
    bookGroup: null,
    selectedBook: null,

    canplay: false,
    loadedmetadata: null,
    duration: null,
    durationSec: null,
    mediaType: null,
    playing: true,
    time: null,
    timeSec: null,
    loadstart: false,
    loading: false,
};
