const yup = require('yup');

const UlsaStoreSchema = yup.object().shape({
  urs_id: yup.number().required(),
  name: yup.string().required(),
});

const UlsaUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  urs_id: yup.number(),
  name: yup.string(),
});

const UlsaDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  UlsaStoreSchema,
  UlsaUpdateSchema,
  UlsaDeleteSchema,
};
