import { CoreActions, CoreActionTypes } from '@syb/store/core/core.actions';
import { CoreState, initialCoreState } from '@syb/store/core/core.state';

export function coreReducers(
  state = initialCoreState,
  action: CoreActions): CoreState {

  switch (action.type) {

    case CoreActionTypes.SET_ACTIVE_LANGUAGE:
      state.activeLanguage = action.payload.language;

      return state;

    case CoreActionTypes.SET_PIPELINE:
      state.pipelineNumber = action.payload.pipelineNumber;

      return state;

    default:
      return state;
  }
}
