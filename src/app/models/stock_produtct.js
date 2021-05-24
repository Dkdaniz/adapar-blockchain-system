module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'stock_product',
    {
      product_id: DataTypes.INTEGER,
      ce_id: DataTypes.INTEGER,
      quantity: DataTypes.DOUBLE,
      stock_in: DataTypes.DOUBLE,
      stock_out: DataTypes.DOUBLE,
      losses: DataTypes.DOUBLE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: 'stock_product',
    }
  );
