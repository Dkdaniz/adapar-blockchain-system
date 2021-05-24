module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'pharmacologic_class',
    {
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'pharmacologic_class',
    }
  );
