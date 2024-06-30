'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const questions = [
     { question: 'What is your mother maiden name', createdAt: new Date(),updatedAt:new Date()},
    {question: 'What is your favorite pet', createdAt: new Date(),updatedAt:new Date()},
    {question: 'Where did you grow up', createdAt: new Date(),updatedAt:new Date()},
     { question: 'What is your favorite book', createdAt: new Date(),updatedAt:new Date() },
     { question: 'What is your favorite sport', createdAt: new Date(),updatedAt:new Date() },
     { question: 'What is your favorite food', createdAt: new Date(),updatedAt:new Date() },
   ];
    await queryInterface.bulkInsert('security_questions', questions)
  },
};
