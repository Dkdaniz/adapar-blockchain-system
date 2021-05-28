const {
  commercial_establishments,
  ulsa,
  uc,
  urs,
  users,
  user_position,
} = require('../models');

const {
  userStoreSchema,
  userUpdateSchema,
  userDeleteSchema,
} = require('../schemas/UserSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const userShow = await users.findOne({
      where: { id },
    });

    return res.status(200).json({ users: userShow });
  }

  const data = await users.findAll();

  res.status(200).json({ users: data });
}

async function store(req, res) {
  try {
    await userStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const {
    ce_id,
    ulsa_id,
    uc_id,
    urs_id,
    position_id,
    name,
    password,
    email,
    cpf,
    crmv,
  } = req.body;

  const commercialEstablishmentsCheck = await commercial_establishments.findOne(
    {
      where: { id: ce_id },
    }
  );
  if (!commercialEstablishmentsCheck)
    return res
      .status(404)
      .json('Error commercial establishments dont was found');

  const ulsaCheck = await ulsa.findOne({
    where: { id: ulsa_id },
  });
  if (!ulsaCheck) return res.status(404).json('Error ulsa dont was found');

  const ucCheck = await uc.findOne({
    where: { id: uc_id },
  });
  if (!ucCheck) return res.status(404).json('Error uc dont was found');

  const ursCheck = await urs.findOne({
    where: { id: urs_id },
  });
  if (!ursCheck) return res.status(404).json('Error urs dont was found');

  const positionCheck = await user_position.findOne({
    where: { id: position_id },
  });
  if (!positionCheck)
    return res.status(404).json('Error user position dont was found');

  try {
    const userStore = await users.create({
      ce_id,
      ulsa_id,
      uc_id,
      urs_id,
      position_id,
      name,
      password,
      email,
      cpf,
      crmv,
    });

    res.status(200).json({ users: userStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create users' });
  }
}

async function update(req, res) {
  try {
    await userUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const {
    id,
    ce_id,
    ulsa_id,
    uc_id,
    urs_id,
    position_id,
    name,
    password,
    email,
    cpf,
    crmv,
  } = req.body;

  const userUpdate = await users.findOne({
    where: id,
  });

  if (!userUpdate)
    return res.status(400).json({ error: 'assigned ce dont was found' });

  if (ce_id) {
    const commercialEstablishmentsCheck = await commercial_establishments.findOne(
      {
        where: { id: ce_id },
      }
    );
    if (!commercialEstablishmentsCheck)
      return res
        .status(404)
        .json('Error commercial establishments dont was found');

    userUpdate.ce_id = ce_id;
  }

  if (ulsa_id) {
    const ulsaCheck = await ulsa.findOne({
      where: { id: ulsa_id },
    });
    if (!ulsaCheck) return res.status(404).json('Error ulsa dont was found');

    userUpdate.ulsa_id = ulsa_id;
  }

  if (uc_id) {
    const ucCheck = await uc.findOne({
      where: { id: uc_id },
    });
    if (!ucCheck) return res.status(404).json('Error uc dont was found');

    userUpdate.uc_id = uc_id;
  }

  if (urs_id) {
    const ursCheck = await urs.findOne({
      where: { id: urs_id },
    });
    if (!ursCheck) return res.status(404).json('Error urs dont was found');

    userUpdate.urs_id = urs_id;
  }

  if (position_id) {
    const positionCheck = await user_position.findOne({
      where: { id: position_id },
    });
    if (!positionCheck)
      return res.status(404).json('Error user position dont was found');

    userUpdate.position_id = position_id;
  }

  if (name) userUpdate.name = name;
  if (password) userUpdate.password = password;
  if (email) userUpdate.email = email;
  if (cpf) userUpdate.cpf = cpf;
  if (crmv) userUpdate.crmv = crmv;

  try {
    await userUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update user' });
  }

  res.status(200).json({ users: userUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await userDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await users.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete user' });
  }

  res.status(200).json({ messages: 'User was deleted' });
}

module.exports = (app) => {
  app.get('/users', show);
  app.post('/users', store);
  app.put('/users', update);
  app.delete('/users', remove);
};
