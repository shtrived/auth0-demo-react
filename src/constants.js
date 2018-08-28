const ns = 'https://letsdoauth.com';

export const AUTH_CONFIG = {
  domain: 'rudydahbura.auth0.com',
  domainAlias: 'idp.letsdoauth.com',
  clientId: 'lsHbUXlIE1d8SLWgOZBCfBL8SbmRCRc-',
  callbackUrl: 'https://localhost:3000/callback',
  logoutUrl: 'https://localhost:3000',
  apiAudience: 'https://api.letsdoauth.com',
  apiUrl: 'http://localhost:3001'
};

export const CLAIMS = {
  connection: `${ns}/connection`,
  connectionStrategy: `${ns}/connectionStrategy`,
  country: `${ns}/country`,
  timezone: `${ns}/timezone`
};

export const LOCAL_STORAGE = {
  accessToken: 'access_token',
  expiresAt: 'expires_at',
  idToken: 'id_token',
  returnTo: 'return_to'
};

export const EMPTY_ARRAY = Object.freeze([]);

export const SORT_DIRECTION = Object.freeze({
  ASC: 'ascending',
  DESC: 'descending'
});

export const INITIAL_STATE = Object.freeze({
  error: undefined,
  isFetching: false,
  items: EMPTY_ARRAY,
  sortColumn: 'name',
  sortDirection: SORT_DIRECTION.ASC
});
