module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('commercial_establishments', {
      id: {
        allowNull: false,
        primarykey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      ulsa_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status_rt_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status_auditor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      commercial_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      state_registration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      register_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      register_date: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('commercial_establishments');
  },
};
