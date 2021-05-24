const yup = require('yup');

const AssignedCeStoreSchema = yup.object().shape({
  user_id: yup.number().required(),
  ce_id: yup.number().required(),
  status_id: yup.number().required(),
});

const AssignedCeUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  user_id: yup.number(),
  ce_id: yup.number(),
  status_id: yup.number(),
});

const AssignedCeDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  AssignedCeStoreSchema,
  AssignedCeUpdateSchema,
  AssignedCeDeleteSchema,
};
