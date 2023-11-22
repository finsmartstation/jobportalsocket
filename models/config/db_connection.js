const Sequelize=require('sequelize');
const dbConfig=require('./db_config');
const Op = Sequelize.Op;
const db = {};
const sequelize=new Sequelize(
    dbConfig.database, dbConfig.username, dbConfig.password,{
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

db.Sequelize=Sequelize;
db.sequelize=sequelize;
// async function check(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// check();
module.exports=db;

