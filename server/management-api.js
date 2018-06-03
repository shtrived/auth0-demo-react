'use strict';

/**
 * Module exports.
 * @public
 */

module.exports.config = config;
module.exports.getUsers = getUsers;

/**
 * Module dependencies.
 * @private
 */

const axios = require('axios');
const dotenv = require('dotenv');

let axiosSecure;

dotenv.config();

/**
 * Configure by acquiring an access token.
 */

function config() {
  getAccessToken()
    .then(resp => {
      console.log(resp.data.access_token);
      axiosSecure = axios.create({
        baseURL: `https://${process.env.AUTH0_DOMAIN}/api/v2`,
        headers: { Authorization: 'Bearer ' + resp.data.access_token }
      });
    })
    .catch(handleError);
}

/**
 * Acquires an access token.
 */

function getAccessToken() {
  const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;

  const data = {
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  };

  const config = {
    headers: {
      'content-type': 'application/json'
    }
  };

  return axios.post(url, data, config);
}

/**
 * Gets a list of users.
 */

function getUsers() {
  const url = '/users';
  return axiosSecure.get(url);
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
