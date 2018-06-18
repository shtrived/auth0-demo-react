const express = require('express');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const mgtApi = require('./routes/managementApi');

require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const checkJwt = createCheckJwt();
const checkScopes = jwtAuthz(['read:clients']);

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(checkJwt);
app.use(checkScopes);

app.use(express.json());

app.get('/api/clients', mgtApi.getClients);
app.post('/api/tickets/email-verification', mgtApi.postTicketEmailVerification);
app.post('/api/tickets/password-change', mgtApi.postTicketPasswordChange);

app.use(errorHandler);

const port = 3001;
app.listen(port);

console.log(`Server listening on http://localhost:${port}.`);

function createCheckJwt() {
  const jwksUri = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
  const issuer = `https://${process.env.AUTH0_DOMAIN}/`;

  return jwt({
    // Dynamically provide a signing key based on the kid in the
    // header and the signing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: jwksUri
    }),
    // Validate the audience and the issuer
    audience: process.env.AUTH0_AUDIENCE,
    issuer: issuer,
    algorithms: ['RS256']
  });
}
