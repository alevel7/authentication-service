'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'bvn', {
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('Users', 'isPhoneValid', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'bvn')
    await queryInterface.removeColumn('Users', 'isPhoneValid')
  }
};
