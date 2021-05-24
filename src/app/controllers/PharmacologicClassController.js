const { pharmacologic_class } = require('../models');
const {
  PharmacologicClassStoreSchema,
  PharmacologicClassUpdateSchema,
  PharmacologicClassDeleteSchema,
} = require('../schemas/PharmacologicClassSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const pharmacologicClassShow = await pharmacologic_class.findOne({
      where: { id },
    });

    return res
      .status(200)
      .json({ pharmacologic_class: pharmacologicClassShow });
  }

  const data = await pharmacologic_class.findAll();

  res.status(200).json({ pharmacologic_class: data });
}

async function store(req, res) {
  try {
    await PharmacologicClassStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { description } = req.body;

  try {
    const pharmacologicClassStore = await pharmacologic_class.create({
      description,
    });

    res.status(200).json({ pharmacologic_class: pharmacologicClassStore });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error in create pharmacologic class' });
  }
}

async function update(req, res) {
  try {
    await PharmacologicClassUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, description } = req.body;

  const pharmacologicClassUpdate = await pharmacologic_class.findOne({
    where: id,
  });
  if (!pharmacologicClassUpdate)
    return res
      .status(404)
      .json({ error: 'pharmacologic class dont was found' });

  pharmacologicClassUpdate.description = description;

  try {
    await pharmacologicClassUpdate.save();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in update pharmacologic class' });
  }

  res.status(200).json({ pharmacologic_class: pharmacologicClassUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await PharmacologicClassDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await pharmacologic_class.destroy({ where: { id } });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in delete pharmacologic class' });
  }

  res.status(200).json({ messages: 'pharmacologic class was deleted' });
}

module.exports = (app) => {
  app.get('/pharmacologicClass', show);
  app.post('/pharmacologicClass', store);
  app.put('/pharmacologicClass', update);
  app.delete('/pharmacologicClass', remove);
};
