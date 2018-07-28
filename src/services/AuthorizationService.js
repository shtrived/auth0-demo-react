import auth0 from 'auth0-js';
import random from './Random';
import history from '../history';
import jwt_decode from 'jwt-decode';

import { AUTH_CONFIG } from './AuthConfig';

class AuthorizationService {
  constructor() {
    this.keyLength = 32;
    this.tokenRenewalTimeoutId = 0;
    this.webAuth = new auth0.WebAuth({
      domain: AUTH_CONFIG.domainAlias,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid profile email',
      audience: AUTH_CONFIG.apiAudience,
    });
  }

  clearSession() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getIDToken() {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      throw new Error('No ID token found');
    }
    return idToken;
  }

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    this.webAuth.client.userInfo(accessToken, (err, profile) => {
      cb(err, profile);
    });
  }

  getReturnTo() {
    const returnTo = localStorage.getItem('returnTo');
    localStorage.removeItem('returnTo');
    return returnTo;
  }

  handleAuthentication() {
    const returnTo = this.getReturnTo();
    this.webAuth.parseHash((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setSession(result);
      history.replace(returnTo || '/app');
    });
  }

  hasMfa() {
    const idToken = this.getIDToken();
    const decoded = jwt_decode(idToken);
    return Array.isArray(decoded.amr) && decoded.amr.indexOf('mfa') >= 0;
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  login() {
    const nonce = random.getRandomString(this.keyLength);
    const state = random.getRandomString(this.keyLength);
    this.webAuth.checkSession(
      {
        nonce: nonce,
        state: state,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          this.webAuth.authorize();
          return;
        }
        this.setSession(result);
        history.replace('/app');
      }
    );
  }

  logout() {
    this.clearSession();
    clearTimeout(this.tokenRenewalTimeoutId);
    history.replace('/');
  }

  logoutFederated() {
    this.clearSession();
    clearTimeout(this.tokenRenewalTimeoutId);
    const domain = AUTH_CONFIG.domainAlias;
    const clientID = AUTH_CONFIG.clientId;
    const returnToUrl = encodeURIComponent(AUTH_CONFIG.logoutUrl);
    const url = `https://${domain}/v2/logout?federated&client_id=${clientID}&returnTo=${returnToUrl}`;
    window.location.href = url;
  }

  renewToken() {
    this.webAuth.checkSession({}, (err, result) => {
      if (err) {
        console.log(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
        return;
      }
      this.setSession(result);
      console.log(`Successfully renewed auth!`);
    });
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeoutId = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
    this.scheduleRenewal();
  }

  stepUpAuthentication(returnTo) {
    localStorage.setItem('returnTo', returnTo);
    this.webAuth.authorize({
      acr_values:
        'http://schemas.openid.net/pape/policies/2007/06/multi-factor',
    });
    return;
  }
}

const authorizationService = new AuthorizationService();

export default authorizationService;
