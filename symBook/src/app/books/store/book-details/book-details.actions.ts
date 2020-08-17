import { Action } from '@ngrx/store';

import { BookGroupModel } from '@syb/books/models/book-group.model';
import { BookListModel } from '@syb/shared/models/book-list.model';

export enum BookDetailsActionType {
  GET_BOOK_GROUP = '[BOOK][BookDetails] get book group',
  GET_BOOK_GROUP_SUCCESS = '[BOOK][BookDetails] get book group success',
  GET_BOOK_GROUP_ERROR = '[BOOK][BookDetails] get book group error',

  SELECTED_BOOK = '[BOOK][BookDetails] selected book',
  CURRENT_FILE = '[BOOK][BookDetails] current file',

  AUDIO = '[BOOK][Audio] Audio',
  CANPLAY = '[BOOK][Audio] Canplay',
  LOADEDMETADATA = '[BOOK][Audio] Loaded media data',
  PLAYING = '[BOOK][Audio] Playing',
  TIMEUPDATE = '[BOOK][Audio] Time update',
  LOADSTART = '[BOOK][Audio] Loads start',

  RESET = '[BOOK][BookDetails] reset'
}

export class GetBookGroupAction implements Action {
  readonly type = BookDetailsActionType.GET_BOOK_GROUP;

  constructor() {}
}

export class GetBookGroupSuccessAction implements Action {
  readonly type = BookDetailsActionType.GET_BOOK_GROUP_SUCCESS;

  constructor(public payload: { bookGroup: BookGroupModel[] }) {}
}

export class GetBookGroupErrorAction implements Action {
  readonly type = BookDetailsActionType.GET_BOOK_GROUP_ERROR;

  constructor() {}
}

export class SelectedBookAction implements Action {
  readonly type = BookDetailsActionType.SELECTED_BOOK;

  constructor(public payload: { bookDetails: BookListModel }) {}
}

export class CurrentFileAction implements Action {
  readonly type = BookDetailsActionType.CURRENT_FILE;

  constructor(public payload: { currentFile: any }) {}
}


export class AudioAction implements Action {
  readonly type = BookDetailsActionType.AUDIO;
}

export class CanplayAction implements Action {
    readonly type = BookDetailsActionType.CANPLAY;

    constructor(public payload: { value }) {}
}

export class LoadMetaDataAction implements Action {
  readonly type = BookDetailsActionType.LOADEDMETADATA;

  constructor(public payload: { value , data: { time, timeSec, mediaType } }) {}
}

export class PlayingAction implements Action {
  readonly type = BookDetailsActionType.PLAYING;

  constructor(public payload: { value }) {}
}

export class TimeUpdateAction implements Action {
  readonly type = BookDetailsActionType.TIMEUPDATE;

  constructor(public payload: { time, timeSec }) {}
}

export class LoadStartAction implements Action {
  readonly type = BookDetailsActionType.LOADSTART;

  constructor(public payload: { value }) {}
}

export class ResetAction implements Action {
  readonly type = BookDetailsActionType.RESET;

  constructor() {}
}

export type BookDetailsActions =
  | GetBookGroupAction
  | GetBookGroupSuccessAction
  | GetBookGroupErrorAction

  | SelectedBookAction
  | CurrentFileAction

  | AudioAction
  | CanplayAction
  | LoadMetaDataAction
  | PlayingAction
  | TimeUpdateAction
  | LoadStartAction

  | ResetAction;
