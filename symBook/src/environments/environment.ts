import { NgxLoggerLevel } from 'ngx-logger';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  logLevel: NgxLoggerLevel.DEBUG,
  firebase: {
    apiKey: 'AIzaSyCWEMwrS9Al5a_p0YUps-ezxL8_0LPh7io',
    authDomain: '',
    databaseURL: '',
    projectId: 'symphobook-43327',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  },
  defaultLang: 'eng',
  additionalLanguages: ['ro', 'deu'],
  apiUrl: 'https://',
  defaultUrl: 'books'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
