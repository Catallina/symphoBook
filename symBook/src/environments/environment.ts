import { NgxLoggerLevel } from 'ngx-logger';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  logLevel: NgxLoggerLevel.DEBUG,
  firebase: {
    apiKey: 'AIzaSyCWEMwrS9Al5a_p0YUps-ezxL8_0LPh7io',
    authDomain: 'symphobook-43327.firebaseapp.com',
    databaseURL: 'https://symphobook-43327.firebaseio.com',
    projectId: 'symphobook-43327',
    storageBucket: 'symphobook-43327.appspot.com',
    messagingSenderId: '967776041518',
    appId: '1:967776041518:web:fd0f8add9d8ad2f2f23dbf',
    measurementId: 'G-6ECZBFEQMT'
  },
  defaultLang: 'eng',
  additionalLanguages: ['ro', 'deu'],
  apiUrl: 'http://localhost:8080/',
  defaultUrl: '/books'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
