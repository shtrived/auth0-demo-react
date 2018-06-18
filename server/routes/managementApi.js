const managementApi = require('../proxies/managementApi');
managementApi.config();

exports.getClients = async (req, res, next) => {
  try {
    const clients = await managementApi.getClients(req.query);
    res.json(clients);
  } catch (err) {
    next(err);
  }
};

exports.postTicketEmailVerification = async (req, res, next) => {
  try {
    const ticket = await managementApi.postTicketEmailVerification(req.body);
    res.json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.postTicketPasswordChange = async (req, res, next) => {
  try {
    const ticket = await managementApi.postTicketPasswordChange(req.body);
    res.json(ticket);
  } catch (err) {
    next(err);
  }
};
