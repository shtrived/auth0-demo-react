export const AUTH_CONFIG = {
  domain: 'rudydahbura.auth0.com',
  domainAlias: 'idp.letsdoauth.com',
  clientId: 'lsHbUXlIE1d8SLWgOZBCfBL8SbmRCRc-',
  callbackUrl: 'http://localhost:3000/callback',
  logoutUrl: 'http://localhost:3000',
  apiAudience: 'https://api.letsdoauth.com',
  apiUrl: 'http://localhost:3001',
};

export const EMPTY_ARRAY = Object.freeze([]);

export const SORT_DIRECTION = Object.freeze({
  ASC: 'ascending',
  DESC: 'descending',
});

export const INITIAL_STATE = Object.freeze({
  error: undefined,
  isFetching: false,
  items: EMPTY_ARRAY,
  sortColumn: 'name',
  sortDirection: SORT_DIRECTION.ASC,
});
