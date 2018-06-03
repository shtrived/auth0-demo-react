'use strict';

/**
 * Module exports.
 * @public
 */

module.exports = handleError;

/**
 * Error handling logic
 */

function handleError(err, req, res, next) {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    res.status(err.response.data.statusCode).send(err.response.data.message);
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    res.status(500).send(err.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    res.status(500).send(err.message);
  }
}
