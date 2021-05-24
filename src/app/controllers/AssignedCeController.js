const {
  assigned_ce,
  users,
  commercial_establishments,
  status,
} = require('../models');

const {
  AssignedCeStoreSchema,
  AssignedCeUpdateSchema,
  AssignedCeDeleteSchema,
} = require('../schemas/AssignedCeSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const assignedCeShow = await assigned_ce.findOne({
      where: { id },
    });

    return res.status(200).json({ assigned_ce: assignedCeShow });
  }

  const data = await assigned_ce.findAll();

  res.status(200).json({ assigned_ce: data });
}

async function store(req, res) {
  try {
    await AssignedCeStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { user_id, ce_id, status_id } = req.body;

  const userTemp = await users.findOne({ where: { id: user_id } });
  if (!userTemp) return res.status(404).json('Error user dont was found');

  const commercialEstablishmentsTemp = await commercial_establishments.findOne({
    where: { id: ce_id },
  });
  if (!commercialEstablishmentsTemp)
    return res
      .status(404)
      .json('Error commercial establishments dont was found');

  const statusTemp = await status.findOne({ where: { id: user_id } });
  if (!statusTemp) return res.status(404).json('Error status dont was found');

  try {
    const assignedCeStore = await assigned_ce.create({
      user_id,
      ce_id,
      status_id,
    });

    res.status(200).json({ assigned_ce: assignedCeStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create assigned_ce' });
  }
}

async function update(req, res) {
  try {
    await AssignedCeUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { id, user_id, ce_id, status_id } = req.body;

  const assignedCeUpdate = await assigned_ce.findOne({
    where: id,
  });

  if (!assignedCeUpdate)
    return res.status(400).json({ error: 'assigned ce dont was found' });

  if (user_id) {
    const userTemp = await users.findOne({ where: { id: user_id } });
    if (!userTemp) return res.status(404).json('Error user dont was found');
    assignedCeUpdate.user_id = user_id;
  }
  if (ce_id) {
    const commercialEstablishmentsTemp = await commercial_establishments.findOne(
      {
        where: { id: ce_id },
      }
    );
    if (!commercialEstablishmentsTemp)
      return res
        .status(404)
        .json('Error commercial establishments dont was found');

    assignedCeUpdate.ce_id = ce_id;
  }
  if (status_id) {
    const statusTemp = await status.findOne({ where: { id: user_id } });
    if (!statusTemp) return res.status(404).json('Error status dont was found');
    assignedCeUpdate.status_id = status_id;
  }

  try {
    await assignedCeUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update assigned ce' });
  }

  res.status(200).json({ assigned_ce: assignedCeUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await AssignedCeDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await assigned_ce.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete assigned ce' });
  }

  res.status(200).json({ messages: 'Assigned ce was deleted' });
}

module.exports = (app) => {
  app.get('/assignedCe', show);
  app.post('/assignedCe', store);
  app.put('/assignedCe', update);
  app.delete('/assignedCe', remove);
};
