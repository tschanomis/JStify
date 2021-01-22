'use strict';

const tools = require('../Utils/tools.js');
const hash = tools.genHash("admin");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'admin@admin.com',
      password: hash,
      wordsTotal: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
