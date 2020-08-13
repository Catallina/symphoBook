import { newState } from '@syb/shared/helper/helper';
import { initialAudioState } from '@syb/books/store/audio/audio.state';
import { AudioActions, AudioActionType } from '@syb/books/store/audio/audio.actions';

export function mediaStateReducer(
  state = initialAudioState,
  action: AudioActions
) {
  switch (action.type) {

    case AudioActionType.AUDIO: {
      return newState(state, {
        loading: false
      });
    }

    case AudioActionType.CANPLAY: {
      return newState(state, {
        canplay: action.payload.value
      });
    }

    case AudioActionType.LOADEDMETADATA: {
      return newState(state, {
        loadedmetadata: action.payload.value,
        duration: action.payload.data.time,
        durationSec: action.payload.data.timeSec,
        mediaType: action.payload.data.mediaType,
      });
    }

    case AudioActionType.PLAYING: {
      return newState(state, {
        playing: action.payload.value
      });
    }

    case AudioActionType.TIMEUPDATE: {
      return newState(state, {
        time: action.payload.time,
        timeSec: action.payload.timeSec
      });
    }

    case AudioActionType.LOADSTART: {
      return newState(state, {
        loadstart: action.payload.value,
      });
    }

    case AudioActionType.RESET: {
      return newState(state, {
        ...initialAudioState
      });
    }
  }
}
