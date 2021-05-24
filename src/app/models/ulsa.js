module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'ulsa',
    {
      urs_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'ulsa',
    }
  );
