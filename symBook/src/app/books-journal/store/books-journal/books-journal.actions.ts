
import { Action } from '@ngrx/store';
import { BookListModel } from '@syb/shared/models/book-list.model';

export enum JournalBooksActionTypes {
  GET_BOOK_DETAILS = '[JOURNAL][BookDetails] Get book details',
  GET_BOOK_DETAILS_SUCCESS = '[JOURNAL][BookDetails] Get book details success',
  GET_BOOK_DETAILS_ERROR = '[JOURNAL][BookDetails] Get book details error',

  DELETE_BOOK = 'JOURNAL][BookDetails] Delete book',
  DELETE_BOOK_SUCCESS = 'JOURNAL][BookDetails] Delete book success',
  DELETE_BOOK_ERROR = 'JOURNAL][BookDetails] Delete book error',

  RESET = '[JOURNAL][BookDetails] Reset',
}

// GET ARTICLE DETAILS
export class GetBookDetailsAction implements Action {
  readonly type = JournalBooksActionTypes.GET_BOOK_DETAILS;

  constructor(public payload: { userId: string }) { }
}

export class GetBookDetailsSuccessAction implements Action {
  readonly type = JournalBooksActionTypes.GET_BOOK_DETAILS_SUCCESS;

  constructor(public payload: { bookDetails: BookListModel[] }) { }
}

export class GetBookDetailsErrorAction implements Action {
  readonly type = JournalBooksActionTypes.GET_BOOK_DETAILS_ERROR;

  constructor() {}
}

export class DeleteBookAction implements Action {
  readonly type = JournalBooksActionTypes.DELETE_BOOK;

  constructor(public payload: { userId: string }) {}
}

export class DeleteBookActionSuccess implements Action {
  readonly type = JournalBooksActionTypes.DELETE_BOOK_SUCCESS;

  constructor(public payload: { bookDetails:  BookListModel[]}) {}
}

export class DeleteBookActionError implements Action {
  readonly type = JournalBooksActionTypes.DELETE_BOOK_ERROR;

  constructor() {}
}

export class ResetAction implements Action {
  readonly type = JournalBooksActionTypes.RESET;

  constructor() { }
}

export type JournalBookDetailsActions =
  | GetBookDetailsAction
  | GetBookDetailsSuccessAction
  | GetBookDetailsErrorAction

  | DeleteBookAction

  | ResetAction;
