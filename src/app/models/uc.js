module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'uc',
    {
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'uc',
    }
  );
