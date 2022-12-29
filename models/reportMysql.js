const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');
const Inspector = require('./inspectorMysql')
const {DataTypes } = Sequelize;

const Report = db.define('report', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    inspectorId: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    shift: {
      type: DataTypes.STRING
    },
 
    tanggal: {
      type: DataTypes.STRING
    },
 
  },{
    // Freeze Table Name
    freezeTableName: true,
    paranoid: true
  });


 

  module.exports = Report;