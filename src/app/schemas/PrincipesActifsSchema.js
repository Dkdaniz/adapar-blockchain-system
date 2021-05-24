const yup = require('yup');

const PrincipesActifsStoreSchema = yup.object().shape({
  description: yup.string().required(),
});

const PrincipesActifsUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  description: yup.string().required(),
});

const PrincipesActifsDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  PrincipesActifsStoreSchema,
  PrincipesActifsUpdateSchema,
  PrincipesActifsDeleteSchema,
};
