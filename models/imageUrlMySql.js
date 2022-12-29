const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');
const User = require('./usersMysql');
const Role = require('./roleMysql');

const {DataTypes } = Sequelize;

const ImageUrl = db.define('imageurl', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    reportId: {
      type: DataTypes.STRING
    }
  },{

    freezeTableName: true
  });

  
  module.exports = ImageUrl;