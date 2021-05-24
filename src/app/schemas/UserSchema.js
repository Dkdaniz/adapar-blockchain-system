const yup = require('yup');

const UserStoreSchema = yup.object().shape({
  ce_id: yup.number().required(),
  ulsa_id: yup.number().required(),
  uc_id: yup.number().required(),
  urs_id: yup.number().required(),
  position_id: yup.number().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().required(),
  cpf: yup.number().required(),
  crmv: yup.number(),
});

const UserUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  ce_id: yup.number(),
  ulsa_id: yup.number(),
  uc_id: yup.number(),
  urs_id: yup.number(),
  position_id: yup.number(),
  name: yup.string(),
  password: yup.string(),
  email: yup.string(),
  cpf: yup.number(),
  crmv: yup.number(),
});

const UserDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  UserStoreSchema,
  UserUpdateSchema,
  UserDeleteSchema,
};
