import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AudioActions from '@syb/books/store/audio/audio.actions';

import {
  canplayState,
  durationSecState,
  durationState,
  playingState,
  timeSecState,
  timeState,
} from '@syb/books/store/audio/audio.selectors';
import { AudioState } from '@syb/books/store/audio/audio.state';

@Injectable({
    providedIn: 'root'
})
export class AudioFacade {
  constructor (
    private audioStore: Store<AudioState>,
  ) {}

  //ACTIONS
  public setAudio(): void {
    this.audioStore.dispatch(new AudioActions.AudioAction());
  }

  public setCanplay(value): void {
    this.audioStore.dispatch(new AudioActions.CanplayAction({ value: value }));
  }

  public setLoadedMetaData(value, data): void {
    this.audioStore.dispatch(new AudioActions.LoadMetaDataAction({ value: value, data: data }));
  }

  public setPlaying(value): void {
    this.audioStore.dispatch(new AudioActions.PlayingAction({ value: value }));
  }

  public setPause(value): void {
    this.audioStore.dispatch(new AudioActions.PlayingAction({ value: value }));
  }

  public setTimeUpdate(time, timeSec): void {
    this.audioStore.dispatch(new AudioActions.TimeUpdateAction({ time: time, timeSec: timeSec}));
  }

  public setLoadStart(value): void {
    this.audioStore.dispatch(new AudioActions.LoadStartAction({ value: value }));
  }

  public reset(): void {
    this.audioStore.dispatch(new AudioActions.ResetAction());
  }

  //GETTERS
  public getStorePlaying$(): Observable<any> {
    return this.audioStore.select(playingState);
  }

  public getStoreTime$(): Observable<any> {
    return this.audioStore.select(timeState);
  }

  public getStoreTimeSec$(): Observable<any> {
    return this.audioStore.select(timeSecState);
  }

  public getStoreDuration$(): Observable<any> {
    return this.audioStore.select(durationState);
  }

  public getStoreDurationSec$(): Observable<any> {
    return this.audioStore.select(durationSecState);
  }

  public getStoreCanplay$(): Observable<any> {
    return this.audioStore.select(canplayState);
  }

}
