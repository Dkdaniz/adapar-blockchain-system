const yup = require('yup');

const StockProductStoreSchema = yup.object().shape({
  product_id: yup.number().required(),
  ce_id: yup.number().required(),
  quantity: yup.number().required(),
  stock_in: yup.number().required(),
  stock_out: yup.number().required(),
  losses: yup.number().required(),
});

const StockProductUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  product_id: yup.number(),
  ce_id: yup.number(),
  quantity: yup.number(),
  stock_in: yup.number(),
  stock_out: yup.number(),
  losses: yup.number(),
});

const StockProductDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  StockProductStoreSchema,
  StockProductUpdateSchema,
  StockProductDeleteSchema,
};
