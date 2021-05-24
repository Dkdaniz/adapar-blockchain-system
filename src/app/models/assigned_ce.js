module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'assigned_ce',
    {
      user_id: DataTypes.INTEGER,
      ce_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'assigned_ce',
    }
  );
