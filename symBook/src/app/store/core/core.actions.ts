import { Action } from '@ngrx/store';

export enum CoreActionTypes {
  SET_ACTIVE_LANGUAGE = '[Core] Set active language',
}

export class SetActiveLanguage implements Action {
  readonly type = CoreActionTypes.SET_ACTIVE_LANGUAGE;

  constructor(public payload: { language: string }) {}
}

export type CoreActions =
  | SetActiveLanguage;
