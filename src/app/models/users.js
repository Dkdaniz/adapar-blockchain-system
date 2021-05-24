module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'users',
    {
      ce_id: DataTypes.INTEGER,
      ulsa_id: DataTypes.INTEGER,
      uc_id: DataTypes.INTEGER,
      urs_id: DataTypes.INTEGER,
      position_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      cpf: DataTypes.INTEGER,
      crmv: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'users',
    }
  );
