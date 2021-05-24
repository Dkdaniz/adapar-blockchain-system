module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'status',
    {
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'status',
    }
  );
