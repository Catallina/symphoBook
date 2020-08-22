import { ActionReducer, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { environment } from '@env/environment';

import { AppState } from '@syb/store/app.state';
import { coreReducers } from '@syb/store/core/core.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  core: coreReducers,
};

export function logger(reducer: ActionReducer<AppState>): any {
  return storeLogger({
    collapsed: true,
    /*duration: false,*/
    timestamp: false,
    colors: {
      title: () => '#455A64',
      prevState: () => '#795548',
      nextState: () => '#4CAF50',
      action: () => '#2196F3',
      error: () => '#f44336'
    }
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : [logger];
