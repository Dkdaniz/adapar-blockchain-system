const { oms_classification } = require('../models');

const {
  OmsClassificationStoreSchema,
  OmsClassificationUpdateSchema,
  OmsClassificationDeleteSchema,
} = require('../schemas/OmsClassificationSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const omsClassificationShow = await oms_classification.findOne({
      where: { id },
    });

    return res.status(200).json({ oms_classification: omsClassificationShow });
  }

  const data = await oms_classification.findAll();

  res.status(200).json({ oms_classification: data });
}

async function store(req, res) {
  try {
    await OmsClassificationStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { description } = req.body;

  try {
    const omsClassificationStore = await oms_classification.create({
      description,
    });

    res.status(200).json({ oms_classification: omsClassificationStore });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error in create oms classification' });
  }
}

async function update(req, res) {
  try {
    await OmsClassificationUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, description } = req.body;

  const omsClassificationUpdate = await oms_classification.findOne({
    where: id,
  });
  if (!omsClassificationUpdate)
    return res.status(404).json({ error: 'oms classification dont was found' });

  omsClassificationUpdate.description = description;

  try {
    await omsClassificationUpdate.save();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in update oms classification' });
  }

  res.status(200).json({ oms_classification: omsClassificationUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await OmsClassificationDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await oms_classification.destroy({ where: { id } });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in delete oms classification' });
  }

  res.status(200).json({ messages: 'oms classification was deleted' });
}

module.exports = (app) => {
  app.get('/omsClassification', show);
  app.post('/omsClassification', store);
  app.put('/omsClassification', update);
  app.delete('/omsClassification', remove);
};
