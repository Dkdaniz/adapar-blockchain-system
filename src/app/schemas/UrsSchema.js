const yup = require('yup');

const UrsStoreSchema = yup.object().shape({
  uc_id: yup.number().required(),
  name: yup.string().required(),
});

const UrsUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  uc_id: yup.number(),
  name: yup.string(),
});

const UrsDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  UrsStoreSchema,
  UrsUpdateSchema,
  UrsDeleteSchema,
};
