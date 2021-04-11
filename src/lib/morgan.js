const { logs } = require('../app/models');

module.exports = (info, req, res) => {
  let responseTime = 9999;
  try {
    responseTime = parseFloat(info['response-time'](req, res).split('.')[0]);
  } catch (e) {}

  logs.create({
    email: req.body.email ? req.body.email : '',
    method: info.method(req, res),
    url: info.url(req, res),
    status: info.status(req, res),
    date: info.date(req, res),
    ip: info['remote-addr'](req, res),
    responseTime,
    remoteUser: info['remote-user'](req, res),
    agentUser: info['user-agent'](req, res),
  });
};
