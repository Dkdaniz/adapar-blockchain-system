const { status } = require('../models');
const {
  StatusStoreSchema,
  StatusUpdateSchema,
  StatusDeleteSchema,
} = require('../schemas/StatusSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const statusShow = await status.findOne({
      where: { id },
    });

    return res.status(200).json({ status: statusShow });
  }

  const data = await status.findAll();

  res.status(200).json({ status: data });
}

async function store(req, res) {
  try {
    await StatusStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { description } = req.body;

  try {
    const statusStore = await status.create({
      description,
    });

    res.status(200).json({ status: statusStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create status' });
  }
}

async function update(req, res) {
  try {
    await StatusUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, description } = req.body;

  const statusUpdate = await status.findOne({ where: id });
  if (!statusUpdate)
    return res.status(404).json({ error: 'status dont was found' });

  statusUpdate.description = description;

  try {
    await statusUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update status' });
  }

  res.status(200).json({ status: statusUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await StatusDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await status.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete status' });
  }

  res.status(200).json({ messages: 'status was deleted' });
}

module.exports = (app) => {
  app.get('/status', show);
  app.post('/status', store);
  app.put('/status', update);
  app.delete('/status', remove);
};
