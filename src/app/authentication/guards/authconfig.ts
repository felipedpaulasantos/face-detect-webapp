import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.SSO_issuer,
  redirectUri: environment.SSO_redirectUri,
  silentRefreshRedirectUri: environment.SSO_silentRefreshRedirectUri,
  clientId: environment.SSO_clientId,
  scope: environment.SSO_scope,
};
