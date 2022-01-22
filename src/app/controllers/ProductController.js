const {
  pharmacologic_class,
  manufacturers,
  stock_produtct,
  oie_classification,
  oms_classification,
  principes_actifs,
  products,
} = require('../models');

const {
  ProductStoreSchema,
  ProductUpdateSchema,
  ProductDeleteSchema,
} = require('../schemas/ProductSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const productShow = await products.findOne({
      where: { id },
    });

    return res.status(200).json({ products: productShow });
  }

  const data = await products.findAll();

  res.status(200).json({ products: data });
}

async function store(req, res) {
  try {
    await ProductStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const {
    pharmacologic_class_id,
    manufacturer_id,
    stock_id,
    oms_id,
    oie_id,
    principes_actifs_id,
    name,
    animal_species,
    administration_route,
    concentration,
    license_identifier,
    license_year,
  } = req.body;

  const pharmacologicClassCheck = await pharmacologic_class.findOne({
    where: { id: pharmacologic_class_id },
  });

  if (!pharmacologicClassCheck)
    return res.status(404).json('Error pharmacologic class dont was found');

  const manufacturerCheck = await manufacturers.findOne({
    where: { id: manufacturer_id },
  });
  if (!manufacturerCheck)
    return res.status(404).json('Error manufacturer dont was found');

  const stockCheck = await stock_produtct.findOne({
    where: { id: stock_id },
  });
  if (!stockCheck)
    return res.status(404).json('Error stock produtct dont was found');

  const omsCheck = await oms_classification.findOne({
    where: { id: oms_id },
  });
  if (!omsCheck)
    return res.status(404).json('Error oms classification dont was found');

  const oieCheck = await oie_classification.findOne({
    where: { id: oie_id },
  });
  if (!oieCheck)
    return res.status(404).json('Error oie classification dont was found');

  const principesActifsCheck = await principes_actifs.findOne({
    where: { id: principes_actifs_id },
  });
  if (!principesActifsCheck)
    return res.status(404).json('Error principes actifs dont was found');

  try {
    const productStore = await products.create({
      pharmacologic_class_id,
      manufacturer_id,
      stock_id,
      oms_id,
      oie_id,
      principes_actifs_id,
      name,
      animal_species,
      administration_route,
      concentration,
      license_identifier,
      license_year,
    });

    res.status(200).json({ products: productStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create product' });
  }
}

async function update(req, res) {
  try {
    await ProductUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const {
    id,
    pharmacologic_class_id,
    manufacturer_id,
    stock_id,
    oms_id,
    oie_id,
    principes_actifs_id,
    name,
    animal_species,
    administration_route,
    concentration,
    license_identifier,
    license_year,
  } = req.body;

  const productUpdate = await products.findOne({
    where: id,
  });

  if (!productUpdate)
    return res.status(400).json({ error: 'product dont was found' });

  if (pharmacologic_class_id) {
    const pharmacologicClassCheck = await pharmacologic_class.findOne({
      where: { id: pharmacologic_class_id },
    });
    if (!pharmacologicClassCheck)
      return res.status(404).json('Error pharmacologic class dont was found');
  }

  if (manufacturer_id) {
    const manufacturerCheck = await manufacturers.findOne({
      where: { id: manufacturer_id },
    });
    if (!manufacturerCheck)
      return res.status(404).json('Error manufacturer dont was found');
  }

  if (stock_id) {
    const stockCheck = await stock_produtct.findOne({
      where: { id: stock_id },
    });
    if (!stockCheck)
      return res.status(404).json('Error stock produtct dont was found');
  }

  if (oms_id) {
    const omsCheck = await oms_classification.findOne({
      where: { id: oms_id },
    });
    if (!omsCheck)
      return res.status(404).json('Error oms classification dont was found');
  }

  if (oie_id) {
    const oieCheck = await oie_classification.findOne({
      where: { id: oie_id },
    });
    if (!oieCheck)
      return res.status(404).json('Error oie classification dont was found');
  }

  if (principes_actifs_id) {
    const principesActifsCheck = await principes_actifs.findOne({
      where: { id: principes_actifs_id },
    });
    if (!principesActifsCheck)
      return res.status(404).json('Error principes actifs dont was found');
  }

  if (name) productUpdate.name = name;
  if (animal_species) productUpdate.animal_species = animal_species;
  if (administration_route)
    productUpdate.administration_route = administration_route;
  if (license_identifier) productUpdate.license_identifier = license_identifier;
  if (license_year) productUpdate.license_year = license_year;
  if (concentration) productUpdate.concentration = concentration;

  try {
    await productUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update assigned ce' });
  }

  res.status(200).json({ product: productUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await ProductDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await products.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete product' });
  }

  res.status(200).json({ messages: 'Product was deleted' });
}

module.exports = (app) => {
  app.get('/products', show);
  app.post('/products', store);
  app.put('/products', update);
  app.delete('/products', remove);
};
