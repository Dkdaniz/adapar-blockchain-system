const yup = require('yup');

const StatusStoreSchema = yup.object().shape({
  description: yup.string().required(),
});

const StatusUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  description: yup.string().required(),
});

const StatusDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  StatusStoreSchema,
  StatusUpdateSchema,
  StatusDeleteSchema,
};
