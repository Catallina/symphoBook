import { currentFileState, bookDetailsState } from './book-details.selectors';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as BookDetailsActions from '@syb/store/book-details/book-details.actions';
import {
    bookGroupState,
    busyState,
    selectedBookIdState,
    playingState,
    timeState,
    timeSecState,
    durationState,
    durationSecState,
    canplayState,
} from '@syb/store/book-details/book-details.selectors';
import { BookDetailsState } from '@syb/store/book-details/book-details.state';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { BookGroupModel } from '@syb/books/models/book-group.model';

@Injectable({
    providedIn: 'root'
})
export class BookDetailsFacade {
    constructor (
        private bookStore: Store<BookDetailsState>,
    ) {}

    //ACTIONS
    public getBookGroup(): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookGroupAction());
    }

    public getBookGroupSuccess(bookGroup: BookGroupModel[]): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookGroupSuccessAction({bookGroup: bookGroup}));
    }

    public getBookListError(): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookGroupErrorAction());
    }

    public getBookDetails(bookId: string): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookDetailsAction({ bookId: bookId }));
    }
    
    public getBookDetailsError(): void {
        this.bookStore.dispatch(new BookDetailsActions.GetBookDetailsErrorAction());
    }

    public selectedBook(bookId: string): void {
        this.bookStore.dispatch(new BookDetailsActions.SelectedBookAction({bookId: bookId}));
    }

    public setCurrentFile(currentFile: any): void {
        this.bookStore.dispatch(new BookDetailsActions.CurrentFileAction({currentFile: currentFile}));
    }

    //GETTERS
    public getStoreBusy$(): Observable<boolean> {
        return this.bookStore.select(busyState);
    }

    public getStoreBookGroup$(): Observable<BookGroupModel[]> {
        return this.bookStore.select(bookGroupState);
    }

    public getStoreBook$(): Observable<string> {
        return this.bookStore.select(selectedBookIdState);
    }

    public getStoreBookDetails$(): Observable<BookListModel> {
        return this.bookStore.select(bookDetailsState);
    }

    public getStoreCurrentFile$(): Observable<BookListModel> {
        return this.bookStore.select(currentFileState);
    }


     //ACTIONS
    public setAudio(): void {
        this.bookStore.dispatch(new BookDetailsActions.AudioAction());
    }

    public setCanplay(value): void {
        this.bookStore.dispatch(new BookDetailsActions.CanplayAction({ value: value }));
    }

    public setLoadedMetaData(value, data): void {
        this.bookStore.dispatch(new BookDetailsActions.LoadMetaDataAction({ value: value, data: data }));
    }

    public setPlaying(value): void {
        this.bookStore.dispatch(new BookDetailsActions.PlayingAction({ value: value }));
    }

    public setPause(value): void {
        this.bookStore.dispatch(new BookDetailsActions.PlayingAction({ value: value }));
    }

    public setTimeUpdate(time, timeSec): void {
        this.bookStore.dispatch(new BookDetailsActions.TimeUpdateAction({ time: time, timeSec: timeSec}));
    }

    public setLoadStart(value): void {
        this.bookStore.dispatch(new BookDetailsActions.LoadStartAction({ value: value }));
    }

    public reset(): void {
        this.bookStore.dispatch(new BookDetailsActions.ResetAction());
    }

    //GETTERS
    public getStorePlaying$(): Observable<any> {
        return this.bookStore.select(playingState);
    }

    public getStoreTime$(): Observable<any> {
        return this.bookStore.select(timeState);
    }

    public getStoreTimeSec$(): Observable<any> {
        return this.bookStore.select(timeSecState);
    }

    public getStoreDuration$(): Observable<any> {
        return this.bookStore.select(durationState);
    }

    public getStoreDurationSec$(): Observable<any> {
        return this.bookStore.select(durationSecState);
    }

    public getStoreCanplay$(): Observable<any> {
        return this.bookStore.select(canplayState);
    }
}
