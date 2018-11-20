import auth0 from 'auth0-js';
import jwt_decode from 'jwt-decode';

import history from '../history';

import { CLAIMS, LOCAL_STORAGE } from '../constants';

class AuthorizationService {
  constructor() {
    this.profile = null;
    this.keyLength = 32;
    this.tokenRenewalTimeoutId = 0;
    this.webAuth = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN_ALIAS,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: 'token id_token',
      scope: 'openid profile email',
      audience: process.env.REACT_APP_AUTH0_API_AUDIENCE
    });
  }

  changePassword() {
    return this.getProfile().then(profile => {
      const connection = profile[CLAIMS.connection];
      const email = profile.email;
      return this._changePassword(connection, email);
    });
  }

  getAccessToken() {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.accessToken);
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getIDToken() {
    const idToken = localStorage.getItem(LOCAL_STORAGE.idToken);
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
        history.replace(
          `error/${err.error}/description/${err.errorDescription}`
        );
        return;
      }
      this._setSession(result);
      history.replace(returnTo);
      console.log('Successfully handled authentication.');
    });
  }

  hasMfa() {
    const idToken = this.getIDToken();
    const decoded = jwt_decode(idToken);
    return Array.isArray(decoded.amr) && decoded.amr.indexOf('mfa') >= 0;
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem(LOCAL_STORAGE.expiresAt));
    return new Date().getTime() < expiresAt;
  }

  login(returnTo) {
    this.webAuth.checkSession({}, (err, result) => {
      if (err) {
        const error = err.error;
        const description = err.error_description;
        console.log(
          `Couldn't log in via check session, (${error}: ${description}).`
        );
        this.webAuth.authorize({
          //connection: 'dahbura-adfs-dc-saml'
        });
        return;
      }
      this._setSession(result);
      history.replace(returnTo || '/app');
      console.log('Successfully logged in via check session.');
    });
  }

  logout(sso, federated) {
    this._clearSession();
    clearTimeout(this.tokenRenewalTimeoutId);

    if (!sso) {
      history.replace('/');
      return;
    }

    const domain = process.env.REACT_APP_AUTH0_DOMAIN_ALIAS;
    const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const returnToUrl = encodeURIComponent(
      process.env.REACT_APP_AUTH0_LOGOUT_URL
    );

    let qs = [];
    qs.push(`returnTo=${returnToUrl}`);
    qs.push(`client_id=${clientID}`);
    if (federated) {
      qs.push('federated');
    }

    const url = `https://${domain}/v2/logout?` + qs.join('&');

    window.location.href = url;
  }

  stepUpAuthentication(returnTo) {
    this._setReturnTo(returnTo);
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
    const returnTo = localStorage.getItem(LOCAL_STORAGE.returnTo) || '/app';
    localStorage.removeItem(LOCAL_STORAGE.returnTo);
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
        console.log(`Couldn't renew token, (${error}: ${description}).`);
        return;
      }
      this._setSession(result);
      console.log('Successfully renewed token.');
    });
  }

  _scheduleRenewal() {
    const leeway = 5 * 60 * 1000; // renew token 5 minutes prior to expiration
    const expiresAt = JSON.parse(localStorage.getItem(LOCAL_STORAGE.expiresAt));
    const delay = expiresAt - Date.now() - leeway;
    if (delay > 0) {
      this.tokenRenewalTimeoutId = setTimeout(() => {
        this._renewToken();
      }, delay);
    }
  }

  _setReturnTo(returnTo) {
    localStorage.setItem(LOCAL_STORAGE.returnTo, returnTo || '/app');
  }

  _setSession(authResult) {
    const time = new Date().getTime();
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + time);
    localStorage.setItem(LOCAL_STORAGE.idToken, authResult.idToken);
    localStorage.setItem(LOCAL_STORAGE.accessToken, authResult.accessToken);
    localStorage.setItem(LOCAL_STORAGE.expiresAt, expiresAt);
    this._scheduleRenewal();
  }
}

const authorizationService = new AuthorizationService();

export default authorizationService;
