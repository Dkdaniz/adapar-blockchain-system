const { principes_actifs } = require('../models');
const {
  PrincipesActifsStoreSchema,
  PrincipesActifsUpdateSchema,
  PrincipesActifsDeleteSchema,
} = require('../schemas/PrincipesActifsSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const principesActifsShow = await principes_actifs.findOne({
      where: { id },
    });

    return res.status(200).json({ principes_actifs: principesActifsShow });
  }

  const data = await principes_actifs.findAll();

  res.status(200).json({ principes_actifs: data });
}

async function store(req, res) {
  try {
    await PrincipesActifsStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { description } = req.body;

  try {
    const principesActifsStore = await principes_actifs.create({
      description,
    });

    res.status(200).json({ principes_actifs: principesActifsStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create principes actifs' });
  }
}

async function update(req, res) {
  try {
    await PrincipesActifsUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, description } = req.body;

  const principesActifsUpdate = await principes_actifs.findOne({ where: id });
  if (!principesActifsUpdate)
    return res.status(404).json({ error: 'principes actifs dont was found' });

  principesActifsUpdate.description = description;

  try {
    await principesActifsUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update principes actifs' });
  }

  res.status(200).json({ principes_actifs: principesActifsUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await PrincipesActifsDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await principes_actifs.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete principes actifs' });
  }

  res.status(200).json({ messages: 'principes actifs was deleted' });
}

module.exports = (app) => {
  app.get('/principesActifs', show);
  app.post('/principesActifs', store);
  app.put('/principesActifs', update);
  app.delete('/principesActifs', remove);
};
