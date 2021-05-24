const yup = require('yup');

const StateStoreSchema = yup.object().shape({
  description: yup.string().required(),
});

const StateUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  description: yup.string().required(),
});

const StateDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  StateStoreSchema,
  StateUpdateSchema,
  StateDeleteSchema,
};
