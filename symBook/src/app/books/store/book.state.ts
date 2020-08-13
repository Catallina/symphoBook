import { BookDetailsState } from '@syb/books/store/book-details/book-details.state';
import { AudioState } from '@syb/books/store/audio/audio.state';

export interface BookState {
    bookDetails: BookDetailsState;
    audio: AudioState;
}
