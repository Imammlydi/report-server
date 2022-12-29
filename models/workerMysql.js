const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');
const User = require('./usersMysql');
const Role = require('./roleMysql');

const {DataTypes } = Sequelize;

const Worker = db.define('worker', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    type_of_work: {
      type: DataTypes.STRING
    },
    qtyW: {
      type: DataTypes.INTEGER
    },
    reportId: {
      type: DataTypes.STRING
    }
  },{

    freezeTableName: true
  });

  
  module.exports = Worker;