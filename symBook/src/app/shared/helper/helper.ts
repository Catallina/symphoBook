import { HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
};

export const newState = (state, newData) => {
    return Object.assign({}, state, newData);
};

export const helper = {
    createTranslateLoader,
    newState,
};
