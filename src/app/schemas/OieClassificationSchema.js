const yup = require('yup');

const OmsStoreSchema = yup.object().shape({
  description: yup.string().required(),
});

const OmsUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  description: yup.string().required(),
});

const OmsDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  OmsStoreSchema,
  OmsUpdateSchema,
  OmsDeleteSchema,
};
