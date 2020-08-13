export class MediaModel {
  canplay: any;
  loadedmetadata: any;
  duration: any;
  durationSec: any;
  mediaType: any;
  playing: any;
  time: any;
  timeSec: any;
  loadstart: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
