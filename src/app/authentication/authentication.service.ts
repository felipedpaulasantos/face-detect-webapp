import { Injectable } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { JwtHelperService } from '@auth0/angular-jwt';
import { filter } from 'rxjs/operators';

import { authConfig } from './guards/authconfig';
import { UserService } from './users/user.service';
import { User } from './users/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private oauthService: OAuthService,
        private userService: UserService
    ) {}

  initSSO() {

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.loadDiscoveryDocumentAndLogin().then( doc => {
      this.oauthService.tryLogin().then(_ => {
        if (this.oauthService.hasValidAccessToken()) {
          this.buscarPerfil();
          this.defineSetInterval();
          this.oauthService.clearHashAfterLogin = false;
        } else {
        }
      });
    });

    this.setOauthEvents();
  }

  buscarPerfil() {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.oauthService.getAccessToken());
    if (decodedToken) {
      const usr = {
        nome_completo: decodedToken.given_name,
        primeiro_nome: decodedToken.given_name.split(' ')[0],
        matricula: decodedToken.preferred_username,
        roles: decodedToken.realm_access.roles
      } as User;
      this.userService.perfil.next(usr);
    }
  }

  private defineSetInterval() {

    setInterval(() => {
      this.oauthService.silentRefresh();
    }, 10000);
  }

  private setOauthEvents() {

    this.oauthService.events.subscribe(e => {
      console.debug('oauth/oidc event', e);
    });

    this.oauthService.events
    .pipe(filter(e => e.type === 'session_terminated'))
    .subscribe(e => {
      console.debug('Your session has been terminated!');
      this.userService.perfil.next(null);
    });

    this.oauthService.events
    .pipe(filter(e => e.type === 'token_received'))
    .subscribe(e => {
      console.debug('Token received!');
      // this.userService.perfil.next(this.oauthService.getIdentityClaims());
      this.buscarPerfil();
    });
  }
}
