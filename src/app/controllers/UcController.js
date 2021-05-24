const { uc } = require('../models');

const {
  UcStoreSchema,
  UcUpdateSchema,
  UcDeleteSchema,
} = require('../schemas/UcSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const UcShow = await uc.findOne({
      where: { id },
    });

    return res.status(200).json({ uc: UcShow });
  }

  const data = await uc.findAll();

  res.status(200).json({ uc: data });
}

async function store(req, res) {
  try {
    await UcStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { name } = req.body;

  try {
    const UcStore = await uc.create({
      name,
    });

    res.status(200).json({ uc: UcStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create UC' });
  }
}

async function update(req, res) {
  try {
    await UcUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, name } = req.body;

  const UcUpdate = await uc.findOne({
    where: id,
  });
  if (!UcUpdate) return res.status(404).json({ error: 'UC dont was found' });

  UcUpdate.name = name;

  try {
    await UcUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update UC' });
  }

  res.status(200).json({ uc: UcUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await UcDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await uc.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete UC' });
  }

  res.status(200).json({ messages: 'UC was deleted' });
}

module.exports = (app) => {
  app.get('/uc', show);
  app.post('/uc', store);
  app.put('/uc', update);
  app.delete('/uc', remove);
};
