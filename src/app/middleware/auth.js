const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { crypto } = require('../../config');

const { logs } = require('../models');

module.exports = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ error: 'unathorized' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, crypto.secret);

    const { email } = req.body;

    if (decoded.email !== email) {
      return res.status(401).json({ error: 'token invalid' });
    }

    await logs.create({
      email,
      method: req.logs.method,
      url: req.logs.url,
      status: req.logs.status,
      date: req.logs.date,
      responseTime: req.logs.responseTime,
      remoteUser: req.logs.remoteUser,
      agentUser: req.logs.agentUser,
    });

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' });
  }
};
