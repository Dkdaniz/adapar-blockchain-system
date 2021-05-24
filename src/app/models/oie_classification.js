module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'oie_classification',
    {
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'oie_classification',
    }
  );
