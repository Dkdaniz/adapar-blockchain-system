module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'oms_classification',
    {
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'oms_classification',
    }
  );
