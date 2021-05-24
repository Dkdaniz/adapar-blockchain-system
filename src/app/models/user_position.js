module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'user_position',
    {
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'user_position',
    }
  );
