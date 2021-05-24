module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'city',
    {
      state_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'city',
    }
  );
