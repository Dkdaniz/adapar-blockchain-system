const yup = require('yup');

const UserPositionStoreSchema = yup.object().shape({
  description: yup.string().required(),
});

const UserPositionUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  description: yup.string().required(),
});

const UserPositionDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  UserPositionStoreSchema,
  UserPositionUpdateSchema,
  UserPositionDeleteSchema,
};
