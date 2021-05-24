module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'urs',
    {
      uc_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'urs',
    }
  );
