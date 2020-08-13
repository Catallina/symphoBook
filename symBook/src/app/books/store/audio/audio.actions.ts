import { Action } from '@ngrx/store';

export enum AudioActionType {
  AUDIO = '[BOOK][Audio] Audio',
  CANPLAY = '[BOOK][Audio] Canplay',
  LOADEDMETADATA = '[BOOK][Audio] Loaded media data',
  PLAYING = '[BOOK][Audio] Playing',
  TIMEUPDATE = '[BOOK][Audio] Time update',
  LOADSTART = '[BOOK][Audio] Loads start',

  RESET = '[BOOK][Audio] reset'
}

export class AudioAction implements Action {
  readonly type = AudioActionType.AUDIO;
}

export class CanplayAction implements Action {
    readonly type = AudioActionType.CANPLAY;

    constructor(public payload: { value }) {}
}

export class LoadMetaDataAction implements Action {
  readonly type = AudioActionType.LOADEDMETADATA;

  constructor(public payload: { value , data: { time, timeSec, mediaType } }) {}
}

export class PlayingAction implements Action {
  readonly type = AudioActionType.PLAYING;

  constructor(public payload: { value }) {}
}

export class TimeUpdateAction implements Action {
  readonly type = AudioActionType.TIMEUPDATE;

  constructor(public payload: { time, timeSec }) {}
}

export class LoadStartAction implements Action {
  readonly type = AudioActionType.LOADSTART;

  constructor(public payload: { value }) {}
}

export class ResetAction implements Action {
  readonly type = AudioActionType.RESET;

  constructor() {}
}

export type AudioActions =
  | AudioAction
  | CanplayAction
  | LoadMetaDataAction
  | PlayingAction
  | TimeUpdateAction
  | LoadStartAction
  | ResetAction;

