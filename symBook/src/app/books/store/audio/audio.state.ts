export interface AudioState {
    canplay: boolean;
    loadedmetadata: any;
    duration: string;
    durationSec: string;
    mediaType: string;
    playing: boolean;
    time: string;
    timeSec: string;
    loadstart: boolean;
    loading: boolean;
}

export const initialAudioState: AudioState = {
    canplay: false,
    loadedmetadata: null,
    duration: null,
    durationSec: null,
    mediaType: null,
    playing: true,
    time: null,
    timeSec: null,
    loadstart: false,
    loading: false,
};
