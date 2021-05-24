const yup = require('yup');

const UcStoreSchema = yup.object().shape({
  name: yup.string().required(),
});

const UcUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
});

const UcDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  UcStoreSchema,
  UcUpdateSchema,
  UcDeleteSchema,
};
