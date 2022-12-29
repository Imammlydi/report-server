const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');
const User = require('./usersMysql');
const Role = require('./roleMysql');

const {DataTypes } = Sequelize;

const equipment = db.define('equipment', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    },
    qty: {
      type: DataTypes.INTEGER
    },
    reportId: {
      type: DataTypes.STRING
    }
  },{

    freezeTableName: true
  });

  
  module.exports = equipment;