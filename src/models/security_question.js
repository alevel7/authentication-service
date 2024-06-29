'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class security_question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      security_question.hasMany(models.user_security_question, {
        foreignKey: 'security_question_id',
      });
    }
    
  }
  security_question.init({
    question: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'security_question',
  });
  return security_question;
};