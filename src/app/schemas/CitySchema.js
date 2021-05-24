const yup = require('yup');

const CityStoreSchema = yup.object().shape({
  state_id: yup.number().required(),
  description: yup.string().required(),
});

const CityUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  state_id: yup.string(),
  description: yup.string(),
});

const CityDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  CityStoreSchema,
  CityUpdateSchema,
  CityDeleteSchema,
};
