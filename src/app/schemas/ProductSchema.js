const yup = require('yup');

const UcStoreSchema = yup.object().shape({
  pharmacologic_class_id: yup.number().required(),
  manufacturer_id: yup.number().required(),
  oms_id: yup.number().required(),
  oie_id: yup.number().required(),
  principes_actifs_id: yup.number().required(),
  name: yup.string().required(),
  animal_species: yup.string().required(),
  adminstration_route: yup.string().required(),
  license_identifier: yup.number().required(),
  license_year: yup.number().required(),
});

const UcUpdateSchema = yup.object().shape({
  id: yup.number().required(),
  pharmacologic_class_id: yup.number(),
  manufacturer_id: yup.number(),
  oms_id: yup.number(),
  oie_id: yup.number(),
  principes_actifs_id: yup.number(),
  name: yup.string(),
  animal_species: yup.string(),
  adminstration_route: yup.string(),
  license_identifier: yup.number(),
  license_year: yup.number(),
});

const UcDeleteSchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  UcStoreSchema,
  UcUpdateSchema,
  UcDeleteSchema,
};
