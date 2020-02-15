export const environment = {
  production: true,
  apiUrl: "/facedetect/v1",

  // CONFIGURACOES DO SSO
  SSO_issuer: 'https://login.des.caixa/auth/realms/intranet',
  SSO_redirectUri: window.location.origin + '/home',
  SSO_silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  SSO_clientId: 'cli-web-gmo',
  SSO_scope: 'openid profile email voucher',
  SSO_REFRESH_TOKEN_INTERVAL: 100000
};
