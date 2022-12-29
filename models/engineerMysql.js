const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');
const User = require('./usersMysql')
const {DataTypes } = Sequelize;

const Engineer = db.define('engineer', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    }, 
    name: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.STRING
    },
    field: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.STRING
    }
   
  },{
    // Freeze Table Name
    freezeTableName: true
  });
 
 
 


  module.exports = Engineer;