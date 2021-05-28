const { manufacturers } = require('../models');

const {
  ManufacturersStoreSchema,
  ManufacturersUpdateSchema,
  ManufacturersDeleteSchema,
} = require('../schemas/ManufacturersSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const manufacturersShow = await manufacturers.findOne({
      where: { id },
    });

    return res.status(200).json({ manufacturers: manufacturersShow });
  }

  const data = await manufacturers.findAll();

  res.status(200).json({ manufacturers: data });
}

async function store(req, res) {
  try {
    await ManufacturersStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const {
    name,
    commercial_name,
    cnpj,
    address,
    contact_number,
    email,
  } = req.body;

  try {
    const manufacturersStore = await manufacturers.create({
      name,
      commercial_name,
      cnpj,
      address,
      contact_number,
      email,
    });

    res.status(200).json({ manufacturers: manufacturersStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create manufacturers' });
  }
}

async function update(req, res) {
  try {
    await ManufacturersUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const {
    id,
    name,
    commercial_name,
    cnpj,
    address,
    contact_number,
    email,
  } = req.body;

  const manufacturersUpdate = await manufacturers.findOne({
    where: id,
  });
  if (!manufacturersUpdate)
    return res.status(404).json({ error: 'manufacturers dont was found' });

  if (name) manufacturers.name = name;
  if (commercial_name) manufacturers.commercial_name = commercial_name;
  if (cnpj) manufacturers.cnpj = cnpj;
  if (address) manufacturers.address = address;
  if (contact_number) manufacturers.contact_number = contact_number;
  if (email) manufacturers.email = email;

  try {
    await manufacturersUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update manufacturers' });
  }

  res.status(200).json({ manufacturers: manufacturersUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await ManufacturersDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await manufacturers.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete manufacturers' });
  }

  res.status(200).json({ messages: 'manufacturers was deleted' });
}

module.exports = (app) => {
  app.get('/manufacturers', show);
  app.post('/manufacturers', store);
  app.put('/manufacturers', update);
  app.delete('/manufacturers', remove);
};
