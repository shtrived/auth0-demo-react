import auth0 from 'auth0-js';

import history from '../history';

import { AUTH_CONFIG } from './auth-variables';

class AuthorizationService {
  constructor() {
    this.webAuth = new auth0.WebAuth({
      domain: AUTH_CONFIG.domainAlias,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: AUTH_CONFIG.apiAudience,
      responseType: 'token id_token',
      scope: 'openid profile email',
    });
    this.tokenRenewalTimeoutId = 0;
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    this.webAuth.client.userInfo(accessToken, (err, profile) => {
      cb(err, profile);
    });
  }

  handleAuthentication() {
    this.webAuth.parseHash((err, result) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);
        history.replace('/app');
        return;
      }
      if (err) {
        history.replace('/');
        console.log(err);
        return;
      }
      history.replace('/');
    });
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  login() {
    this.webAuth.authorize({
      doaminAlias: AUTH_CONFIG.domainAlias,
    });
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
    const returnToUrl = AUTH_CONFIG.callbackUrl;
    const url = `https://${domain}/v2/logout?client_id=${clientID}&returnTo=${returnToUrl}`;
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

  clearSession() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
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
}

const authorizationService = new AuthorizationService();

export default authorizationService;
