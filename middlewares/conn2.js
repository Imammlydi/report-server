// import sequelize
const { Sequelize } =require ("sequelize");
 
// create connection
const db = new Sequelize('report', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
 
// export connection
module.exports = db;