const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');
const User = require('./usersMysql');
const Role = require('./roleMysql');

const {DataTypes } = Sequelize;

const Weather = db.define('weather', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    weather: {
      type: DataTypes.STRING
    },
    reportId: {
      type: DataTypes.STRING
    }
  },{

    freezeTableName: true
  });

  
  module.exports = Weather;