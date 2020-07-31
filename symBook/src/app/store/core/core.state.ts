import { environment } from '@env/environment';

export interface CoreState {
  activeLanguage: string;
  pipelineNumber: string;
}

export const initialCoreState: CoreState = {
  activeLanguage: environment.defaultLang,
  pipelineNumber: null,
};
