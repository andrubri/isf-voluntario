// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,

    //Firebase
    firebase: {
        apiKey: "AIzaSyClunn2-EizzKXnF66k1cCgKRfIyczVtzc",
        authDomain: "isfvoluntarios-9c9fe.firebaseapp.com",
        databaseURL: "https://isfvoluntarios-9c9fe.firebaseio.com",
        projectId: "isfvoluntarios-9c9fe",
        storageBucket: "",
        messagingSenderId: "347138897245",
        appId: "1:347138897245:web:176e58f425d1348551a4b4"
    },

    //Config APP
    config: {
        urlBE: 'http://localhost:5000/api'
    }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
