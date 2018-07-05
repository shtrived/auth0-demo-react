'use strict';

const _ = require('lodash');

/**
 * Module exports.
 * @public
 */

module.exports.config = config;
module.exports.getClients = getClients;
module.exports.postTicketEmailVerification = postTicketEmailVerification;
module.exports.postTicketPasswordChange = postTicketPasswordChange;

/**
 * Module dependencies.
 * @private
 */

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

let axiosSecure;

/**
 * Configure by acquiring an access token.
 */

async function config() {
  try {
    const resp = await getAccessToken();

    axiosSecure = axios.create({
      baseURL: `https://${process.env.AUTH0_DOMAIN}/api/v2`,
      headers: { Authorization: 'Bearer ' + resp.data.access_token },
    });
  } catch (err) {
    handleError(err);
  }
}

/**
 * Acquires an access token.
 */

async function getAccessToken() {
  const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;

  const data = {
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };

  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };

  return axios.post(url, data, config);
}

/**
 * Gets a list of clients.
 */

async function getClients(query) {
  const url = '/clients';

  const config = {
    params: query,
    transformResponse: axios.defaults.transformResponse.concat(
      normalizeClients
    ),
  };

  const resp = await axiosSecure.get(url, config);
  return resp.data;

  function normalizeClients(collection) {
    _.forEach(collection, value => {
      !value.description && (value.description = '');
    });
    return collection;
  }
}

/**
 * Create a ticket to verify user's email.
 */

async function postTicketEmailVerification(body) {
  const url = '/tickets/email-verification';

  const data = body;

  const resp = await axiosSecure.post(url, data);
  return resp.data;
}

/**
 * Create a password change ticket for a user.
 */

async function postTicketPasswordChange(body) {
  const url = '/tickets/password-change';

  const data = body;

  const resp = await axiosSecure.post(url, data);
  return resp.data;
}

function handleError(err) {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(err.response.data);
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(err.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', err.message);
  }
}
