const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');

const {DataTypes } = Sequelize;

const Role = db.define('role', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING
    },
  },{
    // Freeze Table Name
    freezeTableName: true
  });


  module.exports = Role;