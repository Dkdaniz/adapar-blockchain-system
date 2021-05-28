const { ulsa, urs } = require('../models');

const {
  UlsaStoreSchema,
  UlsaUpdateSchema,
  UlsaDeleteSchema,
} = require('../schemas/UlsaSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const ulsaShow = await ulsa.findOne({
      where: { id },
    });

    return res.status(200).json({ ulsa: ulsaShow });
  }

  const data = await ulsa.findAll();

  res.status(200).json({ ulsa: data });
}

async function store(req, res) {
  try {
    await UlsaStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { urs_id, name } = req.body;

  const ursCheck = await urs.findOne({ where: urs_id });
  if (!ursCheck)
    return res.status(404).json({ error: 'error urs dont was found' });

  try {
    const ulsaStore = await ulsa.create({
      urs_id,
      name,
    });

    res.status(200).json({ ulsa: ulsaStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create ulsa' });
  }
}

async function update(req, res) {
  try {
    await UlsaUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, urs_id, name } = req.body;

  const ulsaUpdate = await ulsa.findOne({
    where: id,
  });
  if (!ulsaUpdate)
    return res.status(404).json({ error: 'ulsa dont was found' });

  if (urs_id) {
    const ursCheck = await urs.findOne({ where: urs_id });
    if (!ursCheck)
      return res.status(404).json({ error: 'error urs dont was found' });

    ulsaUpdate.urs_id = urs_id;
  }

  if (name) ulsaUpdate.name = name;

  try {
    await ulsaUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update ulsa' });
  }

  res.status(200).json({ ulsa: ulsaUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await UlsaDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await ulsa.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete ulsa' });
  }

  res.status(200).json({ messages: 'ulsa was deleted' });
}

module.exports = (app) => {
  app.get('/ulsa', show);
  app.post('/ulsa', store);
  app.put('/ulsa', update);
  app.delete('/ulsa', remove);
};
