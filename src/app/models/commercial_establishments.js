module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'commercial_establishments',
    {
      ulsa_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      status_auditor_id: DataTypes.INTEGER,
      status_rt_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      commercial_name: DataTypes.STRING,
      cnpj: DataTypes.INTEGER,
      state_registration: DataTypes.INTEGER,
      address: DataTypes.STRING,
      contact_number: DataTypes.INTEGER,
      email: DataTypes.STRING,
      register_number: DataTypes.INTEGER,
      register_date: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'commercial_establishments',
    }
  );
