const yup = require('yup');

const PharmacologicClassStoreSchema = yup.object().shape({
  description: yup.string().required(),
});

const PharmacologicClassUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  description: yup.string().required(),
});

const PharmacologicClassDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  PharmacologicClassStoreSchema,
  PharmacologicClassUpdateSchema,
  PharmacologicClassDeleteSchema,
};
