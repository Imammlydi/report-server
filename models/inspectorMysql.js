const {Sequelize} = require('sequelize');
const db = require('../middlewares/conn2');
const Report = require('./reportMysql')
const User = require('./usersMysql')
const {DataTypes } = Sequelize;

const Inspector = db.define('inspectors', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    },
    field: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.STRING
    },
    engineerId: {
      type: DataTypes.STRING
    },
   
  },{
    // Freeze Table Name
    freezeTableName: true,
    paranoid: true
  });
 
 
  // Inspector.associate = models => {
  //   Inspector.hasMany(models.Report, {
  //     foreignKey: 'inspector',
  //     as: "report" 
  //   });
  // }
 
  //  Report.associate = (models) => {
  //   Report.belongsTo(models.Inspector, {
  //     foreignKey: 'inspector',
  //        as: "inspector",
  //   })
  // }



  // RELATION FOR USER & INSPECTOR
  Inspector.associate = (models) => {
    Inspector.belongsTo(models.User, {
      foreignKey: 'id_users'
    })
  }
  User.associate = models => {
    User.hasMany(models.Inspector, {
      foreignKey: 'id_users'
    });
  }
 

  module.exports = Inspector;