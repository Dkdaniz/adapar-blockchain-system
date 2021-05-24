const { ce_category } = require('../models');

const {
  CeCategoryStoreSchema,
  CeCategoryUpdateSchema,
  CeCategoryDeleteSchema,
} = require('../schemas/CeCategorySchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const ceCategoryShow = await ce_category.findOne({
      where: { id },
    });

    return res.status(200).json({ ce_category: ceCategoryShow });
  }

  const data = await ce_category.findAll();

  res.status(200).json({ ce_category: data });
}

async function store(req, res) {
  try {
    await CeCategoryStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { description } = req.body;

  try {
    const ceCategoryStore = await ce_category.create({
      description,
    });

    res.status(200).json({ ce_category: ceCategoryStore });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error in create commercial establishments category' });
  }
}

async function update(req, res) {
  try {
    await CeCategoryUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, description } = req.body;

  const ceCategoryUpdate = await ce_category.findOne({ where: id });
  if (!ceCategoryUpdate)
    return res
      .status(404)
      .json({ error: 'commercial establishments category dont was found' });

  ceCategoryUpdate.description = description;

  try {
    await ceCategoryUpdate.save();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in update commercial establishments category' });
  }

  res.status(200).json({ ce_category: ceCategoryUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await CeCategoryDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await ce_category.destroy({ where: { id } });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in delete commercial establishments category' });
  }

  res
    .status(200)
    .json({ messages: 'commercial establishments category was deleted' });
}

module.exports = (app) => {
  app.get('/ceCategory', show);
  app.post('/ceCategory', store);
  app.put('/ceCategory', update);
  app.delete('/ceCategory', remove);
};
