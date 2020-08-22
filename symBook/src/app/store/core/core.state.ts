import { environment } from '@env/environment';

export interface CoreState {
  activeLanguage: string;
}

export const initialCoreState: CoreState = {
  activeLanguage: environment.defaultLang,
};
