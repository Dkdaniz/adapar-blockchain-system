const { oie_classification } = require('../models');

const {
  OieClassificationStoreSchema,
  OieClassificationUpdateSchema,
  OieClassificationDeleteSchema,
} = require('../schemas/OieClassificationSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const oieClassificationShow = await oie_classification.findOne({
      where: { id },
    });

    return res.status(200).json({ oie_classification: oieClassificationShow });
  }

  const data = await oie_classification.findAll();

  res.status(200).json({ oie_classification: data });
}

async function store(req, res) {
  try {
    await OieClassificationStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { description } = req.body;

  try {
    const oieClassificationStore = await oie_classification.create({
      description,
    });

    res.status(200).json({ oie_classification: oieClassificationStore });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error in create oie classification' });
  }
}

async function update(req, res) {
  try {
    await OieClassificationUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, description } = req.body;

  const oieClassificationUpdate = await oie_classification.findOne({
    where: id,
  });
  if (!oieClassificationUpdate)
    return res.status(404).json({ error: 'oie classification dont was found' });

  oieClassificationUpdate.description = description;

  try {
    await oieClassificationUpdate.save();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in update oie classification' });
  }

  res.status(200).json({ oie_classification: oieClassificationUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await OieClassificationDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await oie_classification.destroy({ where: { id } });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in delete oie classification' });
  }

  res.status(200).json({ messages: 'oie classification was deleted' });
}

module.exports = (app) => {
  app.get('/oieClassification', show);
  app.post('/oieClassification', store);
  app.put('/oieClassification', update);
  app.delete('/oieClassification', remove);
};
