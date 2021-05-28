const {
  commercial_establishments,
  ce_category,
  ulsa,
  status,
  city,
} = require('../models');

const {
  CommercialEstablishmentsStoreSchema,
  CommercialEstablishmentsUpdateSchema,
  CommercialEstablishmentsDeleteSchema,
} = require('../schemas/CommercialEstablishmentsSchema');

async function show(req, res) {
  const { id } = req.query;

  if (id) {
    const commercialEstablishmentsShow = await commercial_establishments.findOne(
      {
        where: { id },
      }
    );

    return res
      .status(200)
      .json({ commercial_establishments: commercialEstablishmentsShow });
  }

  const data = await commercial_establishments.findAll();

  res.status(200).json({ commercial_establishments: data });
}

async function store(req, res) {
  try {
    await CommercialEstablishmentsStoreSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }

  const {
    ulsa_id,
    city_id,
    category_id,
    status_id,
    status_auditor_id,
    status_rt_id,
    name,
    commercial_name,
    cnpj,
    state_registration,
    address,
    contact_number,
    email,
    register_number,
    register_data,
  } = req.body;

  const ulsaCheck = ulsa.findOne({ where: { id: ulsa_id } });
  if (!ulsaCheck) return res.status(404).json({ error: 'ulsa dont was found' });

  const cityCheck = city.findOne({ where: { id: city_id } });
  if (!cityCheck) return res.status(404).json({ error: 'city dont was found' });

  const categoryCheck = ce_category.findOne({ where: { id: category_id } });
  if (!categoryCheck)
    return res.status(404).json({ error: 'category dont was found' });

  const statusCeCheck = status.findOne({ where: { id: status_id } });
  if (!statusCeCheck)
    return res.status(404).json({ error: 'status Ce dont was found' });

  const statusAuditorCheck = status.findOne({
    where: { id: status_auditor_id },
  });
  if (!statusAuditorCheck)
    return res.status(404).json({ error: 'status auditor dont was found' });

  const statusRtCheck = status.findOne({ where: { id: status_rt_id } });
  if (!statusRtCheck)
    return res.status(404).json({ error: 'ulsa dont was found' });

  try {
    const commercialEstablishmentsStore = await commercial_establishments.create(
      {
        ulsa_id,
        city_id,
        category_id,
        status_id,
        status_auditor_id,
        status_rt_id,
        name,
        commercial_name,
        cnpj,
        state_registration,
        address,
        contact_number,
        email,
        register_number,
        register_data,
      }
    );

    res
      .status(200)
      .json({ commercial_establishments: commercialEstablishmentsStore });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error in create commercial establishments' });
  }
}

async function update(req, res) {
  try {
    await CommercialEstablishmentsUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const {
    id,
    ulsa_id,
    city_id,
    category_id,
    status_id,
    status_auditor_id,
    status_rt_id,
    name,
    commercial_name,
    cnpj,
    state_registration,
    address,
    contact_number,
    email,
    register_number,
    register_data,
  } = req.body;

  const commercialEstablishmentsUpdate = await commercial_establishments.findOne(
    {
      where: id,
    }
  );

  if (!commercialEstablishmentsUpdate)
    return res
      .status(400)
      .json({ error: 'Commercial establishments dont was found' });

  if (ulsa_id) {
    const ulsaCheck = ulsa.findOne({ where: { id: ulsa_id } });
    if (!ulsaCheck)
      return res.status(404).json({ error: 'ulsa dont was found' });

    commercialEstablishmentsUpdate.ulsa_id = ulsa_id;
  }

  if (city_id) {
    const cityCheck = city.findOne({ where: { id: city_id } });
    if (!cityCheck)
      return res.status(404).json({ error: 'city dont was found' });

    commercialEstablishmentsUpdate.city_id = city_id;
  }

  if (category_id) {
    const categoryCheck = ce_category.findOne({ where: { id: category_id } });
    if (!categoryCheck)
      return res.status(404).json({ error: 'category dont was found' });

    commercialEstablishmentsUpdate.category_id = category_id;
  }

  if (status_id) {
    const statusCeCheck = status.findOne({ where: { id: status_id } });
    if (!statusCeCheck)
      return res.status(404).json({ error: 'status Ce dont was found' });

    commercialEstablishmentsUpdate.status_id = status_id;
  }

  if (status_auditor_id) {
    const statusAuditorCheck = status.findOne({
      where: { id: status_auditor_id },
    });

    if (!statusAuditorCheck)
      return res.status(404).json({ error: 'status auditor dont was found' });

    commercialEstablishmentsUpdate.status_auditor_id = status_auditor_id;
  }

  if (status_rt_id) {
    const statusRtCheck = status.findOne({ where: { id: status_rt_id } });
    if (!statusRtCheck)
      return res.status(404).json({ error: 'ulsa dont was found' });

    commercialEstablishmentsUpdate.status_rt_id = status_rt_id;
  }

  if (name) commercialEstablishmentsUpdate.name = name;
  if (commercial_name)
    commercialEstablishmentsUpdate.commercial_name = commercial_name;
  if (cnpj) commercialEstablishmentsUpdate.cnpj = cnpj;
  if (state_registration)
    commercialEstablishmentsUpdate.state_registration = state_registration;
  if (address) commercialEstablishmentsUpdate.address = address;
  if (contact_number)
    commercialEstablishmentsUpdate.contact_number = contact_number;
  if (email) commercialEstablishmentsUpdate.email = email;
  if (register_number)
    commercialEstablishmentsUpdate.register_number = register_number;
  if (register_data)
    commercialEstablishmentsUpdate.register_data = register_data;

  try {
    await commercialEstablishmentsUpdate.save();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in update commercial establishments' });
  }

  res
    .status(200)
    .json({ commercial_establishments: commercialEstablishmentsUpdate });
}

async function remove(req, res) {
  const { id } = req.body;

  try {
    await CommercialEstablishmentsDeleteSchema.validate(
      { id },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  try {
    await commercial_establishments.destroy({ where: { id } });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'error in delete commercial establishments' });
  }

  res.status(200).json({ messages: 'Commercial establishments was deleted' });
}

module.exports = (app) => {
  app.get('/commercialEstablishments', show);
  app.post('/commercialEstablishments', store);
  app.put('/commercialEstablishments', update);
  app.delete('/commercialEstablishments', remove);
};
