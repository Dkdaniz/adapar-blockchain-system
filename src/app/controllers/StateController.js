const { state } = require('../models');
const {
  StateStoreSchema,
  StateUpdateSchema,
  StateDeleteSchema,
} = require('../schemas/StateSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const stateShow = await state.findOne({
      where: { id },
    });

    return res.status(200).json({ state: stateShow });
  }

  const data = await state.findAll();

  res.status(200).json({ state: data });
}

async function store(req, res) {
  try {
    await StateStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { description } = req.body;

  try {
    const stateStore = await state.create({
      description,
    });

    res.status(200).json({ status: stateStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create state' });
  }
}

async function update(req, res) {
  try {
    await StateUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, description } = req.body;

  const stateUpdate = await state.findOne({ where: id });
  if (!stateUpdate)
    return res.status(404).json({ error: 'error state dont was found' });

  stateUpdate.description = description;

  try {
    await stateUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update state' });
  }

  res.status(200).json({ status: stateUpdate });
}

async function remove(req, res) {
  const { id } = req.query;

  try {
    await StateDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await state.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete state' });
  }

  res.status(200).json({ messages: 'state was deleted' });
}

module.exports = (app) => {
  app.get('/state', show);
  app.post('/state', store);
  app.put('/state', update);
  app.delete('/state', remove);
};
