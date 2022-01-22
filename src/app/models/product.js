module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'products',
    {
      pharmacologic_class_id: DataTypes.INTEGER,
      manufacturer_id: DataTypes.INTEGER,
      stock_id: DataTypes.INTEGER,
      oms_id: DataTypes.INTEGER,
      oie_id: DataTypes.INTEGER,
      principes_actifs_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      animal_species: DataTypes.STRING,
      administration_route: DataTypes.STRING,
      license_identifier: DataTypes.INTEGER,
      license_year: DataTypes.INTEGER,
      concentration: DataTypes.DOUBLE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'products',
    }
  );
