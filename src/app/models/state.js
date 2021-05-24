module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'state',
    {
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'state',
    }
  );
