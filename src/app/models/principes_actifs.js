module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'principes_actifs',
    {
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'principes_actifs',
    }
  );
