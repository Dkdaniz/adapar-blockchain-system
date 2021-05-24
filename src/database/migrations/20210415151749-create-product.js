module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primarykey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      pharmacologic_class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      manufacturer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      oms_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      oie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      principes_actifs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      animal_species: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      administration_route: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      license_identifier: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      license_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('products');
  },
};
