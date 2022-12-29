const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');
const User = require('./usersMysql');
const Role = require('./roleMysql');

const {DataTypes } = Sequelize;

const User_role = db.define('user_role', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.STRING
    }
  },{

    freezeTableName: true
  });

  
  module.exports = User_role;