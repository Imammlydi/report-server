const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');

const {DataTypes } = Sequelize;

const Users = db.define('user', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
   
  },{
    // Freeze Table Name
    freezeTableName: true,
    // paranoid: true
  });


  module.exports = Users;