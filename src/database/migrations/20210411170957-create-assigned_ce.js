module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assigned_ce', {
      id: {
        allowNull: false,
        primarykey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ce_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('assigned_ce');
  },
};
