import { Action } from '@ngrx/store';

import { BookGroupModel } from '@syb/books/models/book-group.model';
import { BookListModel } from '@syb/books/models/book-list.model';

export enum BookDetailsActionType {
  GET_BOOK_GROUP = '[BOOK][BookDetails] get book group',
  GET_BOOK_GROUP_SUCCESS = '[BOOK][BookDetails] get book group success',
  GET_BOOK_GROUP_ERROR = '[BOOK][BookDetails] get book group error',

  SELECTED_BOOK = '[BOOK][BookDetails] selected book',

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

export class ResetAction implements Action {
  readonly type = BookDetailsActionType.RESET;

  constructor() {}
}

export type BookDetailsActions =
  | GetBookGroupAction
  | GetBookGroupSuccessAction
  | GetBookGroupErrorAction

  | SelectedBookAction

  | ResetAction;
