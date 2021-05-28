const { uc, urs } = require('../models');

const {
  UrsStoreSchema,
  UrsUpdateSchema,
  UrsDeleteSchema,
} = require('../schemas/UrsSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const ursShow = await urs.findOne({
      where: { id },
    });

    return res.status(200).json({ urs: ursShow });
  }

  const data = await urs.findAll();

  res.status(200).json({ urs: data });
}

async function store(req, res) {
  try {
    await UrsStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { uc_id, name } = req.body;

  const ursCheck = await uc.findOne({ where: uc_id });
  if (!ursCheck)
    return res.status(404).json({ error: 'error urs dont was found' });

  try {
    const ursStore = await urs.create({
      uc_id,
      name,
    });

    res.status(200).json({ urs: ursStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create urs' });
  }
}

async function update(req, res) {
  try {
    await UrsUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, uc_id, name } = req.body;

  const ursUpdate = await urs.findOne({
    where: id,
  });
  if (!ursUpdate) return res.status(404).json({ error: 'urs dont was found' });

  if (uc_id) {
    const ursCheck = await uc.findOne({ where: uc_id });
    if (!ursCheck)
      return res.status(404).json({ error: 'error urs dont was found' });

    ursUpdate.uc_id = uc_id;
  }

  if (name) ursUpdate.name = name;

  try {
    await ursUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update urs' });
  }

  res.status(200).json({ urs: ursUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await UrsDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await urs.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete urs' });
  }

  res.status(200).json({ messages: 'urs was deleted' });
}

module.exports = (app) => {
  app.get('/urs', show);
  app.post('/urs', store);
  app.put('/urs', update);
  app.delete('/urs', remove);
};
