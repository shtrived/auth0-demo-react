const express = require('express');
const axios = require('axios');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const managementApi = require('./management-api');

require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

managementApi.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the
  // header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz(['read:users']);

app.get('/api/users', checkJwt, checkScopes, function(req, res, next) {
  managementApi
    .getUsers()
    .then(response => res.json(response.data))
    .catch(next);
});

app.use(errorHandler);

const port = 3001;
app.listen(port);
console.log(`Server listening on http://localhost:${port}.`);
