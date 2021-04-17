const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const { users } = require('../models');
const { crypto } = require('../../config');

async function store(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(401).json({ error: 'Error: Nao Autorizado' });
  }

  if (!password) {
    return res.status(401).json({ error: 'Error: Nao Autorizado' });
  }

  const userUpdate = await users.findOne({
    where: { email },
  });

  if (!userUpdate)
    return res.status(401).json({ error: 'Error: Nao Autorizado' });

  if (userUpdate.status !== 'liberado') {
    return res
      .status(404)
      .json({ error: 'Usuario Bloqueado: Entre em contato com o suporte' });
  }

  const match = await bcrypt.compare(password, userUpdate.password);

  if (!match)
    return res
      .status(401)
      .json({ error: 'Error: Credencial Invalida', status: 401 });

  if (userUpdate.isConnected === true) {
    userUpdate.status = 'bloqueado';
    await userUpdate.save();
    return res
      .status(401)
      .json({ error: 'Usuario bloqueado: Login em duas ou mais maquina' });
  }

  if (userUpdate.token !== '') {
    try {
      userUpdate.isConnected = true;

      await promisify(jwt.verify)(userUpdate.token, crypto.secret);

      await userUpdate.save();

      return res.status(200).json({ messages: userUpdate, status: 200 });
    } catch (error) {
      return res
        .status(401)
        .json({ error: 'Error: Nao Autorizado', status: 401 });
    }
  }

  userUpdate.isConnected = true;

  userUpdate.token = await jwt.sign({ email }, crypto.secret, {
    expiresIn: crypto.expiresIn,
  });

  try {
    await userUpdate.save();
    return res.status(200).json({ messages: userUpdate, status: 200 });
  } catch (error) {
    return res.status(404).json({
      error: 'Erro: Nao foi possivel gerar autenticacao, contate o suporte',
      status: 400,
    });
  }
}

async function update(req, res) {
  const { token } = req.headers;

  if (token !== '') {
    try {
      const { email } = await promisify(jwt.verify)(token, crypto.secret);

      const userUpdate = await users.findOne({
        where: { email },
      });

      userUpdate.isConnected = false;

      await userUpdate.save();
      return res.status(200).json({ messages: userUpdate, status: 200 });
    } catch (error) {
      return res
        .status(401)
        .json({ error: 'Error: Nao Autorizado', status: 401 });
    }
  } else {
    return res.status(401).json({ error: 'Error: Nao Autorizado' });
  }
}

module.exports = (app) => {
  app.post('/session', store);
  app.put('/session', update);
};
