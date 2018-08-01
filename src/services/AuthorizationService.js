import auth0 from 'auth0-js';
import random from './Random';
import history from '../history';
import jwt_decode from 'jwt-decode';

import { AUTH_CONFIG } from '../constants';

class AuthorizationService {
  constructor() {
    this.profile = null;
    this.keyLength = 32;
    this.tokenRenewalTimeoutId = 0;
    this.webAuth = new auth0.WebAuth({
      domain: AUTH_CONFIG.domainAlias,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid profile email',
      audience: AUTH_CONFIG.apiAudience
    });
  }

  changePassword() {
    return this.getProfile().then(profile => {
      const connection = profile['https://letsdoauth.com/connection'];
      const email = profile.email;
      return this._changePassword(connection, email);
    });
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

  getProfile() {
    if (this.profile) {
      return Promise.resolve(this.profile);
    }
    return this._getUserInfo();
  }

  handleAuthentication() {
    const returnTo = this._getReturnTo();
    this.webAuth.parseHash((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      this._setSession(result);
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
        state: state
      },
      (err, result) => {
        if (err) {
          console.log(err);
          this.webAuth.authorize({
            // connection_scope: 'openid sdpp-w',
          });
          return;
        }
        this._setSession(result);
        history.replace('/app');
      }
    );
  }

  logout() {
    this._clearSession();
    clearTimeout(this.tokenRenewalTimeoutId);
    history.replace('/');
  }

  logoutFederated() {
    this._clearSession();
    clearTimeout(this.tokenRenewalTimeoutId);
    const domain = AUTH_CONFIG.domainAlias;
    const clientID = AUTH_CONFIG.clientId;
    const returnToUrl = encodeURIComponent(AUTH_CONFIG.logoutUrl);
    const url = `https://${domain}/v2/logout?federated&client_id=${clientID}&returnTo=${returnToUrl}`;
    window.location.href = url;
  }

  stepUpAuthentication(returnTo) {
    localStorage.setItem('returnTo', returnTo);
    this.webAuth.authorize({
      acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'
    });
  }

  _changePassword(connection, email) {
    return new Promise((resolve, reject) => {
      this.webAuth.changePassword(
        {
          connection: connection,
          email: email
        },
        (err, resp) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(resp);
        }
      );
    });
  }

  _clearSession() {
    localStorage.clear();
  }

  _getReturnTo() {
    const returnTo = localStorage.getItem('returnTo');
    localStorage.removeItem('returnTo');
    return returnTo;
  }

  _getUserInfo() {
    const accessToken = this.getAccessToken();
    return new Promise((resolve, reject) => {
      this.webAuth.client.userInfo(accessToken, (err, profile) => {
        if (err) {
          reject(err);
          return;
        }
        this.profile = profile;
        resolve(this.profile);
      });
    });
  }

  _renewToken() {
    this.webAuth.checkSession({}, (err, result) => {
      if (err) {
        const error = err.error;
        const description = err.error_description;
        console.log(`Couldn't get a new token, (${error}: ${description}).`);
        return;
      }
      this._setSession(result);
      console.log('Successfully renewed auth!');
    });
  }

  _scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeoutId = setTimeout(() => {
        this._renewToken();
      }, delay);
    }
  }

  _setSession(authResult) {
    const time = new Date().getTime();
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + time);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
    this._scheduleRenewal();
  }
}

const authorizationService = new AuthorizationService();

export default authorizationService;
