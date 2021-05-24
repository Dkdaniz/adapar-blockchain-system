const yup = require('yup');

const UserStoreSchema = yup.object().shape({
  ulsa_id: yup.number().required(),
  city_id: yup.number().required(),
  category_id: yup.number().required(),
  status_id: yup.number().required(),
  status_auditor_id: yup.number().required(),
  name: yup.string().required(),
  commercial_name: yup.number().required(),
  cnpj: yup.number().required(),
  state_registration: yup.number().required(),
  address: yup.string().required(),
  contact_number: yup.number().required(),
  email: yup.string().required(),
  register_number: yup.number().required(),
  register_data: yup.date().required(),
});

const UserUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  ulsa_id: yup.number(),
  city_id: yup.number(),
  category_id: yup.number(),
  status_id: yup.number(),
  status_auditor_id: yup.number(),
  name: yup.string(),
  commercial_name: yup.number(),
  cnpj: yup.number(),
  state_registration: yup.number(),
  address: yup.string(),
  contact_number: yup.number(),
  email: yup.string(),
  register_number: yup.number(),
  register_data: yup.date(),
});

const UserDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  UserStoreSchema,
  UserUpdateSchema,
  UserDeleteSchema,
};
