const jwt = require('jsonwebtoken');

const { users } = require('../models');
const { crypto } = require('../../config');

async function store(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(401).json({ error: 'Error: Unauthorized' });
  }

  if (!password) {
    return res.status(401).json({ error: 'Error: Unauthorized' });
  }

  const user = await users.findOne({
    where: { email },
  });

  if (!user) return res.status(401).json({ error: 'Error: Unauthorized' });

  user.token = await jwt.sign({ email }, crypto.secret, {
    expiresIn: crypto.expiresIn,
  });

  try {
    await user.save();
    return res.status(200).json({ user, status: 200 });
  } catch (error) {
    return res.status(401).json({
      error: 'Error: Unauthorized',
      status: 400,
    });
  }
}

module.exports = (app) => {
  app.post('/session', store);
};
