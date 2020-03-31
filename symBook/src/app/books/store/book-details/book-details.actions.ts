import { Action } from '@ngrx/store';

import { BookModel } from '@syb/books/books.model';

export enum BookDetailsActionType {
  GET_BOOK_DETAILS = '[BOOK][BookDetails] get book details',
  GET_BOOK_DETAILS_SUCCESS = '[BOOK][BookDetails] get book details success',
  GET_BOOK_DETAILS_ERROR = '[BOOK][BookDetails] get book details error',

  RESET = '[BOOK][BookDetails] reset'
}

export class GetBookDetailsAction implements Action {
  readonly type = BookDetailsActionType.GET_BOOK_DETAILS;

  constructor() {}
}

export class GetBookDetailsSuccessAction implements Action {
  readonly type = BookDetailsActionType.GET_BOOK_DETAILS_SUCCESS;

  constructor(public payload: { bookDetails: BookModel[] }) {}
}

export class GetBookDetailsErrorAction implements Action {
  readonly type = BookDetailsActionType.GET_BOOK_DETAILS_ERROR;

  constructor() {}
}

export class ResetAction implements Action {
  readonly type = BookDetailsActionType.RESET;

  constructor() {}
}

export type BookDetailsActions =
  | GetBookDetailsAction
  | GetBookDetailsSuccessAction
  | GetBookDetailsErrorAction

  | ResetAction;
