import { Action } from '@ngrx/store';

export enum CoreActionTypes {
  SET_ACTIVE_LANGUAGE = '[Core] Set active language',
  SET_PIPELINE = '[Core] Set pipeline',
}

export class SetActiveLanguage implements Action {
  readonly type = CoreActionTypes.SET_ACTIVE_LANGUAGE;

  constructor(public payload: { language: string }) {}
}
export class SetPipeline implements Action {
  readonly type = CoreActionTypes.SET_PIPELINE;

  constructor(public payload: { pipelineNumber: string }) {}
}

export type CoreActions =
  | SetActiveLanguage
  | SetPipeline;
