const {
  products,
  commercial_establishments,
  stock_product,
} = require('../models');
const {
  StockProductStoreSchema,
  StockProductUpdateSchema,
  StockProductDeleteSchema,
} = require('../schemas/StockProductSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const stockProductShow = await stock_product.findOne({
      where: { id },
    });

    return res.status(200).json({ stock_product: stockProductShow });
  }

  const data = await stock_product.findAll();

  res.status(200).json({ stock_product: data });
}

async function store(req, res) {
  try {
    await StockProductStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const { product_id, ce_id, quantity, stock_in, stock_out, losses } = req.body;

  const productCheck = await products.findOne({
    where: { id: product_id },
  });
  if (!productCheck)
    return res.status(404).json('Error product dont was found');

  const ceCheck = await commercial_establishments.findOne({
    where: { id: ce_id },
  });
  if (!ceCheck)
    return res
      .status(404)
      .json('Error commercial establishments dont was found');

  try {
    const stockProductStore = await stock_product.create({
      product_id,
      ce_id,
      quantity,
      stock_in,
      stock_out,
      losses,
    });

    res.status(200).json({ stock_product: stockProductStore });
  } catch (error) {
    return res.status(400).json({ error: 'Error in create stockProduct' });
  }
}

async function update(req, res) {
  try {
    await StockProductUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const {
    id,
    product_id,
    ce_id,
    quantity,
    stock_in,
    stock_out,
    losses,
  } = req.body;

  const stockProductUpdate = await stock_product.findOne({ where: id });
  if (!stockProductUpdate)
    return res
      .status(404)
      .json({ error: 'error stock product dont was found' });

  if (product_id) {
    const productCheck = await products.findOne({
      where: { id: product_id },
    });
    if (!productCheck)
      return res.status(404).json('Error product dont was found');

    stockProductUpdate.product_id = product_id;
  }

  if (ce_id) {
    const ceCheck = await commercial_establishments.findOne({
      where: { id: ce_id },
    });
    if (!ceCheck)
      return res
        .status(404)
        .json('Error commercial establishments dont was found');
    stockProductUpdate.ce_id = ce_id;
  }

  if (quantity) stockProductUpdate.quantity = quantity;
  if (stock_in) stockProductUpdate.stock_in = stock_in;
  if (stock_out) stockProductUpdate.stock_out = stock_out;
  if (losses) stockProductUpdate.losses = losses;

  try {
    await stockProductUpdate.save();
  } catch (error) {
    return res.status(400).json({ error: 'error in update stock product' });
  }

  res.status(200).json({ status: stockProductUpdate });
}

async function remove(req, res) {
  const { id } = req.query;

  try {
    await StockProductDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await stock_product.destroy({ where: { id } });
  } catch (error) {
    return res.status(400).json({ error: 'error in delete stock product' });
  }

  res.status(200).json({ messages: 'stock product was deleted' });
}

module.exports = (app) => {
  app.get('/stockProduct', show);
  app.post('/stockProduct', store);
  app.put('/stockProduct', update);
  app.delete('/stockProduct', remove);
};
