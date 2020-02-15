// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "/facedetect/v1",

  // CONFIGURACOES DO SSO
  SSO_issuer: 'https://login.des.caixa/auth/realms/intranet',
  SSO_redirectUri: window.location.origin + '/home',
  SSO_silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  SSO_clientId: 'cli-web-gmo',
  SSO_scope: 'openid profile email voucher',
  SSO_REFRESH_TOKEN_INTERVAL: 100000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
