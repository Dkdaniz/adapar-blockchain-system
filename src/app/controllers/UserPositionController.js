const { user_position } = require('../models');

const {
  UserPositionStoreSchema,
  UserPositionUpdateSchema,
  UserPositionDeleteSchema,
} = require('../schemas/UserPositionSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const userPositionShow = await user_position.findOne({
      where: { id },
    });

    return res.status(200).json({ user_position: userPositionShow });
  }

  const data = await user_position.findAll();

  res.status(200).json({ user_position: data });
}

async function store(req, res) {
  try {
    await UserPositionStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { description } = req.body;

  try {
    const userPositionStore = await user_position.create({
      description,
    });

    res.status(200).json({ user_position: userPositionStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create user position' });
  }
}

async function update(req, res) {
  try {
    await UserPositionUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, description } = req.body;

  const userPositionUpdate = await user_position.findOne({
    where: id,
  });
  if (!userPositionUpdate)
    return res.status(404).json({ error: 'User position dont was found' });

  userPositionUpdate.description = description;

  try {
    await userPositionUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update user position' });
  }

  res.status(200).json({ user_position: userPositionUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await UserPositionDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await user_position.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete user position' });
  }

  res.status(200).json({ messages: 'User position was deleted' });
}

module.exports = (app) => {
  app.get('/userPosition', show);
  app.post('/userPosition', store);
  app.put('/userPosition', update);
  app.delete('/userPosition', remove);
};
