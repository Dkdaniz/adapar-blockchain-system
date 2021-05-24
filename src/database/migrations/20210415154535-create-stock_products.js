module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stock_product', {
      id: {
        allowNull: false,
        primarykey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ce_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      stock_in: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      stock_out: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      losses: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('stock_product');
  },
};
