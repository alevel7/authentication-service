'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_security_question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      
    }
  }
  user_security_question.init({
    answer: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    security_question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'security_question',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'user_security_question',
  });
  return user_security_question;
};