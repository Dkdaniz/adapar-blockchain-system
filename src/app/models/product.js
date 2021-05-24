module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'product',
    {
      pharmacologic_class_id: DataTypes.INTEGER,
      manufacturer_id: DataTypes.INTEGER,
      stock_id: DataTypes.INTEGER,
      oms_id: DataTypes.INTEGER,
      oie_id: DataTypes.INTEGER,
      principes_actifs_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      animal_species: DataTypes.STRING,
      adminstration_route: DataTypes.STRING,
      license_identifier: DataTypes.INTEGER,
      license_year: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'product',
    }
  );
