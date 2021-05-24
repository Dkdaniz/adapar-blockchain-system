module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'ce_category',
    {
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'ce_category',
    }
  );
