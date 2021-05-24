const yup = require('yup');

const ManufacturersStoreSchema = yup.object().shape({
  name: yup.number().required(),
  commercial_name: yup.string().required(),
  cnpj: yup.number().required(),
  address: yup.string().required(),
  contact_number: yup.number().required(),
  email: yup.string().required(),
});

const ManufacturersUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.number(),
  commercial_name: yup.string(),
  cnpj: yup.number(),
  address: yup.string(),
  contact_number: yup.number(),
  email: yup.string(),
});

const ManufacturersDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  ManufacturersStoreSchema,
  ManufacturersUpdateSchema,
  ManufacturersDeleteSchema,
};
