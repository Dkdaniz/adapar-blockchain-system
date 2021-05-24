const yup = require('yup');

const OmsClassificationStoreSchema = yup.object().shape({
  description: yup.string().required(),
});

const OmsClassificationUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  description: yup.string().required(),
});

const OmsClassificationDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  OmsClassificationStoreSchema,
  OmsClassificationUpdateSchema,
  OmsClassificationDeleteSchema,
};
