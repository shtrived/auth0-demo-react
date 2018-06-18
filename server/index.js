const express = require('express');
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
  issuer: `https://${process.env.AUTH0_DOMAIN_ALIAS}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz(['read:clients']);

managementApi.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(checkJwt);

app.get('/api/clients', checkScopes, async (req, res, next) => {
  try {
    const clients = await managementApi.getClients(req.query);
    res.json(clients);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

const port = 3001;
app.listen(port);

console.log(`Server listening on http://localhost:${port}.`);
