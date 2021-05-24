module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'manufacturers',
    {
      name: DataTypes.STRING,
      commercial_name: DataTypes.STRING,
      cnpj: DataTypes.INTEGER,
      address: DataTypes.STRING,
      contact_number: DataTypes.INTEGER,
      email: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'manufacturers',
    }
  );
