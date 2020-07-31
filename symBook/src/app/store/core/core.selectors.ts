import { AppState } from '@syb/store/app.state';

export const activeLanguageState = (state: AppState) => state.core.activeLanguage;
export const pipelineNumberState = (state: AppState) => state.core.pipelineNumber;
