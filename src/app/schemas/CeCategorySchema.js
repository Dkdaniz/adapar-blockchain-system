const yup = require('yup');

const CeCategoryStoreSchema = yup.object().shape({
  description: yup.string().required(),
});

const CeCategoryUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  description: yup.string(),
});

const CeCategoryDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  CeCategoryStoreSchema,
  CeCategoryUpdateSchema,
  CeCategoryDeleteSchema,
};
